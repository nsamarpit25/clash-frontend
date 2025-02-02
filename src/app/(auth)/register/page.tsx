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
            <h1 className="text-3xl font-bold">Register</h1>
            <p>Welcome to Clash</p>
            <form className="mt-4">
               <div className="mt-4">
                  <Label htmlFor="name">Name</Label>
                  <Input
                     type="text"
                     id="name"
                     name="name"
                     placeholder="Enter your name"
                  />
               </div>
               <div className="mt-4">
                  <Label htmlFor="email">Email</Label>
                  <Input
                     type="email"
                     id="email"
                     name="email"
                     placeholder="Enter your email"
                  />
               </div>
               <div className="mt-4">
                  <Label htmlFor="password">Password</Label>
                  <Input
                     type="password"
                     id="password"
                     name="password"
                     placeholder="Enter your password"
                  />
               </div>
               <div className="mt-4">
                  <Label htmlFor="confirm_password">Confirm Password</Label>
                  <Input
                     type="password"
                     id="confirm_password"
                     name="confirm_password"
                     placeholder="Enter your password"
                  />
               </div>

               <div className="mt-4">
                  <Button
                     className="w-full"
                     type="submit"
                  >
                     Register
                  </Button>
               </div>
            </form>

            <p className=" text-center mt-2">
               <Link href={"/login"}>Already Registered? Login</Link>
            </p>
         </div>
      </div>
   );
}
