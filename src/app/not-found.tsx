import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

function NotFound() {
   return (
      <div className="flex items-center justify-center h-screen flex-col">
         <Image
            src={"/not_found.svg"}
            alt="Not found"
            width={600}
            height={600}
         />
         <Button className="mt-4">
            <Link href="/">Return Home</Link>
         </Button>
      </div>
   );
}

export default NotFound;
