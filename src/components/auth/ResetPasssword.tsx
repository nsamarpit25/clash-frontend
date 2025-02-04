"use client";

import { resetPasswordAction } from "@/actions/forgetPasswordActions";
import React, { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import SubmitButton from "../common/SubmitButton";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export interface initState {
   status: number;
   message: string;
   errors?: {
      token?: string;
      email?: string;
      password?: string;
      confirm_password?: string;
   };
}
export default function Register() {
   const searchParams = useSearchParams();
   const router = useRouter();
   const initState = {
      status: 0,
      message: "",
      errors: {},
   };

   const [formData, setFormData] = useState({
      password: "",
      confirm_password: "",
      email: "",
      token: "",
   });

   const [state, formAction] = useActionState(resetPasswordAction, initState);

   const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
         ...prev,
         [e.target.name]: e.target.value,
      }));
   };

   useEffect(() => {
      setFormData((prev) => ({
         ...prev,
         token: searchParams.get("token") ?? "",
         email: searchParams.get("email") ?? "",
      }));
   }, [searchParams]);

   useEffect(() => {
      if (state.status === 500) {
         toast.error(state.message);
      }
      if (state.status === 422) {
         toast.error(state.message);
      }
      if (state.status === 200) {
         toast.success(state.message);
         // Reset form only on successful registration
         setFormData({
            password: "",
            confirm_password: "",
            email: "",
            token: "",
         });
         router.push("/login");
      }
   }, [state.status, state.message, router]);

   const handleSubmit = async (formData: FormData) => {
      await formAction(formData);
      console.log("Password", formData.get("password"));
      console.log("Email", formData.get("email"));
      console.log("Token", formData.get("token"));
      console.log("C_password", formData.get("confirm_password"));
   };

   return (
      <form
         className="mt-4"
         action={handleSubmit}
      >
         <input
            type="hidden"
            name="token"
            value={formData.token}
         />
         <input
            type="hidden"
            name="email"
            value={formData.email}
         />
         <div className="mt-4">
            <Label htmlFor="password">New Password</Label>
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
            <Label htmlFor="confirm_password">Confirm Password</Label>
            <Input
               type="password"
               id="confirm_password"
               name="confirm_password"
               value={formData.confirm_password}
               onChange={handleInput}
               placeholder="Enter your password"
            />
            <span className="text-red-500">
               {state.errors?.confirm_password}
            </span>
         </div>

         <div className="mt-4">
            <SubmitButton />
         </div>
      </form>
   );
}
