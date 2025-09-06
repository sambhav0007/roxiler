import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const storeSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  address: Yup.string().required('Required'),
  // No validation for file yet, as it's optional
});

const StoreOwnerDashboard = () => {
  const [storeData, setStoreData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchStoreData();
  }, [user]);

  const fetchStoreData = async () => {
    try {
      const response = await axios.get(`/stores/owner/${user.id}`);
      setStoreData(response.data);
    } catch (err) {
      setError('Failed to fetch store data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleFileChange = (event) => {
    setFile(event.currentTarget.files[0]);
  };

  const handleAddStore = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('address', values.address);
    if (file) {
      formData.append('photo', file);
    }
    
    try {
      await axios.post('/stores', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Store submitted for approval!');
      resetForm();
      setFile(null); // Clear file input
      fetchStoreData();
    } catch (err) {
      alert('Failed to submit store. Please try again.');
    }
    setSubmitting(false);
  };

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="card p-4">
      <h2 className="card-title text-center mb-4">Store Owner Dashboard</h2>
      {storeData ? (
        <>
          {storeData.isApproved ? (
            // Display store details if approved
            <>
              {/* ... (existing code to display store info and ratings) */}
            </>
          ) : (
            <div className="alert alert-warning text-center">Your store is pending approval.</div>
          )}
        </>
      ) : (
        // Display a form if no store is associated
        <div className="card p-4">
          <h4 className="card-title text-center">Submit a Store for Approval</h4>
          <Formik
            initialValues={{ name: '', email: '', address: '' }}
            validationSchema={storeSchema}
            onSubmit={handleAddStore}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Store Name</label>
                  <Field type="text" name="name" className="form-control" />
                  <ErrorMessage name="name" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Store Email</label>
                  <Field type="email" name="email" className="form-control" />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Store Address</label>
                  <Field type="text" name="address" className="form-control" />
                  <ErrorMessage name="address" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                  <label htmlFor="photo" className="form-label">Store Photo (Optional)</label>
                  <input type="file" name="photo" className="form-control" onChange={handleFileChange} />
                </div>
                <button type="submit" className="btn btn-primary mt-3" disabled={isSubmitting}>
                  Submit Store
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default StoreOwnerDashboard;