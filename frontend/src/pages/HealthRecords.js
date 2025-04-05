import React, { useEffect, useState } from 'react';

const HealthRecords = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/health-records') // Adjust API URL based on your backend route
      .then((response) => response.json())
      .then((data) => setRecords(data))
      .catch((error) => console.error('Error fetching records:', error));
  }, []);

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-6">Health Records</h1>
      {records.length > 0 ? (
        <ul>
          {records.map((record) => (
            <li key={record._id} className="border p-4 mb-4 shadow-md">
              <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
              <p><strong>Treatment:</strong> {record.treatment}</p>
              <p><strong>Prescription:</strong> {record.prescription}</p>
              <p><strong>Date:</strong> {new Date(record.date).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No health records found.</p>
      )}
    </div>
  );
};

export default HealthRecords;
