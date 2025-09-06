import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './UserList';
import StoreList from './StoreList';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, stores: 0, ratings: 0 });
  const [activeTab, setActiveTab] = useState('stats');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/admin/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h2 className="mb-4">Admin Dashboard</h2>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'stats' ? 'active' : ''}`} onClick={() => setActiveTab('stats')}>
            Overview
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
            Manage Users
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'stores' ? 'active' : ''}`} onClick={() => setActiveTab('stores')}>
            Manage Stores
          </button>
        </li>
      </ul>

      <div className="tab-content mt-3">
        {activeTab === 'stats' && (
          <div className="row">
            <div className="col-md-4">
              <div className="card text-center p-3">
                <h4>Total Users</h4>
                <h3>{stats.users}</h3>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center p-3">
                <h4>Total Stores</h4>
                <h3>{stats.stores}</h3>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center p-3">
                <h4>Total Ratings</h4>
                <h3>{stats.ratings}</h3>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'users' && <UserList />}
        {activeTab === 'stores' && <StoreList />}
      </div>
    </div>
  );
};

export default AdminDashboard;