import React, { useState } from 'react';
import { Button, Typography, Row, Col, Form, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, KeyIcon, UserIconRegister } from '../../../ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../../store/authSlice'

const { Title, Paragraph } = Typography;

const MainRegister = () => {
    // Состояние для хранения данных формы
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        confirmPassword: '',
    });

    const dispatch = useDispatch()

    const [isFormValid, setIsFormValid] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
            const newData = { ...prevData, [name]: value };

            setIsFormValid(newData.name && newData.password && newData.confirmPassword);
            return newData;
        });
    };

    const { user } = useSelector(state => state.auth)

    const onFinish = () => {
        const { name, password } = formData;
        dispatch(login({ ...user, username: name, password }));
        navigate('/phone');
    };



    const styles = {
        paragraph: {
            fontSize: '15px',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '25px',
            fontWeight: '500',
        },
        container: {
            minHeight: '100vh',
            padding: '20px 94px 47px 63px',
        },
        image: {
            width: '65%',
            maxHeight: '100%',
            objectFit: 'cover',
            transition: 'width 0.5s ease', // плавный переход ширины
        },
        input: {
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            paddingLeft: '30px',
            borderRadius: '5px',
            marginBottom: '20px',
            border: 'none',
            padding: '10px'
        },
        form: {
            width: '70%'
        },
        inputIcon: {
            marginRight: 10
        },
        button: {
            backgroundColor: '#006FFD',
            borderColor: '#006FFD',
            padding: '25px 45px',
            fontWeight: '500',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '16px',
            color: 'white',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'row-reverse',
            alignItems: 'center'
        },
    };

    return (
        <Row justify="space-around" align="middle" style={styles.container}>
            <Col xs={24} sm={24} md={12} lg={12}>
                <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
                    <Title level={1} style={{ fontSize: '30px', fontWeight: '700' }}>
                        <span style={{ color: 'black' }}>MOZA</span>
                        <span style={{ color: '#006FFD' }}> BOOK</span>
                    </Title>

                    <Col span={24}>
                        <Link to="/register">
                            <Button
                                type="link"
                                icon={<ArrowLeftOutlined />}
                                style={{ fontSize: '16px', padding: 0, fontWeight: 500 }}
                            >
                                Назад
                            </Button>
                        </Link>
                    </Col>

                    <Title level={2} style={{ marginTop: '30px', fontSize: '24px' }}>
                        Регистрация
                    </Title>
                    <Paragraph
                        style={{
                            fontSize: '16px',
                            fontWeight: '500',
                            margin: '0 0 30px 0',
                            color: '#8D8D8D',
                        }}
                    >
                        Введите свои данные, чтобы продолжить регистрацию
                    </Paragraph>

                    {/* Форма для отправки данных */}
                    <Form
                        name="registration-form"
                        onFinish={onFinish}
                        layout="vertical"
                        style={styles.form}
                        initialValues={{ remember: true }}
                    >
                        <Form.Item
                            label="Логин"
                            name="name"
                            style={{ fontWeight: 600 }}
                            rules={[{ required: false, message: 'Введите логин' }]}
                        >
                            <Input
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Придумайте логин"
                                style={styles.input}
                                prefix={<span style={styles.inputIcon}><UserIconRegister /></span>}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Придумайте пароль"
                            name="password"
                            style={{ fontWeight: 600 }}
                            rules={[{ required: false, message: 'Пожалуйста, введите пароль ' }]}
                        >
                            <Input.Password
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Введите пароль "
                                style={styles.input}
                                prefix={<span style={styles.inputIcon}><KeyIcon /></span>}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Подтверждение пароля"
                            name="confirmPassword"
                            style={{ fontWeight: 600 }}
                            rules={[{ required: false, message: 'Пожалуйста, введите пароль повторно' }]}
                        >
                            <Input.Password
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                placeholder="Введите пароль повторно"
                                style={styles.input}
                                prefix={<span style={styles.inputIcon}><KeyIcon /></span>}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                disabled={!isFormValid}
                                type="primary"
                                htmlType="submit"
                                style={styles.button}
                                icon={<ArrowRight />}
                            >
                                Далее
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

                <Paragraph style={{ color: '#006FFD', marginTop: '40px' }}>
                    Условия пользования и политика конфиденциальности
                </Paragraph>
            </Col>

            <Col
                xs={24}
                sm={24}
                md={12}
                lg={12}
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: '30px',
                }}
            >
                <img
                    src="./images/greeting.png"
                    alt="Welcome"
                    style={{ ...styles.image, width: '65%' }}
                />
            </Col>
        </Row>
    );
};

export default MainRegister;
