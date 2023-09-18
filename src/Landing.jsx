import React from "react";
import { Link } from "react-router-dom";

function Landing() {
  //   const gradientBackground = {
  //     background: "linear-gradient(to right, #000000, #333333)", // Adjust colors as needed
  //   };

  return (
    <div className="h-screen flex flex-col justify-center items-center text-white gradient-background ">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to the Health Prediction App
      </h1>
      <p className="text-lg text-gray-300 mb-8">
        Predict health conditions using machine learning models.
      </p>
      <div className="gap-2 flex">
        <Link
          to="/heart"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Predict Heart Health
        </Link>
        <Link
          to="/lungs"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          //   className="gradient-background text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Predict Lung Health
        </Link>
      </div>
    </div>
  );
}

export default Landing;
