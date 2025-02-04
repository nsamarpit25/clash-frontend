"use server";
import type { forgetPasswordInitState } from "@/components/auth/ForgetPassword";
import { BASE_URL, FORGET_PASSWORD_URL } from "@/lib/apiEndPoints";
import axios, { AxiosError } from "axios";

export async function forgetPasswordAction(
   prevState: forgetPasswordInitState,
   formData: FormData
) {
   try {
      console.log("url", BASE_URL);
      const { data } = await axios.post(FORGET_PASSWORD_URL, {
         email: formData.get("email"),
      });

      return {
         status: 200,
         message:
            data?.message ?? "Password reset link has been sent to your email",
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
