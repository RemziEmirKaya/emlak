import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography } from 'antd';
import './Login.css';

const { Title } = Typography;

const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onFinish = (values) => {
    const { username, password } = values;
    const registeredUsername = localStorage.getItem('registeredUsername');
    const registeredPassword = localStorage.getItem('registeredPassword');

    if (username === registeredUsername && password === registeredPassword) {
      console.log('Username:', username);
      console.log('Password:', password);
      
      // Yönlendirme
      navigate('/ana-sayfa');
    } else {
      setError('Kullanıcı adı veya şifre hatalı!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <Title level={2} className="login-title">EMLAKCİM.COM</Title>
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className="login-form"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input size="large" placeholder="Kullanıcı adı" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password size="large" placeholder="Şifre" />
          </Form.Item>
          {error && <p className="error-message">{error}</p>}
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-button">
              Giriş Yap
            </Button>
          </Form.Item>
          <Form.Item>
            <Link to="/register" className="register-link">Hesap Oluştur</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;

