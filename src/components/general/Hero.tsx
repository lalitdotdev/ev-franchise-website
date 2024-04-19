import React from "react";
import CustomButton from "./CustomButton";
import { Button } from "../ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative w-full px-[5vw] lg:px-[8vw] pt-[16vh] pb-[15vh] lg:pb-[16vh]">
      {/* grid */}
      <div className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#0077b512_1px,transparent_1px),linear-gradient(to_bottom,#0077b512_1px,transparent_1px)] bg-[size:42px_42px] -z-10"></div>
      {/* white fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[rgba(0,168,107,0.5)] to-transparent"></div>
      {/* content */}
      <div className="z-50 sm:w-full flex flex-col items-center lg:items-start gap-y-8 md:w-[75%]">
        <h1
          className="text-2xl lg:text-6xl font-bold text-median text-center lg:text-left border-0"
          style={{ lineHeight: "1.25" }}
        >
          Empower Your Business with EV Charging Solutions
          {/* Electrify Your Business with <br /> */}
          {/* <TypewriterEffectSmooth words={words} /> */}
        </h1>
        <h5 className="text-sm text-center lg:text-left lg:text-lg text-median font-normal md:w-[80%]">
          Seize the opportunity to own a cutting-edge EV charging franchise.
          Build a sustainable future and profitable venture today.
        </h5>
        <div className="flex gap-6 items-center">
          <CustomButton text="Book Franchise" />
          <Link href={"/login"}>
            <Button variant={"link"}>Have an account? Login!!</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;