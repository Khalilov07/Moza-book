import React from 'react';
import { Layout, Menu, Button, Input, Avatar } from 'antd';
import { PlusOutlined, SearchOutlined, BellOutlined, SettingOutlined } from '@ant-design/icons';
import { Plus } from '../../ui/icons';


const { Header, Sider, Content } = Layout;

const Main = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>

            <Sider width={250} style={{ background: '#006FFD', padding: '20px', color: 'white' }}>
                <h2 style={{ color: 'white' }}>Ваши классы</h2>
                <hr style={{ borderColor: 'white' }} />
                <div className="class-list">
                    <div className="class-item">
                        <img src="/images/class.png" alt="Class" className="class-img" />
                        <span>Класс 10А</span>
                    </div>
                </div>
            </Sider>

            <Layout>

                <Header className="header" style={{ backgroundColor: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px' }}>
                    <Button type="primary" >
                        Добавить класс
                    </Button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <Input placeholder="Поиск" prefix={<SearchOutlined />} style={{ width: 200 }} />
                        <BellOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
                        <Avatar src="/images/profile.jpg" />
                        <SettingOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
                    </div>
                </Header>

                <Content style={{ padding: '20px', backgroundColor: '#F4F4F4', minHeight: '100vh' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h1 style={{ margin: 0 }}>Класс 10А</h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                            <a href="#" style={{ color: '#006FFD', textDecoration: 'underline', fontWeight: 'bold' }}>
                                Список учащихся
                            </a>
                            <div className="students-list" style={{ display: 'flex', marginTop: '10px' }}>
                                {[...Array(5)].map((_, i) => (
                                    <Avatar
                                        key={i}
                                        src={`/images/student${i + 1}.jpg`}
                                        className="student-avatar"
                                        style={{
                                            position: 'relative',
                                            left: `-${i * 10}px`, // Наложение
                                            border: '2px solid white'
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>


                    <hr style={{ margin: '20px 0' }} />

                    {/* Доска */}
                    <h2>Доска</h2>

                    {/* Уроки */}
                    <div className="lessons-board" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="lesson" style={{
                                backgroundColor: '#FFFFFF',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                padding: '15px',
                                borderRadius: '8px',
                                width: '20%',
                                minHeight: '300px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}>
                                <Input placeholder="Название урока" style={{ backgroundColor: '#DAE3F2', color: '#486578', marginBottom: '10px' }} />
                                <Input placeholder="Тема урока" style={{ backgroundColor: '#DAE3F2', color: '#486578', marginBottom: '10px' }} />
                                <Input placeholder="Дополнительные задания" style={{ backgroundColor: '#DAE3F2', color: '#486578', marginBottom: '10px' }} />


                                <Button
                                    type="text"
                                    icon={<PlusOutlined style={{ color: '#486578' }} />}
                                    style={{ color: '#486578', marginTop: '10px', fontWeight: 'bold' }}
                                >
                                    Добавить блок
                                </Button>
                            </div>

                        ))}
                        <Button
                            type="primary"
                            icon={<Plus />}
                            block
                            style={{
                                marginTop: '10px',
                                width: '12%',
                                backgroundColor: '#006FFD',
                                borderColor: '#006FFD',
                                color: 'white'
                            }}
                        >
                            Новый урок
                        </Button>
                    </div>
                </Content>

            </Layout>
        </Layout>
    );
};

export default Main;
