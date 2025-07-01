import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig"; // adjust the path as needed
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ navigateTo }) => {
  // State to toggle between Volunteer and Organizer forms
  const [isVolunteer, setIsVolunteer] = useState(true);
  // States for input fields
  const [volunteerEmail, setVolunteerEmail] = useState("");
  const [volunteerPassword, setVolunteerPassword] = useState("");
  const [organizerEmail, setorganizerEmail] = useState("");
  const [organizerPassword, setOrganizerPassword] = useState("");

  // State for main heading text, initialized based on default isVolunteer state
  const [mainHeading, setMainHeading] = useState("Welcome Back");
  // State for subheading text, initialized based on default isVolunteer state
  const [subHeading, setSubHeading] = useState(
    "Sign in to continue your ocean mission"
  );

  const hardcodedOrganizer = {
    email: "abc@gmail.com",
    password: "12345678",
  };

  // Function to handle the toggle switch for Volunteer/Organizer forms
  const handleToggleChange = () => {
    setIsVolunteer((prev) => {
      const newIsVolunteer = !prev;
      if (newIsVolunteer) {
        setMainHeading("Welcome Back");
        setSubHeading("Sign in to continue your ocean mission");
      } else {
        setMainHeading("Organizer Portal");
        setSubHeading("Access your cleanup management dashboard");
      }
      // Clear form fields when switching between forms
      setVolunteerEmail("");
      setVolunteerPassword("");
      setorganizerEmail("");
      setOrganizerPassword("");
      return newIsVolunteer;
    });
  };

  // Handle login for Volunteer form
  const handleVolunteerLogin = async (e) => {
    e.preventDefault();
    console.log("Volunteer Login Attempt:", {
      volunteerEmail,
      volunteerPassword,
    });
    if (volunteerEmail === 'admin1@beachwarriors.com' && volunteerPassword === 'Beach@Admin123') {
      navigateTo('adminDashboard');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, volunteerEmail, volunteerPassword);
      console.log("Volunteer login successful!");
      navigateTo('voldashboard'); // Navigate to volunteer home page
    } catch (error) {
      console.error("Volunteer login failed:", error.message);
      alert("Login failed: " + error.message);
    }
  };

  // Handle login for Organizer form
  //     const handleOrganizerLogin = async (e) => {
  //     e.preventDefault();
  //     console.log("Organizer Login Attempt:", { organizerEmail, organizerPassword });

  //     try {
  //         await signInWithEmailAndPassword(auth, organizerEmail, organizerPassword); // Make sure `organizerEmail` is actually an email
  //         console.log("Organizer login successful!");
  //         navigateTo('dashboard'); // Navigate to organizer dashboard
  //     } catch (error) {
  //         console.error("Organizer login failed:", error.message);
  //         alert("Login failed: " + error.message);
  //     }
  // };

  const handleOrganizerLogin = (e) => {
  e.preventDefault();

  if (
    organizerEmail === hardcodedOrganizer.email &&
    organizerPassword === hardcodedOrganizer.password
  ) {
    navigateTo('orgdashboard'); // <-- This should update currentPage
  } else {
    alert("Invalid credentials");
  }
};


  return (
    <>
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
                
                .login-bg {
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='100%25' gradientTransform='rotate(240)'%3E%3Cstop offset='0' stop-color='%230ea5e9'/%3E%3Cstop offset='1' stop-color='%2306b6d4'/%3E%3C/linearGradient%3E%3Cpattern patternUnits='userSpaceOnUse' id='b' width='540' height='450' x='0' y='0' viewBox='0 0 1080 900'%3E%3Cg fill-opacity='0.1'%3E%3Cpolygon fill='%23444' points='90 150 0 300 180 300'/%3E%3Cpolygon points='90 150 180 0 0 0'/%3E%3Cpolygon fill='%23AAA' points='270 150 360 0 180 0'/%3E%3Cpolygon fill='%23DDD' points='450 150 360 300 540 300'/%3E%3Cpolygon fill='%23999' points='450 150 540 0 360 0'/%3E%3Cpolygon points='630 150 540 300 720 300'/%3E%3Cpolygon fill='%23DDD' points='630 150 720 0 540 0'/%3E%3Cpolygon fill='%23444' points='810 150 720 300 900 300'/%3E%3Cpolygon fill='%23FFF' points='810 150 900 0 720 0'/%3E%3Cpolygon fill='%23DDD' points='990 150 900 300 1080 300'/%3E%3Cpolygon fill='%23444' points='990 150 1080 0 900 0'/%3E%3Cpolygon fill='%23DDD' points='90 450 0 600 180 600'/%3E%3Cpolygon points='90 450 180 300 0 300'/%3E%3Cpolygon fill='%23666' points='270 450 180 600 360 600'/%3E%3Cpolygon fill='%23AAA' points='270 450 360 300 180 300'/%3E%3Cpolygon fill='%23DDD' points='450 450 360 600 540 600'/%3E%3Cpolygon fill='%23999' points='450 450 540 300 360 300'/%3E%3Cpolygon fill='%23999' points='630 450 540 600 720 600'/%3E%3Cpolygon fill='%23FFF' points='630 450 720 300 540 300'/%3E%3Cpolygon points='810 450 720 600 900 600'/%3E%3Cpolygon fill='%23DDD' points='810 450 900 300 720 300'/%3E%3Cpolygon fill='%23AAA' points='990 450 900 600 1080 600'/%3E%3Cpolygon fill='%23444' points='990 450 1080 300 900 300'/%3E%3Cpolygon fill='%23222' points='90 750 0 900 180 900'/%3E%3Cpolygon points='270 750 180 900 360 900'/%3E%3Cpolygon fill='%23DDD' points='270 750 360 600 180 600'/%3E%3Cpolygon points='450 750 540 600 360 600'/%3E%3Cpolygon points='630 750 540 900 720 900'/%3E%3Cpolygon fill='%23444' points='630 750 720 600 540 600'/%3E%3Cpolygon fill='%23AAA' points='810 750 720 900 900 900'/%3E%3Cpolygon fill='%23666' points='810 750 900 600 720 600'/%3E%3Cpolygon fill='%23999' points='990 750 900 900 1080 900'/%3E%3Cpolygon fill='%23999' points='180 0 90 150 270 150'/%3E%3Cpolygon fill='%23444' points='360 0 270 150 450 150'/%3E%3Cpolygon fill='%23FFF' points='540 0 450 150 630 150'/%3E%3Cpolygon points='900 0 810 150 990 150'/%3E%3Cpolygon fill='%23222' points='0 300 -90 450 90 450'/%3E%3Cpolygon fill='%23FFF' points='0 300 90 150 -90 150'/%3E%3Cpolygon fill='%23FFF' points='180 300 90 450 270 450'/%3E%3Cpolygon fill='%23666' points='180 300 270 150 90 150'/%3E%3Cpolygon fill='%23222' points='360 300 270 450 450 450'/%3E%3Cpolygon fill='%23FFF' points='360 300 450 150 270 150'/%3E%3Cpolygon fill='%23444' points='540 300 450 450 630 450'/%3E%3Cpolygon fill='%23222' points='540 300 630 150 450 150'/%3E%3Cpolygon fill='%23AAA' points='720 300 630 450 810 450'/%3E%3Cpolygon fill='%23666' points='720 300 810 150 630 150'/%3E%3Cpolygon fill='%23FFF' points='900 300 810 450 990 450'/%3E%3Cpolygon fill='%23999' points='900 300 990 150 810 150'/%3E%3Cpolygon points='0 600 -90 750 90 750'/%3E%3Cpolygon fill='%23666' points='0 600 90 450 -90 450'/%3E%3Cpolygon fill='%23AAA' points='180 600 90 750 270 750'/%3E%3Cpolygon fill='%23444' points='180 600 270 450 90 450'/%3E%3Cpolygon fill='%23444' points='360 600 270 750 450 750'/%3E%3Cpolygon fill='%23999' points='360 600 450 450 270 450'/%3E%3Cpolygon fill='%23666' points='540 600 630 450 450 450'/%3E%3Cpolygon fill='%23222' points='720 600 630 750 810 750'/%3E%3Cpolygon fill='%23FFF' points='900 600 810 750 990 750'/%3E%3Cpolygon fill='%23222' points='900 600 990 450 810 450'/%3E%3Cpolygon fill='%23DDD' points='0 900 90 750 -90 750'/%3E%3Cpolygon fill='%23444' points='180 900 270 750 90 750'/%3E%3Cpolygon fill='%23FFF' points='360 900 450 750 270 750'/%3E%3Cpolygon fill='%23AAA' points='540 900 630 750 450 750'/%3E%3Cpolygon fill='%23FFF' points='720 900 810 750 630 750'/%3E%3Cpolygon fill='%23222' points='900 900 990 750 810 750'/%3E%3Cpolygon fill='%23222' points='1080 300 990 450 1170 450'/%3E%3Cpolygon fill='%23FFF' points='1080 300 1170 150 990 150'/%3E%3Cpolygon points='1080 600 990 750 1170 750'/%3E%3Cpolygon fill='%23666' points='1080 600 1170 450 990 450'/%3E%3Cpolygon fill='%23DDD' points='1080 900 1170 750 990 750'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect x='0' y='0' fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect x='0' y='0' fill='url(%23b)' width='100%25' height='100%25'/%3E%3C/svg%3E");
                    background-size: cover;
                }
                
                .toggle-checkbox:checked {
                    right: 0;
                    border-color: #0ea5e9;
                }
                
                .toggle-checkbox:checked + .toggle-label {
                    background-color: #0ea5e9;
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
                
                .login-form-container {
                    transition: all 0.5s ease;
                }
                `}
      </style>

      <div className="min-h-screen flex flex-col">
        {/* Navigation - Unique to LoginPage, and now fully functional with navigateTo */}
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
              {/* All navigation links now correctly use navigateTo */}
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
                onClick={() =>
                  console.log(
                    "Mobile menu toggle not implemented on login page"
                  )
                }
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
          {/* Mobile menu is typically not active on login/signup pages unless explicitly designed */}
          {/* <div id="mobile-menu" className={`md:hidden bg-sky-600 pb-4 px-4 ${mobileMenuOpen ? '' : 'hidden'}`}>
                        <button onClick={() => navigateTo('home')} className="block py-2 hover:text-sky-100 transition">Home</button>
                        <button onClick={() => navigateTo('home', 'about-section')} className="block py-2 hover:text-sky-100 transition">About</button>
                        <button onClick={() => navigateTo('home', 'articles-section')} className="block py-2 hover:text-sky-100 transition">Articles</button>
                    </div> */}
        </nav>

        {/* Login Section */}
        <div className="flex-grow flex items-center justify-center login-bg relative py-12 px-4">
          <div
            className="bubble"
            style={{
              width: "30px",
              height: "30px",
              top: "20%",
              left: "10%",
              animationDelay: "0s",
            }}
          ></div>
          <div
            className="bubble"
            style={{
              width: "20px",
              height: "20px",
              top: "30%",
              left: "20%",
              animationDelay: "1s",
            }}
          ></div>
          <div
            className="bubble"
            style={{
              width: "25px",
              height: "25px",
              top: "50%",
              left: "80%",
              animationDelay: "2s",
            }}
          ></div>
          <div
            className="bubble"
            style={{
              width: "15px",
              height: "15px",
              top: "70%",
              left: "70%",
              animationDelay: "3s",
            }}
          ></div>
          <div
            className="bubble"
            style={{
              width: "35px",
              height: "35px",
              top: "40%",
              left: "90%",
              animationDelay: "4s",
            }}
          ></div>

          <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden z-10">
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
                {mainHeading}
              </h2>
              <p className="text-center text-gray-600 mb-6">{subHeading}</p>

              <div className="flex justify-center mb-8">
                <div className="relative inline-flex items-center">
                  <span
                    className={`mr-3 text-sm font-medium ${
                      isVolunteer ? "text-sky-600" : "text-gray-400"
                    }`}
                  >
                    Volunteer
                  </span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="user-toggle"
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer transition-all duration-300 ease-in-out"
                      checked={!isVolunteer}
                      onChange={handleToggleChange}
                    />
                    <label
                      htmlFor="user-toggle"
                      className={`toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer w-12 transition-all duration-300 ease-in-out ${
                        !isVolunteer ? "bg-sky-500" : ""
                      }`}
                    ></label>
                  </div>
                  <span
                    className={`ml-3 text-sm font-medium ${
                      !isVolunteer ? "text-sky-600" : "text-gray-400"
                    }`}
                  >
                    Organizer
                  </span>
                </div>
              </div>

              {isVolunteer ? (
                <div id="volunteer-form" className="login-form-container">
                  <form onSubmit={handleVolunteerLogin}>
                    {" "}
                    {/* Added onSubmit handler */}
                    <div className="mb-4">
                      <label
                        htmlFor="volunteer-email"
                        className="block text-gray-700 text-sm font-medium mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="volunteer-email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                        placeholder="your.email@example.com"
                        required
                        value={volunteerEmail}
                        onChange={(e) => setVolunteerEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="volunteer-password"
                        className="block text-gray-700 text-sm font-medium mb-2"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="volunteer-password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                        placeholder="••••••••"
                        required
                        value={volunteerPassword}
                        onChange={(e) => setVolunteerPassword(e.target.value)}
                      />
                      <div className="flex justify-end mt-2">
                        <a
                          href="#"
                          className="text-sm text-sky-600 hover:text-sky-800 transition"
                        >
                          Forgot password?
                        </a>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-4 rounded-lg shadow transition"
                    >
                      Sign In
                    </button>
                    <div className="text-center mt-6">
                      <p className="text-gray-600">
                        Don't have an account?
                        <button
                          type="button"
                          onClick={() => navigateTo("signup")}
                          className="text-sky-600 hover:text-sky-800 font-medium transition ml-1"
                        >
                          Sign up now
                        </button>
                      </p>
                    </div>
                  </form>

                  <div className="mt-8 flex items-center justify-center">
                    <div className="bg-sky-100 rounded-full p-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-sky-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="text-center mt-4">
                    <p className="text-sm text-gray-500">
                      Join our community of 10,000+ volunteers
                    </p>
                  </div>
                </div>
              ) : (
                <div id="organizer-form" className="login-form-container">
                  <form onSubmit={handleOrganizerLogin}>
                    {" "}
                    {/* Added onSubmit handler */}
                    <div className="mb-4">
                      <label
                        htmlFor="organizer-id"
                        className="block text-gray-700 text-sm font-medium mb-2"
                      >
                        Organizer Email
                      </label>
                      <input
                        type="text"
                        id="organizer-id"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                        placeholder="Enter your organizer email"
                        required
                        value={organizerEmail}
                        onChange={(e) => setorganizerEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="organizer-password"
                        className="block text-gray-700 text-sm font-medium mb-2"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="organizer-password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                        placeholder="••••••••"
                        required
                        value={organizerPassword}
                        onChange={(e) => setOrganizerPassword(e.target.value)}
                      />
                      <div className="flex justify-end mt-2">
                        <a
                          href="#"
                          className="text-sm text-sky-600 hover:text-sky-800 transition"
                        >
                          Forgot password?
                        </a>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-4 rounded-lg shadow transition"
                    >
                      Access Organizer Portal
                    </button>
                  </form>

                  <div className="mt-8 flex items-center justify-center">
                    <div className="bg-sky-100 rounded-full p-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-sky-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="text-center mt-4">
                    <p className="text-sm text-gray-500">
                      Organizer access is restricted to approved team leaders
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Need access?{" "}
                      <a
                        href="#"
                        className="text-sky-600 hover:text-sky-800 transition"
                      >
                        Contact admin
                      </a>
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gradient-to-r from-sky-400 to-sky-600 h-2"></div>
          </div>
        </div>

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

export default LoginPage;
