import React, { useState, useEffect } from 'react';

const Events = () => {
    // Event Management specific states
    const [searchTerm, setSearchTerm] = useState('');
    const [eventFilter, setEventFilter] = useState('all');
    const [beachFilter, setBeachFilter] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalEventTitle, setModalEventTitle] = useState('');
    const [activeModalTab, setActiveModalTab] = useState('volunteers'); // Default active tab in modal
    const [messageText, setMessageText] = useState(''); // For communication tab textarea

    // Dummy data for event cards
    const eventCardsData = [
        {
            id: 'juhu-upcoming',
            status: 'upcoming',
            beach: 'juhu',
            title: 'Juhu Beach Weekend Cleanup',
            datetime: 'Saturday, June 14, 2025 • 6:00 AM - 10:00 AM',
            location: 'Juhu Beach, Near ISKCON Temple',
            registered: 45,
            target: 60,
            filled: '75%',
            progressWidth: '75%',
            actions: [
                { label: 'Manage', type: 'primary', onClick: 'openManageModal' },
                { label: 'Share', type: 'secondary' },
                { label: 'Edit', type: 'secondary' },
            ]
        },
        {
            id: 'marine-live',
            status: 'live',
            beach: 'marine',
            title: 'Marine Drive Morning Drive',
            datetime: 'Today • 6:00 AM - 9:00 AM',
            location: 'Marine Drive, Near Aquarium',
            registered: 28, // Active volunteers
            kgCollected: 142,
            attendance: '87%',
            progressWidth: '87%',
            actions: [
                { label: 'Live Track', type: 'success', onClick: 'openManageModal' },
                { label: 'Message', type: 'primary' },
                { label: 'Monitor', type: 'secondary' },
            ]
        },
        {
            id: 'versova-completed',
            status: 'completed',
            beach: 'versova',
            title: 'Versova Beach Mega Drive',
            datetime: 'Last Saturday • 5:30 AM - 11:00 AM',
            location: 'Versova Beach, Full Stretch',
            volunteers: 89,
            kgWaste: 450,
            satisfaction: '95%',
            progressWidth: '100%',
            actions: [
                { label: 'View Report', type: 'primary', onClick: 'openManageModal' },
                { label: 'Share Results', type: 'secondary' },
            ]
        }
    ];

    // Modal data for Volunteer Management (dummy)
    const volunteerListData = [
        { id: 1, name: 'Arjun Mehta', email: 'arjun.mehta@email.com', phone: '+91 98765 43210', registered: 'June 10, 2025' },
        { id: 2, name: 'Priya Sharma', email: 'priya.sharma@email.com', phone: '+91 87654 32109', registered: 'June 11, 2025' },
        { id: 3, name: 'Raj Kumar', email: 'raj.kumar@email.com', phone: '+91 76543 21098', registered: 'June 12, 2025' },
    ];

    // Message Templates for Communication Tab
    const messageTemplates = {
        welcome: "Welcome to Beach Warriors! Thank you for registering for our beach cleanup drive. We're excited to have you join us in making our beaches cleaner and safer for everyone. Please arrive 15 minutes early for check-in and safety briefing.",
        reminder: "Reminder: Your beach cleanup event is tomorrow! Please bring: sunscreen, water bottle, comfortable clothes, and enthusiasm. We'll provide gloves, bags, and all cleanup equipment. See you bright and early!",
        safety: "Safety First! Please follow these guidelines: 1) Stay hydrated 2) Use provided gloves 3) Don't handle sharp objects directly 4) Report any injuries immediately 5) Work in assigned teams 6) Follow team leader instructions",
        thankyou: "Thank you for your amazing contribution to our beach cleanup drive! Together we collected [X] kg of waste and made a real difference. Your dedication to environmental protection is inspiring. We hope to see you at our next event!"
    };

    // Event Management functions
    const openManageModal = (eventTitle) => {
        setModalEventTitle(`Managing: ${eventTitle}`);
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'auto';
        setActiveModalTab('volunteers'); // Reset to default tab on close
    };

    const switchModalTab = (tabName) => {
        setActiveModalTab(tabName);
    };

    const loadMessageTemplate = (templateType) => {
        setMessageText(messageTemplates[templateType] || '');
    };

    // Filter events based on search term and dropdowns
    const filteredEvents = eventCardsData.filter(card => {
        const title = card.title.toLowerCase();
        const status = card.status;
        const beach = card.beach;

        const matchesSearch = title.includes(searchTerm.toLowerCase());
        const matchesEventFilter = eventFilter === 'all' || status === eventFilter;
        const matchesBeachFilter = beachFilter === 'all' || beach === beachFilter;

        return matchesSearch && matchesEventFilter && matchesBeachFilter;
    });


    return (
        <>
            <style>
                {`
                /* Event Management Specific Styles (from beach_warriors_system.html, adapted to Tailwind and custom CSS) */
                /* Base styles for the Event Management section */
                .event-management-container {
                    /* Removed fixed width as it conflicts with responsive design */
                    /* max-width: 1200px; /* Example max-width if needed */
                    /* margin: 0 auto; /* Center content */
                    min-height: calc(100vh - 120px); /* Adjust based on header/footer height */
                }

                .controls {
                    display: flex;
                    gap: 20px;
                    margin-bottom: 30px;
                    flex-wrap: wrap;
                    align-items: center;
                }

                .search-box {
                    flex: 1;
                    min-width: 250px;
                    position: relative;
                }

                .search-box input {
                    width: 100%;
                    padding: 12px 45px 12px 15px;
                    border: 2px solid #e2e8f0;
                    border-radius: 12px;
                    font-size: 14px;
                    background: white;
                    transition: border-color 0.3s ease;
                }

                .search-box input:focus {
                    outline: none;
                    border-color: #0ea5e9;
                }

                .search-box .search-icon {
                    position: absolute;
                    right: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #64748b;
                    height: 20px;
                    width: 20px;
                }
                
                .filter-dropdown {
                    position: relative;
                }

                .filter-dropdown select {
                    padding: 12px 35px 12px 15px;
                    border: 2px solid #e2e8f0;
                    border-radius: 12px;
                    background: white;
                    font-size: 14px;
                    cursor: pointer;
                    appearance: none;
                    transition: border-color 0.3s ease;
                }

                .filter-dropdown select:focus {
                    outline: none;
                    border-color: #0ea5e9;
                }
                
                .filter-dropdown .dropdown-icon {
                    position: absolute;
                    right: 12px;
                    top: 50%;
                    transform: translateY(-50%);
                    pointer-events: none;
                    color: #64748b;
                    height: 16px;
                    width: 16px;
                }

                .create-btn {
                    background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
                    color: white;
                    padding: 12px 24px;
                    border: none;
                    border-radius: 12px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 14px;
                    box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3);
                }

                .create-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(14, 165, 233, 0.3);
                }

                .events-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
                    gap: 25px;
                }

                .event-card {
                    background: white;
                    border-radius: 16px;
                    padding: 25px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
                    transition: all 0.3s ease;
                    border: 1px solid #f1f5f9;
                }

                .event-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 12px 40px rgba(0,0,0,0.15);
                }

                .event-status {
                    display: inline-block;
                    padding: 6px 12px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 600;
                    text-transform: uppercase;
                    margin-bottom: 15px;
                }

                .status-upcoming {
                    background: #fef3c7;
                    color: #d97706;
                }

                .status-live {
                    background: #dcfce7;
                    color: #16a34a;
                    animation: pulse 2s infinite;
                }

                .status-completed {
                    background: #e0e7ff;
                    color: #4f46e5;
                }

                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.7; }
                }

                .event-title {
                    font-size: 20px;
                    font-weight: 700;
                    color: #0f172a;
                    margin-bottom: 10px;
                }

                .event-datetime, .event-location {
                    color: #64748b;
                    margin-bottom: 8px;
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                }
                .event-location {
                    margin-bottom: 15px;
                }
                .event-datetime .icon, .event-location .icon {
                    height: 18px;
                    width: 18px;
                    margin-right: 8px;
                    color: #0ea5e9;
                }

                .volunteer-info-card {
                    background: #f8fafc;
                    padding: 15px;
                    border-radius: 10px;
                    margin-bottom: 15px;
                }

                .volunteer-stats-card {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 10px;
                }

                .stat-item-card {
                    text-align: center;
                }

                .stat-number-card {
                    font-size: 18px;
                    font-weight: 700;
                    color: #0f172a;
                }

                .stat-label-card {
                    font-size: 12px;
                    color: #64748b;
                    text-transform: uppercase;
                }

                .progress-bar-event {
                    width: 100%;
                    height: 8px;
                    background: #e2e8f0;
                    border-radius: 4px;
                    overflow: hidden;
                    margin-top: 10px;
                }

                .progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #22d3ee 0%, #0ea5e9 100%);
                    border-radius: 4px;
                    transition: width 0.5s ease;
                }

                .event-actions {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                }

                .action-btn {
                    padding: 8px 16px;
                    border-radius: 8px;
                    border: none;
                    font-size: 12px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .btn-primary {
                    background: #0ea5e9;
                    color: white;
                }

                .btn-secondary {
                    background: #f1f5f9;
                    color: #475569;
                }

                .btn-success {
                    background: #10b981;
                    color: white;
                }

                .action-btn:hover {
                    transform: translateY(-1px);
                }

                /* Management Modal Styles */
                .modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.5);
                    z-index: 1000;
                    overflow-y: auto;
                    display: flex; /* Always flex to center content, controlled by isModalOpen */
                    justify-content: center;
                    align-items: center;
                }

                .modal-content {
                    background: white;
                    width: 90%;
                    max-width: 900px; /* Adjusted from 1000px to 900px */
                    margin: 20px auto;
                    border-radius: 16px;
                    position: relative;
                    box-shadow: 0 8px 30px rgba(0,0,0,0.25);
                }

                .modal-header {
                    padding: 15px 20px; /* Reduced padding */
                    border-bottom: 1px solid #e2e8f0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .modal-title {
                    font-size: 20px; /* Slightly reduced font size */
                    font-weight: 700;
                    color: #0f172a;
                }

                .close-btn {
                    background: none;
                    border: none;
                    font-size: 20px; /* Slightly reduced font size */
                    cursor: pointer;
                    color: #64748b;
                }

                .modal-tabs {
                    display: flex;
                    border-bottom: 1px solid #e2e8f0;
                }

                .tab-btn {
                    padding: 10px 18px; /* Reduced padding */
                    border: none;
                    background: none;
                    cursor: pointer;
                    font-weight: 600;
                    color: #64748b;
                    border-bottom: 3px solid transparent;
                    transition: all 0.3s ease;
                }

                .tab-btn.active {
                    color: #0ea5e9;
                    border-bottom-color: #0ea5e9;
                }

                .tab-content-modal {
                    display: none;
                    padding: 15px; /* Reduced padding from 20px */
                }

                .tab-content-modal.active {
                    display: block;
                }

                .volunteer-list {
                    max-height: 280px; /* Reduced max-height from 350px */
                    overflow-y: auto;
                    padding-right: 5px; /* Reduced padding */
                }

                .volunteer-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 8px 10px; /* Reduced padding */
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    margin-bottom: 6px; /* Reduced margin */
                }

                .volunteer-info-modal {
                    display: flex;
                    align-items: center;
                    gap: 8px; /* Reduced gap */
                }

                .volunteer-avatar {
                    width: 32px; /* Reduced size */
                    height: 32px; /* Reduced size */
                    background: linear-gradient(135deg, #0ea5e9, #22d3ee);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: bold;
                    font-size: 12px; /* Reduced font size */
                    flex-shrink: 0;
                }
                .volunteer-info-modal div {
                    color: #0f172a;
                }
                .volunteer-info-modal div div {
                    color: #64748b;
                    font-size: 11px; /* Reduced font size */
                }
                .volunteer-info-modal div div:last-child {
                    font-size: 9px; /* Reduced font size */
                }


                .attendance-system {
                    text-align: center;
                    padding: 15px; /* Reduced padding */
                }

                .camera-interface {
                    width: 220px; /* Reduced width */
                    height: 150px; /* Reduced height */
                    background: #f1f5f9;
                    border: 2px dashed #cbd5e1;
                    border-radius: 12px;
                    margin: 10px auto; /* Reduced margin */
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    color: #64748b;
                }
                .camera-interface .camera-icon {
                    height: 36px; /* Reduced size */
                    width: 36px; /* Reduced size */
                    margin-bottom: 6px; /* Reduced margin */
                }
                .camera-interface div:first-child {
                    font-size: 12px; /* Reduced font size */
                }
                .camera-interface div:last-child {
                    font-size: 9px; /* Reduced font size */
                    color: #64748b;
                }

                .message-center-grid {
                    display: grid;
                    grid-template-columns: 1fr 2fr;
                    gap: 15px; /* Reduced gap */
                }

                .message-templates {
                    background: #f8fafc;
                    padding: 12px; /* Reduced padding */
                    border-radius: 12px;
                }
                .message-templates h4 {
                    font-weight: 600;
                    color: #0f172a;
                    margin-bottom: 10px; /* Reduced margin */
                    font-size: 16px; /* Slightly reduced font size */
                }

                .template-item {
                    background: white;
                    padding: 8px 10px; /* Reduced padding */
                    border-radius: 8px;
                    margin-bottom: 6px; /* Reduced margin */
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                }

                .template-item:hover {
                    background: #e0f2fe;
                }
                .template-item strong {
                    font-weight: 600;
                    color: #0f172a;
                    font-size: 13px; /* Reduced font size */
                }
                .template-item div {
                    font-size: 9px; /* Reduced font size */
                    color: #64748b;
                }

                .compose-area {
                    background: white;
                    padding: 15px; /* Kept similar to message templates */
                    border-radius: 12px;
                    border: 1px solid #e2e8f0;
                }
                .compose-area h4 {
                    font-weight: 600;
                    color: #0f172a;
                    margin-bottom: 12px;
                    font-size: 16px; /* Slightly reduced font size */
                }

                .compose-area label {
                    display: block;
                    margin-bottom: 3px; /* Reduced margin */
                    font-weight: 600;
                    color: #475569;
                    font-size: 12px; /* Reduced font size */
                }

                .compose-area select,
                .compose-area input[type="text"] {
                    width: 100%;
                    padding: 5px; /* Reduced padding */
                    border: 1px solid #e2e8f0;
                    border-radius: 6px;
                    font-size: 11px; /* Reduced font size */
                    color: #333;
                }
                .compose-area select:focus,
                .compose-area input[type="text"]:focus,
                .compose-area textarea:focus {
                    outline: none;
                    border-color: #0ea5e9;
                }


                .compose-area textarea {
                    width: 100%;
                    height: 120px; /* Reduced height from 150px */
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    padding: 8px; /* Reduced padding */
                    font-family: inherit;
                    resize: vertical;
                    font-size: 11px; /* Reduced font size */
                    color: #333;
                }

                .documentation-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); /* Reduced minmax from 200px */
                    gap: 12px; /* Reduced gap */
                }

                .doc-card {
                    background: white;
                    border-radius: 12px;
                    padding: 12px; /* Reduced padding */
                    text-align: center;
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
                }
                .doc-card h4 {
                    font-weight: 700;
                    color: #0f172a;
                    font-size: 14px; /* Reduced font size */
                }
                .doc-card p {
                    color: #64748b;
                    font-size: 11px; /* Reduced font size */
                }

                .photo-placeholder {
                    width: 100%;
                    height: 100px; /* Reduced height from 120px */
                    background: #f1f5f9;
                    border-radius: 8px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 10px; /* Reduced margin */
                    color: #64748b;
                }
                .photo-placeholder .placeholder-icon {
                    height: 28px; /* Reduced size */
                    width: 28px; /* Reduced size */
                    margin-bottom: 6px; /* Reduced margin */
                }

                .quick-stats-section {
                    margin-top: 20px; /* Reduced margin */
                    background: white;
                    padding: 12px; /* Reduced padding */
                    border-radius: 12px;
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
                }
                .quick-stats-section h4 {
                    font-weight: 700;
                    color: #0f172a;
                    margin-bottom: 10px; /* Reduced margin */
                    font-size: 16px; /* Slightly reduced font size */
                }

                .quick-stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); /* Reduced minmax from 150px */
                    gap: 12px; /* Reduced gap */
                    margin-top: 10px; /* Reduced margin */
                }

                .quick-stat-item {
                    text-align: center;
                    padding: 10px; /* Reduced padding */
                    background: #f8fafc;
                    border-radius: 8px;
                }
                .quick-stat-item div:first-child {
                    font-size: 18px; /* Reduced font size */
                    font-weight: 700;
                    color: #0ea5e9;
                }
                .quick-stat-item div:last-child {
                    color: #64748b;
                    font-size: 11px; /* Reduced font size */
                }

                @media (max-width: 768px) {
                    .events-grid {
                        grid-template-columns: 1fr;
                    }
        
                    .controls {
                        flex-direction: column;
                        align-items: stretch;
                    }
        
                    .search-box {
                        min-width: auto;
                    }

                    .modal-content {
                        margin: 10px;
                        max-width: 95%; /* Adjusted for mobile */
                    }
                    .message-center-grid {
                        grid-template-columns: 1fr;
                    }
                    .quick-stats-grid {
                        grid-template-columns: 1fr;
                    }
                    .camera-interface {
                        width: 90%; /* Adjusted for mobile */
                    }
                }
                `}
            </style>

            {/* Event Management Main Content Container */}
            <div className="event-management-container p-4 md:p-8 relative">
                <div className="header">
                    <h1 className="text-2xl md:text-3xl font-bold text-cyan-900">Event Management</h1>
                    <p className="text-cyan-600 mt-1 mb-1">Organize, track, and optimize your beach cleanup drives</p>
                </div>

                {/* Controls Section */}
                <div className="controls">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Search events..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" className="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <div className="filter-dropdown">
                        <select value={eventFilter} onChange={(e) => setEventFilter(e.target.value)}>
                            <option value="all">All Events</option>
                            <option value="upcoming">Upcoming</option>
                            <option value="live">Live</option>
                            <option value="completed">Completed</option>
                        </select>
                        <svg xmlns="http://www.w3.org/2000/svg" className="dropdown-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                    <div className="filter-dropdown">
                        <select value={beachFilter} onChange={(e) => setBeachFilter(e.target.value)}>
                            <option value="all">All Beaches</option>
                            <option value="juhu">Juhu Beach</option>
                            <option value="marine">Marine Drive</option>
                            <option value="versova">Versova Beach</option>
                        </select>
                        <svg xmlns="http://www.w3.org/2000/svg" className="dropdown-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                {/* Events Grid */}
                <div className="events-grid">
                    {filteredEvents.map(event => (
                        <div className="event-card" key={event.id}>
                            <div className={`event-status status-${event.status}`}>
                                {event.status}
                            </div>
                            <h3 className="event-title">{event.title}</h3>
                            <div className="event-datetime">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {event.datetime}
                            </div>
                            <div className="event-location">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {event.location}
                            </div>
                            
                            <div className="volunteer-info-card">
                                <div className="volunteer-stats-card">
                                    <div className="stat-item-card">
                                        <div className="stat-number-card">{event.registered || event.volunteers}</div>
                                        <div className="stat-label-card">{event.status === 'live' ? 'Active' : 'Registered'}</div>
                                    </div>
                                    {event.target && (
                                        <div className="stat-item-card">
                                            <div className="stat-number-card">{event.target}</div>
                                            <div className="stat-label-card">Target</div>
                                        </div>
                                    )}
                                    {event.kgCollected && (
                                        <div className="stat-item-card">
                                            <div className="stat-number-card">{event.kgCollected}</div>
                                            <div className="stat-label-card">Kg Collected</div>
                                        </div>
                                    )}
                                    <div className="stat-item-card">
                                        <div className="stat-number-card">{event.filled || event.attendance || event.satisfaction}</div>
                                        <div className="stat-label-card">{event.filled ? 'Filled' : (event.attendance ? 'Attendance' : 'Satisfaction')}</div>
                                    </div>
                                </div>
                                <div className="progress-bar-event">
                                    <div className="progress-fill" style={{ width: event.progressWidth }}></div>
                                </div>
                            </div>

                            <div className="event-actions">
                                {event.actions.map((action, idx) => (
                                    <button
                                        key={idx}
                                        className={`action-btn btn-${action.type}`}
                                        onClick={() => action.onClick === 'openManageModal' ? openManageModal(event.title) : console.log(`${action.label} clicked for ${event.title}`)}
                                    >
                                        {action.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Management Modal */}
                {isModalOpen && (
                    <div className="modal" style={{ display: isModalOpen ? 'flex' : 'none' }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2 className="modal-title">{modalEventTitle}</h2>
                                <button className="close-btn" onClick={closeModal}>&times;</button>
                            </div>

                            <div className="modal-tabs">
                                <button
                                    className={`tab-btn ${activeModalTab === 'volunteers' ? 'active' : ''}`}
                                    onClick={() => switchModalTab('volunteers')}
                                >
                                    Volunteer Management
                                </button>
                                <button
                                    className={`tab-btn ${activeModalTab === 'attendance' ? 'active' : ''}`}
                                    onClick={() => switchModalTab('attendance')}
                                >
                                    Attendance System
                                </button>
                                <button
                                    className={`tab-btn ${activeModalTab === 'communication' ? 'active' : ''}`}
                                    onClick={() => switchModalTab('communication')}
                                >
                                    Communication
                                </button>
                                <button
                                    className={`tab-btn ${activeModalTab === 'documentation' ? 'active' : ''}`}
                                    onClick={() => switchModalTab('documentation')}
                                >
                                    Documentation
                                </button>
                            </div>

                            {/* Volunteer Management Tab */}
                            <div className={`tab-content-modal ${activeModalTab === 'volunteers' ? 'active' : ''}`}>
                                <h3 className="text-lg font-semibold text-cyan-800 mb-4">Registered Volunteers</h3>
                                <div className="volunteer-list">
                                    {volunteerListData.map(volunteer => (
                                        <div className="volunteer-item" key={volunteer.id}>
                                            <div className="volunteer-info-modal">
                                                <div className="volunteer-avatar">{volunteer.name.split(' ').map(n => n[0]).join('')}</div>
                                                <div>
                                                    <div className="font-semibold">{volunteer.name}</div>
                                                    <div>{volunteer.email} • {volunteer.phone}</div>
                                                    <div>Registered: {volunteer.registered}</div>
                                                </div>
                                            </div>
                                            <div>
                                                <select className="p-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-sky-500">
                                                    <option>Team Leader</option>
                                                    <option>Collector</option>
                                                    <option>Sorter</option>
                                                </select>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Attendance System Tab */}
                            <div className={`tab-content-modal ${activeModalTab === 'attendance' ? 'active' : ''}`}>
                                <div className="attendance-system">
                                    <h3 className="text-lg font-semibold text-cyan-800 mb-4">Face Scan Attendance System</h3>
                                    <div className="camera-interface">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="camera-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.218A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.218A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <div>Camera Interface</div>
                                            <div>Click to activate face recognition</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 justify-center mt-5">
                                        <button className="action-btn btn-success">Start Check-in</button>
                                        <button className="action-btn btn-primary">View Attendance</button>
                                        <button className="action-btn btn-secondary">QR Backup</button>
                                    </div>
                                    
                                    <div className="mt-8 text-left">
                                        <h4 className="font-semibold text-cyan-800 mb-2">Today's Attendance Log</h4>
                                        <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-100">
                                            <div className="flex justify-between mb-2">
                                                <span className="font-semibold">Total Checked In: 28</span>
                                                <span className="text-green-600 text-sm font-medium">✓ Active Session</span>
                                            </div>
                                            <div className="text-sm">
                                                Last check-in: Priya Sharma - 8:45 AM
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Communication Tab */}
                            <div className={`tab-content-modal ${activeModalTab === 'communication' ? 'active' : ''}`}>
                                <div className="message-center-grid">
                                    <div className="message-templates">
                                        <h4>Message Templates</h4>
                                        <div className="space-y-2">
                                            <div className="template-item" onClick={() => loadMessageTemplate('welcome')}>
                                                <strong>Welcome Message</strong>
                                                <div>Thank volunteers for registering</div>
                                            </div>
                                            <div className="template-item" onClick={() => loadMessageTemplate('reminder')}>
                                                <strong>Event Reminder</strong>
                                                <div>Send event day reminders</div>
                                            </div>
                                            <div className="template-item" onClick={() => loadMessageTemplate('safety')}>
                                                <strong>Safety Instructions</strong>
                                                <div>Important safety guidelines</div>
                                            </div>
                                            <div className="template-item" onClick={() => loadMessageTemplate('thankyou')}>
                                                <strong>Thank You Message</strong>
                                                <div>Post-event appreciation</div>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-6">
                                            <h4>Message History</h4>
                                            <div className="bg-cyan-50 p-4 rounded-lg max-h-52 overflow-y-auto border border-cyan-100">
                                                <div className="pb-3 border-b border-cyan-200 mb-3">
                                                    <div className="font-semibold text-xs mb-1">Today 9:30 AM</div>
                                                    <div className="text-sm">Event reminder sent to 45 volunteers</div>
                                                </div>
                                                <div className="pb-3 border-b border-cyan-200 mb-3">
                                                    <div className="font-semibold text-xs mb-1">Yesterday 6:00 PM</div>
                                                    <div className="text-sm">Welcome message sent to 12 new volunteers</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="compose-area">
                                        <h4>Compose Message</h4>
                                        <div className="mb-4">
                                            <label>Recipients:</label>
                                            <select className="w-full p-2.5 border rounded-lg text-sm focus:outline-none focus:border-sky-500">
                                                <option>All Volunteers (45)</option>
                                                <option>Team Leaders (8)</option>
                                                <option>Collectors (25)</option>
                                                <option>Sorters (12)</option>
                                                <option>Individual Volunteer</option>
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label>Subject:</label>
                                            <input type="text" className="w-full p-2.5 border rounded-lg text-sm focus:outline-none focus:border-sky-500" placeholder="Message subject" />
                                        </div>
                                        <textarea
                                            value={messageText}
                                            onChange={(e) => setMessageText(e.target.value)}
                                            placeholder="Type your message here..."
                                        ></textarea>
                                        <div className="flex gap-3 mt-4">
                                            <button className="action-btn btn-primary">Send SMS</button>
                                            <button className="action-btn btn-secondary">Send Email</button>
                                            <button className="action-btn btn-secondary">Schedule</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Documentation Tab */}
                            <div className={`tab-content-modal ${activeModalTab === 'documentation' ? 'active' : ''}`}>
                                <div className="documentation-grid">
                                    <div className="doc-card">
                                        <div className="photo-placeholder">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="placeholder-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <div>Photo Gallery</div>
                                            </div>
                                        </div>
                                        <h4>Event Photos</h4>
                                        <p>Upload and manage event photos</p>
                                        <button className="action-btn btn-primary mt-4">Upload Photos</button>
                                    </div>
                                    
                                    <div className="doc-card">
                                        <div className="photo-placeholder">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="placeholder-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                </svg>
                                                <div>Before/After</div>
                                            </div>
                                        </div>
                                        <h4>Comparison Photos</h4>
                                        <p>Document cleanup impact</p>
                                        <button className="action-btn btn-primary mt-4">Add Comparison</button>
                                    </div>
                                    
                                    <div className="doc-card">
                                        <div className="photo-placeholder">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="placeholder-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.664 12c.797 0 1.442-.645 1.442-1.442V6.442c0-.797-.645-1.442-1.442-1.442H4.336C3.539 5 2.894 5.645 2.894 6.442v4.116c0 .797.645 1.442 1.442 1.442M21 12H3M3 12v6.558C3 19.355 3.645 20 4.442 20h15.116c.797 0 1.442-.645 1.442-1.442V12" />
                                                </svg>
                                                <div>Waste Categories</div>
                                            </div>
                                        </div>
                                        <h4>Waste Categorization</h4>
                                        <p>Track waste types collected</p>
                                        <button className="action-btn btn-primary mt-4">Categorize Waste</button>
                                    </div>
                                    
                                    <div className="doc-card">
                                        <div className="photo-placeholder">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="placeholder-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                </svg>
                                                <div>Impact Data</div>
                                            </div>
                                        </div>
                                        <h4>Impact Measurement</h4>
                                        <p>Environmental impact metrics</p>
                                        <button className="action-btn btn-primary mt-4">View Metrics</button>
                                    </div>
                                    
                                    <div className="doc-card">
                                        <div className="photo-placeholder">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="placeholder-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                </svg>
                                                <div>Feedback</div>
                                            </div>
                                        </div>
                                        <h4>Volunteer Feedback</h4>
                                        <p>Collect volunteer reviews</p>
                                        <button className="action-btn btn-primary mt-4">View Feedback</button>
                                    </div>
                                    
                                    <div className="doc-card">
                                        <div className="photo-placeholder">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="placeholder-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                <div>Reports</div>
                                            </div>
                                        </div>
                                        <h4>Event Report</h4>
                                        <p>Generate comprehensive report</p>
                                        <button className="action-btn btn-primary mt-4">Generate Report</button>
                                    </div>
                                </div>
                                
                                <div className="quick-stats-section">
                                    <h4>Quick Stats</h4>
                                    <div className="quick-stats-grid">
                                        <div className="quick-stat-item">
                                            <div style={{color: '#0ea5e9'}}>142 kg</div>
                                            <div>Waste Collected</div>
                                        </div>
                                        <div className="quick-stat-item">
                                            <div style={{color: '#10b981'}}>28</div>
                                            <div>Active Volunteers</div>
                                        </div>
                                        <div className="quick-stat-item">
                                            <div style={{color: '#f59e0b'}}>3.5 hrs</div>
                                            <div>Event Duration</div>
                                        </div>
                                        <div className="quick-stat-item">
                                            <div style={{color: '#8b5cf6'}}>87%</div>
                                            <div>Attendance Rate</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Events;
