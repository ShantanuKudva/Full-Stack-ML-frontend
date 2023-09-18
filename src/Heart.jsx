import React, { useState } from "react";
import { Link } from "react-router-dom";
function Heart() {
  const initialInputData = {
    age: "",
    sex: "",
    cp: "",
    trestbps: "",
    chol: "",
    fbs: "",
    restecg: "",
    thalach: "",
    exang: "",
    oldpeak: "",
    slope: "",
    ca: "",
    thal: "",
  };

  const labels = {
    age: "Age of the patient in years.",
    sex: "Sex of the patient (0 for Male, 1 for Female).",
    cp: "Chest Pain Type (0 for typical angina, 1 for atypical angina, 2 for non-anginal pain, 3 for asymptomatic).",
    trestbps: "Resting Blood Pressure in mm Hg.",
    chol: "Serum Cholesterol in mg/dl.",
    fbs: "Fasting Blood Sugar (0 for No, 1 for Yes).",
    restecg:
      "Resting Electrocardiographic Results (0 for normal, 1 for ST-T abnormality, 2 for left ventricular hypertrophy).",
    thalach: "Maximum Heart Rate Achieved.",
    exang: "Exercise-Induced Angina (0 for No, 1 for Yes).",
    oldpeak: "ST Depression Induced by Exercise Relative to Rest.",
    slope: "Slope of the Peak Exercise ST Segment.",
    ca: "Number of Major Vessels Colored by Fluoroscopy.",
    thal: "Thalassemia Type (0 for normal, 1 for fixed defect, 2 for reversible defect).",
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
    fetch("https://python-ml-server-production.up.railway.app/heart", {
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
    prediction === "The person does not have a heart disease"
      ? "text-green-600"
      : "text-red-600";

  let resultContent;
  if (prediction === "The person does not have a heart disease") {
    resultContent = (
      <div>
        <p>This is a sample suggestion for when there's no heart disease:</p>
        <ul>
          <li>Continue to maintain a healthy lifestyle.</li>
          <li>
            Regular exercise and a balanced diet can help prevent heart
            diseases.
          </li>
        </ul>
      </div>
    );
  } else {
    resultContent = (
      <div>
        <p>This is a sample suggestion for when there is a heart disease:</p>
        <ul>
          <li>Consult a healthcare professional for a thorough evaluation.</li>
          <li>Follow any recommended treatments or lifestyle changes.</li>
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
    <div className="container p-5 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl text-center mb-5 text-gray-800 my-10">
        Heart Disease Prediction
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
        className="gradient-background text-white font-semibold py-3 px-6 rounded-lg mt-5  focus:outline-none transition duration-300 lg:ml-[9rem] "
      >
        Predict
      </button>
      {loading && (
        <div className="text-center mt-3">
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
        </div>
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

export default Heart;
