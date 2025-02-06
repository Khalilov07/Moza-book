import React, { useState } from 'react';
import { Layout, Menu, Modal, Button, Input, Avatar, Upload, List, Divider } from 'antd';
import { PlusOutlined, SearchOutlined, CloseOutlined, BellOutlined, SettingOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const Main = () => {
    const [lessons, setLessons] = useState([
        { title: "", topic: "", additional: "", blocks: [], comments: [] },
        { title: "", topic: "", additional: "", blocks: [], comments: [] },
        { title: "", topic: "", additional: "", blocks: [], comments: [] }
    ]);

    const classes = [
        { id: 1, name: "Класс A", img: "https://via.placeholder.com/30" },
        { id: 2, name: "Класс B", img: "https://via.placeholder.com/30" },
        { id: 3, name: "Класс C", img: "https://via.placeholder.com/30" },
    ];

    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [isClassModalVisible, setIsClassModalVisible] = useState(false);
    const [isLessonModalVisible, setIsLessonModalVisible] = useState(false);
    const [newLesson, setNewLesson] = useState({ title: "", topic: "" });
    const [newClass, setNewClass] = useState({ name: "", image: "" });

    // const handleOpenLessonModalBlock = (lesson) => {
    //     setSelectedLesson(lesson);
    //     setIsLessonModalVisible(true);
    // };

    // const handleCloseLessonModalBlock = () => {
    //     setIsLessonModalVisible(false);
    //     setSelectedLesson(null);
    //     setNewComment("");
    // };

    const handleAddComment = () => {
        if (newComment) {
            const updatedLessons = lessons.map(lesson =>
                lesson === selectedLesson
                    ? { ...lesson, comments: [...lesson.comments, newComment] }
                    : lesson
            );
            setLessons(updatedLessons);
            setNewComment(""); 
        }
    };

    const handleInputChange = (index, field, value) => {
        const updatedLessons = [...lessons];
        updatedLessons[index][field] = value;
        setLessons(updatedLessons);
    };

    const handleOpenLessonModal = () => {
        setIsLessonModalVisible(true);
    };

    const handleCloseLessonModal = () => {
        setIsLessonModalVisible(false);
        setNewLesson({ title: "", topic: "" });
    };

    const handleAddLesson = () => {
        setLessons([...lessons, { ...newLesson, blocks: [], comments: [] }]);
        handleCloseLessonModal();
    };

    const handleOpenClassModal = () => {
        setIsClassModalVisible(true);
    };

    const handleCloseClassModal = () => {
        setIsClassModalVisible(false);
        setNewClass({ name: "", image: "" });
    };

    const handleAddClass = () => {
        console.log("Новый класс:", newClass);
        classes.concat(newClass)
        setIsClassModalVisible(false)
    };


    const handleBlockInputChange = (lessonIndex, blockIndex, value) => {
        setLessons(prevLessons =>
            prevLessons.map((lesson, i) =>
                i === lessonIndex
                    ? {
                        ...lesson,
                        blocks: lesson.blocks.map((block, j) => (j === blockIndex ? value : block))
                    }
                    : lesson
            )
        );
    };

    const handleAddBlock = (lessonIndex) => {
        setLessons(prevLessons =>
            prevLessons.map((lesson, i) =>
                i === lessonIndex
                    ? { ...lesson, blocks: [...lesson.blocks, ""] }
                    : lesson
            )
        );
    };


    const styles = {
        input: {
            margin: '10px 0',
            background: '#DAE3F2',
            padding: '10px 16px'
        }
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={250} style={{ background: '#006FFD', padding: '20px', color: 'white' }}>
                <h2 style={{ color: 'white' }}>Ваши классы</h2>
                <hr style={{ borderColor: 'white' }} />
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }}>
                    {classes.map((cls) => (
                        <div
                            key={cls.id}
                            onClick={() => setSelectedClass(cls.id)}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                padding: "10px",
                                borderRadius: "8px",
                                cursor: "pointer",
                                background: selectedClass === cls.id ? "white" : "transparent",
                                color: selectedClass === cls.id ? "#006FFD" : "white",
                                transition: "0.3s",
                            }}
                        >
                            <img
                                src={cls.img}
                                alt={cls.name}
                                style={{
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "50%",
                                    border: selectedClass === cls.id ? "2px solid #006FFD" : "2px solid white",
                                }}
                            />
                            <span>{cls.name}</span>
                        </div>
                    ))}
                </div>
            </Sider>

            <Layout>
                <Header className="header" style={{ backgroundColor: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px' }}>
                    <Button type="primary" onClick={handleOpenClassModal}>Добавить класс</Button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <Input placeholder="Поиск" prefix={<SearchOutlined />} style={{ width: 200 }} />
                        <BellOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
                        <Avatar src="/images/profile.jpg" />
                        <SettingOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
                    </div>
                </Header>

                <Layout style={{ minHeight: '100vh' }}>
                    <Layout>
                        <Header className="header" style={{ backgroundColor: '#F4F4F4', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <h2 style={{ margin: 0, fontWeight: 'bold' }}>Название класса</h2>
                            </div>
                            <Avatar.Group maxCount={3} style={{ display: 'flex', gap: '30px' }}>
                                <div>
                                    <a href="#" style={{ color: '#006FFD' }}>Список участников</a>
                                </div>
                                <div>
                                    <Avatar src="/images/user1.jpg" />
                                    <Avatar src="/images/user2.jpg" />
                                    <Avatar src="/images/user3.jpg" />
                                </div>
                            </Avatar.Group>
                        </Header>

                        <Content style={{ padding: '20px', backgroundColor: '#F4F4F4' }}>
                            <hr />
                            <h2 style={{ fontSize: '24px' }}>Доска</h2>
                            <div>
                                <div className="lessons-board" style={{ display: "flex", gap: "15px", alignItems: "center", flexWrap: "wrap", flex: 1 }}>
                                    {lessons.map((lesson, index) => (
                                        <div key={index} className="lesson" style={{ backgroundColor: "#FFFFFF", padding: "15px", borderRadius: "8px", width: "250px", minHeight: "320px", cursor: "pointer", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                            <Input placeholder="Название урока" value={lesson.title} onChange={(e) => handleInputChange(index, 'title', e.target.value)} style={styles.input} />
                                            <Input placeholder="Тема урока" value={lesson.topic} onChange={(e) => handleInputChange(index, 'topic', e.target.value)} style={styles.input} />

                                            {/* Поля блоков */}
                                            {lesson.blocks.map((block, blockIndex) => (
                                                <Input
                                                    key={blockIndex}
                                                    placeholder={`Дополнительные задания ${blockIndex + 1}`}
                                                    value={block}
                                                    onChange={(e) => handleBlockInputChange(index, blockIndex, e.target.value)}
                                                    style={styles.input}
                                                />
                                            ))}

                                            <Button type="text" icon={<PlusOutlined />} onClick={() => handleAddBlock(index)}>Добавить блок</Button>
                                        </div>
                                    ))}
                                    <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenLessonModal} style={{ height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Новый урок</Button>
                                </div>
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>

            {/* <Modal visible={isLessonModalVisible} onCancel={handleCloseLessonModal} footer={null} title={selectedLesson?.title}>
                <h3>Описание:</h3>
                <p>{selectedLesson?.description}</p>
                <Button type="link" onClick={() => alert('Показать полностью!')}>Показать полностью</Button>
                <Divider />
                <h4>Комментарии:</h4>
                <List
                    dataSource={selectedLesson?.comments || []}
                    renderItem={(comment, index) => <List.Item key={index}>{comment}</List.Item>}
                />
                <Input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Оставьте комментарий"
                    style={{ marginTop: '10px' }}
                />
                <Button type="primary" onClick={handleAddComment} style={{ marginTop: '10px' }}>Оставить комментарий</Button>
            </Modal> */}

            <Modal visible={isClassModalVisible} onCancel={handleCloseClassModal} onOk={handleAddClass} title="Добавить класс">
                <Input placeholder="Название класса" value={newClass.name} onChange={(e) => setNewClass({ ...newClass, name: e.target.value })} />
                <Upload beforeUpload={() => false} onChange={(info) => setNewClass({ ...newClass, image: info.file.name })}>
                    <Button style={{ margin: '10px 0' }} icon={<UploadOutlined />}>Загрузить фото</Button>
                </Upload>
            </Modal>

            <Modal visible={isLessonModalVisible} onCancel={handleCloseLessonModal} onOk={handleAddLesson} title="Добавить урок">
                <Input placeholder="Название урока" value={newLesson.title} onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })} />
                <Input placeholder="Тема урока" value={newLesson.topic} onChange={(e) => setNewLesson({ ...newLesson, topic: e.target.value })} style={{ marginTop: "10px" }} />
            </Modal>
        </Layout>
    );
};

export default Main;
