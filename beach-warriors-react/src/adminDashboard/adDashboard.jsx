// adDashboard.jsx

import React, { useState, useEffect } from 'react';
import Analytics from './analytics'; // Ensure this import path is correct
import Volunteer from './adVolunteer';
import Weather from './weather';
import Resources from './resources';
import Reports from './reports';
import Events from './events';
import Equipment from './equipment';
import Feedback from './feedback';
// Mock Data (replace with API calls or Firestore later)
const mockData = {
    dashboardStats: [
        { value: '1,247', label: 'Active Volunteers' },
        { value: '89', label: 'Beach Cleanups' },
        { value: '15.2k', label: 'Kg Waste Collected' },
        { value: '342', label: 'Impact Reports' },
    ],
    topVolunteers: [
        { avatar: 'S', name: 'Sarah Johnson', info: '15 cleanups participated', score: '98 pts' },
        { avatar: 'M', name: 'Mike Chen', info: '12 cleanups organized', score: '94 pts' },
        { avatar: 'E', name: 'Emma Davis', info: '10 cleanups participated', score: '87 pts' },
        { avatar: 'R', name: 'Raj Patel', info: '8 cleanups participated', score: '82 pts' },
        { avatar: 'A', name: 'Anita Sharma', info: '7 cleanups participated', score: '78 pts' },
    ],
    volunteers: [
        { id: 1, name: 'Sarah Johnson', role: 'Volunteer', email: 'sarah@email.com', phone: '+91 98765 43210', joinDate: '2025-06-15', eventsParticipated: 15, status: 'Active', rating: '4.9/5' },
        { id: 2, name: 'Mike Chen', role: 'Organizer', email: 'mike@email.com', phone: '+91 87654 32109', joinDate: '2025-05-20', eventsParticipated: 12, status: 'Active', rating: '4.8/5' },
        { id: 3, name: 'Emma Davis', role: 'Volunteer', email: 'emma@email.com', phone: '+91 76543 21098', joinDate: '2025-06-01', eventsParticipated: 8, status: 'Inactive', rating: '4.6/5' },
        { id: 4, name: 'Raj Patel', role: 'Volunteer', email: 'raj@email.com', phone: '+91 99887 76655', joinDate: '2025-04-10', eventsParticipated: 10, status: 'Active', rating: '4.7/5' },
        { id: 5, name: 'Priya Singh', role: 'Volunteer', email: 'priya@email.com', phone: '+91 78901 23456', joinDate: '2025-03-22', eventsParticipated: 6, status: 'Active', rating: '4.5/5' },
    ],
    weatherEvents: [
        {
            title: 'Marina Beach Cleanup',
            time: 'Tomorrow, 7:00 AM - 11:00 AM',
            status: 'continue',
            temp: '26°C',
            conditions: 'Partly Cloudy',
            wind: '8 km/h',
            humidity: '58%',
            alert: 'Excellent conditions',
            notes: 'Low tide at 8:30 AM',
            aiTips: 'Perfect weather for cleanup. Recommend sunscreen and light clothing.',
        },
        {
            title: 'Sunset Beach Cleanup',
            time: 'Today, 4:00 PM - 7:00 PM',
            status: 'postpone',
            temp: '22°C',
            conditions: 'Light Rain',
            wind: '15 km/h',
            humidity: '85%',
            alert: 'Marginal conditions',
            notes: 'Rain expected 5-7 PM',
            aiTips: 'Light rain expected. Consider rescheduling to tomorrow morning or provide rain gear.',
        },
        {
            title: 'Coastal Trail Cleanup',
            time: 'Tonight, 6:00 PM - 8:00 PM',
            status: 'cancel',
            temp: '20°C',
            conditions: 'Thunderstorm',
            wind: '25 km/h',
            humidity: '90%',
            alert: 'Unsafe conditions',
            notes: 'Lightning risk high',
            aiTips: 'Thunderstorm with lightning risk. Strongly recommend cancellation for safety.',
        },
    ],
    impactReports: [
        { id: 1, title: 'Q2 2025 Environmental Impact', date: '2025-06-30', author: 'Admin User', status: 'Completed', wasteCollected: '5,120 kg' },
        { id: 2, title: 'Half-Year Volunteer Activity Review', date: '2025-06-15', author: 'Mike Chen', status: 'Completed', wasteCollected: 'N/A' },
        { id: 3, title: 'Marina Beach Cleanup Summary', date: '2025-06-10', author: 'Sarah Johnson', status: 'Completed', wasteCollected: '350 kg' },
        { id: 4, title: 'Q3 2025 Planning Document', date: '2025-07-01', author: 'Admin User', status: 'Upcoming', wasteCollected: 'N/A' },
    ],
    events: [
        { id: 1, name: 'Ocean Cleanup Drive', date: '2025-07-20', time: '9:00 AM - 1:00 PM', location: 'Coastal Park', attendees: 85, status: 'Upcoming' },
        { id: 2, name: 'Mangrove Planting Initiative', date: '2025-07-05', time: '10:00 AM - 12:00 PM', location: 'Estuary Reserve', attendees: 40, status: 'Live' },
        { id: 3, name: 'River Bank Restoration', date: '2025-06-25', time: '8:00 AM - 12:00 PM', location: 'Riverfront Green', attendees: 110, status: 'Completed' },
    ],
    equipment: [
        { id: 1, name: 'Gloves (Pairs)', quantity: 500, available: 450, condition: 'Good', last_check: '2025-06-28' },
        { id: 2, name: 'Waste Bags (Rolls)', quantity: 200, available: 180, condition: 'Good', last_check: '2025-06-28' },
        { id: 3, name: 'Grabbers', quantity: 100, available: 85, condition: 'Good', last_check: '2025-06-28' },
        { id: 4, name: 'First Aid Kits', quantity: 10, available: 8, condition: 'Fair', last_check: '2025-06-20' },
        { id: 5, name: 'Safety Vests', quantity: 150, available: 140, condition: 'Good', last_check: '2025-06-28' },
    ],
    feedback: [
        { id: 1, type: 'Event Feedback', source: 'Volunteer Survey', rating: 5, comment: 'Great organization for the last cleanup!', date: '2025-06-29' },
        { id: 2, type: 'Website Suggestion', source: 'Contact Form', rating: 4, comment: 'Add more details about upcoming projects on the website.', date: '2025-06-28' },
        { id: 3, type: 'Volunteer Experience', source: 'Direct Email', rating: 5, comment: 'Enjoyed participating, looking forward to the next one!', date: '2025-06-27' },
        { id: 4, type: 'General Inquiry', source: 'Contact Form', rating: 3, comment: 'A bit slow response time for inquiries.', date: '2025-06-26' },
    ]
};

// Reusable Components

const StatCard = ({ value, label }) => (
    <div className="stat-card">
        <h3>{value}</h3>
        <p>{label}</p>
    </div>
);

const VolunteerItem = ({ avatar, name, info, score }) => (
    <div className="volunteer-item">
        <div className="volunteer-avatar">{avatar}</div>
        <div className="volunteer-info">
            <div style={{ fontWeight: 600 }}>{name}</div>
            <div style={{ color: '#718096', fontSize: '0.9rem' }}>{info}</div>
        </div>
        <div className="volunteer-score">{score}</div>
    </div>
);

const WeatherEventCard = ({ event }) => (
    <div className="weather-event-card">
        <div className="event-header">
            <div>
                <h4>{event.title}</h4>
                <p style={{ color: '#718096' }}>{event.time}</p>
            </div>
            <div className={`event-status status-${event.status}`}>
                {event.status === 'continue' && 'Continue'}
                {event.status === 'postpone' && 'Consider Postponing'}
                {event.status === 'cancel' && 'Cancel'}
            </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                <p>
                    {event.conditions.includes('Rain') ? '🌧️' : event.conditions.includes('Thunderstorm') ? '⛈️' : '🌤️'}
                    <strong> {event.temp}</strong> - {event.conditions}
                </p>
                <p>Wind: {event.wind} | Humidity: {event.humidity}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
                <p style={{ color: event.alert.includes('Excellent') ? '#38a169' : event.alert.includes('Marginal') ? '#e69900' : '#e53e3e', fontWeight: 600 }}>
                    {event.alert.includes('Excellent') && '✓'}
                    {event.alert.includes('Marginal') && '⚠️'}
                    {event.alert.includes('Unsafe') && '❌'}
                    {event.alert}
                </p>
                <p style={{ fontSize: '0.9rem' }}>{event.notes}</p>
            </div>
        </div>
        <div style={{ marginTop: '1rem', padding: '1rem', background: event.status === 'continue' ? '#f0f9ff' : event.status === 'postpone' ? '#fffbeb' : '#fef2f2', borderRadius: '8px' }}>
            <strong>AI Tips:</strong> {event.aiTips}
        </div>
    </div>
);

const Button = ({ children, onClick, className = '', type = 'button', small = false }) => (
    <button type={type} onClick={onClick} className={`btn ${small ? 'small-btn' : ''} ${className}`}>
        {children}
    </button>
);

const Tag = ({ type, children }) => (
    <span className={`tag tag-${type}`}>
        {children}
    </span>
);

const FormGroup = ({ label, children }) => (
    <div className="form-group">
        <label>{label}</label>
        {children}
    </div>
);


const DataTable = ({ headers, data, renderRow }) => {
    return (
        <table className="data-table">
            <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={item.id || index}>
                        {renderRow(item)}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};


// Main App Component
const adDashboard = ({ navigateToHome }) => { // Added navigateToHome prop
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [pageTitle, setPageTitle] = useState('Dashboard');
    const [showNotifications, setShowNotifications] = useState(false);


    // State for Volunteers page filters
    const [volunteerRoleFilter, setVolunteerRoleFilter] = useState('all');
    const [volunteerSearchQuery, setVolunteerSearchQuery] = useState('');

    // State for Resources form
    const [resourceForm, setResourceForm] = useState({
        title: '',
        type: 'guide',
        url: '',
        description: '',
    });

    // State for Reports filters
    const [reportStatusFilter, setReportStatusFilter] = useState('all');

    // State for Events filters
    const [eventStatusFilter, setEventStatusFilter] = useState('all');

    // State for Equipment filters
    const [equipmentFilter, setEquipmentFilter] = useState('all');
    const [equipmentSearchQuery, setEquipmentSearchQuery] = useState('');

    // State for Feedback filters
    const [feedbackTypeFilter, setFeedbackTypeFilter] = useState('all');
    const [feedbackRatingFilter, setFeedbackRatingFilter] = useState('all');
    const [feedbackSearchQuery, setFeedbackSearchQuery] = useState('');


    // Toggle sidebar on mobile
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Toggle notifications panel
    const toggleNotifications = () => {
        setNotificationsOpen(!notificationsOpen);
    };

    // Handle navigation clicks
    const showSection = (sectionId, title) => {
        setCurrentPage(sectionId);
        setPageTitle(title);
        // Close sidebar on mobile after navigating
        if (window.innerWidth <= 768) {
            setSidebarOpen(false);
        }
    };

    // Handle logout
    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (!confirmLogout) return;

        console.log('User confirmed logout. Navigating to home page.');
        
        // Clear any user session data here if needed
        // localStorage.removeItem('userToken'); // Example
        
        // Call the navigateToHome prop if it exists
        if (navigateToHome && typeof navigateToHome === 'function') {
            navigateToHome();
        } else {
            // Alternative: Use window.location to navigate to home
            console.warn('navigateToHome prop not provided, redirecting via window.location');
            window.location.href = '/'; // This will navigate to the root of your application
            // Or you could use: window.location.reload(); to refresh the page
        }
        
        setSidebarOpen(false); // Ensure sidebar is closed after logout
        setNotificationsOpen(false); // Ensure notifications are closed
    };

    // --- Volunteers Page Logic ---
    const filterVolunteers = mockData.volunteers.filter(volunteer => {
        const roleMatches = volunteerRoleFilter === 'all' || volunteer.role.toLowerCase() === volunteerRoleFilter;
        const searchMatches = volunteer.name.toLowerCase().includes(volunteerSearchQuery.toLowerCase()) ||
                              volunteer.email.toLowerCase().includes(volunteerSearchQuery.toLowerCase());
        return roleMatches && searchMatches;
    });

    // --- Resources Page Logic ---
    const handleResourceFormChange = (e) => {
        const { id, value } = e.target;
        setResourceForm(prev => ({ ...prev, [id]: value }));
    };

    const handleResourceSubmit = (e) => {
        e.preventDefault();
        console.log('New Resource Added:', resourceForm);
        // In a real app, send this data to your backend/Firestore
        // Using alert for demo, replace with custom modal
        // alert('Resource added (check console for data)!');
        setResourceForm({ title: '', type: 'guide', url: '', description: '' }); // Clear form
    };

    // --- Reports Page Logic ---
    const filterReports = mockData.impactReports.filter(report =>
        reportStatusFilter === 'all' || report.status.toLowerCase() === reportStatusFilter
    );

    // --- Events Page Logic ---
    const filterEvents = mockData.events.filter(event =>
        eventStatusFilter === 'all' || event.status.toLowerCase() === eventStatusFilter
    );

    // --- Equipment Page Logic ---
    const filterEquipment = mockData.equipment.filter(item => {
        const statusMatches = equipmentFilter === 'all' || (equipmentFilter === 'low_stock' && item.available < item.quantity * 0.2) || (equipmentFilter === 'good_condition' && item.condition === 'Good') || (equipmentFilter === 'fair_condition' && item.condition === 'Fair');
        const searchMatches = item.name.toLowerCase().includes(equipmentSearchQuery.toLowerCase());
        return statusMatches && searchMatches;
    });

    // --- Feedback Page Logic ---
    const filterFeedback = mockData.feedback.filter(item => {
        const typeMatches = feedbackTypeFilter === 'all' || item.type.toLowerCase() === feedbackTypeFilter;
        const ratingMatches = feedbackRatingFilter === 'all' || item.rating.toString() === feedbackRatingFilter;
        const searchMatches = item.comment.toLowerCase().includes(feedbackSearchQuery.toLowerCase()) ||
                              item.source.toLowerCase().includes(feedbackSearchQuery.toLowerCase());
        return typeMatches && ratingMatches && searchMatches;
    });


    return (
        <div id="ngo-dashboard-app">
            {/* Embedded CSS */}
            <style>
                {`
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }

                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        background: #00BCD4;
                        min-height: 100vh;
                        color: #333;
                    }

                    #ngo-dashboard-app {
                        display: flex;
                        min-height: 100vh;
                    }

                    .container { /* Not directly used, App div replaces it */
                        display: flex;
                        min-height: 100vh;
                    }

                    .sidebar {
                        width: 280px;
                        background: #00BCD4; /* Keep sidebar blue */
                        position: fixed;
                        height: 100vh;
                        overflow-y: auto;  /* Prevent vertical scrolling */
                        overflow-x: hidden; /* Prevent horizontal scrolling */
                        transition: all 0.3s ease;
                        display: flex;
                        flex-direction: column;
                    }

                    .sidebar-header {
                        padding: 2rem 1.5rem;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.2); /* White border for contrast */
                        color: white;
                        text-align: center;
                    }

                    .sidebar-header h2 {
                        font-size: 1.5rem;
                        font-weight: 700;
                        margin-bottom: 0.5rem;
                        color: white; /* Ensure title is white */
                    }

                    .sidebar-header p {
                        opacity: 0.9;
                        font-size: 0.9rem;
                        color: white; /* Ensure subtitle is white */
                    }

                    .nav-menu {
                        padding: 1rem 0;
                        flex: 1;
                        background: white; /* Changed to white */
                    }

                    .nav-item {
                        display: block;
                        padding: 1rem 1.5rem;
                        color: #4a5568; /* Changed to dark grey for visibility on white background */
                        text-decoration: none;
                        transition: all 0.3s ease;
                        border-left: 4px solid transparent;
                        font-weight: 500;
                        position: relative;
                        overflow: hidden;
                    }

                    .nav-item:hover {
                        background: rgba(0, 180, 219, 0.1); /* Lighter cyan on hover */
                        color: #2d3748; /* Darker grey on hover */
                        border-left-color: #00b4db; /* Cyan border on hover */
                        transform: translateX(5px);
                    }

                    .nav-item.active {
                        background: rgba(0, 180, 219, 0.2); /* More opaque cyan for active */
                        color: #1a202c; /* Even darker grey for active */
                        border-left-color: #00b4db; /* Cyan border for active */
                        font-weight: 600;
                    }

                    .profile-section {
                        padding: 1.5rem;
                        border-top: 1px solid rgba(0, 0, 0, 0.1); /* Changed to black border for contrast with white background */
                        margin-top: auto;
                        background: white; /* Changed to white */
                        color: #1a202c; /* Profile section text changed to dark grey */
                    }

                    .profile-info {
                        display: flex;
                        align-items: center;
                        gap: 1rem;
                    }

                    .profile-avatar {
                        width: 45px;
                        height: 45px;
                        border-radius: 50%;
                        background: linear-gradient(135deg, #00b4db, #0083b0); /* Kept blue background for avatar */
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white; /* Kept white text for avatar */
                        font-weight: bold;
                        font-size: 1.1rem;
                    }

                    .main-content {
                        flex: 1;
                        margin-left: 280px;
                        padding: 2rem;
                        transition: all 0.3s ease;
                        background: cyan-500
                    }

                    .top-bar {
                        background: rgba(255, 255, 255, 0.95);
                        backdrop-filter: blur(20px);
                        padding: 1.5rem 2rem;
                        border-radius: 20px;
                        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                        margin-bottom: 2rem;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }

                    .page-title {
                        font-size: 2rem;
                        font-weight: 700;
                        color: #1a202c;
                    }

                    .notification-bell {
                        position: relative;
                        background: none;
                        border: none;
                        font-size: 1.5rem;
                        cursor: pointer;
                        padding: 0.5rem;
                        border-radius: 50%;
                        transition: all 0.3s ease;
                    }

                    .notification-bell:hover {
                        background: rgba(0, 180, 219, 0.1);
                    }

                    .notification-badge {
                        position: absolute;
                        top: 0;
                        right: 0;
                        background: #e53e3e;
                        color: white;
                        border-radius: 50%;
                        width: 18px;
                        height: 18px;
                        font-size: 0.7rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .content-area {
                        background: rgba(255, 255, 255, 0.95);
                        backdrop-filter: blur(20px);
                        border-radius: 20px;
                        padding: 2rem;
                        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                        min-height: 600px;
                    }

                    .content-section {
                        display: none;
                    }

                    .content-section.active {
                        display: block;
                        animation: fadeIn 0.5s ease-in;
                    }

                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }

                    .stats-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                        gap: 1.5rem;
                        margin-bottom: 2rem;
                    }

                    .stat-card {
                        background: linear-gradient(135deg, #00b4db 0%, #0083b0 100%);
                        color: white;
                        padding: 2rem;
                        border-radius: 15px;
                        text-align: center;
                        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                        transition: transform 0.3s ease;
                    }

                    .stat-card:hover {
                        transform: translateY(-5px);
                    }

                    .stat-card h3 {
                        font-size: 2.5rem;
                        font-weight: 700;
                        margin-bottom: 0.5rem;
                    }

                    .top-volunteers {
                        background: #f7fafc;
                        padding: 2rem;
                        border-radius: 15px;
                        margin-top: 2rem;
                    }

                    .volunteer-item {
                        display: flex;
                        align-items: center;
                        padding: 1rem 0;
                        border-bottom: 1px solid #e2e8f0;
                    }

                    .volunteer-item:last-child {
                        border-bottom: none;
                    }

                    .volunteer-avatar {
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        background: linear-gradient(135deg, #00b4db, #0083b0);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-weight: bold;
                        margin-right: 1rem;
                    }

                    .volunteer-info {
                        flex: 1;
                    }

                    .volunteer-score {
                        background: #00b4db;
                        color: white;
                        padding: 0.25rem 0.75rem;
                        border-radius: 15px;
                        font-size: 0.8rem;
                        font-weight: 600;
                    }

                    .form-group {
                        margin-bottom: 1.5rem;
                    }

                    .form-group label {
                        display: block;
                        margin-bottom: 0.5rem;
                        font-weight: 600;
                        color: #4a5568;
                    }

                    .form-group input,
                    .form-group textarea,
                    .form-group select {
                        width: 100%;
                        padding: 0.75rem;
                        border: 2px solid #e2e8f0;
                        border-radius: 10px;
                        font-size: 1rem;
                        transition: border-color 0.3s ease;
                    }

                    .form-group input:focus,
                    .form-group textarea:focus,
                    .form-group select:focus {
                        outline: none;
                        border-color: #00b4db;
                    }

                    .btn {
                        background: linear-gradient(135deg, #00b4db 0%, #0083b0 100%);
                        color: white;
                        padding: 0.75rem 2rem;
                        border: none;
                        border-radius: 10px;
                        font-size: 1rem;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    }

                    .btn:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 8px 25px rgba(0, 180, 219, 0.3);
                    }

                    .btn-secondary {
                        background: #718096;
                        margin-left: 1rem;
                    }

                    .data-table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 1rem;
                    }

                    .data-table th,
                    .data-table td {
                        padding: 1rem;
                        text-align: left;
                        border-bottom: 1px solid #e2e8f0;
                    }

                    .data-table th {
                        background: #f7fafc;
                        font-weight: 600;
                        color: #4a5568;
                    }

                    .filter-controls {
                        display: flex;
                        gap: 1rem;
                        margin-bottom: 2rem;
                        align-items: center;
                        flex-wrap: wrap; /* Allow wrapping on smaller screens */
                    }

                    .filter-controls > * {
                        flex-shrink: 0;
                    }

                    .filter-controls input {
                        flex-grow: 1; /* Allow search input to grow */
                    }

                    .weather-event-card {
                        background: white;
                        padding: 1.5rem;
                        border-radius: 15px;
                        margin-bottom: 1rem;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                        border-left: 4px solid #00b4db;
                    }

                    .event-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 1rem;
                    }

                    .event-status {
                        padding: 0.25rem 0.75rem;
                        border-radius: 15px;
                        font-size: 0.8rem;
                        font-weight: 600;
                    }

                    .status-continue {
                        background: #c6f6d5;
                        color: #22543d;
                    }

                    .status-postpone {
                        background: #fef5e7;
                        color: #9c4221;
                    }

                    .status-cancel {
                        background: #fed7d7;
                        color: #742a2a;
                    }

                    .chart-container {
                        background: white;
                        padding: 2rem;
                        border-radius: 15px;
                        margin-bottom: 2rem;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    }

                    .mobile-menu-btn {
                        display: none;
                        position: fixed;
                        top: 1rem;
                        left: 1rem;
                        background: rgba(255, 255, 255, 0.95);
                        border: none;
                        border-radius: 10px;
                        padding: 0.75rem;
                        cursor: pointer;
                        z-index: 1000;
                    }

                    .tag {
                        display: inline-block;
                        padding: 0.25rem 0.75rem;
                        border-radius: 15px;
                        font-size: 0.8rem;
                        font-weight: 600;
                        margin-right: 0.5rem;
                    }

                    .tag-completed {
                        background: #c6f6d5;
                        color: #22543d;
                    }

                    .tag-upcoming {
                        background: #bee3f8;
                        color: #2a4365;
                    }

                    .tag-live {
                        background: #fed7d7;
                        color: #742a2a;
                    }

                    @media (max-width: 768px) {
                        .mobile-menu-btn {
                            display: block;
                        }

                        .sidebar {
                            transform: translateX(-100%);
                        }

                        .sidebar.open {
                            transform: translateX(0);
                        }

                        .main-content {
                            margin-left: 0;
                            padding: 1rem;
                            padding-top: 5rem;
                        }

                        .top-bar {
                            flex-direction: column;
                            gap: 1rem;
                            text-align: center;
                        }

                        .stats-grid {
                            grid-template-columns: 1fr;
                        }

                        .filter-controls {
                            flex-direction: column;
                            align-items: stretch;
                        }
                    }

                    .notification-panel {
                        position: fixed;
                        top: 5rem;
                        right: 2rem;
                        width: 350px;
                        background: white;
                        border-radius: 15px;
                        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
                        padding: 1.5rem;
                        z-index: 1000;
                        /* display: block;  Managed by React state */
                    }

                    .notification-item {
                        padding: 1rem 0;
                        border-bottom: 1px solid #e2e8f0;
                    }

                    .notification-item:last-child {
                        border-bottom: none;
                    }

                    .logout-button { /* New style for logout button */
                        width: calc(100% - 3rem); /* Full width minus padding */
                        margin: 1rem 1.5rem 1.5rem 1.5rem; /* Top, right, bottom, left */
                        background: white; /* Changed to white */
                        color: #00b4db; /* Changed text color to cyan */
                        border: 1px solid #00b4db; /* Added cyan border */
                        padding: 0.75rem 1.5rem;
                        border-radius: 10px;
                        font-size: 1rem;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        text-align: center;
                    }

                    .logout-button:hover {
                        background: #e0f7fa; /* Lighter cyan on hover */
                        transform: translateY(-2px);
                        box-shadow: 0 8px 25px rgba(0, 180, 219, 0.3);
                    }
                `}
            </style>

            <button className="mobile-menu-btn" onClick={toggleSidebar}>☰</button>

            <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`} id="sidebar">
                <div className="sidebar-header">
                    {/* Logo and Title from homepage */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}>
                        {/* Changed SVG stroke to white and removed text-sky-400 class */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="white" style={{ height: '2rem', width: '2rem', marginRight: '0.5rem' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, color: 'white' }}>Beach Warriors</h2>
                    </div>
                    <p style={{ color: 'white' }}>Admin Dashboard</p>
                </div>
                <nav className="nav-menu">
                    <a href="#" className={`nav-item ${currentPage === 'dashboard' ? 'active' : ''}`} onClick={() => showSection('dashboard', 'Dashboard')}>Dashboard</a>
                    {/* Analytics Navigation Item */}
                    <a href="#" className={`nav-item ${currentPage === 'analytics' ? 'active' : ''}`} onClick={() => showSection('analytics', 'Analytics')}>Analytics</a>
                    <a href="#" className={`nav-item ${currentPage === 'volunteers' ? 'active' : ''}`} onClick={() => showSection('volunteers', 'Volunteers & Organizers')}>All Volunteers & Organizers</a>
                    <a href="#" className={`nav-item ${currentPage === 'weather' ? 'active' : ''}`} onClick={() => showSection('weather', 'Smart Weather Forecast')}>Smart Weather Forecast</a>
                    <a href="#" className={`nav-item ${currentPage === 'resources' ? 'active' : ''}`} onClick={() => showSection('resources', 'Learning Resources')}>Learning Resources</a>
                    <a href="#" className={`nav-item ${currentPage === 'reports' ? 'active' : ''}`} onClick={() => showSection('reports', 'Impact Reports')}>All Impact Reports</a>
                    <a href="#" className={`nav-item ${currentPage === 'events' ? 'active' : ''}`} onClick={() => showSection('events', 'Events')}>Events</a>
                    <a href="#" className={`nav-item ${currentPage === 'equipment' ? 'active' : ''}`} onClick={() => showSection('equipment', 'Equipment Dashboard')}>Equipment Dashboard</a>
                    <a href="#" className={`nav-item ${currentPage === 'feedback' ? 'active' : ''}`} onClick={() => showSection('feedback', 'Feedback Management')}>Feedback Management</a>
                </nav>
                <div className="profile-section">
                    <div className="profile-info">
                        <div className="profile-avatar">A</div>
                        <div>
                            <div style={{ fontWeight: 600, color: '#1a202c' }}>Admin1</div>
                            <div style={{ color: '#718096', fontSize: '0.9rem' }}>Admin</div>
                        </div>
                    </div>
                    {/* Logout Button added below the profile section */}
                    <button className="logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
                
            </aside>

            <main className="main-content">
                <div className="top-bar">
                    <h1 className="page-title" id="page-title">{pageTitle}</h1>
                    <button className="notification-bell" onClick={toggleNotifications}>
                        🔔
                        <span className="notification-badge">5</span>
                    </button>
                </div>

                {notificationsOpen && (
  <div className="notification-panel relative" id="notification-panel">
    <button
      onClick={() => setNotificationsOpen(false)}
      className="absolute top-2 right-2 text-cyan-700 hover:text-red-600 text-xl font-bold focus:outline-none"
      aria-label="Close notifications"
    >
      &times;
    </button>

    <h3 className="mb-4 font-semibold text-lg text-cyan-800">Recent Activities</h3>

    <div className="notification-item">
      <strong>New volunteer registration:</strong> Sarah Johnson
      <div className="text-sm text-gray-500">2 hours ago</div>
    </div>
    <div className="notification-item">
      <strong>Beach cleanup completed:</strong> Marina Beach
      <div className="text-sm text-gray-500">5 hours ago</div>
    </div>
    <div className="notification-item">
      <strong>Impact report submitted:</strong> Q2 2025
      <div className="text-sm text-gray-500">1 day ago</div>
    </div>
    <div className="notification-item">
      <strong>Equipment maintenance:</strong> Scheduled
      <div className="text-sm text-gray-500">2 days ago</div>
    </div>
    <div className="notification-item">
      <strong>New feedback received:</strong> 4.8/5 rating
      <div className="text-sm text-gray-500">3 days ago</div>
    </div>
  </div>
)}


                <div className="content-area">
                    {/* Dashboard Section */}
                    <div id="dashboard" className={`content-section ${currentPage === 'dashboard' ? 'active' : ''}`}>
                        <div className="stats-grid">
                            <div className="stat-card">
                                <h3>1,247</h3>
                                <p>Active Volunteers</p>
                            </div>
                            <div className="stat-card">
                                <h3>89</h3>
                                <p>Beach Cleanups</p>
                            </div>
                            <div className="stat-card">
                                <h3>15.2k</h3>
                                <p>Kg Waste Collected</p>
                            </div>
                            <div className="stat-card">
                                <h3>342</h3>
                                <p>Impact Reports</p>
                            </div>
                        </div>
                        <div className="top-volunteers">
                            <h3 style={{ marginBottom: '1rem' }}>Top Volunteers This Month</h3>
                            <div className="volunteer-item">
                                <div className="volunteer-avatar">S</div>
                                <div className="volunteer-info">
                                    <div style={{ fontWeight: 600 }}>Sarah Johnson</div>
                                    <div style={{ color: '#718096', fontSize: '0.9rem' }}>15 cleanups participated</div>
                                </div>
                                <div className="volunteer-score">98 pts</div>
                            </div>
                            <div className="volunteer-item">
                                <div className="volunteer-avatar">M</div>
                                <div className="volunteer-info">
                                    <div style={{ fontWeight: 600 }}>Mike Chen</div>
                                    <div style={{ color: '#718096', fontSize: '0.9rem' }}>12 cleanups organized</div>
                                </div>
                                <div className="volunteer-score">94 pts</div>
                            </div>
                            <div className="volunteer-item">
                                <div className="volunteer-avatar">E</div>
                                <div className="volunteer-info">
                                    <div style={{ fontWeight: 600 }}>Emma Davis</div>
                                    <div style={{ color: '#718096', fontSize: '0.9rem' }}>10 cleanups participated</div>
                                </div>
                                <div className="volunteer-score">87 pts</div>
                            </div>
                            <div className="volunteer-item">
                                <div className="volunteer-avatar">R</div>
                                <div className="volunteer-info">
                                    <div style={{ fontWeight: 600 }}>Raj Patel</div>
                                    <div style={{ color: '#718096', fontSize: '0.9rem' }}>8 cleanups participated</div>
                                </div>
                                <div className="volunteer-score">82 pts</div>
                            </div>
                            <div className="volunteer-item">
                                <div className="volunteer-avatar">A</div>
                                <div className="volunteer-info">
                                    <div style={{ fontWeight: 600 }}>Anita Sharma</div>
                                    <div style={{ color: '#718096', fontSize: '0.9rem' }}>7 cleanups participated</div>
                                </div>
                                <div className="volunteer-score">78 pts</div>
                            </div>
                        </div>
                    </div>

                    {/* Analytics Section */}
                    <div id="analytics" className={`content-section ${currentPage === 'analytics' ? 'active' : ''}`}>
                        <Analytics />
                    </div>

                    {/* Volunteers Section */}
                    <div id="volunteers" className={`content-section ${currentPage === 'volunteers' ? 'active' : ''}`}>
                        <Volunteer />
                    </div>

                    {/* Weather Section */}
                    <div id="weather" className={`content-section ${currentPage === 'weather' ? 'active' : ''}`}>
                        <Weather />
                    </div>

                    {/* Resources Section */}
                    <div id="resources" className={`content-section ${currentPage === 'resources' ? 'active' : ''}`}>
                        <Resources />
                    </div>

                    {/* Impact Reports Section */}
                    <div id="reports" className={`content-section ${currentPage === 'reports' ? 'active' : ''}`}>
                        <Reports />
                    </div>

                    {/* Events Section */}
                    <div id="events" className={`content-section ${currentPage === 'events' ? 'active' : ''}`}>
                        <Events />
                    </div>

                    {/* Equipment Dashboard Section */}
                    <div id="equipment" className={`content-section ${currentPage === 'equipment' ? 'active' : ''}`}>
                        <Equipment />
                    </div>
                    

                    {/* Feedback Management Section */}
                    <div id="feedback" className={`content-section ${currentPage === 'feedback' ? 'active' : ''}`}>
                        <Feedback />
                    </div>
                </div>    
            </main>
        </div>
    );
};

export default adDashboard;
