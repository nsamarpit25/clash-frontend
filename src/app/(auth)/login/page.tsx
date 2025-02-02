import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React from "react";

export default function Login() {
   return (
      <div className="flex items-center justify-center h-screen">
         <div className="w-[550px] bg-white rounded-xl px-10 shadow-md py-5">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent mt-4 text-center">
               Clash
            </h1>
            <h1 className="text-3xl font-bold">Login</h1>
            <p>Welcome back</p>
            <form className="mt-4">
               <div className="mt-4">
                  <Label htmlFor="input">Email</Label>
                  <Input
                     type="email"
                     id="email"
                     name="email"
                     placeholder="Enter your email"
                  />
               </div>
               <div className="mt-4">
                  <Label htmlFor="input">Password</Label>
                  <Input
                     type="password"
                     id="password"
                     name="password"
                     placeholder="Enter your password"
                  />
               </div>
               <div className="flex justify-end">
                  <Link
                     href="/forgot-password"
                     className=" mt-2 "
                  >
                     Forgot Password?{" "}
                  </Link>
               </div>
               <div className="mt-4">
                  <Button
                     className="w-full"
                     type="submit"
                  >
                     Login
                  </Button>
               </div>
            </form>

            <p className=" text-center mt-2">
               <Link href={"/register"}>
                  D{"on't"} have an account? Register
               </Link>
            </p>
         </div>
      </div>
   );
}
