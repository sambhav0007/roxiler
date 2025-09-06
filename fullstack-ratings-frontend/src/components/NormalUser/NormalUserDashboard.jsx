import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const NormalUserDashboard = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [selectedRatings, setSelectedRatings] = useState({});

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      // Corrected API endpoint call to fetch user-specific ratings
      const response = await axios.get('/stores');
      setStores(response.data);
    } catch (err) {
      setError('Failed to fetch stores.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRatingChange = (storeId, ratingValue) => {
    setSelectedRatings(prev => ({
      ...prev,
      [storeId]: ratingValue,
    }));
  };

  const handleRatingSubmit = async (storeId, existingRatingId) => {
    const ratingValue = selectedRatings[storeId];
    if (!ratingValue) {
      alert('Please select a rating before submitting.');
      return;
    }

    try {
      if (existingRatingId) {
        // If a rating already exists, send a PUT request to update it
        await axios.put(`/ratings/${existingRatingId}`, { rating: parseInt(ratingValue, 10) });
        alert('Rating updated successfully!');
      } else {
        // If no rating exists, send a POST request to create a new one
        await axios.post('/ratings', { storeId, rating: parseInt(ratingValue, 10) });
        alert('Rating submitted successfully!');
      }
      fetchStores();
    } catch (err) {
      alert('Failed to submit rating.');
      console.error(err);
    }
  };

  if (loading) return <div className="text-center mt-5">Loading stores...</div>;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">All Stores</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {stores.length > 0 ? (
          stores.map((store) => (
            <div key={store.id} className="col">
              <div className="card h-100 shadow-sm">
                <svg
                  className="bd-placeholder-img card-img-top"
                  width="100%"
                  height="180"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Placeholder: Store Photo"
                  preserveAspectRatio="xMidYMid slice"
                  focusable="false"
                >
                  <title>Store Photo</title>
                  <rect width="100%" height="100%" fill="#868e96"></rect>
                  <text x="50%" y="50%" fill="#dee2e6" dy=".3em">
                    Store Photo
                  </text>
                </svg>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{store.name}</h5>
                  <p className="card-text text-muted mb-2">{store.address}</p>
                  <div className="d-flex align-items-center mb-3">
                    <strong>Overall Rating:</strong>
                    <span className="ms-2">
                      {store.averageRating?.toFixed(1) || 'N/A'} ★
                    </span>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <strong>Your Rating:</strong>
                    <span className="ms-2">
                      {store.userRating?.rating?.toFixed(1) || 'N/A'} ★
                    </span>
                  </div>
                  
                  <div className="mt-auto">
                    <label htmlFor={`rating-${store.id}`} className="form-label">
                      Change Rating:
                    </label>
                    <div className="input-group">
                      <select
                        id={`rating-${store.id}`}
                        className="form-select"
                        value={selectedRatings[store.id] || ''}
                        onChange={(e) => handleRatingChange(store.id, e.target.value)}
                      >
                        <option value="" disabled>
                          Select a rating
                        </option>
                        <option value="1">1 ★</option>
                        <option value="2">2 ★★</option>
                        <option value="3">3 ★★★</option>
                        <option value="4">4 ★★★★</option>
                        <option value="5">5 ★★★★★</option>
                      </select>
                      <button 
                        className="btn btn-primary"
                        onClick={() => handleRatingSubmit(store.id, store.userRating?.id)}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center w-100">No stores found.</p>
        )}
      </div>
    </div>
  );
};

export default NormalUserDashboard;