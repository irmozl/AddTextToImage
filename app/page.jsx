import RegisterForm from "@/components/RegisterForm";
import { getUserFromCookie } from "@/lib/getUser";
import Dashboard from "@/components/Dashboard";

export default async function Home() {
  const user = await getUserFromCookie();

  return (
    <>
      {user && <Dashboard user={user} />}
      {!user && (
        <div>
          <p className="text-center text-2xl text-gray-600 mb-5 mt-20 md:mt-32">
            Don't have an account? <strong>Create one.</strong>
          </p>
          <RegisterForm />
        </div>
      )}
    </>
  );
}
