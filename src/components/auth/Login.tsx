"use client";
import React, { useActionState, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import SubmitButton from "../common/SubmitButton";
import { loginAction } from "@/actions/authActions";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
// import { useEffect } from "react";
// import { toast } from "sonner";

export interface initState {
   status: number;
   message: string;
   errors?: {
      email?: string;
      password?: string;
   };
   data?: {
      email?: string;
      password?: string;
   };
}
export default function Login() {
   const initState = {
      status: 0,
      message: "",
      errors: {},
   };

   const [formData, setFormData] = useState({
      email: "",
      password: "",
   });

   const [state, formAction] = useActionState(loginAction, initState);

   const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
         ...prev,
         [e.target.name]: e.target.value,
      }));
   };

   useEffect(() => {
      if (state.status === 500) {
         toast.error(state.message);
      }
      if (state.status === 422) {
         toast.error(state.message);
      }
      if (state.status === 200) {
         toast.success(state.message);
         // console.log(state.data);
         // console.log(formData);
         // Reset form only on successful registration
         signIn("credentials", {
            email: state.data?.email,
            password: state.data?.password,
            callbackUrl: "/dashboard",
            redirect: true,
         });
         setFormData({
            email: "",
            password: "",
         });
      }
   }, [state]);

   const handleSubmit = async (formData: FormData) => {
      // await formAction(formData);
      await formAction(formData);
      console.log(state);

      // console.log(await formData.get("password"));
   };

   return (
      <form
         className="mt-4"
         action={handleSubmit}
      >
         <div className="mt-4">
            <Label htmlFor="email">Email</Label>
            <Input
               type="email"
               id="email"
               name="email"
               value={formData.email}
               onChange={handleInput}
               placeholder="Enter your email"
            />
            <span className="text-red-500">{state.errors?.email}</span>
         </div>
         <div className="mt-4">
            <Label htmlFor="password">Password</Label>
            <Input
               type="password"
               id="password"
               name="password"
               value={formData.password}
               onChange={handleInput}
               placeholder="Enter your password"
            />{" "}
            <span className="text-red-500">{state.errors?.password}</span>
         </div>

         <div className="mt-4">
            <SubmitButton />
         </div>
      </form>
   );
}
