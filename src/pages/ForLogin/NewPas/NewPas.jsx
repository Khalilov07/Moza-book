import React, {useEffect, useState} from 'react';
import {Button, Typography, Row, Col, Form, Input, notification} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, KeyIcon, Lock, UserIconRegister } from '../../../ui/icons';
import {useDispatch, useSelector} from "react-redux";
import { resetPasswordTeacher} from "../../../store/authSlice";

const { Title, Paragraph } = Typography;

const Login = () => {
    // Состояние для хранения данных формы
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    });
    const {phone} = useSelector(state => state.auth);
    const dispatch = useDispatch()
    const [form] = Form.useForm();

    const [isFormValid, setIsFormValid] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        if(!phone.length){
            navigate("/")
        }
    }, [phone]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setIsFormValid(true);
        setFormData((prevData) => {
            const newData = { ...prevData, [name]: value };

            return newData;
        });
    };

    const onFinish = async (values) => {
        if (!values.new_password) {
            notification.error({ message: "Ошибка: введите код" });
            return;
        }else if (!values.new_password) {
            notification.error({ message: "Ошибка: введите новый пароль" });
            return;
        }
        try {
            const response = await dispatch(resetPasswordTeacher({...values,phone_number:phone}));
            if (!response.payload.error) {
                notification.success({ message: "Пароль изменен" });
                // navigate("/main");
            } else {
                notification.error({ message: response.payload.error });
            }
        } catch (error) {
            console.error("Ошибка при входе:", error);
            notification.error({ message: "Ошибка" });
        }
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
                        <Link to="/sms">
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
                        Новый пароль
                    </Title>

                    <Paragraph
                        style={{
                            fontSize: '16px',
                            fontWeight: '500',
                            margin: '0 0 30px 0',
                            color: '#8D8D8D',
                        }}
                    >
                        Придумайте новый пароль
                    </Paragraph>

                    {/* Форма для отправки данных */}
                    <Form
                        name="registration-form"
                        onFinish={onFinish}
                        layout="vertical"
                        form={form}
                        style={styles.form}
                        initialValues={{ remember: true }}
                    >
                        <Form.Item
                            label={<span style={{ fontSize: '20px' }}>Введите код</span>}
                            name="reset_code"
                            style={{ fontWeight: 600 }}
                            rules={[{ required: false, message: 'Введите новый пароль' }]}
                        >
                            <Input
                                onChange={handleInputChange}
                                placeholder="Введите код"
                                style={styles.input}
                                prefix={<span style={styles.inputIcon}><Lock /></span>}
                            />
                        </Form.Item>

                        <Form.Item
                            label={<span style={{ fontSize: '20px' }}>Новый пароль</span>}
                            name="new_password"
                            style={{ fontWeight: 600 }}
                            rules={[{ required: false, message: 'Введите новый пароль повторно' }]}
                        >
                            <Input.Password
                                onChange={handleInputChange}
                                placeholder="Введите новый пароль повторно"
                                style={styles.input}
                                prefix={<span style={styles.inputIcon}><Lock /></span>}
                            />
                        </Form.Item>

                        <Form.Item>
                            <div style={styles.wrap}>
                                <Button
                                    disabled={!isFormValid}
                                    type="primary"
                                    htmlType="submit"
                                    style={styles.button}
                                    icon={<ArrowRight />}
                                >
                                    Далее
                                </Button>
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
