import React, { useEffect, useState } from 'react'; // Added useState as it was used in original snippets for mobileMenuOpen, though not directly used in this version of HomePage

const HomePage = ({ navigateTo, sectionToScrollTo }) => {
    // This state might not be strictly needed for HomePage itself,
    // but preserving it if it's used elsewhere or was intended for future features.
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [progressBarWidth, setProgressBarWidth] = useState(45); // Retaining existing state

    // useEffect to scroll to a specific section when sectionToScrollTo prop changes
    useEffect(() => {
        if (sectionToScrollTo) {
            // Introduce a small delay to ensure the DOM has rendered the target section
            const timer = setTimeout(() => {
                const element = document.getElementById(sectionToScrollTo);
                if (element) {
                    // Scroll into view with smooth behavior
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100); // 100ms delay should be sufficient, adjust if needed
            
            // Cleanup the timer if the component unmounts or sectionToScrollTo changes again
            return () => clearTimeout(timer);
        }
    }, [sectionToScrollTo]); // Dependency array: run this effect when sectionToScrollTo changes

    return (
        <>
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap');
                
                body {
                    font-family: 'Quicksand', sans-serif;
                    scroll-behavior: smooth;
                    background-color: #f0f9ff;
                }
                
                h1, h2, h3, h4, h5 {
                    font-family: 'Poppins', sans-serif;
                }
                
                .hero-section {
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='100%25' gradientTransform='rotate(240)'%3E%3Cstop offset='0' stop-color='%230ea5e9'/%3E%3Cstop offset='1' stop-color='%2306b6d4'/%3E%3C/linearGradient%3E%3Cpattern patternUnits='userSpaceOnUse' id='b' width='540' height='450' x='0' y='0' viewBox='0 0 1080 900'%3E%3Cg fill-opacity='0.1'%3E%3Cpolygon fill='%23444' points='90 150 0 300 180 300'/%3E%3Cpolygon points='90 150 180 0 0 0'/%3E%3Cpolygon fill='%23AAA' points='270 150 360 0 180 0'/%3E%3Cpolygon fill='%23DDD' points='450 150 360 300 540 300'/%3E%3Cpolygon fill='%23999' points='450 150 540 0 360 0'/%3E%3Cpolygon points='630 150 540 300 720 300'/%3E%3Cpolygon fill='%23DDD' points='630 150 720 0 540 0'/%3E%3Cpolygon fill='%23444' points='810 150 720 300 900 300'/%3E%3Cpolygon fill='%23FFF' points='810 150 900 0 720 0'/%3E%3Cpolygon fill='%23DDD' points='990 150 900 300 1080 300'/%3E%3Cpolygon fill='%23444' points='990 150 1080 0 900 0'/%3E%3Cpolygon fill='%23DDD' points='90 450 0 600 180 600'/%3E%3Cpolygon points='90 450 180 300 0 300'/%3E%3Cpolygon fill='%23666' points='270 450 180 600 360 600'/%3E%3Cpolygon fill='%23AAA' points='270 450 360 300 180 300'/%3E%3Cpolygon fill='%23DDD' points='450 450 360 600 540 600'/%3E%3Cpolygon fill='%23999' points='450 450 540 300 360 300'/%3E%3Cpolygon fill='%23999' points='630 450 540 600 720 600'/%3E%3Cpolygon fill='%23FFF' points='630 450 720 300 540 300'/%3E%3Cpolygon points='810 450 720 600 900 600'/%3E%3Cpolygon fill='%23DDD' points='810 450 900 300 720 300'/%3E%3Cpolygon fill='%23AAA' points='990 450 900 600 1080 600'/%3E%3Cpolygon fill='%23444' points='990 450 1080 300 900 300'/%3E%3Cpolygon fill='%23222' points='90 750 0 900 180 900'/%3E%3Cpolygon points='270 750 180 900 360 900'/%3E%3Cpolygon fill='%23DDD' points='270 750 360 600 180 600'/%3E%3Cpolygon points='450 750 540 600 360 600'/%3E%3Cpolygon points='630 750 540 900 720 900'/%3E%3Cpolygon fill='%23444' points='630 750 720 600 540 600'/%3E%3Cpolygon fill='%23AAA' points='810 750 720 900 900 900'/%3E%3Cpolygon fill='%23666' points='810 750 900 600 720 600'/%3E%3Cpolygon fill='%23999' points='990 750 900 900 1080 900'/%3E%3Cpolygon fill='%23999' points='180 0 90 150 270 150'/%3E%3Cpolygon fill='%23444' points='360 0 270 150 450 150'/%3E%3Cpolygon fill='%23FFF' points='540 0 450 150 630 150'/%3E%3Cpolygon points='900 0 810 150 990 150'/%3E%3Cpolygon fill='%23222' points='0 300 -90 450 90 450'/%3E%3Cpolygon fill='%23FFF' points='0 300 90 150 -90 150'/%3E%3Cpolygon fill='%23FFF' points='180 300 90 450 270 450'/%3E%3Cpolygon fill='%23666' points='180 300 270 150 90 150'/%3E%3Cpolygon fill='%23222' points='360 300 270 450 450 450'/%3E%3Cpolygon fill='%23FFF' points='360 300 450 150 270 150'/%3E%3Cpolygon fill='%23444' points='540 300 450 450 630 450'/%3E%3Cpolygon fill='%23222' points='540 300 630 150 450 150'/%3E%3Cpolygon fill='%23AAA' points='720 300 630 450 810 450'/%3E%3Cpolygon fill='%23666' points='720 300 810 150 630 150'/%3E%3Cpolygon fill='%23FFF' points='900 300 810 450 990 450'/%3E%3Cpolygon fill='%23999' points='900 300 990 150 810 150'/%3E%3Cpolygon points='0 600 -90 750 90 750'/%3E%3Cpolygon fill='%23666' points='0 600 90 450 -90 450'/%3E%3Cpolygon fill='%23AAA' points='180 600 90 750 270 750'/%3E%3Cpolygon fill='%23444' points='180 600 270 450 90 450'/%3E%3Cpolygon fill='%23444' points='360 600 270 750 450 750'/%3E%3Cpolygon fill='%23999' points='360 600 450 450 270 450'/%3E%3Cpolygon fill='%23666' points='540 600 630 450 450 450'/%3E%3Cpolygon fill='%23222' points='720 600 630 750 810 750'/%3E%3Cpolygon fill='%23FFF' points='900 600 810 750 990 750'/%3E%3Cpolygon fill='%23222' points='900 600 990 450 810 450'/%3E%3Cpolygon fill='%23DDD' points='0 900 90 750 -90 750'/%3E%3Cpolygon fill='%23444' points='180 900 270 750 90 750'/%3E%3Cpolygon fill='%23FFF' points='360 900 450 750 270 750'/%3E%3Cpolygon fill='%23AAA' points='540 900 630 750 450 750'/%3E%3Cpolygon fill='%23FFF' points='720 900 810 750 630 750'/%3E%3Cpolygon fill='%23222' points='900 900 990 750 810 750'/%3E%3Cpolygon fill='%23222' points='1080 300 990 450 1170 450'/%3E%3Cpolygon fill='%23FFF' points='1080 300 1170 150 990 150'/%3E%3Cpolygon points='1080 600 990 750 1170 750'/%3E%3Cpolygon fill='%23666' points='1080 600 1170 450 990 450'/%3E%3Cpolygon fill='%23DDD' points='1080 900 1170 750 990 750'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect x='0' y='0' fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect x='0' y='0' fill='url(%23b)' width='100%25' height='100%25'/%3E%3C/svg%3E");
                    background-size: cover;
                }
                
                .wave-divider {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    overflow: hidden;
                    line-height: 0;
                    transform: rotate(180deg);
                }

                .wave-divider svg {
                    position: relative;
                    display: block;
                    width: calc(100% + 1.3px);
                    height: 78px;
                }

                .wave-divider .shape-fill {
                    fill: #F0F9FF;
                }
                
                .article-card {
                    transition: all 0.3s ease;
                }
                
                .article-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                }
                
                .badge {
                    position: relative;
                    overflow: hidden;
                }
                
                .badge::after {
                    content: '';
                    position: absolute;
                    top: -50%;
                    right: -50%;
                    bottom: -50%;
                    left: -50%;
                    background: linear-gradient(to bottom right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.4) 100%);
                    transform: rotate(30deg) translate(-100%, 0);
                    animation: shine 3s infinite;
                }
                
                @keyframes shine {
                    0% {
                        transform: rotate(30deg) translate(-100%, 0);
                    }
                    20% {
                        transform: rotate(30deg) translate(100%, 0);
                    }
                    100% {
                        transform: rotate(30deg) translate(100%, 0);
                    }
                }
                
                .progress-container {
                    position: relative;
                    height: 20px;
                    background-color: #e2e8f0;
                    border-radius: 10px;
                    overflow: hidden;
                }
                
                .progress-bar {
                    position: absolute;
                    height: 100%;
                    background: linear-gradient(90deg, #0ea5e9, #06b6d4);
                    border-radius: 10px;
                    transition: width 1s ease;
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
                `}
            </style>
            
            {/* Hero Section */}
            <section id="home" className="relative hero-section min-h-screen flex items-center justify-center text-white">
                <div className="absolute inset-0 overflow-hidden">
                    {/* Beach SVG Background */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full opacity-20" viewBox="0 0 1440 810" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{ stopColor: '#0ea5e9', stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
                            </linearGradient>
                        </defs>
                        {/* Sky */}
                        <rect width="1440" height="400" fill="#87CEEB" />
                        
                        {/* Sun */}
                        <circle cx="1100" cy="150" r="80" fill="#FFD700" />
                        
                        {/* Ocean */}
                        <path d="M0,400 L1440,400 L1440,600 C1200,550 960,650 720,600 C480,550 240,650 0,600 L0,400 Z" fill="#0ea5e9" />
                        
                        {/* Beach */}
                        <path d="M0,600 C240,650 480,550 720,600 C960,650 1200,550 1440,600 L1440,810 L0,810 L0,600 Z" fill="#F0E68C" />
                        
                        {/* Palm Tree */}
                        <rect x="200" y="500" width="20" height="100" fill="#8B4513" />
                        <path d="M210,500 C250,480 270,450 260,420 C290,440 320,430 330,410 C340,440 370,450 400,440 C380,470 390,500 410,520 C370,510 350,520 340,540 C320,520 290,520 270,540 C260,520 230,510 210,500 Z" fill="#228B22" />
                    </svg>
                    
                    {/* Animated Bubbles */}
                    <div className="bubble" style={{ width: '30px', height: '30px', top: '20%', left: '10%', animationDelay: '0s' }}></div>
                    <div className="bubble" style={{ width: '20px', height: '20px', top: '30%', left: '20%', animationDelay: '1s' }}></div>
                    <div className="bubble" style={{ width: '25px', height: '25px', top: '50%', left: '80%', animationDelay: '2s' }}></div>
                    <div className="bubble" style={{ width: '15px', height: '15px', top: '70%', left: '70%', animationDelay: '3s' }}></div>
                    <div className="bubble" style={{ width: '35px', height: '35px', top: '40%', left: '90%', animationDelay: '4s' }}></div>
                </div>
                
                <div className="container mx-auto px-4 z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">Save Our Oceans</h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-md">Join our mission to clean beaches and protect marine life. Every piece of trash collected is a step toward healthier oceans.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button onClick={() => navigateTo('signup')} className="bg-white text-sky-600 hover:bg-sky-100 font-bold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105">Join The Movement</button>
                        {/* Corrected href to use navigateTo for scrolling to section */}
                        <button onClick={() => navigateTo('home', 'about-section')} className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-sky-600 font-bold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105">Learn More</button>
                    </div>
                    
                    <div className="mt-12">
                        <div className="flex justify-center items-center gap-2 mb-2">
                            <span className="text-lg font-bold">Ocean Health Progress</span>
                            <div className="badge bg-yellow-400 text-yellow-800 text-xs px-2 py-1 rounded-full">Level 3</div>
                        </div>
                        <div className="progress-container max-w-md mx-auto">
                            <div className="progress-bar" style={{ width: `${progressBarWidth}%` }}></div>
                        </div>
                        <p className="text-sm mt-2">45% of our goal reached! Help us get to 100%</p>
                    </div>
                </div>
                
                <div className="wave-divider">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                    </svg>
                </div>
            </section>

            {/* About Section - CORRECTED ID */}
            <section id="about-section" className="py-20 bg-gradient-to-b from-sky-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-sky-800 mb-4">About Beach Warriors</h2>
                        <div className="w-20 h-1 bg-sky-500 mx-auto mb-6"></div>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">We're on a mission to clean beaches and protect marine ecosystems through community action and education.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {/* Join Cleanups */}
                        <div className="bg-white rounded-xl shadow-lg p-6 transform transition hover:-translate-y-2">
                            <div className="bg-sky-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-sky-800 mb-3 text-center">Join Cleanups</h3>
                            <p className="text-gray-600 text-center">Participate in our organized beach cleanup events happening monthly across coastal communities.</p>
                        </div>
                        
                        {/* Learn & Educate */}
                        <div className="bg-white rounded-xl shadow-lg p-6 transform transition hover:-translate-y-2">
                            <div className="bg-sky-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-sky-800 mb-3 text-center">Learn & Educate</h3>
                            <p className="text-gray-600 text-center">Access resources about marine conservation and share knowledge with your community.</p>
                        </div>
                        
                        {/* Track Your Impact */}
                        <div className="bg-white rounded-xl shadow-lg p-6 transform transition hover:-translate-y-2">
                            <div className="bg-sky-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-sky-800 mb-3 text-center">Track Your Impact</h3>
                            <p className="text-gray-600 text-center">Monitor how much waste you've helped remove and how many cleanups you've participated in.</p>
                        </div>
                        
                        {/* Smart Cleanup Finder */}
                        <div className="bg-white rounded-xl shadow-lg p-6 transform transition hover:-translate-y-2">
                            <div className="bg-sky-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-sky-800 mb-3 text-center">Smart Cleanup Finder</h3>
                            <p className="text-gray-600 text-center">Find nearby cleanup events using our smart location-based event finder.</p>
                        </div>
                        
                        {/* AI-Powered Tools */}
                        <div className="bg-white rounded-xl shadow-lg p-6 transform transition hover:-translate-y-2">
                            <div className="bg-sky-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-sky-800 mb-3 text-center">AI-Powered Tools</h3>
                            <p className="text-gray-600 text-center">Use AI features like image classification to categorize waste and track data efficiently.</p>
                        </div>
                    </div>
                    
                    <div className="mt-16 bg-sky-100 rounded-2xl p-8 shadow-inner">
                        <div className="flex flex-col md:flex-row items-center">
                            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                                <h3 className="text-2xl font-bold text-sky-800 mb-4">Our Impact So Far</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-center">
                                        <div className="bg-sky-500 rounded-full p-1 mr-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-700">Over <span className="font-bold text-sky-700">50 tons</span> of trash collected from beaches</span>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="bg-sky-500 rounded-full p-1 mr-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-700"><span className="font-bold text-sky-700">10,000+</span> active volunteers globally</span>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="bg-sky-500 rounded-full p-1 mr-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-700"><span className="font-bold text-sky-700">120+</span> cleanup events held monthly</span>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="bg-sky-500 rounded-full p-1 mr-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-700"><span className="font-bold text-sky-700">35</span> countries with active programs</span>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="bg-sky-500 rounded-full p-1 mr-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-700"><span className="font-bold text-sky-700">200+</span> educational workshops conducted</span>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="bg-sky-500 rounded-full p-1 mr-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-700"><span className="font-bold text-sky-700">30</span> coastal communities supported</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="md:w-1/2">
                                <div className="relative">
                                    {/* Beach cleanup illustration */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" className="w-full h-auto">
                                        <rect width="400" height="150" y="150" fill="#F0E68C" />
                                        <path d="M0,150 Q100,120 200,150 T400,150 V300 H0 Z" fill="#F0E68C" />
                                        <path d="M0,160 C100,130 250,190 400,160 V0 H0 Z" fill="#87CEEB" />
                                        <path d="M0,160 C100,130 250,190 400,160 V0 H0 Z" fill="#0ea5e9" opacity="0.7" />

                                        {/* Person */}
                                        <circle cx="100" cy="140" r="15" fill="#8B4513" />
                                        <rect x="95" y="155" width="10" height="30" fill="#06b6d4" />
                                        <rect x="80" y="160" width="15" height="5" fill="#06b6d4" transform="rotate(-15 95 162.5)" />
                                        <rect x="105" y="160" width="15" height="5" fill="#06b6d4" transform="rotate(15 112.5 162.5)" />
                                        <rect x="95" y="185" width="5" height="15" fill="#8B4513" />
                                        <rect x="100" y="185" width="5" height="15" fill="#8B4513" />

                                        {/* Trash bags */}
                                        <rect x="130" y="200" width="30" height="40" fill="#4B5563" rx="5" />
                                        <rect x="170" y="205" width="25" height="35" fill="#4B5563" rx="5" />

                                        {/* Waste items on beach - These should also have unique, descriptive IDs if they are ever targets */}
                                        <circle cx="220" cy="230" r="4" fill="#6B7280" className="waste-item" />
                                        <rect x="250" y="225" width="10" height="2" fill="#6B7280" className="waste-item" />
                                        <path d="M280,235 L285,230 L290,235 Z" fill="#DC2626" className="waste-item" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Articles Section - CORRECTED ID */}
            <section id="articles-section" className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-sky-800 mb-4">Latest Articles & News</h2>
                        <div className="w-20 h-1 bg-sky-500 mx-auto mb-6"></div>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">Stay informed about marine conservation efforts, success stories, and ways you can help.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Article 1 */}
                        <div className="article-card bg-white rounded-xl shadow-lg overflow-hidden">
                            <img src="https://placehold.co/600x400/E0F7FA/004D40?text=Coral+Reefs" alt="Coral Reef Restoration" className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-sky-800 mb-3">Reviving Coral Reefs: A Global Effort</h3>
                                <p className="text-gray-600 text-sm mb-4">Learn about the innovative techniques being used worldwide to restore dying coral reefs and boost marine biodiversity.</p>
                                <a href="#" className="text-sky-600 hover:text-sky-800 font-medium flex items-center">
                                    Read More
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Article 2 */}
                        <div className="article-card bg-white rounded-xl shadow-lg overflow-hidden">
                            <img src="https://placehold.co/600x400/E0F7FA/004D40?text=Plastic+Pollution" alt="Plastic Pollution Solutions" className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-sky-800 mb-3">Tackling Plastic Pollution: Everyday Solutions</h3>
                                <p className="text-gray-600 text-sm mb-4">Discover practical tips and sustainable alternatives to reduce your plastic footprint and contribute to cleaner oceans.</p>
                                <a href="#" className="text-sky-600 hover:text-sky-800 font-medium flex items-center">
                                    Read More
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Article 3 */}
                        <div className="article-card bg-white rounded-xl shadow-lg overflow-hidden">
                            <img src="https://placehold.co/600x400/E0F7FA/004D40?text=Marine+Life" alt="Marine Life Protection" className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-sky-800 mb-3">Protecting Marine Life: Species Spotlight</h3>
                                <p className="text-gray-600 text-sm mb-4">An in-depth look at endangered marine species and the critical conservation efforts aimed at their survival.</p>
                                <a href="#" className="text-sky-600 hover:text-sky-800 font-medium flex items-center">
                                    Read More
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <a href="#" className="bg-sky-600 text-white hover:bg-sky-700 font-bold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105">View All Articles</a>
                    </div>
                </div>
            </section>

            {/* CTA Section - Join The Movement */}
            <section id="join" className="relative py-20 bg-gradient-to-r from-sky-500 to-teal-500 text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="bubble" style={{ width: '80px', height: '80px', top: '10%', left: '5%', animationDelay: '0s' }}></div>
                    <div className="bubble" style={{ width: '60px', height: '60px', top: '70%', left: '15%', animationDelay: '2s' }}></div>
                    <div className="bubble" style={{ width: '100px', height: '100px', top: '30%', left: '80%', animationDelay: '4s' }}></div>
                    <div className="bubble" style={{ width: '70px', height: '70px', top: '85%', left: '90%', animationDelay: '1s' }}></div>
                </div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">Ready to Make a Difference?</h2>
                    <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto drop-shadow-md">Join the Beach Warriors community today and become part of the solution for healthier oceans.</p>
                    <button onClick={() => navigateTo('signup')} className="bg-white text-sky-600 hover:bg-sky-100 font-bold py-4 px-10 rounded-full shadow-xl transition transform hover:scale-105 text-lg">Sign Up Now</button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-gray-200 py-12">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Info */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                            <span className="text-2xl font-bold">Beach Warriors</span>
                        </div>
                        <p className="text-gray-400 text-sm">Dedicated to cleaning our oceans, one beach at a time. Join us in protecting marine life and preserving our planet's most vital resource.</p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-sky-300 mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><button onClick={() => navigateTo('home')} className="hover:text-white transition text-sm">Home</button></li>
                            {/* Corrected onClick to use navigateTo for scrolling to section */}
                            <li><button onClick={() => navigateTo('home', 'about-section')} className="hover:text-white transition text-sm">About Us</button></li>
                            {/* Corrected onClick to use navigateTo for scrolling to section */}
                            <li><button onClick={() => navigateTo('home', 'articles-section')} className="hover:text-white transition text-sm">Articles</button></li>
                            <li><a href="#" className="hover:text-white transition text-sm">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white transition text-sm">Terms of Service</a></li>
                        </ul>
                    </div>

                    {/* Connect With Us */}
                    <div>
                        <h3 className="text-lg font-semibold text-sky-300 mb-4">Connect With Us</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-white transition text-sm flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M22.28,12.04C22.28,6.48,17.52,2,12,2S1.72,6.48,1.72,12.04c0,4.76,3.28,8.76,7.76,9.88l-0.52-2.36c-0.24-1.08,0.08-2.24,0.76-3.04l-0.12-0.08c-0.6-0.6-0.88-1.44-0.8-2.28l0.04-0.4c0.08-0.84-0.16-1.68-0.72-2.36l-0.08-0.08c-0.56-0.68-0.72-1.52-0.48-2.36l0.04-0.4c0.08-0.84,0.36-1.68,0.88-2.36l0.08-0.08c0.52-0.68,0.64-1.52,0.36-2.36l-0.08-0.4c-0.24-0.84,0.08-1.72,0.88-2.36l0.08-0.08c0.8-0.64,1.8-0.8,2.72-0.44l0.4-0.16c1.12-0.44,2.28-0.4,3.4-0.04l0.4,0.16c0.92-0.36,1.92-0.2,2.72,0.44l0.08,0.08c0.8,0.64,1.12,1.52,0.88,2.36l-0.08,0.4c-0.28,0.84-0.16,1.68,0.36,2.36l0.08,0.08c0.56,0.68,0.8,1.52,0.72,2.36l-0.04,0.4c-0.08,0.84,0.16,1.68,0.8,2.28l0.12,0.08c0.68,0.8,1,1.96,0.76,3.04l0.52,2.36C18.72,20.8,22.28,16.8,22.28,12.04zM12,4.4c-3.12,0-5.68,2.56-5.68,5.68c0,1.88,0.92,3.56,2.36,4.68l-0.16,0.16c-0.2,0.2-0.32,0.44-0.32,0.72l0.08,0.4c0.16,0.84-0.04,1.68-0.64,2.24l-0.08-0.08c-0.6,0.56-0.88,1.36-0.72,2.16l-0.04,0.2c-0.08,0.4-0.04,0.8,0.08,1.2l0.08,0.4c0.12,0.4,0.32,0.76,0.52,1.08l0.16,0.16c0.24,0.28,0.48,0.52,0.72,0.68l0.24,0.12c0.24,0.12,0.48,0.2,0.72,0.2l0.4,0.04c0.24,0,0.48,0,0.72-0.04l0.4-0.08c0.44-0.08,0.84-0.24,1.2-0.44l0.16-0.16c0.2-0.2,0.36-0.4,0.52-0.64l0.08-0.08c0.16-0.2,0.28-0.44,0.36-0.68l0.08-0.2c0.04-0.12,0.04-0.24,0.04-0.36l0-0.2c0-0.24,0.04-0.44,0.12-0.64l0.16-0.16c0.2-0.2,0.32-0.44,0.32-0.72l-0.08-0.4c-0.16-0.84,0.04-1.68,0.64-2.24l0.08-0.08c0.6-0.56,0.88-1.36,0.72-2.16l0.04-0.2c0.08-0.4,0.04-0.8-0.08-1.2l-0.08-0.4c-0.12-0.4-0.32-0.76-0.52-1.08l-0.16-0.16c-0.24-0.28-0.48-0.52-0.72-0.68l-0.24-0.12c-0.24-0.12-0.48-0.2-0.72-0.2l-0.4-0.04c-0.24,0-0.48,0-0.72,0.04z" /></svg>Facebook</a></li>
                            <li><a href="#" className="hover:text-white transition text-sm flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M22.28,12.04C22.28,6.48,17.52,2,12,2S1.72,6.48,1.72,12.04c0,4.76,3.28,8.76,7.76,9.88l-0.52-2.36c-0.24-1.08,0.08-2.24,0.76-3.04l-0.12-0.08c-0.6-0.6-0.88-1.44-0.8-2.28l0.04-0.4c0.08-0.84-0.16-1.68-0.72-2.36l-0.08-0.08c-0.56-0.68-0.72-1.52-0.48-2.36l0.04-0.4c0.08-0.84,0.36-1.68,0.88-2.36l0.08-0.08c0.52-0.68,0.64-1.52,0.36-2.36l-0.08-0.4c-0.24-0.84,0.08-1.72,0.88-2.36l0.08-0.08c0.8-0.64,1.8-0.8,2.72-0.44l0.4-0.16c1.12-0.44,2.28-0.4,3.4-0.04l0.4,0.16c0.92-0.36,1.92-0.2,2.72,0.44l0.08,0.08c0.8,0.64,1.12,1.52,0.88,2.36l-0.08,0.4c-0.28,0.84-0.16,1.68,0.36,2.36l0.08,0.08c0.56,0.68,0.8,1.52,0.72,2.36l-0.04,0.4c-0.08,0.84,0.16,1.68,0.8,2.28l0.12,0.08c0.68,0.8,1,1.96,0.76,3.04l0.52,2.36C18.72,20.8,22.28,16.8,22.28,12.04zM12,4.4c-3.12,0-5.68,2.56-5.68,5.68c0,1.88,0.92,3.56,2.36,4.68l-0.16,0.16c-0.2,0.2-0.32,0.44-0.32,0.72l0.08,0.4c0.16,0.84-0.04,1.68-0.64,2.24l-0.08-0.08c-0.6,0.56-0.88,1.36-0.72,2.16l-0.04,0.2c-0.08,0.4-0.04,0.8,0.08,1.2l0.08,0.4c0.12,0.4,0.32,0.76,0.52,1.08l0.16,0.16c0.24,0.28,0.48,0.52,0.72,0.68l0.24,0.12c0.24,0.12,0.48,0.2,0.72,0.2l0.4,0.04c0.24,0,0.48,0,0.72-0.04l0.4-0.08c0.44-0.08,0.84-0.24,1.2-0.44l0.16-0.16c0.2-0.2,0.36-0.4,0.52-0.64l0.08-0.08c0.16-0.2,0.28-0.44,0.36-0.68l0.08-0.2c0.04-0.12,0.04-0.24,0.04-0.36l0-0.2c0-0.24,0.04-0.44,0.12-0.64l0.16-0.16c0.2-0.2,0.32-0.44,0.32-0.72l-0.08-0.4c-0.16-0.84,0.04-1.68,0.64-2.24l0.08-0.08c0.6-0.56,0.88-1.36,0.72-2.16l0.04-0.2c0.08-0.4,0.04-0.8-0.08-1.2l-0.08-0.4c-0.12-0.4-0.32-0.76-0.52-1.08l-0.16-0.16c-0.24-0.28-0.48-0.52-0.72-0.68l-0.24-0.12c-0.24-0.12-0.48-0.2-0.72-0.2l-0.4-0.04c-0.24,0-0.48,0-0.72,0.04z" /></svg>YouTube</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-sky-300">Contact Us</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.135a11.249 11.249 0 005.422 5.422l1.135-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>+1 (123) 456-7890</span>
                            </li>
                            <li className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>info@beachwarriors.org</span>
                            </li>
                            <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-sky-400 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-gray-200">123 Ocean Avenue<br />Coastal City, CA 90210</span>
                            </li>
                        </ul>
                        <div className="mt-6">
                            <h4 className="text-sm font-semibold mb-2 text-sky-300">Subscribe to our newsletter</h4>
                            <div className="flex">
                                <input type="email" placeholder="Your email" className="px-3 py-2 rounded-l-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-500 w-full" />
                                <button className="bg-sky-600 hover:bg-sky-700 px-4 py-2 rounded-r-md font-medium transition">Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-sky-400 to-sky-600 h-2 mt-12"></div>
                <div className="text-center text-gray-400 text-sm mt-8">
                    &copy; {new Date().getFullYear()} Beach Warriors. All rights reserved.
                </div>
            </footer>
        </>
    );
};

export default HomePage;
