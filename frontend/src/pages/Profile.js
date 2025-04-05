 import React, { useState, useEffect } from 'react';
 import axios from 'axios';
 const Profile = () => {
  <div>Profile Page</div>;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    address: ''
  });
  useEffect(() => {
    fetchProfile();
  }, []);
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
      setFormData({
        name: response.data.name,
        phoneNumber: response.data.phoneNumber,
        address: response.data.address
      });
      setLoading(false);
    } catch (err) {
      setError('Error fetching profile');
      setLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:5000/api/profile',
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setUser(response.data);
      setIsEditing(false);
    } catch (err) {
      setError('Error updating profile');
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }
  if (!user) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="text-center text-red-600">User not found</div>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 
rounded mb-4">
            {error}
          </div>
        )}
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-gray-700">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded 
hover:bg-blue-700"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded 
hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h2 className="text-lg font-semibold">Personal Information</h2>
                <p className="mt-2">
                  <span className="font-medium">Name:</span> {user.name}
                </p>
                <p>
                  <span className="font-medium">Health ID:</span> {user.healthId}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {user.email}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {user.phoneNumber}
                </p>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Additional Information</h2>
                <p className="mt-2">
                  <span className="font-medium">Role:</span> {user.role}
                </p>
                <p>
                  <span className="font-medium">Date of Birth:</span>{' '}
                  {new Date(user.dateOfBirth).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Gender:</span> {user.gender}
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Address</h2>
              <p className="mt-2">{user.address}</p>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
export default Profile;