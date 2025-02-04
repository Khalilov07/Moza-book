import React, { useState } from 'react';
import { Button, Typography, Row, Col } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../../store/authSlice'
import { useSelector } from 'react-redux';

const { Title, Paragraph } = Typography;

const Register = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handleSelectRole = (role) => {
        dispatch(login({ role }));
        navigate("/mainRegister");
    };

    const { user } = useSelector(state => state.auth) 

    console.log(user);

    console.log();

    const styles = {
        paragraph: {
            fontSize: '15px',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '25px',
            fontWeight: '500',
        },
        button: {
            padding: '25px 27px',
            fontSize: '15px',
            fontWeight: 600,
            borderRadius: '50px',
            display: 'flex',
            flexDirection: 'row-reverse',
            alignItems: 'center',
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
        choiceButton: {
            width: '50%',
            height: '100px',
            padding: '20px',
            fontSize: '16px',
            textAlign: 'start',
            color: '#fff',
            fontWeight: '500',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: '10px',
            background: '#006FFD',
            border: '2px solid #006FFD',
            marginBottom: '20px',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            transition: 'width 0.5s ease', // плавный переход ширины
        },
    };

    return (
        <Row
            justify="space-around"
            align="middle"
            style={styles.container}
        >
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
                        Вы частный преподаватель, либо <br /> резидент учебного заведения?
                    </Paragraph>

                    <Button
                        style={{ ...styles.choiceButton, backgroundImage: "url('/images/userProfile.png')" }}
                        onClick={() => handleSelectRole('private_tutor')}
                    >
                        <p> Частный <br /> преподаватель </p>
                        <ArrowRightOutlined />
                    </Button>
                    <Button
                        style={{ ...styles.choiceButton, backgroundImage: "url('/images/landMark.png')" }}
                        onClick={() => handleSelectRole('private_tutor')}
                    >
                        Резидент
                        <ArrowRightOutlined />
                    </Button>
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

export default Register;
