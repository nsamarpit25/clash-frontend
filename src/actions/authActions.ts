"use server";

import type { initState } from "@/components/auth/Register";
import { CHECK_CREDENTIALS_URL, REGISTER_URL } from "@/lib/apiEndPoints";
import axios, { AxiosError } from "axios";

// import { REGISTER_URL } from "@/lib/apiEndPoints";
// import axios from "axios";
export async function registerAction(prevState: initState, formData: FormData) {
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

export async function loginAction(prevState: initState, formData: FormData) {
   try {
      await axios.post(CHECK_CREDENTIALS_URL, {
         email: formData.get("email"),
         password: formData.get("password"),
      });
      return {
         status: 200,
         message: "Logging you in",
         errors: {},
         data: {
            email: formData.get("email"),
            password: formData.get("password"),
         },
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
