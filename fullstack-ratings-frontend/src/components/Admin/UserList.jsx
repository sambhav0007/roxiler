import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ name: '', email: '', address: '', role: '' });

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/users', { params: filters });
      setUsers(response.data);
    } catch (err) {
      setError('Failed to fetch users.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <h3 className="mb-3">User List</h3>
      <div className="card p-3 mb-3">
        <h5 className="card-title">Filters</h5>
        <div className="row g-3">
          <div className="col-md-3">
            <input type="text" className="form-control" name="name" placeholder="Filter by Name" value={filters.name} onChange={handleFilterChange} />
          </div>
          <div className="col-md-3">
            <input type="text" className="form-control" name="email" placeholder="Filter by Email" value={filters.email} onChange={handleFilterChange} />
          </div>
          <div className="col-md-3">
            <input type="text" className="form-control" name="address" placeholder="Filter by Address" value={filters.address} onChange={handleFilterChange} />
          </div>
          <div className="col-md-3">
            <select className="form-select" name="role" value={filters.role} onChange={handleFilterChange}>
              <option value="">All Roles</option>
              <option value="System Administrator">System Administrator</option>
              <option value="Normal User">Normal User</option>
              <option value="Store Owner">Store Owner</option>
            </select>
          </div>
        </div>
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;