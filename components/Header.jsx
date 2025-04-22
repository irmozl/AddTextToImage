import { logout } from "@/actions/userController";
import { getUserFromCookie } from "@/lib/getUser";
import Link from "next/link";


export default async function Header() {
  const user = await getUserFromCookie();

  return (
    <header className="bg-gray-100 shadow-md">
      <div className="container mx-auto">
        <div className="navbar ">
          <div className="flex-1">
            <Link href="/" className="btn btn-ghost md:text-xl ">
              Add Text To Image
            </Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              {user && (
                <>
                <li className="mr-2">
                  <Link href="/create-image" className="btn btn-primary">Create Image</Link>
                </li>
                <li>
                  <form action={logout} className="btn btn-neutral ">
                    <button>Log Out</button>
                  </form>
                </li>
                </>
              )}
              {!user && (
                <li>
                  <Link href="/login">Log In</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
