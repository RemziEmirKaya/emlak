import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Select, Form, Button } from 'antd';
import './HomePage.css';

const { Header, Content, Sider } = Layout;
const { Option } = Select;

const HomePage = () => {
  // State
  const [filters, setFilters] = useState({ propertyType: '', roomType: '', hasPool: null, hasParking: null, hasGarden: null, saleType: '' });
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [properties, setProperties] = useState([
    // Evler
    { id: 1, type: 'dubleks', roomType: '4+1', hasPool: true, hasParking: true, hasGarden: true, saleType: 'satılık' },
    { id: 2, type: 'dubleks', roomType: '5+1', hasPool: false, hasParking: false, hasGarden: false, saleType: 'kiralık' },
    { id: 3, type: 'dubleks', roomType: '6+1', hasPool: true, hasParking: true, hasGarden: true, saleType: 'satılık' },
    { id: 4, type: 'daire', roomType: '1+1', hasPool: false, hasParking: true, hasGarden: false, saleType: 'kiralık' },
    { id: 5, type: 'daire', roomType: '2+1', hasPool: false, hasParking: false, hasGarden: true, saleType: 'satılık' },
    { id: 6, type: 'daire', roomType: '3+1', hasPool: true, hasParking: true, hasGarden: true, saleType: 'kiralık' },
    { id: 7, type: 'daire', roomType: '4+1', hasPool: false, hasParking: false, hasGarden: true, saleType: 'satılık' },
    { id: 8, type: 'villa', roomType: '5+2', hasPool: true, hasParking: true, hasGarden: true, saleType: 'kiralık' },
    { id: 9, type: 'villa', roomType: '6+1', hasPool: true, hasParking: true, hasGarden: true, saleType: 'satılık' },
    { id: 10, type: 'villa', roomType: '6+2', hasPool: false, hasParking: true, hasGarden: false, saleType: 'kiralık' },
    { id: 11, type: 'rezidans', roomType: '2+1', hasPool: false, hasParking: false, hasGarden: true, saleType: 'satılık' },
    { id: 12, type: 'rezidans', roomType: '3+1', hasPool: true, hasParking: true, hasGarden: true, saleType: 'kiralık' },
    { id: 13, type: 'rezidans', roomType: '4+1', hasPool: true, hasParking: true, hasGarden: false, saleType: 'satılık' },
    { id: 14, type: 'müstakil', roomType: '6+2', hasPool: false, hasParking: false, hasGarden: true, saleType: 'kiralık' },
    { id: 15, type: 'dubleks', roomType: '5+1', hasPool: true, hasParking: true, hasGarden: true, saleType: 'satılık' },
    { id: 16, type: 'villa', roomType: '5+1', hasPool: true, hasParking: true, hasGarden: true, saleType: 'kiralık' },
    { id: 17, type: 'villa', roomType: '6+1', hasPool: false, hasParking: false, hasGarden: false, saleType: 'satılık' },
    { id: 18, type: 'rezidans', roomType: '5+1', hasPool: false, hasParking: true, hasGarden: true, saleType: 'kiralık' },
    { id: 19, type: 'rezidans', roomType: '6+1', hasPool: true, hasParking: true, hasGarden: true, saleType: 'satılık' },
    { id: 20, type: 'dubleks', roomType: '5+2', hasPool: false, hasParking: false, hasGarden: false, saleType: 'kiralık' },
    { id: 21, type: 'villa', roomType: '5+2', hasPool: true, hasParking: true, hasGarden: true, saleType: 'satılık' },
    { id: 22, type: 'villa', roomType: '6+2', hasPool: false, hasParking: true, hasGarden: true, saleType: 'kiralık' },
    { id: 23, type: 'rezidans', roomType: '5+2', hasPool: false, hasParking: false, hasGarden: false, saleType: 'satılık' },
    { id: 24, type: 'rezidans', roomType: '6+2', hasPool: true, hasParking: true, hasGarden: true, saleType: 'kiralık' }
  ]);

  const propertyTypes = ['dubleks', 'daire', 'villa', 'rezidans', 'müstakil'];
  const roomTypes = ['1+1', '2+1', '3+1', '4+1', '5+1', '5+2', '6+1', '6+2'];
  const saleTypes = ['satılık', 'kiralık'];

  useEffect(() => {
    let filteredProperties = properties;

    // Filtreleme
    if (filters.propertyType) {
      filteredProperties = filteredProperties.filter(property => property.type === filters.propertyType);
    }

    if (filters.roomType) {
      filteredProperties = filteredProperties.filter(property => property.roomType === filters.roomType);
    }

    if (filters.hasPool !== null) {
      filteredProperties = filteredProperties.filter(property => property.hasPool === filters.hasPool);
    }

    if (filters.hasParking !== null) {
      filteredProperties = filteredProperties.filter(property => property.hasParking === filters.hasParking);
    }

    if (filters.hasGarden !== null) {
      filteredProperties = filteredProperties.filter(property => property.hasGarden === filters.hasGarden);
    }

    if (filters.saleType) {
      filteredProperties = filteredProperties.filter(property => property.saleType === filters.saleType);
    }

    // Gruplama
    const groupedProperties = filteredProperties.reduce((acc, property) => {
      const key = `${property.type}-${property.roomType}-${property.hasPool}-${property.hasParking}-${property.hasGarden}-${property.saleType}`;
      if (!acc[key]) {
        acc[key] = { ...property, count: 0 };
      }
      acc[key].count += 1;
      return acc;
    }, {});

    // Kaydetme
    setFilteredProperties(Object.values(groupedProperties));
  }, [filters, properties]);

  // Fonksiyonlar
  const handleFilterChange = (type) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      propertyType: type,
      roomType: '' 
    }));
  };

  const handleRoomTypeChange = (roomType) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      roomType: roomType
    }));
  };

  const handlePoolChange = (hasPool) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      hasPool: hasPool
    }));
  };

  const handleParkingChange = (hasParking) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      hasParking: hasParking
    }));
  };

  const handleGardenChange = (hasGarden) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      hasGarden: hasGarden
    }));
  };

  const handleSaleTypeChange = (saleType) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      saleType: saleType
    }));
  };

  // Yeni ilan ekleme
  const handleSubmitListing = (values) => {
    if (values.type && values.roomType && values.saleType) {
      const newProperty = {
        id: properties.length + 1,
        type: values.type,
        roomType: values.roomType,
        hasPool: values.hasPool || false,
        hasParking: values.hasParking || false,
        hasGarden: values.hasGarden || false,
        saleType: values.saleType
      };
      const updatedProperties = [...properties, newProperty];
      setProperties(updatedProperties);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['']}
          style={{ height: '100%', borderRight: 0 }}
        >
          {propertyTypes.map(type => (
            <Menu.Item key={type} onClick={() => handleFilterChange(type)}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <h1>Emlakcim.com</h1>
            <Form layout="inline" onFinish={handleSubmitListing}>
              <Form.Item label="Type" name="type" rules={[{ required: true, message: 'Please select a type!' }]}>
                <Select style={{ width: 200 }} placeholder="Select Type">
                  {propertyTypes.map(type => (
                    <Option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Room Type" name="roomType">
                <Select style={{ width: 200 }} placeholder="Select Room Type" onChange={handleRoomTypeChange}>
                  {roomTypes.map(roomType => (
                    <Option key={roomType} value={roomType}>{roomType}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Havuz" name="hasPool">
                <Select style={{ width: 120 }} placeholder="Seçiniz" onChange={handlePoolChange}>
                  <Option value={null}>Hepsi</Option>
                  <Option value={true}>Var</Option>
                  <Option value={false}>Yok</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Otopark" name="hasParking">
                <Select style={{ width: 120 }} placeholder="Seçiniz" onChange={handleParkingChange}>
                  <Option value={null}>Hepsi</Option>
                  <Option value={true}>Var</Option>
                  <Option value={false}>Yok</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Bahçe" name="hasGarden">
                <Select style={{ width: 120 }} placeholder="Seçiniz" onChange={handleGardenChange}>
                  <Option value={null}>Hepsi</Option>
                  <Option value={true}>Var</Option>
                  <Option value={false}>Yok</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Satılık/Kiralık" name="saleType" rules={[{ required: true, message: 'Please select a sale type!' }]}>
                <Select style={{ width: 200 }} placeholder="Select Sale Type" onChange={handleSaleTypeChange}>
                  {saleTypes.map(saleType => (
                    <Option key={saleType} value={saleType}>{saleType.charAt(0).toUpperCase() + saleType.slice(1)}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">Add Listing</Button>
              </Form.Item>
            </Form>
            <ul>
              {filteredProperties.length === 0 ? (
                <p>Hiç sonuç bulunamadı.</p>
              ) : (
                filteredProperties.map(property => (
                  <li key={`${property.type}-${property.roomType}-${property.hasPool}-${property.hasParking}-${property.hasGarden}-${property.saleType}`}>
                    {property.type} - {property.roomType} - {property.hasPool ? 'Havuz Var' : 'Havuz Yok'} - {property.hasParking ? 'Otopark Var' : 'Otopark Yok'} - {property.hasGarden ? 'Bahçe Var' : 'Bahçe Yok'} - {property.saleType.charAt(0).toUpperCase() + property.saleType.slice(1)} ({property.count} adet)
                  </li>
                ))
              )}
            </ul>
          </Content>
          <Header className="logout-container">
            <Link to="/login" className="logout-link">Logout</Link>
          </Header>
        </Layout>
      </Layout>
    );
  };
  
  export default HomePage;
  