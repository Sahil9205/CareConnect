 import React, { useState, useEffect } from 'react';
 import axios from 'axios';
 const Dashboard = () => {
  <div>Dashboard Page</div>;
  const [user, setUser] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const [userResponse, recordsResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/profile', config),
          axios.get('http://localhost:5000/api/health-records', config)
        ]);
        setUser(userResponse.data);
        setRecords(recordsResponse.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching data');
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="text-red-600 text-center">{error}</div>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome, 
{user?.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded">
            <h2 className="text-lg font-semibold mb-2">Personal Information</h2>
            <p>Health ID: {user?.healthId}</p>
            <p>Email: {user?.email}</p>
            <p>Phone: {user?.phoneNumber}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded mr-2">
              View Records
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded">
              Book Appointment
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Health 
Records</h2>
        {records.length > 0 ? (
          <div className="space-y-4">
            {records.map((record) => (
              <div key={record._id} className="border-b pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{record.diagnosis}</h3>
                    <p className="text-gray-600">
                      {new Date(record.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="text-blue-600">
                    {record.organizationId?.name}
                  </span>
                </div>
                <p className="mt-2">{record.treatment}</p>
                {record.prescription && (
                  <p className="mt-2 text-gray-700">
                    Prescription: {record.prescription}
                  </p>
                )}
              </div>
            )
        )
    }
    </div>
 ) : (
    <p className="text-gray-600">No health records found.</p>
    )
}
    </div>
    </div>
    )
}
export default Dashboard;
