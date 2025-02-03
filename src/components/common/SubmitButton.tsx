"use client";
import React from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
   const { pending } = useFormStatus();

   return (
      <Button
         className="w-full"
         type="submit"
         disabled={pending}
      >
         {pending ? "Loading..." : "Submit"}
      </Button>
   );
}
