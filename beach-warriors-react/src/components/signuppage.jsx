import React, { useState, useEffect } from "react";
import * as faceapi from "face-api.js";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // adjust the path if needed

const SignUpPage = ({ navigateTo }) => {
  // State for managing the current step in the multi-step form
  const [currentStep, setCurrentStep] = useState(0);
  // State for accumulating ocean points
  const [totalPoints, setTotalPoints] = useState(0);
  // States for form input values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  // State for mobile menu visibility - Controlled directly by onClick
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // State to show the final success message after form completion
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [stream, setStream] = useState(null);

  // Configuration for each step of the signup form
  const stepsContent = [
    {
      id: "step-1",
      label: "Your Name",
      type: "text",
      value: name,
      setter: setName,
      placeholder: " ",
      required: true,
    },
    {
      id: "step-2",
      label: "Email Address",
      type: "email",
      value: email,
      setter: setEmail,
      placeholder: " ",
      required: true,
    },
    {
      id: "step-3",
      label: "Create Password",
      type: "password",
      value: password,
      setter: setPassword,
      placeholder: " ",
      required: true,
      hint: "Must be at least 8 characters with 1 number",
    },
    {
      id: "step-4",
      label: "Your City",
      type: "text",
      value: location,
      setter: setLocation,
      placeholder: " ",
      required: true,
    },
    { id: "step-5", label: "Scan Your Face to Complete", type: "facescan" }, // Special type for face scan step
  ];

  useEffect(() => {
    faceapi.nets.tinyFaceDetector.load("/models");
  }, []);

  // Points awarded for completing each step (representing waste items removed)
  const pointsValues = [10, 15, 20, 25, 30];
  // Content for the fact popups that appear after each step
  const factPopupsContent = [
    {
      id: "fact-plastic-bottle",
      title: "Plastic Bottle Warrior 🌊",
      description:
        "You just saved marine life from a plastic bottle that would take 450+ years to decompose! +10 Ocean Points",
    },
    {
      id: "fact-plastic-bag",
      title: "Turtle Savior 🐢",
      description:
        "You just saved a sea turtle from mistaking a plastic bag for food! +15 Ocean Points",
    },
    {
      id: "fact-cigarette-butt",
      title: "Toxin Terminator 🚭",
      description:
        "You removed a cigarette butt that could contaminate up to 50 liters of water! +20 Ocean Points",
    },
    {
      id: "fact-soda-can",
      title: "Recycling Champion ♻️",
      description:
        "You saved enough energy to power a TV for 3 hours by recycling this can! +25 Ocean Points",
    },
    {
      id: "fact-fishing-net",
      title: "Marine Liberator 🐬",
      description:
        "You removed a ghost net that could have entangled countless marine animals! +30 Ocean Points",
    },
  ];

  // Dynamically updates the text on the "Next" button
  const updateButtonText = () => {
    switch (currentStep) {
      case 0:
        return "Clean the Beach";
      case 1:
        return "Continue Cleaning";
      case 2:
        return "Almost There";
      case 3:
        return "Final Step";
      default:
        return ""; // Should not happen if logic is correct
    }
  };

  // Creates a confetti animation effect
  const createConfetti = () => {
    const confettiContainer = document.getElementById("confetti-container");
    if (!confettiContainer) return; // Ensure container exists before trying to add confetti

    const colors = ["#0ea5e9", "#06b6d4", "#0284c7", "#0369a1", "#38bdf8"]; // Blue shades for ocean theme

    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = Math.random() * 100 + "vw"; // Random horizontal position
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)]; // Random color from palette
      confetti.style.width = Math.random() * 10 + 5 + "px"; // Random size
      confetti.style.height = Math.random() * 10 + 5 + "px";
      confetti.style.opacity = "1";
      // Apply animation with random duration and delay
      confetti.style.animation = `confetti-fall ${
        Math.random() * 3 + 2
      }s linear forwards`;
      confetti.style.animationDelay = Math.random() * 2 + "s";

      confettiContainer.appendChild(confetti);

      // Remove confetti elements after their animation completes to prevent DOM clutter
      setTimeout(() => {
        confetti.remove();
      }, 5000);
    }
  };

  // Displays a fact popup and updates points
  const showFact = (index) => {
    // Get the specific fact popup element
    const fact = document.getElementById(factPopupsContent[index].id);
    // Get the corresponding waste item element
    const wasteItem = document.getElementById(
      factPopupsContent[index].id.replace("fact-", "")
    );

    if (fact) {
      fact.classList.add("show"); // Make the fact popup visible
      // Position it centrally (adjusting for transform later)
      fact.style.left = "50%";
      fact.style.top = "40%";
      fact.style.transform = "translate(-50%, -50%) scale(0.9)"; // Slightly scale down on initial show
    }

    if (wasteItem) {
      wasteItem.classList.add("removed"); // Trigger the removal animation for the waste item
    }

    // Update total points
    setTotalPoints((prevPoints) => prevPoints + pointsValues[index]);
    createConfetti(); // Trigger confetti effect

    // Hide the fact popup after a delay
    setTimeout(() => {
      if (fact) fact.classList.remove("show");
    }, 3000);
  };

  // Handler for the "Next" button click
  const handleNext = () => {
    // Find the input element for the current step to validate it
    const currentInput = document.getElementById(
      stepsContent[currentStep].id.replace("step-", "")
    ); // Corrected ID usage
    // If an input exists and is not valid, report validity and stop
    if (currentInput && !currentInput.checkValidity()) {
      currentInput.reportValidity();
      return;
    }

    // If not the last step, proceed to the next
    if (currentStep < stepsContent.length - 1) {
      showFact(currentStep); // Show the fact for the completed step
      setCurrentStep((prevStep) => prevStep + 1); // Move to the next step
    }
  };

  // Handler for the "Back" button click
  const handlePrev = () => {
    // Only go back if not on the first step
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  // Handler for the "Submit" button click (final step)
  const handleSubmit = async (e) => {
  e.preventDefault(); // Prevent default form submission behavior

  // Firebase: create user
  try {
    await createUserWithEmailAndPassword(auth, email, password);

    // Optional: You can save other user data to Firestore here if needed

    showFact(stepsContent.length - 1); // Show last fact
    createConfetti();
    createConfetti();

    setTimeout(() => {
      setShowSuccessMessage(true);
    }, 2000);
  } catch (error) {
    console.error('Error creating user:', error.message);
    alert('Signup failed: ' + error.message);
  }
};


  // useEffect hook for side effects (like animations based on step changes)
  // This part correctly uses currentStep from state, so it's fine.
  React.useEffect(() => {
    if (
      currentStep === stepsContent.length - 1 &&
      stepsContent[currentStep].type === "facescan"
    ) {
      const cameraScan = document.querySelector(".camera-scan");
      if (cameraScan) {
        cameraScan.style.animation = "scan 2s linear infinite";
      }
    }
  }, [currentStep, stepsContent]); // Added stepsContent to dependency array

  useEffect(() => {
    const startCamera = async () => {
      const video = document.getElementById("video");
      if (!video) return;

      try {
        const localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        video.srcObject = localStream;
        setStream(localStream);
        await video.play();
      } catch (err) {
        console.error("Error accessing webcam", err);
      }
    };

    if (stepsContent[currentStep].type === "facescan" && !capturedImage) {
      startCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [currentStep, capturedImage]);

  const handleCapture = () => {
    const video = document.getElementById("video");
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageUrl = canvas.toDataURL("image/png");
    setCapturedImage(imageUrl);

    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const handleRetry = () => {
    setCapturedImage(null);
  };

  // Calculate progress bar width based on current step and success state
  const progressBarWidth =
    ((currentStep + (showSuccessMessage ? 1 : 0)) / stepsContent.length) * 100;

  return (
    <>
      {/* Embedded styles for this component to perfectly match the HTML file */}
      <style>
        {`
                @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap');
                
                body {
                    font-family: 'Quicksand', sans-serif;
                    background-color: #f0f9ff;
                    min-height: 100vh;
                }
                
                h1, h2, h3, h4, h5 {
                    font-family: 'Poppins', sans-serif;
                }
                
                .beach-bg {
                    background-image: linear-gradient(to bottom, #87CEEB 0%, #87CEEB 60%, #F0E68C 60%, #F0E68C 100%);
                }
                
                .waste-item {
                    position: absolute;
                    transition: all 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55);
                    z-index: 5;
                }
                
                .waste-item.removed {
                    transform: translateY(-100px) rotate(20deg);
                    opacity: 0;
                }
                
                .fact-popup {
                    position: fixed;
                    background-color: white;
                    border-radius: 12px;
                    padding: 16px;
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
                    opacity: 0;
                    transform: translateY(20px) scale(0.9);
                    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
                    z-index: 50;
                    pointer-events: none;
                    max-width: 300px;
                    border: 2px solid #0ea5e9;
                }
                
                .fact-popup.show {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
                
                .achievement-icon {
                    background: linear-gradient(135deg, #0ea5e9, #06b6d4);
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 12px;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                }
                
                .progress-bar {
                    transition: width 0.5s ease;
                }
                
                .bubble {
                    position: absolute;
                    background-color: rgba(255, 255, 255, 0.4);
                    border-radius: 50%;
                    animation: float 8s infinite ease-in-out;
                }
                
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }
                
                .wave {
                    position: absolute;
                    top: 58%; /* Adjusted to match the visual of the original HTML */
                    left: 0;
                    width: 100%;
                    overflow: hidden;
                    line-height: 0;
                    transform: rotate(180deg);
                }

                .wave svg {
                    position: relative;
                    display: block;
                    width: calc(100% + 1.3px);
                    height: 46px; /* Specific height from original HTML */
                }

                .wave .shape-fill {
                    fill: #87CEEB; /* Specific color from original HTML */
                }
                
                .form-input:focus + label {
                    color: #0ea5e9;
                }
                
                .confetti {
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    background-color: #0ea5e9;
                    opacity: 0;
                }
                
                @keyframes confetti-fall {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh) rotate(720deg);
                        opacity: 0;
                    }
                }
                
                .camera-container {
  position: relative;
  width: 100%;
  aspect-ratio: 4/3; /* or height: 100% */
  background-color: #000;
  border-radius: 8px;
  overflow: hidden;
}

                
                .camera-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 160px;  /* or whatever size you like */
  height: 160px;
  border: 4px dashed #0ea5e9;
  border-radius: 50%;
}

                
                .camera-scan {
                    position: absolute;
                    width: 100%;
                    height: 5px;
                    background: linear-gradient(90deg, transparent, #0ea5e9, transparent);
                    animation: scan 2s linear infinite;
                }
                
                @keyframes scan {
                    0% {
                        top: 0;
                    }
                    50% {
                        top: 100%;
                    }
                    100% {
                        top: 0;
                    }
                }
                `}
      </style>

      <div className="min-h-screen flex flex-col">
        {/* Navigation (Replicated from original HTML, with React navigation) */}
        <nav className="bg-sky-500 text-white shadow-lg z-50">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
              <span className="text-xl font-bold">Beach Warriors</span>
            </div>
            <div className="hidden md:flex space-x-8">
              {/* Updated to navigate to 'home' and specify sections */}
              <button
                onClick={() => navigateTo("home")}
                className="hover:text-sky-100 transition"
              >
                Home
              </button>
              <button
                onClick={() => navigateTo("home", "about-section")}
                className="hover:text-sky-100 transition"
              >
                About
              </button>
              <button
                onClick={() => navigateTo("home", "articles-section")}
                className="hover:text-sky-100 transition"
              >
                Articles
              </button>
            </div>
            <div className="md:hidden">
              <button
                id="menu-toggle"
                className="focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div
            id="mobile-menu"
            className={`md:hidden ${
              mobileMenuOpen ? "" : "hidden"
            } bg-sky-600 pb-4 px-4`}
          >
            {/* Updated to navigate to 'home' and specify sections */}
            <button
              onClick={() => navigateTo("home")}
              className="block py-2 hover:text-sky-100 transition"
            >
              Home
            </button>
            <button
              onClick={() => navigateTo("home", "about-section")}
              className="block py-2 hover:text-sky-100 transition"
            >
              About
            </button>
            <button
              onClick={() => navigateTo("home", "articles-section")}
              className="block py-2 hover:text-sky-100 transition"
            >
              Articles
            </button>
          </div>
        </nav>

        {/* Signup Section */}
        <div className="flex-grow flex items-center justify-center beach-bg relative py-12 px-4">
          {/* Beach Scene with Waste */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Sun */}
            <div className="absolute top-10 right-20 w-20 h-20 bg-yellow-300 rounded-full opacity-80"></div>

            {/* Waves */}
            <div className="wave">
              <svg
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                  opacity=".25"
                  className="shape-fill"
                ></path>
                <path
                  d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                  opacity=".5"
                  className="shape-fill"
                ></path>
                <path
                  d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                  className="shape-fill"
                ></path>
              </svg>
            </div>
          </div>

          {/* Waste Items - Positioned to be visible around the form */}
          {/* These items will get 'removed' class added by showFact function */}
          <div
            id="plastic-bottle"
            className={`waste-item ${currentStep > 0 ? "removed" : ""}`}
            style={{ top: "20%", left: "5%" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="80"
              viewBox="0 0 40 80"
            >
              <path
                d="M15,5 L25,5 L25,15 C30,20 35,30 35,40 L35,70 C35,75 30,75 20,75 C10,75 5,75 5,70 L5,40 C5,30 10,20 15,15 Z"
                fill="#D1ECF1"
                stroke="#86C7DB"
                strokeWidth="1"
              />
              <path d="M15,5 L25,5 L25,15 L15,15 Z" fill="#86C7DB" />
              <path
                d="M15,0 L25,0 L25,5 L15,5 Z"
                fill="#86C7DB"
                stroke="#5BAFC6"
                strokeWidth="1"
              />
            </svg>
          </div>

          <div
            id="plastic-bag"
            className={`waste-item ${currentStep > 1 ? "removed" : ""}`}
            style={{ top: "30%", right: "5%" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="70"
              viewBox="0 0 60 70"
            >
              <path
                d="M10,10 C10,5 20,0 30,0 C40,0 50,5 50,10 L55,60 C55,65 45,70 30,70 C15,70 5,65 5,60 Z"
                fill="#FFFFFF"
                fillOpacity="0.7"
                stroke="#CCCCCC"
                strokeWidth="1"
              />
              <path
                d="M10,10 L50,10 L50,20 L10,20 Z"
                fill="#EEEEEE"
                stroke="#CCCCCC"
                strokeWidth="1"
              />
            </svg>
          </div>

          <div
            id="cigarette-butt"
            className={`waste-item ${currentStep > 2 ? "removed" : ""}`}
            style={{ bottom: "25%", left: "10%" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="10"
              viewBox="0 0 30 10"
            >
              <rect
                x="0"
                y="2"
                width="20"
                height="6"
                fill="#FFFFFF"
                stroke="#CCCCCC"
                strokeWidth="1"
              />
              <rect
                x="20"
                y="0"
                width="10"
                height="10"
                rx="2"
                fill="#D4A76A"
                stroke="#B38E68"
                strokeWidth="1"
              />
              <line
                x1="2"
                y1="5"
                x2="18"
                y2="5"
                stroke="#EEEEEE"
                strokeWidth="1"
              />
            </svg>
          </div>

          <div
            id="soda-can"
            className={`waste-item ${currentStep > 3 ? "removed" : ""}`}
            style={{ bottom: "30%", right: "10%" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="50"
              viewBox="0 0 30 50"
            >
              <path
                d="M5,5 L25,5 L28,10 L28,45 L25,50 L5,50 L2,45 L2,10 Z"
                fill="#FF6B6B"
                stroke="#E95858"
                strokeWidth="1"
              />
              <ellipse
                cx="15"
                cy="5"
                rx="10"
                ry="3"
                fill="#DDDDDD"
                stroke="#CCCCCC"
                strokeWidth="1"
              />
              <rect
                x="10"
                y="20"
                width="10"
                height="15"
                fill="#FFFFFF"
                fillOpacity="0.3"
              />
            </svg>
          </div>

          <div
            id="fishing-net"
            className={`waste-item ${currentStep > 4 ? "removed" : ""}`}
            style={{ top: "60%", left: "50%", transform: "translateX(-50%)" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="70"
              height="40"
              viewBox="0 0 70 40"
            >
              <path
                d="M5,5 Q35,20 65,5 L65,35 Q35,20 5,35 Z"
                fill="none"
                stroke="#77AADD"
                strokeWidth="2"
              />
              <path d="M5,5 L5,35" stroke="#77AADD" strokeWidth="2" />
              <path d="M65,5 L65,35" stroke="#77AADD" strokeWidth="2" />
              <path d="M20,5 Q20,20 20,35" stroke="#77AADD" strokeWidth="1" />
              <path d="M35,5 Q35,20 35,35" stroke="#77AADD" strokeWidth="1" />
              <path d="M50,5 Q50,20 50,35" stroke="#77AADD" strokeWidth="1" />
              <path d="M5,12 Q35,27 65,12" stroke="#77AADD" strokeWidth="1" />
              <path d="M5,20 Q35,35 65,20" stroke="#77AADD" strokeWidth="1" />
              <path d="M5,28 Q35,13 65,28" stroke="#77AADD" strokeWidth="1" />
            </svg>
          </div>

          {/* Fact Popups with Achievement Style */}
          {factPopupsContent.map((fact, index) => (
            <div key={fact.id} id={fact.id} className="fact-popup">
              <div className="flex items-center mb-2">
                <div className="achievement-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="text-sky-800 font-bold">
                  Achievement Unlocked!
                </div>
              </div>
              <h3 className="font-bold text-lg mb-1">{fact.title}</h3>
              <p className="text-gray-600">{fact.description}</p>
            </div>
          ))}

          {/* Signup Form Card or Success Message */}
          <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden z-10">
            {showSuccessMessage ? (
              <div className="p-8 text-center">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-green-100 rounded-full p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Mission Accepted!
                </h2>
                <p className="text-gray-600 mb-6">
                  You've earned {totalPoints} Ocean Points and are now
                  officially a Beach Warrior!
                </p>
                <div className="bg-sky-50 rounded-lg p-4 mb-6">
                  <h3 className="font-bold text-sky-800 mb-2">
                    Your First Mission:
                  </h3>
                  <p className="text-gray-700">
                    Join our upcoming beach cleanup this weekend. Check your
                    email for details!
                  </p>
                </div>
                {/* Use navigateTo prop for "Go to Dashboard" button */}
                <button
                  onClick={() => navigateTo("newvoldashboard")}
                  className="inline-block px-6 py-3 bg-sky-600 text-white font-bold rounded-lg hover:bg-sky-700 transition"
                >
                  Go to Dashboard
                </button>
              </div>
            ) : (
              <div className="p-8">
                <div className="flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-sky-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>

                <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                  Begin Your Ocean Mission
                </h2>
                <p className="text-center text-gray-600 mb-6">
                  Each field you complete helps clean our virtual beach!
                </p>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      id="progress-bar"
                      className="bg-sky-500 h-2.5 rounded-full progress-bar"
                      style={{ width: `${progressBarWidth}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500">Start</span>
                    <span className="text-xs text-gray-500">
                      Beach Warrior!
                    </span>
                  </div>
                </div>

                {/* Points Counter */}
                <div
                  id="points-counter"
                  className="mb-6 bg-sky-50 rounded-lg p-3 flex items-center justify-center"
                >
                  <div className="text-sky-700 font-bold">
                    Ocean Points: <span id="points-value">{totalPoints}</span>
                  </div>
                </div>

                {/* Signup Form */}
                <form id="signup-form" onSubmit={handleSubmit}>
                  {stepsContent.map((step, index) => (
                    <div
                      key={step.id}
                      id={step.id}
                      className={`mb-6 ${
                        currentStep === index ? "" : "hidden"
                      }`}
                    >
                      {step.type === "facescan" ? (
                        <>
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            {step.label}
                          </label>
                          <div className="camera-container relative w-full aspect-[4/3] bg-black rounded-lg overflow-hidden">
                            {!capturedImage ? (
                              <div className="relative w-full h-full">
                                <video
                                  id="video"
                                  autoPlay
                                  muted
                                  playsInline
                                  className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                                />
                                <div className="camera-overlay"></div>
                              </div>
                            ) : (
                              <img
                                src={capturedImage}
                                alt="Captured"
                                className="w-full h-full object-cover rounded-lg"
                              />
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-2 text-center">
                            Position your face in the circle for identity
                            verification
                          </p>
                        </>
                      ) : (
                        <div className="relative">
                          <input
                            type={step.type}
                            id={step.id.replace("step-", "")} // Unique ID for input (e.g., 'name', 'email')
                            className="form-input peer w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition pt-6"
                            placeholder=" "
                            required={step.required}
                            value={step.value}
                            onChange={(e) => step.setter(e.target.value)}
                          />
                          <label
                            htmlFor={step.id.replace("step-", "")}
                            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                          >
                            {step.label}
                          </label>
                          {step.hint && (
                            <p className="text-xs text-gray-500 mt-1">
                              {step.hint}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between items-center mt-4 flex-wrap gap-2">
                    {currentStep > 0 && (
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="px-4 py-2 border border-sky-500 text-sky-500 rounded-lg hover:bg-sky-50 transition"
                      >
                        Back
                      </button>
                    )}

                    {stepsContent[currentStep].type === "facescan" ? (
                      <>
                        {!capturedImage && (
                          <button
                            type="button"
                            onClick={handleCapture}
                            className="px-6 py-2 bg-sky-500 text-white font-bold rounded-lg hover:bg-sky-600 transition"
                          >
                            Capture
                          </button>
                        )}
                        {capturedImage && (
                          <>
                            <button
                              type="button"
                              onClick={handleRetry}
                              className="px-4 py-2 border border-sky-500 text-sky-500 rounded-lg hover:bg-sky-50 transition"
                            >
                              Retry
                            </button>
                            <button
                              type="submit"
                              className="px-6 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition"
                            >
                              Submit
                            </button>
                          </>
                        )}
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="px-6 py-2 bg-sky-500 text-white font-bold rounded-lg hover:bg-sky-600 transition"
                      >
                        {updateButtonText()}
                      </button>
                    )}
                  </div>
                </form>

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Already a Beach Warrior?{' '}
                        <button
                          onClick={() => navigateTo('login')}
                          className="font-semibold text-sky-600 hover:text-sky-700 focus:outline-none transition"
                        >
                          Sign in
                        </button>
                    </p>
                </div>

              </div>
            )}
            <div className="bg-gradient-to-r from-sky-400 to-sky-600 h-2"></div>
          </div>
        </div>

        {/* Confetti Container */}
        <div
          id="confetti-container"
          className="fixed inset-0 pointer-events-none overflow-hidden z-40"
        ></div>

        {/* Footer (Replicated from original HTML) */}
        <footer className="bg-sky-900 text-white py-6">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
              <span className="text-lg font-bold">Beach Warriors</span>
            </div>
            <p className="text-sky-200 text-sm">
              Join our mission to clean beaches and protect marine ecosystems
            </p>
            <div className="flex justify-center space-x-4 mt-4">
              <a href="#" className="text-white hover:text-sky-300 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-sky-300 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-sky-300 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
            <p className="text-xs text-sky-300 mt-4">
              &copy; 2023 Beach Warriors. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default SignUpPage;
