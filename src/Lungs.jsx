import React, { useState } from "react";
import { Link } from "react-router-dom";
function Lungs() {
  const initialInputData = {
    age: "",
    gender: "",
    airPollution: "",
    alcoholUse: "",
    dustAllergy: "",
    occupationalHazards: "",
    geneticRisk: "",
    chronicLungDisease: "",
    balancedDiet: "",
    obesity: "",
    smoking: "",
    passiveSmoker: "",
    chestPain: "",
    coughingOfBlood: "",
    fatigue: "",
    weightLoss: "",
    shortnessOfBreath: "",
    wheezing: "",
    swallowingDifficulty: "",
    clubbingOfFingerNails: "",
    frequentCold: "",
    dryCough: "",
    snoring: "",
  };

  const labels = {
    age: "Age of the patient in years.",
    gender: "Gender of the patient (1 for Male, 2 for Female).",
    airPollution: "Level of air pollution exposure (1-8).",
    alcoholUse: "Level of alcohol use (1-8).",
    dustAllergy: "Level of dust allergy (1-8).",
    occupationalHazards: "Level of occupational hazards (1-8).",
    geneticRisk: "Level of genetic risk (1-7).",
    chronicLungDisease: "Level of chronic lung disease (1-7).",
    balancedDiet: "Level of balanced diet (1-7).",
    obesity: "Level of obesity (1-7).",
    smoking: "Level of smoking (1-8).",
    passiveSmoker: "Level of passive smoker (1-8).",
    chestPain: "Level of chest pain (1-9).",
    coughingOfBlood: "Level of coughing of blood (1-9).",
    fatigue: "Level of fatigue (1-9).",
    weightLoss: "Level of weight loss (1-8).",
    shortnessOfBreath: "Level of shortness of breath (1-9).",
    wheezing: "Level of wheezing (1-8).",
    swallowingDifficulty: "Level of swallowing difficulty (1-8).",
    clubbingOfFingerNails: "Level of clubbing of finger nails (1-9).",
    frequentCold: "Frequency of cold (1-7).",
    dryCough: "Level of dry cough (1-7).",
    snoring: "Level of snoring (1-7).",
  };

  const [inputData, setInputData] = useState(initialInputData);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const isEmpty = (obj) => {
    for (var key in obj) {
      if (obj[key] === "") return true;
    }
    return false;
  };

  const isAString = (obj) => {
    for (var key in obj) {
      if (typeof obj[key] !== "string") return false;
    }
    return true;
  };

  const handlePrediction = () => {
    if (isEmpty(inputData) && isAString(inputData)) {
      alert("Please fill all the fields");
      return;
    }

    // Set loading state to true when making the request
    setLoading(true);

    // Send the input data to your server
    fetch("https://final-year-ml-server.onrender.com/lungs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    })
      .then((response) => response.text()) // Read the response as text
      .then((data) => {
        console.log(data);
        // Now, predictionResult contains the string
        setPrediction(data);

        // Set loading state to false when the response is received
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setPrediction("Error occurred during prediction.");
        // Set loading state to false in case of an error
        setLoading(false);
      });
  };

  const resultStyle =
    prediction === "The person does not have Lung Cancer"
      ? "text-green-600"
      : prediction === "The person could have lower levels of Lung Cancer"
      ? "text-yellow-600"
      : "text-red-600";

  let resultContent;
  if (prediction === "The person does not have Lung Cancer") {
    resultContent = (
      <div>
        <p>This is a sample suggestion for when there's no Lung Cancer:</p>
        <ul>
          <li>Continue to maintain a healthy lifestyle.</li>
          <li>
            Regular exercise and a balanced diet can help prevent lung diseases.
          </li>
        </ul>
      </div>
    );
  } else if (
    prediction === "The person could have lower levels of Lung Cancer"
  ) {
    resultContent = (
      <div>
        <p>
          This is a sample suggestion for when there are lower levels of Lung
          Cancer:
        </p>
        <ul>
          <li>Consult a healthcare professional for a thorough evaluation.</li>
          <li>Follow any recommended treatments or lifestyle changes.</li>
        </ul>
      </div>
    );
  } else {
    resultContent = (
      <div>
        <p>
          This is a sample suggestion for when there are higher levels of Lung
          Cancer:
        </p>
        <ul>
          <li>Seek immediate medical attention and consultation.</li>
          <li>Discuss treatment options with a healthcare specialist.</li>
        </ul>
      </div>
    );
  }

  const inputFields = Object.keys(initialInputData).map((key) => (
    <div key={key} className="mb-4">
      <label className="block text-lg mb-1">{labels[key]}:</label>
      <input
        className="border-2 border-gray-300 rounded-lg p-2 w-full text-gray-800 bg-gray-200 focus:outline-none focus:border-blue-500"
        required
        type={"text"}
        name={key}
        value={inputData[key]}
        onChange={handleInputChange}
      />
    </div>
  ));

  return (
    <div className="container mx-auto mt-10 p-5 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl text-center mb-5 text-gray-800">
        Lungs Disease Prediction
      </h1>
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 lg:ml-[9rem]"
      >
        Back to Home
      </Link>
      <div className="grid gap-4 mt-10 lg:grid-cols-2 lg:w-[80%] m-auto gap-x-[10rem]">
        {inputFields}
      </div>
      <button
        onClick={handlePrediction}
        className="lg:ml-[9rem] gradient-background text-white font-semibold py-3 px-6 rounded-lg mt-5 hover:bg-red-700 focus:outline-none transition duration-300"
      >
        Predict
      </button>
      {loading && (
        <p className="text-center mt-3">
          <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          .
        </p>
      )}
      {prediction !== null && (
        <div className={`text-2xl text-center mt-5 ${resultStyle}`}>
          {prediction}
        </div>
      )}
      {prediction !== null && (
        <div className="mt-5 text-center">{resultContent}</div>
      )}
    </div>
  );
}

export default Lungs;
