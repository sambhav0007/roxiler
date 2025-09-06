import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const SignupSchema = Yup.object().shape({
  name: Yup.string().min(20, 'Min 20 characters').max(60, 'Max 60 characters').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  address: Yup.string().max(400, 'Max 400 characters').required('Required'),
  password: Yup.string()
    .min(8, '8-16 characters')
    .max(16, '8-16 characters')
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/, 'Must include an uppercase letter and a special character')
    .required('Required'),
  role: Yup.string().oneOf(['System Administrator', 'Store Owner', 'Normal User'], 'Select a role').required('Required'),
});

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
  },
  card: {
    borderRadius: '20px',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    background: 'rgba(255,255,255,0.95)',
    padding: '2.5rem',
    maxWidth: '420px',
    width: '100%',
  },
  title: {
    fontWeight: '700',
    fontSize: '2rem',
    marginBottom: '1.5rem',
    color: '#2575fc',
    textAlign: 'center',
    letterSpacing: '1px',
  },
  label: {
    fontWeight: '500',
    marginBottom: '0.5rem',
    color: '#333',
  },
  input: {
    borderRadius: '8px',
    border: '1px solid #ddd',
    padding: '0.75rem',
    fontSize: '1rem',
    marginBottom: '0.5rem',
    transition: 'border-color 0.2s',
    width: '100%',
    boxSizing: 'border-box',
  },
  select: {
    borderRadius: '8px',
    border: '1px solid #ddd',
    padding: '0.75rem',
    fontSize: '1rem',
    marginBottom: '0.5rem',
    width: '100%',
    boxSizing: 'border-box',
    background: '#fff',
  },
  button: {
    background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '0.75rem',
    fontWeight: '600',
    fontSize: '1.1rem',
    width: '100%',
    marginTop: '1rem',
    boxShadow: '0 4px 12px rgba(31, 38, 135, 0.15)',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  error: {
    color: '#e74c3c',
    fontSize: '0.95rem',
    marginBottom: '0.5rem',
  },
  alert: {
    marginTop: '1rem',
    borderRadius: '8px',
    padding: '0.75rem',
    fontWeight: '500',
    fontSize: '1rem',
    textAlign: 'center',
  },
  alertDanger: {
    background: '#ffe6e6',
    color: '#e74c3c',
    border: '1px solid #e74c3c',
  },
  alertSuccess: {
    background: '#e6ffe6',
    color: '#27ae60',
    border: '1px solid #27ae60',
  },
  switch: {
    marginTop: '1.5rem',
    textAlign: 'center',
    fontSize: '1rem',
  },
  link: {
    color: '#2575fc',
    fontWeight: '600',
    textDecoration: 'underline',
    cursor: 'pointer',
    marginLeft: '5px',
  },
};

const Signup = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      await axios.post('/auth/signup', values);
      setStatus({ success: true, message: 'Signup successful! Please log in.' });
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setStatus({ success: false, message: error.response?.data?.message || 'Signup failed. Please try again.' });
    }
    setSubmitting(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Sign Up</h2>
        <Formik
          initialValues={{ name: '', email: '', address: '', password: '', role: '' }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form>
              <div>
                <label htmlFor="name" style={styles.label}>Name</label>
                <Field type="text" name="name" style={styles.input} autoComplete="name" />
                <ErrorMessage name="name" component="div" style={styles.error} />
              </div>
              <div>
                <label htmlFor="email" style={styles.label}>Email</label>
                <Field type="email" name="email" style={styles.input} autoComplete="username" />
                <ErrorMessage name="email" component="div" style={styles.error} />
              </div>
              <div>
                <label htmlFor="address" style={styles.label}>Address</label>
                <Field type="text" name="address" style={styles.input} autoComplete="address" />
                <ErrorMessage name="address" component="div" style={styles.error} />
              </div>
              <div>
                <label htmlFor="password" style={styles.label}>Password</label>
                <Field type="password" name="password" style={styles.input} autoComplete="new-password" />
                <ErrorMessage name="password" component="div" style={styles.error} />
              </div>
              <div>
                <label htmlFor="role" style={styles.label}>Role</label>
                <Field as="select" name="role" style={styles.select}>
                  <option value="">Select Role</option>
                  <option value="System Administrator">System Administrator</option>
                  <option value="Store Owner">Store Owner</option>
                  <option value="Normal User">Normal User</option>
                </Field>
                <ErrorMessage name="role" component="div" style={styles.error} />
              </div>
              {status && (
                <div
                  style={{
                    ...styles.alert,
                    ...(status.success === false ? styles.alertDanger : styles.alertSuccess),
                  }}
                >
                  {status.message}
                </div>
              )}
              <button type="submit" style={styles.button} disabled={isSubmitting}>
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
        <div style={styles.switch}>
          Already have an account?
          <Link to="/login" style={styles.link}>Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;