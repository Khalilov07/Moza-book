import React, {useEffect, useState} from 'react';
import { Button, Typography, Row, Col, Form, Input, notification} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, CellPhone } from '../../../ui/icons';
import {forgotPasswordTeacher} from "../../../store/authSlice";
import {useDispatch} from "react-redux";
import { forgotPassword } from '../../../store/authSlice'


const { Title, Paragraph } = Typography;

const ForgetPas = () => {
    const [formData, setFormData] = useState({
        name: '',
    });

    const [phone, setPhone] = useState('');
    const [form] = Form.useForm();
    const dispatch = useDispatch()

    const [isFormValid, setIsFormValid] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setIsFormValid(true)
    };

    const onFinish = async (values) => {
        if (!values.phone_number) {
            notification.error({ message: "Ошибка: введите номер телефона" });
            return;
        }

        try {
            const response = await dispatch(forgotPasswordTeacher(values));
            if (!response.payload.error) {
                notification.success({ message: "Код отправлен!" });
                dispatch(forgotPassword(values.phone_number))
                navigate("/newpas");
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
            borderRadius: '8px',
            fontSize: '14px',
            padding: '15px 20px',
            marginBottom: '20px',
            border: 'none',
            outline: 'none',
        },
        form: {
            width: '70%',
        },
        inputIcon: {
            marginRight: 10,
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
            alignItems: 'center',
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
                        <Link to='/login'>
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
                        Забыли пароль?
                    </Title>
                    <Paragraph
                        style={{
                            fontSize: '16px',
                            fontWeight: '500',
                            margin: '0 0 30px 0',
                            color: '#8D8D8D',
                        }}
                    >
                        Введите свой номер телефона, для <br /> того чтобы восстановить пароль
                    </Paragraph>

                    <Form requiredMark={false} name="registration-form" form={form} onFinish={onFinish} layout="vertical" style={{ width: '70%' }}>
                        <Form.Item label={<span style={{ fontSize: '20px' }}>Номер телефона</span>} name="phone_number" style={{ fontWeight: 600 }} rules={[{ required: true, message: 'Номер телефона' }]}>

                                    <Input
                                        prefix={<div style={{ color: '#8D8D8D', paddingRight: '15px' }}><CellPhone /></div>}
                                        placeholder="Введите номер телефона"
                                        style={styles.input}
                                        // onChange={handleInputChange}

                                    />

                        </Form.Item>

                        <Form.Item>
                            <Button
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

export default ForgetPas;
