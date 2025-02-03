import HeroSection from "@/components/base/HeroSection";
import { FC } from "react";

const page: FC = async () => {
   // const session = await getServerSession(authOptions);
   return (
      <div>
         {/* <p>Session: {JSON.stringify(session)}</p> */}
         <HeroSection />
      </div>
   );
};

export default page;
