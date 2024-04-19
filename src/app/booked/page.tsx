"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/AuthContext";
import ContactUs from "@/components/general/ContactUs";
import Copyright from "@/components/general/Copyright";
import CustomButton from "@/components/general/CustomButton";
import { Button } from "@/components/ui/button";
import LoggedInNav from "@/components/general/LoggedInNav";

const Booked = () => {
  const router = useRouter();

  const navigateToProfile = (link: string) => {
    router.push(link); // Update the path to your actual profile page's route
  };

  const { user } = useAuth();

  return (
    <div>
      <LoggedInNav />
      <div className="flex flex-col items-center justify-center py-20 md:py-24 space-y-12 bg-white rounded-lg">
        <p className="text-lg text-gray-700">
          We have received your booking request. We will reach out to you soon.
        </p>
        <p>Here is your password :- {user?.tempPassword}</p>
        <div className="flex flex-row items-center gap-x-12">
          <CustomButton
            onClick={() => navigateToProfile("/reset-password")}
            text="Reset password"
          />
          <Button
            onClick={() => navigateToProfile("/profile")}
            className="text-[#00a86b] text-xs md:text-base px-6 py-4 md:px-10 md:py-7 border-[1px] border-[#00a86b]  rounded-3xl"
          >
            View Profile
          </Button>
        </div>
      </div>
      <ContactUs />
      <Copyright />
    </div>
  );
};

export default Booked;
