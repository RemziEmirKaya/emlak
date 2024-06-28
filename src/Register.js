import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography } from 'antd';
import './Register.css';

const { Title } = Typography;

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registered Username:', username);
    console.log('Registered Password:', password);

    // Kullanıcı bilgilerini localStorage'a kaydet
    localStorage.setItem('registeredUsername', username);
    localStorage.setItem('registeredPassword', password);
    
    // Kayıt başarılı olduğunda login sayfasına yönlendirme
    navigate('/login');
  };

  return (
    <div className="register-container">
      <Title level={2} style={{ marginBottom: '20px', color: 'blue' }}>KAYIT OL</Title>
      <Form onSubmit={handleSubmit} className="register-form">
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Kullanıcı adı giriniz"
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Şifrenizi giriniz"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>Register</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;

