import React, { useState, useEffect } from 'react'; // Keep useEffect for App's mobile menu
import HomePage from './components/homepage.jsx';
import LoginPage from './components/signinpage.jsx';
import SignUpPage from './components/signuppage.jsx';
import OrgDashboard from './organiserDashboard/orgDashboard.jsx'; // Import the OrgDashboard component
import Events from './organiserDashboard/Events.jsx'; // Import the Events component
import ChatbotWidget from './components/ChatbotWidget.jsx';
import VolDashboard from './volunteerDashboard/volDashboard.jsx'; // adjust the path based on your folder structure
import AvatarRewards from './volunteerDashboard/avatarBadges.jsx'; 
import EducationHub from './volunteerDashboard/volEduHub.jsx'; 
import ImpactCam from './volunteerDashboard/impactCam.jsx';
import EventDashboard from './volunteerDashboard/cleanupEvents.jsx';
import WasteClassifier from './volunteerDashboard/wasteClassifier.jsx';
import AdDashboard from './adminDashboard/adDashboard.jsx'; // adjust path as needed
import NewVolDashboard from './NewVolunteerDashboard/newVolunteerDashboard.jsx'

const App = () => {
    // currentPage will track the main page ('home', 'login', 'signup', 'dashboard', 'events')
    // currentSection will track the section within 'home' to scroll to ('about-section', 'articles-section')
    const [currentPage, setCurrentPage] = useState('home');
    const [currentSection, setCurrentSection] = useState(null); // New state for section to scroll to

    // State for mobile menu visibility in the main App component
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Modified navigateTo function to handle both page and optional section navigation
    const navigateTo = (page, sectionId = null) => {
        setCurrentPage(page);
        setCurrentSection(sectionId); // Set the section ID
        setMobileMenuOpen(false); // Close mobile menu on navigation
    };

    const renderPage = () => {
         console.log("Rendering page:", currentPage); 
        switch (currentPage) {
            case 'home':
                // Pass both navigateTo and currentSection to HomePage
                return <HomePage navigateTo={navigateTo} sectionToScrollTo={currentSection} />;
            case 'login':
                return <LoginPage navigateTo={navigateTo} />;
            case 'signup':
                return <SignUpPage navigateTo={navigateTo} />;
            case 'adminDashboard':
                return <AdDashboard navigateTo={navigateTo} />;      
            case 'orgdashboard': // This case will render the OrgDashboard
                return <OrgDashboard navigateTo={navigateTo} />;
            case 'events': // This case will render the Events page
                return <Events navigateTo={navigateTo} />;
            case 'voldashboard': // This case will render the Volunteer Dashboard page
                return < VolDashboard navigateTo={navigateTo} />;
            case 'newvoldashboard':
                return < NewVolDashboard navigateTo={navigateTo} />;
            case 'avatar-badges': 
                return <AvatarRewards navigateTo={navigateTo} activeNavItem={currentPage} />
            case 'eduhub':
                return <EducationHub navigateTo={navigateTo} activeNavItem={currentPage} />
            case 'impactcam':
                return <ImpactCam navigateTo={navigateTo} activeNavItem={currentPage} />
            case 'cleanup-events':
                return <EventDashboard navigateTo={navigateTo} activeNavItem={currentPage} />
             case 'waste-classifier':
                return <WasteClassifier navigateTo={navigateTo} activeNavItem={currentPage} />
            // 'about' and 'articles' cases are no longer separate pages, they'll be sections on 'home'
            // default will also render HomePage
            default:
                return <HomePage navigateTo={navigateTo} sectionToScrollTo={currentSection} />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Conditional Navigation - START */}
            {/* The global navigation will only show if currentPage is NOT 'login', 'signup', 'dashboard', or 'events' */}
            {['home', 'about', 'articles'].includes(currentPage) && (
                <nav className="bg-sky-500 text-white shadow-lg sticky top-0 z-50">
                    <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                            <span className="text-xl font-bold">Beach Warriors</span>
                        </div>
                        <div className="hidden md:flex space-x-8">
                            <button onClick={() => navigateTo('home','home')} className="hover:text-sky-100 transition">Home</button>
                            {/* Updated to navigate to 'home' and specify 'about-section' */}
                            <button onClick={() => navigateTo('home', 'about-section')} className="hover:text-sky-100 transition">About</button>
                            {/* Updated to navigate to 'home' and specify 'articles-section' */}
                            <button onClick={() => navigateTo('home', 'articles-section')} className="hover:text-sky-100 transition">Articles</button>
                        </div>
                        <div className="hidden md:flex items-center space-x-4">
                            <button onClick={() => navigateTo('login')} className="hover:text-sky-100 transition">Login</button>
                            <button onClick={() => navigateTo('signup')} className="bg-white text-sky-600 hover:bg-sky-100 px-4 py-2 rounded-full font-medium transition">Sign Up</button>
                        </div>
                        <div className="md:hidden">
                            <button id="menu-toggle" className="focus:outline-none" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div id="mobile-menu" className={`md:hidden bg-sky-600 pb-4 px-4 ${mobileMenuOpen ? '' : 'hidden'}`}>
                        <button onClick={() => navigateTo('home')} className="block py-2 hover:text-sky-100 transition">Home</button>
                        {/* Updated to navigate to 'home' and specify 'about-section' */}
                        <button onClick={() => navigateTo('home', 'about-section')} className="block py-2 hover:text-sky-100 transition">About</button>
                        {/* Updated to navigate to 'home' and specify 'articles-section' */}
                        <button onClick={() => navigateTo('home', 'articles-section')} className="block py-2 hover:text-sky-100 transition">Articles</button>
                        <div className="border-t border-sky-500 my-2 pt-2">
                            <button onClick={() => navigateTo('login')} className="block py-2 hover:text-sky-100 transition">Login</button>
                            <button onClick={() => navigateTo('signup')} className="block py-2 hover:text-sky-100 transition font-medium">Sign Up</button>
                        </div>
                    </div>
                </nav>
            )}
            {/* Conditional Navigation - END */}

            <main className="flex-grow">
                {renderPage()}
            </main>
            <ChatbotWidget />
        </div>
    );
};

export default App;