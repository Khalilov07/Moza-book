import React from 'react';
import { Button, Typography, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowRightBlue, Compass, Graduation, Pencil02 } from '../../ui/icons';

const { Title, Paragraph } = Typography;

const GreetignPage = () => {
    const styles = {
        paragraph: {
            fontSize: '15px',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '25px',
            fontWeight: '500'
        },
        button: {
            padding: '25px 27px',
            fontSize: '15px',
            fontWeight: 600,
            borderRadius: '50px',
            display: 'flex',
            flexDirection: 'row-reverse',
            alignItems: 'center'
        },
        container: {
            minHeight: '100vh',
            padding: '20px 94px 47px 63px'
        },
        image: {
            width: '65%',
            maxHeight: '100%',
            objectFit: 'cover'
        }
    };

    return (
        <Row justify='space-around' align="middle" style={styles.container}>
            <Col xs={24} sm={12} md={12} lg={12}>
                <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
                    <Title level={1} style={{ fontSize: '30px', fontWeight: '700' }}>
                        <span style={{ color: 'black' }}>MOZA</span>
                        <span style={{ color: '#006FFD' }}> BOOK</span>
                    </Title>

                    <Paragraph style={{ fontSize: '35px', fontWeight: '700', marginBottom: 10, marginTop: '30px' }}>
                        СОЗДАВАЙТЕ{' '}
                        <span style={{ color: '#006FFD' }}>СВОЁ <br /></span>{' '}
                        РАБОЧЕЕ <span style={{ color: '#006FFD' }}>ПРОСТРАНСТВО</span>
                    </Paragraph>

                    <Paragraph style={{ color: '#8D8D8D', fontSize: '15px', fontWeight: 500 }}>
                        Создавайте свой кабинет, открывайте тему урока и <br /> приглашайте своих учеников всего в пару кликов.
                    </Paragraph>

                    <div style={{ margin: '20px 0', display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                        <Link to="/register">
                            <Button type="primary" icon={<ArrowRight />} style={{ ...styles.button, border: '2px solid #006FFD' }}>
                                Регистрация
                            </Button>
                        </Link>

                        <Link to="/login">
                            <Button type="default" icon={<ArrowRightBlue />} style={{ ...styles.button, border: '2px solid #006FFD', color: '#006FFD' }}>
                                Войти
                            </Button>
                        </Link>
                    </div>

                    <div>
                        <Paragraph style={styles.paragraph}>
                            <Compass style={styles.icon} /> <span style={{ marginLeft: 10 }}>Удобный набор инструментов</span>
                        </Paragraph>
                        <Paragraph style={styles.paragraph}>
                            <Pencil02 style={styles.icon} /> <span style={{ marginLeft: 10 }}>Редактирование урока в реальном времени</span>
                        </Paragraph>
                        <Paragraph style={styles.paragraph}>
                            <Graduation style={styles.icon} /> <span style={{ marginLeft: 10 }}>Новый опыт в преподавании</span>
                        </Paragraph>
                    </div>

                    <Paragraph style={{ color: '#006FFD', marginTop: '40px' }}>
                        Условия пользования и политика конфиденциальности
                    </Paragraph>
                </div>
            </Col>

            <Col xs={24} sm={12} md={12} lg={12} style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0' }}>
                <img src="./images/greeting.png" alt="Welcome" style={styles.image} />
            </Col>

            {/* МЕДИАСТИЛИ */}
            <style>
                {`
                @media (max-width: 1336px) {
                    .ant-typography h1 {
                        font-size: 26px !important;
                    }
                    .ant-typography p {
                        font-size: 14px !important;
                    }
                    .ant-btn {
                        padding: 20px 22px !important;
                        font-size: 14px !important;
                    }
                }
                @media (max-width: 1024px) {
                    .ant-typography h1 {
                        font-size: 24px !important;
                    }
                    .ant-typography p {
                        font-size: 13px !important;
                    }
                    .ant-btn {
                        padding: 18px 20px !important;
                        font-size: 13px !important;
                        width: 100%;
                        text-align: center;
                    }
                }
                @media (max-width: 768px) {
                    .ant-typography h1 {
                        font-size: 22px !important;
                    }
                    .ant-typography p {
                        font-size: 12px !important;
                    }
                    .ant-btn {
                        font-size: 12px !important;
                        padding: 16px 18px !important;
                    }
                    img {
                        width: 90% !important;
                        display: block;
                        margin: 0 auto;
                    }
                }
                `}
            </style>
        </Row>
    );
};

export default GreetignPage;
