import { registerAction } from "@/actions/authActions";
import React, { useActionState, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import SubmitButton from "../common/SubmitButton";
import { useEffect } from "react";
import { toast } from "sonner";

export interface initState {
   status: number;
   message: string;
   errors?: {
      name?: string;
      email?: string;
      password?: string;
      confirm_password?: string;
   };
}
export default function Register() {
   const initState = {
      status: 0,
      message: "",
      errors: {},
   };

   const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      confirm_password: "",
   });

   const [state, formAction] = useActionState(registerAction, initState);

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
      if (state.status === 200) {
         toast.success(state.message);
         // Reset form only on successful registration
         setFormData({
            name: "",
            email: "",
            password: "",
            confirm_password: "",
         });
      }
   }, [state.status, state.message]);

   const handleSubmit = async (formData: FormData) => {
      await formAction(formData);
   };

   return (
      <form
         className="mt-4"
         action={handleSubmit}
      >
         <div className="mt-4">
            <Label htmlFor="name">Name</Label>
            <Input
               type="text"
               id="name"
               name="name"
               value={formData.name}
               onChange={handleInput}
               placeholder="Enter your name"
            />
            <span className="text-red-500">{state.errors?.name}</span>
         </div>
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
