"use server"

import { getUserFromCookie } from "@/lib/getUser"
import { redirect } from "next/navigation"
import { ObjectId } from "mongodb"
import { getCollection } from "@/lib/db"
import { revalidatePath } from "next/cache"
import cloudinary from 'cloudinary'

const cloudinaryConfig = cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })

function isAlphaNumericWithBasics(text){
    const regex = /^[a-zA-Z0-9 .,]*$/
    return regex.test(text)
}

async function sharedImageLogic(formData, user){
    const errors = {}

    const ourImage = {
        line1: formData.get("line1"),
        line2: formData.get("line2"),
        line3: formData.get("line3"),
        author: ObjectId.createFromHexString(user.userId),
    }

    //string validation
    if ( typeof ourImage.line1 !== "string" ) ourImage.line1 = ""
    if ( typeof ourImage.line2 !== "string" ) ourImage.line2 = ""
    if ( typeof ourImage.line3 !== "string" ) ourImage.line3 = ""

    //tek satır olması için alt satıra vs gecmesin
    ourImage.line1 = ourImage.line1.replace(/(\r\n|\n|\r)/g, " ")
    ourImage.line2 = ourImage.line2.replace(/(\r\n|\n|\r)/g, " ")
    ourImage.line3 = ourImage.line3.replace(/(\r\n|\n|\r)/g, " ")

    //trimming
    ourImage.line1 = ourImage.line1.trim()
    ourImage.line2 = ourImage.line2.trim()
    ourImage.line3 = ourImage.line3.trim()

    if (ourImage.line1.length < 5) errors.line1 = "Line 1 must be at least 5 syllables long"
    if (ourImage.line1.length > 25) errors.line1 = "Line 1 must be less than 25 syllables long"
    
    if (ourImage.line2.length < 7) errors.line2 = "Line 2 must be at least 7 syllables long"
    if (ourImage.line2.length > 35) errors.line2 = "Line 2 must be less than 35 syllables long"

    if (ourImage.line3.length < 5) errors.line3 = "Line 3 must be at least 5 syllables long"
    if (ourImage.line3.length > 25) errors.line3 = "Line 3 must be less than 25 syllables long"

    if (!isAlphaNumericWithBasics(ourImage.line1)) errors.line1 = "No special characters allowed in line 1"
    if (!isAlphaNumericWithBasics(ourImage.line2)) errors.line2 = "No special characters allowed in line 2"
    if (!isAlphaNumericWithBasics(ourImage.line3)) errors.line3 = "No special characters allowed in line 3"

    if (ourImage.line1.length === 0) errors.line1 = "Line 1 is required"
    if (ourImage.line2.length === 0) errors.line2 = "Line 2 is required"
    if (ourImage.line3.length === 0) errors.line3 = "Line 3 is required"

    //verify signature
    const expectedSignature = cloudinary.utils.api_sign_request({public_id: formData.get("public_id"),version: formData.get("version")}, cloudinaryConfig.api_secret)
    if(expectedSignature === formData.get("signature")) {
        ourImage.photo = formData.get("public_id")
    }

    return{
        errors,
        ourImage
    }
}

export const createImage = async function (prevState,formData) {
    const user = await getUserFromCookie()

    if (!user) {
        return redirect('/')
    }

    const results = await sharedImageLogic(formData, user)

    if (results.errors.line1 || results.errors.line2 || results.errors.line3) {
        return { errors: results.errors }
    }

    //save to db
    const imageCollection = await getCollection("images")
    const newImage = await imageCollection.insertOne(results.ourImage)
    return redirect("/")
}

export const editImage = async function (prevState,formData) {
    const user = await getUserFromCookie()

    if (!user) {
        return redirect('/')
    }

    const results = await sharedImageLogic(formData, user)

    if (results.errors.line1 || results.errors.line2 || results.errors.line3) {
        return { errors: results.errors }
    }

    //save into db
    const imageCollection = await getCollection("images")
    let imageId = formData.get("imageId")
    if (typeof imageId != "string") imageId = ""

    //dont let user edit other users images
    const imageInQuestion = await imageCollection.findOne({_id: ObjectId.createFromHexString(imageId)})
    if(imageInQuestion.author.toString() !== user.userId ) return redirect("/")
    
    await imageCollection.findOneAndUpdate({_id: ObjectId.createFromHexString(imageId)}, {$set: results.ourImage})

    return redirect("/")
}
export const deleteImage = async function (formData) {
    const user = await getUserFromCookie()

    if (!user) {
        return redirect('/')
    }
    
    const imageCollection = await getCollection("images")
    let imageId = formData.get("id")
    if (typeof imageId != "string") imageId = ""

    //dont let user edit other users images
    const imageInQuestion = await imageCollection.findOne({_id: ObjectId.createFromHexString(imageId)})
    if(imageInQuestion.author.toString() !== user.userId ) return redirect("/")
    
    await imageCollection.deleteOne({_id: ObjectId.createFromHexString(imageId)})
    revalidatePath("/")
}