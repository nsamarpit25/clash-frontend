"use server";

import type { initState } from "@/components/auth/Register";
import { REGISTER_URL } from "@/lib/apiEndPoints";
import axios, { AxiosError } from "axios";

// import { REGISTER_URL } from "@/lib/apiEndPoints";
// import axios from "axios";
export async function registerAction(prevState: initState, formData: FormData) {
   console.log(formData);
   try {
      const { data } = await axios.post(REGISTER_URL, {
         name: formData.get("name"),
         email: formData.get("email"),
         password: formData.get("password"),
         confirm_password: formData.get("confirm_password"),
      });
      return {
         status: 200,
         message:
            data?.message ??
            "Account created Successfully. Please check your email to verify your account",
         errors: {},
      };
   } catch (error) {
      if (error instanceof AxiosError) {
         if (error.status === 422) {
            return {
               status: 422,
               message: error.response?.data.message,
               errors: error.response?.data.errors,
            };
         }
      }
   }
   return {
      status: 500,
      message: "Something went wrong",
      errors: {},
   };
}
