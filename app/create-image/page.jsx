import { redirect } from "next/navigation";
import { getUserFromCookie } from "@/lib/getUser"
import ImageForm from "@/components/ImageForm";

export default async function Page() {
  const user = await getUserFromCookie();
  if (!user) {
    return redirect('/');
  }

    return (
      <div>
        <h2 className="text-center font-semibold text-2xl text-gray-600 mb-5">Create Image</h2>
        <ImageForm action="create"/>
      </div>
    );
  }
  