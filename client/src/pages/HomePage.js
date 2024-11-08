import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Button from "../components/Button";

const MainSection = () => {
  return (
    <div>
      <main className="grid grid-cols-2 gap-4 bg-[#68C692] mt-12">
        <div className="relative">
          {<img src="1.jpg" alt="3D visual of farming" />}
        </div>
        <div className="flex flex-col justify-center items-start ml-12">
          <h1 className="text-6xl font-bold text-primary1 font-sansita">
            CareVibe
          </h1>
          <p className="mt-4 text-lg text-primary3 font-robotoSlab">
            Empowering farmers with trusted partnerships
          </p>
          <div className="flex gap-5 items-center justify-center mt-5">
            <>
              <Button
                text="Login"
                bgColor="lightblue"
                layerColors={["#ff6347", "#00bfff", "#98fb98"]}
                fontSize="1.5rem"
                linkTo="/login"
              />
              <Button
                text="Register"
                bgColor="lightblue"
                layerColors={["#ff6347", "#00bfff", "#98fb98"]}
                fontSize="1.5rem"
                linkTo="/register"
              />
            </>
          </div>
        </div>
      </main>
      <section className="bg-gradient-to-b from-[#B5B778] to-[#8A8A3B] text-white py-16">
        <div className="container mx-auto text-center">
          <p className="text-xs mb-1">WHO WE ARE</p>
          <h2 className="text-3xl ">ABOUT CareVibe</h2>
          <p className="mt-6  mx-auto text-2xl">
            At CareVibe, we are committed to transforming healthcare through
            innovative digital solutions. <br /> Our mission is to bridge the
            gap between patients and healthcare providers, <br /> fostering a
            sustainable and mutually beneficial partnership that enhances care,
            accessibility, <br /> and overall well-being. We aim to empower
            users with the tools they need to manage their health more
            effectively, <br /> improving both productivity and quality of life.
          </p>
        </div>
      </section>
      <section className="py-12 bg-gray-100 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-green-700 mb-8">
          What do we provide?
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-primary2 p-10 py-14 border-2  border-black  rounded-[60px] shadow-lg hover:shadow-black hover:scale-105 transition-transform duration-300 ease-in-out w-96 h-128 flex flex-col items-center">
            <div className="flex justify-center mb-4 flex-grow">
              <img
                src="doc.avif"
                alt="Tiered Buyer Verification"
                className="h-44 w-h-44 object-contain"
              />
            </div>
            <h2 className="text-lg font-semibold text-green-700 text-center">
              Doctor at your ease
            </h2>
            <p className="text-gray-600 mt-2 text-center">
              Prompt connection with doctors
            </p>
          </div>
          <div className="bg-primary2 p-10 py-14 border-2  border-black  rounded-[60px] shadow-lg hover:shadow-black hover:scale-105 transition-transform duration-300 ease-in-out w-96 h-128 flex flex-col items-center">
            <div className="flex justify-center mb-4 flex-grow">
              <img
                src="chatbot.gif"
                alt="chatbot"
                className="h-44 w-h-44 object-contain"
              />
            </div>
            <h2 className="text-lg font-semibold text-green-700 text-center">
              AI integration
            </h2>
            <p className="text-gray-600 mt-2 text-center">
              User friendly chatbot which provides preliminary mode of treatment
            </p>
          </div>
          <div className="bg-primary2 p-10 py-14 border-2  border-black  rounded-[60px] shadow-lg hover:shadow-black hover:scale-105 transition-transform duration-300 ease-in-out w-96 h-128 flex flex-col items-center">
            <div className="flex justify-center mb-4 flex-grow">
              <img
                src="https://s3-prod.modernhealthcare.com/s3fs-public/styles/width_792/public/insurance_i.png"
                alt="Tiered Buyer Verification"
                className="h-44 w-h-44 object-contain"
              />
            </div>
            <h2 className="text-lg font-semibold text-green-700 text-center">
              Personalized healthcare plan
            </h2>
            <p className="text-gray-600 mt-2 text-center">
              A tailored plan for health management
            </p>
          </div>
        </div>
      </section>
      <section className="bg-[#68C692] text-white py-12 relative flex">
        <div className="container  text-center px-20 ">
          <h2 className="text-3xl" style={{ textAlign: "justify" }}>
            How it Works
          </h2>
          <p className="mt-6  text-2xl" style={{ textAlign: "justify" }}>
            Our secure health monitoring dashboard provides real-time insights
            into your health data <br /> with intuitive visual indicators and
            AI-powered analytics. <br />
            Easily track your wellness trends, monitor key health metrics,{" "}
            <br /> and receive alerts to ensure your health remains on track and
            protected.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default MainSection;
