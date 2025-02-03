import Link from "next/link";
import Login from "@/components/auth/Login";

export default function Page() {
   return (
      <div className="flex items-center justify-center h-screen">
         <div className="w-[550px] bg-white rounded-xl px-10 shadow-md py-5">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent mt-4 text-center">
               Clash
            </h1>
            <h1 className="text-3xl font-bold">Login</h1>
            <p>Welcome back</p>
            <Login />

            <p className=" text-center mt-2">
               <Link href={"/register"}>
                  D{"on't"} have an account? Register
               </Link>
            </p>
         </div>
      </div>
   );
}
