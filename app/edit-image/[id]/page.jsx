import ImageForm from "@/components/ImageForm"
import { getCollection } from "@/lib/db"
import { ObjectId } from "mongodb"
import { getUserFromCookie } from "@/lib/getUser"
import { redirect } from "next/navigation"

async function getDoc(id) {
    const imagesCollection = await getCollection("images")
    const result = await imagesCollection.findOne({_id: ObjectId.createFromHexString(id)})
    return result
}
export default async function Page(props) {
    // console.log(typeof props.params.id);
    const doc = await getDoc(props.params.id.toString())
    const user = await getUserFromCookie()

    if(user.userId !== doc.author.toString()) return redirect("/")

    return (
        <div>
            <h2 className="text-center text-4xl text-gray-600 mb-5">Edit Image</h2>
            <ImageForm image={doc} action="edit" />
        </div>
    )
}