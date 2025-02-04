"use client";
import { forgetPasswordAction } from "@/actions/forgetPasswordActions";
import React, { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import SubmitButton from "../common/SubmitButton";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
// import { useEffect } from "react";
// import { toast } from "sonner";

export interface forgetPasswordInitState {
   status: number;
   message: string;
   errors?: {
      email?: string;
      password?: string;
   };
}
export default function ForgetPassword() {
   const initState = {
      status: 0,
      message: "",
      errors: {},
   };

   const [formData, setFormData] = useState({
      email: "",
   });

   const [state, formAction] = useActionState(forgetPasswordAction, initState);

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
         setFormData({
            email: "",
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
            <SubmitButton />
         </div>
      </form>
   );
}
