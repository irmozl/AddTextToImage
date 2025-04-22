import { ObjectId } from "mongodb"
import { getCollection } from "@/lib/db"
import Link from "next/link"

import Image from "./Image"

async function getImage(id){
    const collection = await getCollection("images")
    const results = await collection.find({author: ObjectId.createFromHexString(id)}).sort({_id:-1}).toArray()
    return results
}

export default async function Dashboard(props){
    const image = await getImage(props.user.userId)

    return (
        <div>
            <h2 className="text-center text-2xl text-gray-600 mb-5">Your images</h2>
            {image.length === 0 ? (
            <div className="text-center">
                <p className="text-center text-gray-600 mb-8">You have not created any images yet.</p>
                <Link href="/create-image" className="btn btn-primary">Create Image</Link>
            </div>
            ) : ( image.map((image,index) => {
                image._id = image._id.toString()
                image.author = image.author.toString()
                return <Image key={index} image={image} />
                }))}
        </div>
    ) 
}