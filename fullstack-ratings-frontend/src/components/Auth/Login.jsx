import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      await login(values.email, values.password);
      navigate('/dashboard');
    } catch (error) {
      setStatus({ success: false, message: 'Invalid email or password.' });
    }
    setSubmitting(false);
  };

  // Inline styles for modern look
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
      maxWidth: '400px',
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
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Log In</h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="email" style={styles.label}>Email address</label>
                <Field
                  type="email"
                  name="email"
                  style={styles.input}
                  className="form-control"
                  autoComplete="username"
                />
                <ErrorMessage name="email" component="div" style={styles.error} />
              </div>
              <div className="mb-3">
                <label htmlFor="password" style={styles.label}>Password</label>
                <Field
                  type="password"
                  name="password"
                  style={styles.input}
                  className="form-control"
                  autoComplete="current-password"
                />
                <ErrorMessage name="password" component="div" style={styles.error} />
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
              <button
                type="submit"
                style={styles.button}
                disabled={isSubmitting}
              >
                Log In
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;