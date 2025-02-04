import React, { useState } from 'react';
import { Button, Typography, Row, Col, Form, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, KeyIcon, UserIconRegister } from '../../../ui/icons';

const { Title, Paragraph } = Typography;

const Login = () => {
    // Состояние для хранения данных формы
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        confirmPassword: '',
    });

    const [isFormValid, setIsFormValid] = useState(true);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setIsFormValid(false)
        setFormData((prevData) => {
            const newData = { ...prevData, [name]: value };

            setIsFormValid(newData.name && newData.password && newData.confirmPassword);
            return newData;
        });
    };

    const onFinish = () => {
        navigate('/main');
    };

    const styles = {
        label: {
            fontSize: '40px',
            color: "red"
        },
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
            borderRadius: '5px',
            marginBottom: '20px',
            border: 'none',
            padding: '10px'
        },
        form: {
            width: '70%'
        },
        inputIcon: {
            margin: '5px 20px 5px 20px'
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
        wrap: {
            display: 'flex',
            gap: '20px',
            alignItems: 'center'
        }

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
                        <Link to="/">
                            <Button
                                type="link"
                                icon={<ArrowLeftOutlined />}
                                style={{ fontSize: '16px', padding: 0, fontWeight: 500 }}
                            >
                                Назад
                            </Button>
                        </Link>
                    </Col>

                    <Title level={2} style={{ marginTop: '30px', fontSize: '30px', fontWeight: "700" }}>
                        Вход
                    </Title>

                    {/* Форма для отправки данных */}
                    <Form
                        name="registration-form"
                        onFinish={onFinish}
                        layout="vertical"
                        style={styles.form}
                        initialValues={{ remember: true }}
                    >
                        <Form.Item
                            label={<span style={{ fontSize: '20px' }}>Логин</span>}
                            name="name"
                            style={{ fontWeight: 600 }}
                            rules={[{ required: false, message: 'Введите логин' }]}
                        >
                            <Input
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Введите номер телефона или почту"
                                style={styles.input}
                                prefix={<span style={styles.inputIcon}><UserIconRegister /></span>}
                            />
                        </Form.Item>

                        <Form.Item
                            label={<span style={{ fontSize: '20px' }}>Пароль</span>}
                            name="password"
                            style={{ fontWeight: 600 }}
                            rules={[{ required: false, message: 'Пожалуйста, введите пароль ' }]}
                        >
                            <Input.Password
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Введите пароль"
                                style={styles.input}
                                prefix={<span style={styles.inputIcon}><KeyIcon /></span>}
                            />
                        </Form.Item>

                        <Form.Item>
                            <div style={styles.wrap}>
                                <Button
                                    disabled={isFormValid}
                                    type="primary"
                                    htmlType="submit"
                                    style={styles.button}
                                    icon={<ArrowRight />}
                                >
                                    Войти
                                </Button>
                                <Link to='/forget'>
                                    Забыли пароль?
                                </Link>
                            </div>
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

export default Login;
