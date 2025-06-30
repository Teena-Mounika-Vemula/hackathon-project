import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
// Assuming Chart.js is globally available, or linked via script tag in index.html
// If not, you might need to import it like: import Chart from 'chart.js/auto';

const Analytics = () => {
    // State for selected event
    const [selectedEventId, setSelectedEventId] = useState('juhu-cleanup-2025-06-28');
    // State for modal visibility
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    // Refs for chart canvases
    const hourlyChartRef = useRef(null);
    const participationChartRef = useRef(null);
    const wasteTypeChartRef = useRef(null);
    const teamPerformanceChartRef = useRef(null);
    const efficiencyChartRef = useRef(null);

    // Store chart instances to destroy them before re-rendering
    const charts = useRef({});

    // Event data
    const eventData = {
        'juhu-cleanup-2025-06-28': {
            title: 'Juhu Beach Cleanup - June 28, 2025',
            location: 'Juhu Beach, Mumbai North',
            time: '6:00 AM - 10:00 AM (4 hours)',
            weather: 'Partly Cloudy, 28°C',
            leader: 'Team Leader: Priya Sharma',
            stats: {
                waste: 247,
                volunteers: 42,
                hours: 168,
                distance: 2.3
            },
            hourlyData: [45, 72, 68, 62],
            participationData: [8, 15, 12, 7], // New volunteers added per hour
            wasteTypes: [89, 62, 37, 28, 31], // Plastic Bottles, Plastic Bags, Cans & Metal, Paper & Cardboard, Glass & Others
            teamPerformance: [42, 38, 45, 30, 28, 64], // kg collected per team
            efficiency: [90, 85, 92, 88], // % efficiency per hour
            impact: {
                marineAnimals: 180,
                itemsRecycled: 156,
                co2Prevented: 0.8,
                socialMediaReach: 1240
            },
            timeline: [
                { time: '6:00 AM', action: 'Event Started', detail: 'Volunteers gathered at the registration point' },
                { time: '6:30 AM', action: 'Teams Deployed', detail: '6 teams of 7 volunteers each assigned to different sections' },
                { time: '8:00 AM', action: 'Midpoint Check', detail: '142 kg collected, refreshments distributed' },
                { time: '9:30 AM', action: 'Final Collection', detail: 'All waste sorted and weighed by category' },
                { time: '10:00 AM', action: 'Event Concluded', detail: 'Group photo and appreciation ceremony' }
            ]
        },
        'versova-cleanup-2025-06-25': {
            title: 'Versova Beach Cleanup - June 25, 2025',
            location: 'Versova Beach, Mumbai West',
            time: '7:00 AM - 11:00 AM (4 hours)',
            weather: 'Sunny, 30°C',
            leader: 'Team Leader: Rahul Verma',
            stats: {
                waste: 310,
                volunteers: 55,
                hours: 220,
                distance: 3.1
            },
            hourlyData: [60, 90, 80, 80],
            participationData: [10, 20, 15, 10],
            wasteTypes: [120, 80, 50, 30, 30],
            teamPerformance: [50, 60, 45, 55, 60, 40],
            efficiency: [85, 90, 95, 80],
            impact: {
                marineAnimals: 220,
                itemsRecycled: 190,
                co2Prevented: 1.0,
                socialMediaReach: 1500
            },
            timeline: [
                { time: '7:00 AM', action: 'Event Started', detail: 'Gathering and briefing' },
                { time: '7:45 AM', action: 'Initial Cleanup', detail: 'Teams spread out across beach sections' },
                { time: '9:30 AM', action: 'Large Item Removal', detail: 'Collected fishing nets and larger debris' },
                { time: '10:45 AM', action: 'Final Weigh-in', detail: 'All collected waste categorized' },
                { time: '11:00 AM', action: 'Event Wrap-up', detail: 'Debrief and thanks' }
            ]
        },
        'worli-cleanup-2025-06-22': {
            title: 'Worli Beach Cleanup - June 22, 2025',
            location: 'Worli Sea Face, Mumbai South',
            time: '5:30 AM - 9:30 AM (4 hours)',
            weather: 'Clear Sky, 26°C',
            leader: 'Team Leader: Simran Kaur',
            stats: {
                waste: 180,
                volunteers: 30,
                hours: 120,
                distance: 1.8
            },
            hourlyData: [30, 50, 55, 45],
            participationData: [5, 10, 8, 7],
            wasteTypes: [70, 40, 30, 20, 20],
            teamPerformance: [35, 30, 40, 35, 25, 15],
            efficiency: [95, 80, 88, 90],
            impact: {
                marineAnimals: 130,
                itemsRecycled: 100,
                co2Prevented: 0.6,
                socialMediaReach: 900
            },
            timeline: [
                { time: '5:30 AM', action: 'Event Begins', detail: 'Volunteers and organizers meet' },
                { time: '6:15 AM', action: 'Safety Briefing', detail: 'Instructions on safe waste handling' },
                { time: '7:45 AM', action: 'Community Engagement', detail: 'Local residents join the effort' },
                { time: '9:00 AM', action: 'Sorting and Packing', detail: 'Collected materials prepared for transport' },
                { time: '9:30 AM', action: 'Completion', detail: 'Event ends, group photo' }
            ]
        },
        'bandra-cleanup-2025-06-20': {
            title: 'Bandra Beach Cleanup - June 20, 2025',
            location: 'Bandra Bandstand, Mumbai Central',
            time: '6:30 AM - 10:30 AM (4 hours)',
            weather: 'Rainy, 25°C',
            leader: 'Team Leader: Rohan Desai',
            stats: {
                waste: 210,
                volunteers: 35,
                hours: 140,
                distance: 2.0
            },
            hourlyData: [40, 60, 50, 60],
            participationData: [7, 12, 10, 6],
            wasteTypes: [80, 50, 40, 25, 15],
            teamPerformance: [30, 40, 35, 45, 30, 30],
            efficiency: [80, 92, 85, 87],
            impact: {
                marineAnimals: 150,
                itemsRecycled: 130,
                co2Prevented: 0.7,
                socialMediaReach: 1100
            },
            timeline: [
                { time: '6:30 AM', action: 'Start of Event', detail: 'Despite rain, volunteers arrive with enthusiasm' },
                { time: '7:00 AM', action: 'Area Assignment', detail: 'Volunteers assigned to specific sections of the beach' },
                { time: '8:30 AM', action: 'Heavy Rainfall', detail: 'Brief pause in collection due to rain' },
                { time: '9:45 AM', action: 'Resumed Cleanup', detail: 'Intensive collection in final hour' },
                { time: '10:30 AM', action: 'Event Close', detail: 'Thank you and departure' }
            ]
        }
    };

    const currentEvent = eventData[selectedEventId];

    // Function to destroy existing charts
    const destroyCharts = () => {
        Object.values(charts.current).forEach(chart => {
            if (chart) {
                chart.destroy();
            }
        });
        charts.current = {};
    };

    // Effect for initializing/updating charts
    useEffect(() => {
        destroyCharts(); // Destroy existing charts on component mount/update

        if (!currentEvent) return; // Exit if no event data

        const backgroundColors = [
            'rgba(61, 173, 232, 0.8)', // Primary blue
            'rgba(33, 203, 243, 0.8)', // Secondary blue
            'rgba(255, 206, 86, 0.8)', // Yellow
            'rgba(75, 192, 192, 0.8)', // Green
            'rgba(153, 102, 255, 0.8)', // Purple
            'rgba(255, 99, 132, 0.8)', // Red
            'rgba(54, 162, 235, 0.8)', // Another blue
        ];
        const borderColors = [
            'rgba(61, 173, 232, 1)',
            'rgba(33, 203, 243, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
        ];

        // Hourly Collection Rate Chart
        if (hourlyChartRef.current) {
            charts.current.hourlyChart = new Chart(hourlyChartRef.current, {
                type: 'line',
                data: {
                    labels: ['6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM'],
                    datasets: [{
                        label: 'KG Collected',
                        data: currentEvent.hourlyData,
                        borderColor: 'rgba(61, 173, 232, 1)',
                        backgroundColor: 'rgba(61, 173, 232, 0.2)',
                        fill: true,
                        tension: 0.3
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { grid: { display: false } },
                        y: { beginAtZero: true }
                    }
                }
            });
        }

        // Volunteer Participation Chart (Bar Chart)
        if (participationChartRef.current) {
            charts.current.participationChart = new Chart(participationChartRef.current, {
                type: 'bar',
                data: {
                    labels: ['6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM'],
                    datasets: [{
                        label: 'New Volunteers',
                        data: currentEvent.participationData,
                        backgroundColor: backgroundColors[1],
                        borderColor: borderColors[1],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { grid: { display: false } },
                        y: { beginAtZero: true }
                    }
                }
            });
        }

        // Waste Type Distribution (Pie Chart)
        if (wasteTypeChartRef.current) {
            charts.current.wasteTypeChart = new Chart(wasteTypeChartRef.current, {
                type: 'doughnut',
                data: {
                    labels: ['Plastic Bottles', 'Plastic Bags', 'Cans & Metal', 'Paper & Cardboard', 'Glass & Others'],
                    datasets: [{
                        data: currentEvent.wasteTypes,
                        backgroundColor: [
                            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'
                        ],
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: {
                                boxWidth: 20,
                                padding: 15
                            }
                        }
                    }
                }
            });
        }

        // Team Performance Chart (Bar Chart)
        if (teamPerformanceChartRef.current) {
            charts.current.teamPerformanceChart = new Chart(teamPerformanceChartRef.current, {
                type: 'bar',
                data: {
                    labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E', 'Team F'],
                    datasets: [{
                        label: 'KG Collected',
                        data: currentEvent.teamPerformance,
                        backgroundColor: backgroundColors[0],
                        borderColor: borderColors[0],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { grid: { display: false } },
                        y: { beginAtZero: true }
                    }
                }
            });
        }

        // Collection Efficiency Chart (Line Chart)
        if (efficiencyChartRef.current) {
            charts.current.efficiencyChart = new Chart(efficiencyChartRef.current, {
                type: 'line',
                data: {
                    labels: ['6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM'],
                    datasets: [{
                        label: 'Efficiency (%)',
                        data: currentEvent.efficiency,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        fill: true,
                        tension: 0.3
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { grid: { display: false } },
                        y: { beginAtZero: true, max: 100 }
                    }
                }
            });
        }

        // Cleanup function for useEffect
        return () => {
            destroyCharts();
        };
    }, [selectedEventId, currentEvent]); // Re-run effect when selectedEventId or currentEvent changes

    // Handle dropdown change
    const handleEventChange = (e) => {
        setSelectedEventId(e.target.value);
    };

    // Modal functions
    const openShareModal = () => setIsShareModalOpen(true);
    const closeShareModal = () => setIsShareModalOpen(false);

    // Dummy share function
    const shareReport = (platform) => {
        console.log(`Sharing report via ${platform}`);
        // In a real application, you'd implement actual sharing logic here.
        // For example:
        // if (platform === 'email') { window.location.href = 'mailto:?subject=Event Report&body=Check out our event report!'; }
        // else if (platform === 'whatsapp') { window.open('https://wa.me/?text=Check out our event report!', '_blank'); }
        alert(`Report shared via ${platform}! (This is a placeholder action)`);
        closeShareModal();
    };

    return (
        <>
            {/* Embedded styles */}
            <style>
                {`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    background: #f0f4f8;
                    min-height: 100vh;
                    display: flex;
                }

                .sidebar {
                    width: 280px;
                    background: white;
                    border-right: 1px solid #e9ecef;
                    padding: 0;
                    box-shadow: 2px 0 8px rgba(0,0,0,0.1);
                }

                .logo {
                    padding: 24px 20px;
                    border-bottom: 1px solid #e9ecef;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .logo-icon {
                    width: 32px;
                    height: 32px;
                    background: linear-gradient(45deg, #3DADE8, #21CBF3);
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: bold;
                    font-size: 18px;
                }

                .logo-text {
                    font-size: 20px;
                    font-weight: 600;
                    color: #3DADE8;
                }

                .nav-menu {
                    padding: 16px 0;
                }

                .nav-item {
                    display: flex;
                    align-items: center;
                    padding: 12px 20px;
                    color: #6c757d;
                    text-decoration: none;
                    transition: all 0.2s;
                    gap: 12px;
                    margin: 2px 12px;
                    border-radius: 8px;
                }

                .nav-item:hover {
                    background: #f8f9fa;
                    color: #495057;
                }

                .nav-item.active {
                    background: #3DADE8;
                    color: white;
                }

                .nav-icon {
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .main-content {
                    flex: 1;
                    padding: 32px;
                    overflow-y: auto;
                }

                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 32px;
                }

                .header-content h1 {
                    font-size: 32px;
                    font-weight: 600;
                    color: #212529;
                    margin-bottom: 8px;
                }

                .header-content p {
                    color: #6c757d;
                    font-size: 16px;
                }

                .event-selector {
                    display: flex;
                    gap: 12px;
                    align-items: center;
                }

                .event-dropdown {
                    padding: 12px 16px;
                    border: 1px solid #dee2e6;
                    border-radius: 8px;
                    background: white;
                    font-size: 14px;
                    min-width: 200px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }

                .share-btn {
                    padding: 12px 20px;
                    background: linear-gradient(45deg, #3DADE8, #21CBF3);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }

                .share-btn:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 4px 16px rgba(61, 173, 232, 0.3);
                }

                /* Event Info Card */
                .event-info-card {
                    background: linear-gradient(135deg, #3DADE8, #21CBF3);
                    color: white;
                    padding: 24px;
                    border-radius: 12px;
                    margin-bottom: 24px;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
                }

                .event-title {
                    font-size: 24px;
                    font-weight: 600;
                    margin-bottom: 8px;
                }

                .event-details {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 16px;
                    margin-top: 16px;
                }

                .event-detail {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .event-detail-icon {
                    font-size: 18px;
                }

                /* Analytics Charts Section */
                .analytics-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 24px;
                    margin-bottom: 32px;
                }

                .chart-card {
                    background: white;
                    padding: 24px;
                    border-radius: 12px;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
                }

                .chart-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }

                .chart-title {
                    font-size: 20px;
                    font-weight: 600;
                    color: #212529;
                }

                .chart-container {
                    position: relative;
                    height: 300px;
                }

                /* Event Stats Grid */
                .event-stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                    margin-bottom: 32px;
                }

                .stat-card {
                    background: white;
                    padding: 20px;
                    border-radius: 12px;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
                    text-align: center;
                    transition: all 0.3s;
                }

                .stat-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
                }

                .stat-icon {
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(45deg, #3DADE8, #21CBF3);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    color: white;
                    margin: 0 auto 16px;
                }

                .stat-value {
                    font-size: 32px;
                    font-weight: 700;
                    color: #212529;
                    margin-bottom: 8px;
                }

                .stat-label {
                    color: #6c757d;
                    font-size: 14px;
                    font-weight: 500;
                }

                /* Participation Timeline */
                .timeline-card {
                    background: white;
                    padding: 24px;
                    border-radius: 12px;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
                    margin-bottom: 32px;
                }

                .timeline-header {
                    margin-bottom: 24px;
                }

                .timeline-title {
                    font-size: 20px;
                    font-weight: 600;
                    color: #212529;
                    margin-bottom: 8px;
                }

                .timeline-subtitle {
                    color: #6c757d;
                    font-size: 14px;
                }

                .timeline-item {
                    display: flex;
                    align-items: center;
                    padding: 16px 0;
                    border-bottom: 1px solid #f8f9fa;
                }

                .timeline-item:last-child {
                    border-bottom: none;
                }

                .timeline-time {
                    width: 80px;
                    font-weight: 600;
                    color: #3DADE8;
                    font-size: 14px;
                }

                .timeline-dot {
                    width: 12px;
                    height: 12px;
                    background: #3DADE8;
                    border-radius: 50%;
                    margin: 0 16px;
                }

                .timeline-content {
                    flex: 1;
                }

                .timeline-action {
                    font-weight: 500;
                    color: #212529;
                    margin-bottom: 4px;
                }

                .timeline-detail {
                    font-size: 14px;
                    color: #6c757d;
                }

                /* Waste Breakdown - Changed to accommodate pie chart */
                .waste-breakdown {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 24px;
                    margin-bottom: 32px;
                }

                .waste-pie-chart {
                    background: white;
                    padding: 24px;
                    border-radius: 12px;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
                }

                .waste-pie-chart .chart-container {
                    height: 350px;
                }

                .waste-summary {
                    background: white;
                    padding: 24px;
                    border-radius: 12px;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
                }

                .waste-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 12px 0;
                    border-bottom: 1px solid #f8f9fa;
                }

                .waste-item:last-child {
                    border-bottom: none;
                }

                .waste-info {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .waste-color {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                }

                .waste-type {
                    font-weight: 500;
                    color: #212529;
                }

                .waste-amount {
                    font-weight: 600;
                    color: #3DADE8;
                }

                /* Additional Charts Grid */
                .additional-charts {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 24px;
                    margin-bottom: 32px;
                }

                /* Impact Summary */
                .impact-summary {
                    background: white;
                    padding: 24px;
                    border-radius: 12px;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
                }

                .impact-title {
                    font-size: 20px;
                    font-weight: 600;
                    color: #212529;
                    margin-bottom: 20px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .impact-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                    gap: 16px;
                }

                .impact-item {
                    text-align: center;
                    padding: 20px;
                    background: linear-gradient(135deg, rgba(61, 173, 232, 0.1), rgba(33, 203, 243, 0.1));
                    border-radius: 12px;
                    border: 1px solid rgba(61, 173, 232, 0.2);
                }

                .impact-icon {
                    font-size: 32px;
                    margin-bottom: 12px;
                }

                .impact-value {
                    font-size: 24px;
                    font-weight: 700;
                    color: #212529;
                    margin-bottom: 4px;
                }

                .impact-label {
                    font-size: 14px;
                    color: #6c757d;
                    font-weight: 500;
                }

                /* Share Modal */
                .modal {
                    display: ${isShareModalOpen ? 'block' : 'none'}; /* Controlled by React state */
                    position: fixed;
                    z-index: 1000;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0,0,0,0.5);
                    backdrop-filter: blur(5px);
                }

                .modal-content {
                    background-color: white;
                    margin: 15% auto;
                    padding: 32px;
                    border-radius: 16px;
                    width: 90%;
                    max-width: 500px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                }

                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 24px;
                }

                .modal-title {
                    font-size: 24px;
                    font-weight: 600;
                    color: #212529;
                }

                .close {
                    font-size: 28px;
                    font-weight: bold;
                    cursor: pointer;
                    color: #6c757d;
                }

                .close:hover {
                    color: #212529;
                }

                .share-options {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 16px;
                }

                .share-option {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 16px;
                    border: 1px solid #dee2e6;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .share-option:hover {
                    background: #f8f9fa;
                    border-color: #3DADE8;
                }

                @media (max-width: 768px) {
                    .main-content {
                        padding: 16px;
                    }
                    
                    .analytics-grid, .waste-breakdown, .additional-charts {
                        grid-template-columns: 1fr;
                    }
                    
                    .header {
                        flex-direction: column;
                        gap: 16px;
                        align-items: stretch;
                    }
                    
                    .event-selector {
                        justify-content: stretch;
                    }
                    
                    .event-dropdown {
                        flex: 1;
                    }
                }
                `}
            </style>

            <div className="main-content">
                <div className="header">
                    <div className="header-content">
                        <h1>Event Analytics</h1>
                        <p>Detailed insights and performance metrics for individual cleanup events</p>
                    </div>
                    <div className="event-selector">
                        <select className="event-dropdown" id="eventSelect" onChange={handleEventChange} value={selectedEventId}>
                            {Object.keys(eventData).map(key => (
                                <option key={key} value={key}>{eventData[key].title}</option>
                            ))}
                        </select>
                        <button className="share-btn" onClick={openShareModal}>
                            <span role="img" aria-label="Share">📤</span> Share Report
                        </button>
                    </div>
                </div>

                {/* Event Info Card */}
                <div className="event-info-card">
                    <div className="event-title">{currentEvent.title}</div>
                    <div className="event-details">
                        <div className="event-detail">
                            <div className="event-detail-icon" role="img" aria-label="Location">📍</div>
                            <div>{currentEvent.location}</div>
                        </div>
                        <div className="event-detail">
                            <div className="event-detail-icon" role="img" aria-label="Time">⏰</div>
                            <div>{currentEvent.time}</div>
                        </div>
                        <div className="event-detail">
                            <div className="event-detail-icon" role="img" aria-label="Weather">🌤️</div>
                            <div>{currentEvent.weather}</div>
                        </div>
                        <div className="event-detail">
                            <div className="event-detail-icon" role="img" aria-label="Team Leader">👥</div>
                            <div>{currentEvent.leader}</div>
                        </div>
                    </div>
                </div>

                {/* Event Statistics */}
                <div className="event-stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon" role="img" aria-label="Waste">🗑️</div>
                        <div className="stat-value">{currentEvent.stats.waste}</div>
                        <div className="stat-label">Kilograms Collected</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon" role="img" aria-label="Volunteers">👥</div>
                        <div className="stat-value">{currentEvent.stats.volunteers}</div>
                        <div className="stat-label">Volunteers Participated</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon" role="img" aria-label="Hours">⏱️</div>
                        <div className="stat-value">{currentEvent.stats.hours}</div>
                        <div className="stat-label">Total Hours Contributed</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon" role="img" aria-label="Distance">📏</div>
                        <div className="stat-value">{currentEvent.stats.distance}</div>
                        <div className="stat-label">Kilometers Cleaned</div>
                    </div>
                </div>

                {/* Analytics Charts */}
                <div className="analytics-grid">
                    <div className="chart-card">
                        <div className="chart-header">
                            <div className="chart-title">Hourly Collection Rate</div>
                        </div>
                        <div className="chart-container">
                            <canvas ref={hourlyChartRef}></canvas>
                        </div>
                    </div>

                    <div className="chart-card">
                        <div className="chart-header">
                            <div className="chart-title">Volunteer Participation</div>
                        </div>
                        <div className="chart-container">
                            <canvas ref={participationChartRef}></canvas>
                        </div>
                    </div>
                </div>

                {/* Waste Type Breakdown with Pie Chart */}
                <div className="waste-breakdown">
                    <div className="waste-pie-chart">
                        <div className="chart-header">
                            <div className="chart-title">Waste Type Distribution</div>
                        </div>
                        <div className="chart-container">
                            <canvas ref={wasteTypeChartRef}></canvas>
                        </div>
                    </div>

                    <div className="waste-summary">
                        <div className="chart-header">
                            <div className="chart-title">Waste Breakdown Summary</div>
                        </div>
                        <div className="waste-item">
                            <div className="waste-info">
                                <div className="waste-color" style={{ background: '#FF6384' }}></div>
                                <div className="waste-type" role="img" aria-label="Plastic Bottles">🥤 Plastic Bottles</div>
                            </div>
                            <div className="waste-amount">{currentEvent.wasteTypes[0]} kg ({Math.round((currentEvent.wasteTypes[0] / currentEvent.stats.waste) * 100)}%)</div>
                        </div>
                        <div className="waste-item">
                            <div className="waste-info">
                                <div className="waste-color" style={{ background: '#36A2EB' }}></div>
                                <div className="waste-type" role="img" aria-label="Plastic Bags">🛍️ Plastic Bags</div>
                            </div>
                            <div className="waste-amount">{currentEvent.wasteTypes[1]} kg ({Math.round((currentEvent.wasteTypes[1] / currentEvent.stats.waste) * 100)}%)</div>
                        </div>
                        <div className="waste-item">
                            <div className="waste-info">
                                <div className="waste-color" style={{ background: '#FFCE56' }}></div>
                                <div className="waste-type" role="img" aria-label="Cans & Metal">🥫 Cans & Metal</div>
                            </div>
                            <div className="waste-amount">{currentEvent.wasteTypes[2]} kg ({Math.round((currentEvent.wasteTypes[2] / currentEvent.stats.waste) * 100)}%)</div>
                        </div>
                        <div className="waste-item">
                            <div className="waste-info">
                                <div className="waste-color" style={{ background: '#4BC0C0' }}></div>
                                <div className="waste-type" role="img" aria-label="Paper & Cardboard">🗞️ Paper & Cardboard</div>
                            </div>
                            <div className="waste-amount">{currentEvent.wasteTypes[3]} kg ({Math.round((currentEvent.wasteTypes[3] / currentEvent.stats.waste) * 100)}%)</div>
                        </div>
                        <div className="waste-item">
                            <div className="waste-info">
                                <div className="waste-color" style={{ background: '#9966FF' }}></div>
                                <div className="waste-type" role="img" aria-label="Glass & Others">🪨 Glass & Others</div>
                            </div>
                            <div className="waste-amount">{currentEvent.wasteTypes[4]} kg ({Math.round((currentEvent.wasteTypes[4] / currentEvent.stats.waste) * 100)}%)</div>
                        </div>
                    </div>
                </div>

                {/* Additional Analytics Charts */}
                <div className="additional-charts">
                    <div className="chart-card">
                        <div className="chart-header">
                            <div className="chart-title">Team Performance</div>
                        </div>
                        <div className="chart-container">
                            <canvas ref={teamPerformanceChartRef}></canvas>
                        </div>
                    </div>

                    <div className="chart-card">
                        <div className="chart-header">
                            <div className="chart-title">Collection Efficiency</div>
                        </div>
                        <div className="chart-container">
                            <canvas ref={efficiencyChartRef}></canvas>
                        </div>
                    </div>
                </div>

                {/* Activity Timeline */}
                <div className="timeline-card">
                    <div className="timeline-header">
                        <div className="timeline-title">Event Timeline</div>
                        <div className="timeline-subtitle">Key activities and milestones during the cleanup</div>
                    </div>
                    
                    {currentEvent.timeline.map((item, index) => (
                        <div className="timeline-item" key={index}>
                            <div className="timeline-time">{item.time}</div>
                            <div className="timeline-dot"></div>
                            <div className="timeline-content">
                                <div className="timeline-action">{item.action}</div>
                                <div className="timeline-detail">{item.detail}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Environmental Impact */}
                <div className="impact-summary">
                    <div className="impact-title">
                        <span role="img" aria-label="Leaf">🌱</span> Environmental Impact of This Event
                    </div>
                    <div className="impact-grid">
                        <div className="impact-item">
                            <div className="impact-icon" role="img" aria-label="Turtle">🐢</div>
                            <div className="impact-value">{currentEvent.impact.marineAnimals}</div>
                            <div className="impact-label">Marine Animals Protected</div>
                        </div>
                        <div className="impact-item">
                            <div className="impact-icon" role="img" aria-label="Recycle">♻️</div>
                            <div className="impact-value">{currentEvent.impact.itemsRecycled}</div>
                            <div className="impact-label">Items Recycled</div>
                        </div>
                        <div className="impact-item">
                            <div className="impact-icon" role="img" aria-label="Water Drop">💧</div>
                            <div className="impact-value">{currentEvent.impact.co2Prevented}</div>
                            <div className="impact-label">Tons CO₂ Prevented</div>
                        </div>
                        <div className="impact-item">
                            <div className="impact-icon" role="img" aria-label="Camera">📸</div>
                            <div className="impact-value">{currentEvent.impact.socialMediaReach}</div>
                            <div className="impact-label">Social Media Reach</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Share Modal */}
            <div id="shareModal" className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="modal-title">Share Event Report</div>
                        <span className="close" onClick={closeShareModal}>&times;</span>
                    </div>
                    <div className="share-options">
                        <div className="share-option" onClick={() => shareReport('email')}>
                            <div style={{ fontSize: '24px' }} role="img" aria-label="Email">📧</div>
                            <div>
                                <div style={{ fontWeight: 600 }}>Email</div>
                                <div style={{ fontSize: '12px', color: '#6c757d' }}>Send via email</div>
                            </div>
                        </div>
                        <div className="share-option" onClick={() => shareReport('whatsapp')}>
                            <div style={{ fontSize: '24px' }} role="img" aria-label="WhatsApp">💬</div>
                            <div>
                                <div style={{ fontWeight: 600 }}>WhatsApp</div>
                                <div style={{ fontSize: '12px', color: '#6c757d' }}>Share on WhatsApp</div>
                            </div>
                        </div>
                        <div className="share-option" onClick={() => shareReport('facebook')}>
                            <div style={{ fontSize: '24px' }} role="img" aria-label="Facebook">📘</div>
                            <div>
                                <div style={{ fontWeight: 600 }}>Facebook</div>
                                <div style={{ fontSize: '12px', color: '#6c757d' }}>Post to Facebook</div>
                            </div>
                        </div>
                        <div className="share-option" onClick={() => shareReport('twitter')}>
                            <div style={{ fontSize: '24px' }} role="img" aria-label="Twitter">🐦</div>
                            <div>
                                <div style={{ fontWeight: 600 }}>Twitter</div>
                                <div style={{ fontSize: '12px', color: '#6c757d' }}>Tweet the report</div>
                            </div>
                        </div>
                        <div className="share-option" onClick={() => shareReport('instagram')}>
                            <div style={{ fontSize: '24px' }} role="img" aria-label="Instagram">📷</div>
                            <div>
                                <div style={{ fontWeight: 600 }}>Instagram</div>
                                <div style={{ fontSize: '12px', color: '#6c757d' }}>Share as story</div>
                            </div>
                        </div>
                        <div className="share-option" onClick={() => shareReport('download')}>
                            <div style={{ fontSize: '24px' }} role="img" aria-label="Download PDF">📄</div>
                            <div>
                                <div style={{ fontWeight: 600 }}>Download PDF</div>
                                <div style={{ fontSize: '12px', color: '#6c757d' }}>Save as PDF</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Analytics;
