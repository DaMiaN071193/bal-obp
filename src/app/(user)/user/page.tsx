import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import SignupBtnHome from "./signup-btn-home";

export const metadata: Metadata = {
  title: "Home",
};

export default function Page() {
  return (
    <Fragment>
      <section className="grid grid-cols-1 lg:grid-cols-12 my-4">
        <div className="col-span-6 place-self-center place-items-center grid lg:place-items-start">
          <div className="mb-4 lg:text-left text-center">
            <h1 className="max-w-2xl lg:pt-0 pt-10 mb-2 lg:text-6xl text-4xl font-extrabold">Register &amp; Request Building Permit!</h1>
            <p className="text-base font-semibold sm:text-lg lg:text-2xl text-green-600">Online Building Permit Registration</p>
          </div>
          <div className="lg:flex lg:justify-start lg:space-x-2">
            <div className="relative mt-2" id="apply-now">
              <SignupBtnHome />
            </div>
          </div>
        </div>
        <div className="col-span-6 place-self-center mt-4 lg:mt-0">
          <div className="w-[150px] h-[150px] lg:w-[500px] lg:h-[500px] relative">
            <Image alt="hero image" src="/paboni.svg" priority={true} width={150} height={150} className="absolute w-full h-full left-0 top-0 right-0 bottom-0 object-contain text-transparent" />
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-12">
          <div className="bg-gradient-to-r from-[#c4d4fff9] to-[#2a843e]  rounded-3xl border border-gray-300 shadow-md mt-5 py-6 px-4 lg:py-8 lg:px-10 lg:rounded-3xl lg:border lg:border-gray-300 lg:shadow-md lg:z-10 lg:flex lg:items-center lg:justify-around">
            <div className="md:flex md:items-center md:justify-evenly w-full">
              <Image alt="lgu nasipit logo" priority={true} width={500} height={49} className="object-contain text-transparent w-full" src="/mon-full.svg"/>
              <Image alt="builder logo" priority={true} width={500} height={49} className="object-contain text-transparent w-full" src="/paboni-full.svg"/>
            </div>
          </div>
        </div>
      </section>
      <div className="hidden lg:block">
        <div className="md:grid md:grid-cols-2 gap-8 items-center py-4 px-4 xl:gap-1 sm:py-16 xl:px-16">
          <Image alt="any device img" priority={true} width={500} height={400} className="object-contain text-transparent w-full p-2" src="/about1.svg"/>
          <div>
            <h2 className="text-center lg:text-left text-xl font-bold lg:text-2xl">Within your fingertips!</h2>
            <p className="text-base lg:text-lg text-left">Use any devices to process your building permit; phone, tablet or your personal computer. One click away to process your building!</p>
          </div>
          <div>
            <h2 className="text-center lg:text-left text-xl font-bold lg:text-2xl">Legal and Secure Information</h2>
            <p className="text-base lg:text-lg text-left">Engineered best to protect your personal information and interest. Rest assured that your data are well secured within our system.</p>
          </div>
          <Image alt="data management image" priority={true} width={500} height={400} className="object-contain text-transparent w-full p-2" src="/about2.svg"/>
        </div>
      </div>
      <div className="lg:hidden">
        <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
          <Image alt="any device img" priority={true} width={500} height={400} className="object-contain text-transparent w-full p-2" src="/about1.svg"/>
          <div>
            <h2 className="text-center lg:text-left text-xl font-bold lg:text-2xl mb-4">Within your fingertips!</h2>
            <p className="text-base lg:text-lg text-left">Use any devices to process your building permit; phone, tablet or your personal computer. One click away to process your building!</p>
          </div>
          <Image alt="data management image" priority={true} width={500} height={400} className="object-contain text-transparent w-full p-2" src="/about2.svg" />
          <div>
            <h2 className="text-center lg:text-left text-xl font-bold lg:text-2xl mb-4">Legal and Secure Information</h2>
            <p className="text-base lg:text-lg text-justify hidden sm:block">Engineered best to protect your personal information and interest. Rest assured that your data are well secured within our system.</p>
          </div>
        </div>
      </div>
      <section className="grid grid-cols-1 lg:grid-cols-12 pb-10">
        <div className="col-span-1 lg:col-span-12">
          <div className="bg-gradient-to-r from-[#2a843e] to-[#c4d4fff9] rounded-2xl border border-gray-300 shadow-md py-6 px-4 lg:py-10 lg:px-10 lg:rounded-3xk lg:border lg:border-gray-300 lg:shadow-md lg:z-10 lg:flex lg:items-center lg:justify-around">
            <div className="text-center lg:text-left lg:col-span-9 lg:self-center">
              <p className="text-center font-semibold text-4xl py-3">READY TO BUILD?</p>
              <h1 className="text-center text-white lg:mx-5 mb-4 lg:text-6xl text-2xl font-extrabold">REQUEST YOUR PERMIT NOW</h1>
            </div>
            <div className="flex justify-center lg:col-span-3 lg:self-center">
              <Link className="text-white place-items-center text-center px-5 py-4 rounded-full font-semibold text-sm lg:text-xl bg-black hover:bg-blue-400" href="#apply-now">GET STARTED</Link>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}