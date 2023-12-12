import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import './login.css';

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMEssage] = useState('');

  const login = (values) => {
    const { username, password } = values;
    if (username === 'bharatagri') {
      if (password === '1234') {
        navigate('/dashboard');
        formik.resetForm();
      } else {
        setErrorMEssage('Invalid password');
        formik.setFieldValue('password', '');
        formik.setFieldTouched('password', false);
      }
    } else {
      setErrorMEssage('Invalid username');
    }
  };

  const schema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => {
      login(values);
    },
  });

  return (
    <div className="login-page">
      <div className="container">
        <h1 className="text-center mb-4">Login page</h1>
        <Form
          className="card p-3 mx-auto col-lg-5 col-md-12"
          onSubmit={formik.handleSubmit}
        >
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Username</Form.Label>
            <Form.Control
              id="username"
              type="text"
              placeholder="Enter the username"
              value={formik.values.username}
              isInvalid={!formik.values.username && formik.touched.username}
              onChange={(e) => {
                formik.handleChange(e);
                if (errorMessage) {
                  setErrorMEssage('');
                }
              }}
              onBlur={formik.handleBlur}
            />
            <Form.Control.Feedback type="invalid">
              {formik.touched.username && formik.errors.username}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              id="password"
              value={formik.values.password}
              type="password"
              placeholder="*****"
              isInvalid={!formik.values.password && formik.touched.password}
              onChange={(e) => {
                formik.handleChange(e);
                if (errorMessage) {
                  setErrorMEssage('');
                }
              }}
              onBlur={formik.handleBlur}
            />
            <Form.Control.Feedback type="invalid">
              {formik.touched.password && formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Button type="submit">Login</Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
