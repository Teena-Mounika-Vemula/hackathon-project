import React, { useState, useEffect, useRef } from 'react';

const BeachMaps = () => {
    // State for filters and search
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [regionFilter, setRegionFilter] = useState('all');
    // State to manage the active beach marker/list item
    const [activeBeachId, setActiveBeachId] = useState(null);

    // Dummy beach data, including map positions (top, left) relative to the map-view container
    const beachesData = [
        { id: 'juhu', name: 'Juhu Beach', region: 'west', status: 'cleaned', top: '140px', left: '180px', details: 'Near ISKCON Temple • Last cleaned: June 14, 2025', stats: [{ value: '45', label: 'Volunteers' }, { value: '234kg', label: 'Waste Removed' }, { value: '4.8', label: 'Rating' }] },
        { id: 'versova', name: 'Versova Beach', region: 'west', status: 'upcoming', top: '160px', left: '280px', details: 'Andheri West • Event scheduled: July 5, 2025', stats: [{ value: '32', label: 'Registered' }, { value: '50', label: 'Target' }, { value: '64%', label: 'Filled' }] },
        { id: 'worli', name: 'Worli Beach', region: 'south', status: 'needs-cleanup', top: '220px', left: '250px', details: 'Worli Seaface • Last cleaned: May 20, 2025', stats: [{ value: 'High', label: 'Priority' }, { value: 'Est. 180kg', label: 'Waste' }, { value: '2.3km', label: 'Length' }] },
        { id: 'bandra', name: 'Bandra Beach', region: 'west', status: 'cleaned', top: '120px', left: '380px', details: 'Bandra West • Last cleaned: June 21, 2025', stats: [{ value: '28', label: 'Volunteers' }, { value: '156kg', label: 'Waste Removed' }, { value: '4.6', label: 'Rating' }] },
        { id: 'chowpatty', name: 'Chowpatty Beach', region: 'south', status: 'needs-cleanup', top: '260px', left: '320px', details: 'Marine Drive • Last cleaned: May 15, 2025', stats: [{ value: 'Medium', label: 'Priority' }, { value: 'Est. 120kg', label: 'Waste' }, { value: '1.8km', label: 'Length' }] },
        { id: 'aksa', name: 'Aksa Beach', region: 'north', status: 'upcoming', top: '100px', left: '480px', details: 'Malad West • Event scheduled: July 12, 2025', stats: [{ value: '18', label: 'Registered' }, { value: '40', label: 'Target' }, { value: '45%', label: 'Filled' }] },
    ];

    // Effect to filter beaches whenever search term or filters change
    const [filteredBeaches, setFilteredBeaches] = useState(beachesData);

    useEffect(() => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const newFilteredBeaches = beachesData.filter(beach => {
            const matchesSearch = beach.name.toLowerCase().includes(lowerCaseSearchTerm);
            const matchesStatus = statusFilter === 'all' || beach.status === statusFilter;
            const matchesRegion = regionFilter === 'all' || beach.region === regionFilter;
            return matchesSearch && matchesStatus && matchesRegion;
        });
        setFilteredBeaches(newFilteredBeaches);
    }, [searchTerm, statusFilter, regionFilter]);

    // Handle marker/list item click
    const handleBeachClick = (id) => {
        setActiveBeachId(id);
    };

    return (
        <>
            <style>
                {`
                /* General Styling - some already inherited from OrgDashboard */
                /* Keeping specific styles for BeachMaps component */
                .main-content {
                    flex: 1;
                    padding: 32px;
                    overflow-y: auto;
                }

                .header {
                    margin-bottom: 32px;
                }

                .header h1 {
                    font-size: 32px;
                    font-weight: 600;
                    color: #212529; /* Adjust to match Tailwind's text-cyan-900 if desired */
                    margin-bottom: 8px;
                }

                .header p {
                    color: #6c757d; /* Adjust to match Tailwind's text-cyan-600 */
                    font-size: 16px;
                }

                .controls {
                    display: flex;
                    gap: 16px;
                    margin-bottom: 24px;
                    flex-wrap: wrap;
                }

                .search-box {
                    flex: 1;
                    min-width: 250px;
                    position: relative;
                }

                .search-box input {
                    width: 100%;
                    padding: 12px 16px 12px 40px;
                    border: 1px solid #dee2e6;
                    border-radius: 8px;
                    font-size: 14px;
                    background: white;
                    color: #212529;
                }

                .search-icon {
                    position: absolute;
                    left: 12px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #6c757d;
                    pointer-events: none; /* Make icon non-interactive so clicks pass through to input */
                }

                .filter-dropdown {
                    padding: 12px 16px;
                    border: 1px solid #dee2e6;
                    border-radius: 8px;
                    background: white;
                    font-size: 14px;
                    min-width: 140px;
                    color: #212529;
                    cursor: pointer;
                }

                .add-beach-btn {
                    background: #0EA5E9; /* Using primary color from orgDashboard */
                    color: white;
                    padding: 12px 24px;
                    border: none;
                    border-radius: 8px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                }

                .add-beach-btn:hover {
                    background: #0284C7; /* Darker shade on hover */
                    transform: translateY(-1px);
                    box-shadow: 0 6px 8px rgba(0,0,0,0.15);
                }

                .map-container {
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
                    margin-bottom: 24px;
                    overflow: hidden;
                }

                .map-header {
                    padding: 20px 24px;
                    border-bottom: 1px solid #e9ecef;
                    display: flex;
                    justify-content: space-between; /* Adjusted for clarity */
                    align-items: center;
                }

                .map-title {
                    font-size: 18px;
                    font-weight: 600;
                    color: #212529; /* Adjust to match Tailwind's text-cyan-900 if desired */
                }

                .map-view {
                    height: 450px;
                    background: linear-gradient(180deg, #87CEEB 0%, #4682B4 30%, #20B2AA 60%, #F0E68C 100%);
                    position: relative;
                    overflow: hidden;
                    border-radius: 0 0 12px 12px;
                }

                /* Add coastline and water effects */
                .map-view::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 70%;
                    background: 
                        radial-gradient(circle at 30% 40%, rgba(255,255,255,0.3) 2px, transparent 2px),
                        radial-gradient(circle at 70% 60%, rgba(255,255,255,0.2) 1px, transparent 1px),
                        radial-gradient(circle at 50% 80%, rgba(255,255,255,0.1) 3px, transparent 3px);
                    background-size: 100px 100px, 150px 150px, 200px 200px;
                    animation: waves 20s infinite linear;
                }

                .map-view::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 30%;
                    background: linear-gradient(to top, 
                        #F0E68C 0%, 
                        rgba(240, 230, 140, 0.8) 20%, 
                        rgba(240, 230, 140, 0.3) 40%, 
                        transparent 60%
                    );
                    pointer-events: none;
                }

                @keyframes waves {
                    0% { background-position: 0px 0px, 0px 0px, 0px 0px; }
                    100% { background-position: 100px 0px, -150px 0px, 200px 0px; }
                }

                .beach-marker {
                    position: absolute;
                    width: 32px;
                    height: 32px;
                    /* Using status-based background colors */
                    border: 4px solid white;
                    border-radius: 50%;
                    cursor: pointer;
                    transition: all 0.3s;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                    z-index: 5;
                }

                .beach-marker::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 8px;
                    height: 8px;
                    background: white;
                    border-radius: 50%;
                }

                .beach-marker:hover {
                    transform: scale(1.3);
                    z-index: 15;
                    box-shadow: 0 6px 20px rgba(0,0,0,0.4);
                }

                .beach-marker.active {
                    background: #3DADE8; /* Blue for active */
                    transform: scale(1.4);
                    z-index: 15;
                    box-shadow: 0 8px 24px rgba(61, 173, 232, 0.4);
                }

                /* Specific status colors for markers */
                .marker-cleaned { background: #4CAF50; } /* Green */
                .marker-upcoming { background: #FF9800; } /* Orange */
                .marker-needs-cleanup { background: #FF5722; } /* Red */

                .marker-tooltip {
                    position: absolute;
                    bottom: 45px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(0,0,0,0.9);
                    color: white;
                    padding: 10px 14px;
                    border-radius: 8px;
                    font-size: 13px;
                    font-weight: 500;
                    white-space: nowrap;
                    opacity: 0;
                    pointer-events: none;
                    transition: all 0.3s;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                }

                .marker-tooltip::after {
                    content: '';
                    position: absolute;
                    top: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                    border: 6px solid transparent;
                    border-top-color: rgba(0,0,0,0.9);
                }

                .beach-marker:hover .marker-tooltip {
                    opacity: 1;
                }

                .beach-list {
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
                }

                .beach-list-header {
                    padding: 20px 24px;
                    border-bottom: 1px solid #e9ecef;
                }

                .beach-item {
                    padding: 20px 24px;
                    border-bottom: 1px solid #f8f9fa;
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .beach-item:hover {
                    background: #f8f9fa;
                }

                .beach-item.active-list-item {
                    background: #e8f4fd; /* Light blue for active list item */
                }

                .beach-item:last-child {
                    border-bottom: none;
                }

                .beach-status-indicator { /* Renamed to avoid conflict */
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    flex-shrink: 0;
                }

                .status-cleaned { background: #4CAF50; }
                .status-upcoming { background: #FF9800; }
                .status-needs-cleanup { background: #FF5722; }

                .beach-info {
                    flex: 1;
                }

                .beach-name {
                    font-weight: 600;
                    color: #212529;
                    margin-bottom: 4px;
                }

                .beach-details {
                    font-size: 14px;
                    color: #6c757d;
                }

                .beach-stats {
                    display: flex;
                    gap: 24px;
                    font-size: 14px;
                }

                .stat {
                    text-align: center;
                }

                .stat-value {
                    font-weight: 600;
                    color: #212529;
                }

                .stat-label {
                    color: #6c757d;
                    font-size: 12px;
                }

                .legend {
                    display: flex;
                    gap: 20px;
                    padding: 16px 24px;
                    background: #f8f9fa;
                    border-top: 1px solid #e9ecef;
                    font-size: 14px;
                }

                .legend-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .legend-color {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                }

                /* Responsive adjustments */
                @media (max-width: 768px) {
                    .main-content {
                        padding: 16px;
                    }
                    .header h1 {
                        font-size: 26px;
                    }
                    .controls {
                        flex-direction: column;
                        align-items: stretch;
                    }
                    .search-box, .filter-dropdown, .add-beach-btn {
                        width: 100%;
                        min-width: unset;
                    }
                    .beach-item {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 8px;
                        text-align: left;
                    }
                    .beach-stats {
                        width: 100%;
                        justify-content: space-around;
                    }
                }
                `}
            </style>
            <div className="main-content">
                <div className="header">
                    <h1>Beach Maps</h1>
                    <p>Visualize and manage beach cleanup locations across your region</p>
                </div>

                <div className="controls">
                    <div className="search-box">
                        <div className="search-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search beaches..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select
                        className="filter-dropdown"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">All Beaches</option>
                        <option value="cleaned">Recently Cleaned</option>
                        <option value="upcoming">Upcoming Events</option>
                        <option value="needs-cleanup">Needs Cleanup</option>
                    </select>
                    <select
                        className="filter-dropdown"
                        value={regionFilter}
                        onChange={(e) => setRegionFilter(e.target.value)}
                    >
                        <option value="all">All Regions</option>
                        <option value="north">North Coast</option>
                        <option value="south">South Coast</option>
                        <option value="east">East Coast</option>
                    </select>
                </div>

                <div className="map-container ocean-card"> {/* Added ocean-card class */}
                    <div className="map-header">
                        <div className="map-title">Interactive Beach Map</div>
                    </div>
                    <div className="map-view" id="mapView">
                        {filteredBeaches.map(beach => (
                            <div
                                key={beach.id}
                                className={`beach-marker marker-${beach.status} ${activeBeachId === beach.id ? 'active' : ''}`}
                                style={{ top: beach.top, left: beach.left }}
                                data-beach={beach.id}
                                onClick={() => handleBeachClick(beach.id)}
                            >
                                <div className="marker-tooltip">
                                    {beach.name} - {beach.status.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="legend">
                        <div className="legend-item">
                            <div className="legend-color status-cleaned"></div>
                            <span>Recently Cleaned</span>
                        </div>
                        <div className="legend-item">
                            <div className="legend-color status-upcoming"></div>
                            <span>Upcoming Event</span>
                        </div>
                        <div className="legend-item">
                            <div className="legend-color status-needs-cleanup"></div>
                            <span>Needs Cleanup</span>
                        </div>
                    </div>
                </div>

                <div className="beach-list ocean-card"> {/* Added ocean-card class */}
                    <div className="beach-list-header">
                        <div className="map-title">Beach Locations</div>
                    </div>
                    {filteredBeaches.map(beach => (
                        <div
                            key={beach.id}
                            className={`beach-item ${activeBeachId === beach.id ? 'active-list-item' : ''}`}
                            data-beach={beach.id}
                            onClick={() => handleBeachClick(beach.id)}
                        >
                            <div className={`beach-status-indicator status-${beach.status}`}></div>
                            <div className="beach-info">
                                <div className="beach-name">{beach.name}</div>
                                <div className="beach-details">{beach.details}</div>
                            </div>
                            <div className="beach-stats">
                                {beach.stats.map((stat, index) => (
                                    <div className="stat" key={index}>
                                        <div className="stat-value">{stat.value}</div>
                                        <div className="stat-label">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default BeachMaps;
