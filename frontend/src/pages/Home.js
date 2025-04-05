 import React from 'react';
 import { Link } from 'react-router-dom';
 const Home = () => {
  return (
    <main>
      <section className="bg-white py-20">
      <div>Welcome to Home Page</div>;
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Your Health Records, Simplified
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Secure, accessible, and convenient electronic health records 
management
            </p>
            <div className="space-x-4">
              <Link
                to="/register"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg 
hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/about"
                className="bg-gray-100 text-gray-800 px-8 py-3 rounded-lg 
hover:bg-gray-200 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose CareConnect?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Unique Health
 ID</h3>
              <p className="text-gray-600">
                Access your records with a single unique identifier across all 
healthcare providers
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure 
Records</h3>
              <p className="text-gray-600">
                Your health data is encrypted and protected with industry-leading 
security measures
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy 
Access</h3>
              <p className="text-gray-600">
                View and manage your health records anytime, anywhere through our 
platform
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
export default Home;