import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const response = await axios.get('/stores');
      setStores(response.data);
    } catch (err) {
      setError('Failed to fetch stores.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (storeId) => {
    try {
      await axios.patch(`/stores/${storeId}/approve`);
      alert('Store approved successfully!');
      fetchStores(); // Re-fetch the store list to update the UI
    } catch (err) {
      alert('Failed to approve store.');
      console.error(err);
    }
  };

  if (loading) return <div>Loading stores...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <h3 className="mb-3">Store List</h3>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Owner</th>
            <th>Approval Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stores.map(store => (
            <tr key={store.id}>
              <td>{store.name}</td>
              <td>{store.owner.name}</td>
              <td>
                {store.isApproved ? (
                  <span className="badge bg-success">Approved</span>
                ) : (
                  <span className="badge bg-warning text-dark">Pending</span>
                )}
              </td>
              <td>
                {!store.isApproved && (
                  <button className="btn btn-success btn-sm" onClick={() => handleApprove(store.id)}>
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StoreList;