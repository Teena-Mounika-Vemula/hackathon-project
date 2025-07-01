import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Using 'chart.js/auto' for Chart.js 3+

// Main adDashboard Component
const adDashboard = () => {
    return (
        <div className="min-h-screen flex font-inter">
            <MainContent />
        </div>
    );
};

// Main Content Area Component
const MainContent = () => {
    return (
            <ContentArea />
    );
};


// Content Area Component (holds charts)
const ContentArea = () => {
    return (
        <div className="mx-auto my-8 max-w-7xl px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <ChartContainer
                    chartId="volunteerChart"
                    title="Volunteer Engagement Over Time"
                    type="line"
                    data={{
                        labels: ['January', 'February', 'March', 'April', 'May', 'June','July','August','September','October','November','December'],
                        datasets: [{
                            label: 'Active Volunteers',
                            data: [980, 1050, 1120, 1180, 1210, 1247, 1200, 1090, 1150, 1190, 1220, 1250],
                            borderColor: '#00BCD4',
                            backgroundColor: 'rgba(0, 188, 212, 0.1)',
                            fill: true,
                            tension: 0.4,
                            borderWidth: 3,
                            pointBackgroundColor: '#00BCD4',
                            pointBorderColor: '#ffffff',
                            pointBorderWidth: 2,
                            pointRadius: 6
                        }]
                    }}
                    options={{
                        responsive: true,
                        plugins: { legend: { display: false } },
                        scales: {
                            y: { beginAtZero: false, min: 900, grid: { color: '#e9ecef' } },
                            x: { grid: { color: '#e9ecef' } }
                        }
                    }}
                    singleChart={true}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ChartContainer
                    chartId="cleanupChart"
                    title="Beach Cleanup Impact"
                    type="bar"
                    data={{
                        labels: ['Plastic', 'Glass', 'Metal', 'Organic', 'Other'],
                        datasets: [{
                            label: 'Waste Collected (kg)',
                            data: [5200, 2100, 1800, 3800, 2300],
                            backgroundColor: ['#00BCD4', '#26C6DA', '#4DD0E1', '#80DEEA', '#B2EBF2'],
                            borderRadius: 8,
                            borderSkipped: false
                        }]
                    }}
                    options={{
                        responsive: true,
                        plugins: { legend: { display: false } },
                        scales: {
                            y: { beginAtZero: true, grid: { color: '#e9ecef' } },
                            x: { grid: { display: false } }
                        }
                    }}
                >
                    <MetricHighlight value="15.2k" label="Kg Waste Collected This Year" />
                </ChartContainer>

                <ChartContainer
                    chartId="growthChart"
                    title="Volunteer Growth Rate"
                    type="line"
                    data={{
                        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                        datasets: [{
                            label: 'New Volunteers',
                            data: [45, 52, 38, 61],
                            borderColor: '#00BCD4',
                            backgroundColor: 'rgba(0, 188, 212, 0.1)',
                            fill: true,
                            tension: 0.4,
                            borderWidth: 3,
                            pointBackgroundColor: '#00BCD4',
                            pointBorderColor: '#ffffff',
                            pointBorderWidth: 2,
                            pointRadius: 5
                        }]
                    }}
                    options={{
                        responsive: true,
                        plugins: { legend: { display: false } },
                        scales: {
                            y: { beginAtZero: true, grid: { color: '#e9ecef' } },
                            x: { grid: { color: '#e9ecef' } }
                        }
                    }}
                >
                    <MetricHighlight value="1,247" label="Active Volunteers" />
                </ChartContainer>
            </div>
        </div>
    );
};

// Reusable Chart Container Component
const ChartContainer = ({ chartId, title, type, data, options, children, singleChart }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null); // To store the Chart.js instance

    useEffect(() => {
        if (chartRef.current) {
            // Destroy existing chart instance before creating a new one
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, { type, data, options });
        }

        // Cleanup function to destroy chart on component unmount
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [type, data, options]); // Re-run effect if these props change

    const singleChartClass = singleChart ? 'lg:col-span-2 max-w-4xl mx-auto' : '';

    return (
        <div className={`bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm ${singleChartClass}`}>
            <div className="text-gray-800 text-lg font-semibold mb-6 text-center">
                {title}
            </div>
            <canvas id={chartId} ref={chartRef} className="max-h-64"></canvas>
            {children} {/* Renders MetricHighlight if provided */}
        </div>
    );
};

// Metric Highlight Component
const MetricHighlight = ({ value, label }) => {
    return (
        <div className="text-center p-4 bg-cyan-50 rounded-xl my-4 shadow-inner">
            <div className="text-3xl font-bold text-cyan-500">
                {value}
            </div>
            <div className="text-gray-600 text-sm mt-2">
                {label}
            </div>
        </div>
    );
};

export default adDashboard; // Export the main adDashboard component as default
