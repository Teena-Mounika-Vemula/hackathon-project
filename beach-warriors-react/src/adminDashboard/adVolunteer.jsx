/*
 * File: adVolunteer.jsx
 * Description: The main React component for the volunteers and organizers dashboard.
 * It now uses Tailwind CSS for styling, consistent with analytics.jsx.
 */
import React, { useState, useMemo } from 'react';

// Data for the volunteers and organizers
const volunteerData = [
    { id: 1, name: 'Sarah Johnson', role: 'Volunteer', email: 'sarah@email.com', phone: '+91 98765 43210', joinDate: '2025-06-15', experience: '6 months', events: 15, status: 'Active' },
    { id: 2, name: 'Mike Chen', role: 'Organizer', email: 'mike@email.com', phone: '+91 98765 43211', joinDate: '2025-05-20', experience: '2 years', events: 28, status: 'Active' },
    { id: 3, name: 'Emma Davis', role: 'Volunteer', email: 'emma@email.com', phone: '+91 98765 43212', joinDate: '2025-06-01', experience: '3 months', events: 8, status: 'Inactive' },
    { id: 4, name: 'Raj Patel', role: 'Volunteer', email: 'raj@email.com', phone: '+91 98765 43213', joinDate: '2025-06-10', experience: '4 months', events: 12, status: 'Active' },
    { id: 5, name: 'Anita Sharma', role: 'Organizer', email: 'anita@email.com', phone: '+91 98765 43214', joinDate: '2025-04-15', experience: '1.5 years', events: 35, status: 'Active' },
    { id: 6, name: 'David Kumar', role: 'Volunteer', email: 'david@email.com', phone: '+91 98765 43215', joinDate: '2025-06-25', experience: '2 months', events: 5, status: 'Pending' },
];

const AdVolunteer = () => {
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    // Memoize the filtered data to avoid re-calculation on every render
    const filteredVolunteers = useMemo(() => {
        return volunteerData.filter(person => {
            const roleMatch = roleFilter === 'all' || person.role.toLowerCase() === roleFilter;
            const statusMatch = statusFilter === 'all' || person.status.toLowerCase() === statusFilter;
            return roleMatch && statusMatch;
        });
    }, [roleFilter, statusFilter]);

    const addOrganizer = () => {
        // In a real app, this would likely open a modal or navigate to a new form.
        alert('Add Organizer functionality would open a modal or redirect to a form.');
    };

    // Helper to get the right Tailwind CSS classes for the status
    const getStatusClass = (status) => {
        const baseClass = "py-1 px-3 rounded-full text-xs font-semibold inline-block";
        switch (status.toLowerCase()) {
            case 'active': return `${baseClass} bg-green-100 text-green-800`;
            case 'inactive': return `${baseClass} bg-red-100 text-red-800`;
            case 'pending': return `${baseClass} bg-yellow-100 text-yellow-800`;
            default: return `${baseClass} bg-gray-100 text-gray-800`;
        }
    };

    // Helper to get the right Tailwind CSS classes for the role
    const getRoleClass = (role) => {
        const baseClass = "font-semibold";
        switch (role.toLowerCase()) {
            case 'volunteer': return `${baseClass} text-cyan-600`;
            case 'organizer': return `${baseClass} text-amber-600`;
            default: return baseClass;
        }
    };

    return (
        <div className="flex min-h-screen font-sans bg-cyan-500">

            {/* Main Content */}
            <main className="flex-1 bg-gray-100">
                
            <div className="bg-white m-5 mt-0 p-8 rounded-2xl shadow-lg max-w-5xl mx-auto">
                    <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                            <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="py-2 px-4 border-2 border-cyan-500 rounded-lg bg-white text-cyan-500 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400 hover:bg-cyan-500 hover:text-white transition">
                                <option value="all">All Roles</option>
                                <option value="volunteer">Volunteers</option>
                                <option value="organizer">Organizers</option>
                            </select>
                            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="py-2 px-4 border-2 border-cyan-500 rounded-lg bg-white text-cyan-500 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400 hover:bg-cyan-500 hover:text-white transition">
                                <option value="all">All Statuses</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="pending">Pending</option>
                            </select>
                        </div>
                        <button onClick={addOrganizer} className="bg-cyan-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-cyan-600 transition-transform transform hover:-translate-y-0.5 shadow-md">
                            Add Organizer
                        </button>
                    </div>

                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="w-full table-auto text-left">
                            <thead className="bg-gray-50 border-b-2 border-gray-200">
                                <tr>
                                    <th className="p-4 font-semibold text-gray-700">Name</th>
                                    <th className="p-4 font-semibold text-gray-700">Role</th>
                                    <th className="p-4 font-semibold text-gray-700">Email</th>
                                    <th className="p-4 font-semibold text-gray-700">Phone</th>
                                    <th className="p-4 font-semibold text-gray-700">Join Date</th>
                                    <th className="p-4 font-semibold text-gray-700">Experience</th>
                                    <th className="p-4 font-semibold text-gray-700">Events</th>
                                    <th className="p-4 font-semibold text-gray-700">Status</th>
                                    <th className="p-4 font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredVolunteers.map(person => (
                                    <tr key={person.id} className="hover:bg-gray-50 border-b border-gray-200 last:border-b-0">
                                        <td className="p-4 text-gray-800">{person.name}</td>
                                        <td className="p-4"><span className={getRoleClass(person.role)}>{person.role}</span></td>
                                        <td className="p-4 text-gray-600">{person.email}</td>
                                        <td className="p-4 text-gray-600">{person.phone}</td>
                                        <td className="p-4 text-gray-600">{person.joinDate}</td>
                                        <td className="p-4"><span className="bg-blue-100 text-blue-800 py-1 px-2 rounded-md text-xs font-semibold">{person.experience}</span></td>
                                        <td className="p-4 text-gray-600 text-center">{person.events}</td>
                                        <td className="p-4"><span className={getStatusClass(person.status)}>{person.status}</span></td>
                                        <td className="p-4 flex gap-2">
                                            <button className="bg-cyan-500 text-white py-1 px-3 rounded-md text-sm hover:bg-cyan-600 transition">Edit</button>
                                            <button className="bg-green-500 text-white py-1 px-3 rounded-md text-sm hover:bg-green-600 transition">Contact</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdVolunteer;
