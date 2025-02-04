import React, { useState, useRef } from 'react';
import { Button, Typography, Row, Col, Form, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, CellPhone } from '../../../ui/icons';
import InputMask from 'react-input-mask'; // Импортируем маску для ввода


const { Title, Paragraph } = Typography;

const Sms = () => {
    const [code, setCode] = useState(['', '', '', '']);
    const inputsRef = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const navigate = useNavigate();

    const handleChange = (index, e) => {
        const value = e.target.value.replace(/\D/g, ''); // Оставляем только цифры
        if (value.length <= 1) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);
            if (value && index < 3) {
                inputsRef[index + 1].current.focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputsRef[index - 1].current.focus();
        }
    };

    const isFormValid = code.every(num => num !== '');

    const styles = {
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
        button: {
            padding: '25px 30px',
            fontSize: '15px',
            fontWeight: 600,
            borderRadius: '12px',
            display: 'flex',
            color: '#FFF',
            flexDirection: 'row-reverse',
            alignItems: 'center',
            background: '#006FFD'
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
                        <Link to='/forget'>
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
                        SMS Код
                    </Title>
                    <Paragraph
                        style={{
                            fontSize: '16px',
                            fontWeight: '500',
                            margin: '0 0 30px 0',
                            color: '#8D8D8D',
                        }}
                    >
                        Введите 4-х значный код из SMS
                    </Paragraph>

                    <Form.Item>
                        <div style={{ display: 'flex', justifyContent: 'start', gap: '10px' }}>
                            {code.map((num, index) => (
                                <Input
                                    key={index}
                                    ref={inputsRef[index]}
                                    maxLength={1}
                                    value={num}
                                    onChange={(e) => handleChange(index, e)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    style={{
                                        width: '100px',
                                        height: '120px',
                                        fontSize: '42px',
                                        textAlign: 'center',
                                        borderRadius: '8px',
                                        fontWeight: 700,
                                        border: '1px solid #ccc'
                                    }}
                                />
                            ))}
                        </div>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            disabled={!isFormValid}
                            type="primary"
                            htmlType="submit"
                            style={styles.button}
                            onClick={() => navigate("/newpas")}
                            icon={<ArrowRight />}
                        >
                            Далее
                        </Button>
                    </Form.Item>
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

export default Sms;
