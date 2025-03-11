import React, {useEffect, useState} from 'react';
import { Layout, Modal, Button, Input, Avatar, notification } from 'antd';
import { PlusOutlined, SearchOutlined , BellOutlined, SettingOutlined} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";
import {createClassroom, getClassrooms} from "../../store/classSlice";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../store/authSlice";
import {getClassroomDetail, postClassroomColumn, postClassroomTaks} from "../../store/classDetailSlice";

const { Header, Sider, Content } = Layout;

const Main = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {classrooms} = useSelector(state => state.class);
    const {classroom} = useSelector(state => state.classDetail);
    console.log(classroom)
    useEffect(() => {
        if(!localStorage.getItem("MAZA_BOOK")){
            navigate("/login")
        }
        dispatch(getClassrooms())

    }, []);
    useEffect(() => {
        dispatch(getClassroomDetail(classrooms[0]?.id))
    },[classrooms])



    const classes = [
        { id: 1, name: "Класс A", img: "https://via.placeholder.com/30" },
        { id: 2, name: "Класс B", img: "https://via.placeholder.com/30" },
        { id: 3, name: "Класс C", img: "https://via.placeholder.com/30" },
    ];

    const [selectedClass, setSelectedClass] = useState(null);
    const [isClassModalVisible, setIsClassModalVisible] = useState(false);
    const [isLessonModalVisible, setIsLessonModalVisible] = useState(false);
    const [newLesson, setNewLesson] = useState({ title: "", topic: "" });
    const [newClass, setNewClass] = useState({ name: "" });
    useEffect(() => {
        dispatch(getClassroomDetail(selectedClass))
    },[selectedClass])
    const createClass = async () => {
        if (!newClass.name.length) {
            notification.error({ message: "Ошибка: введите название класса" });
            return;
        }

        try {
            const response = await dispatch(createClassroom(newClass.name));
            if (!response.payload.error) {
                notification.success({ message: "Класс создан!" });
            } else {
                notification.error({ message: response.payload.error });
            }
        } catch (error) {
            console.error("Ошибка при создании класса:", error);
            notification.error({ message: "Ошибка при создании класса" });
        }
    };


    const handleOpenLessonModal = () => {
        setIsLessonModalVisible(true);
    };

    const handleCloseLessonModal = () => {
        setIsLessonModalVisible(false);
        setNewLesson({ title: "", topic: "" });
    };

    const handleAddLesson = () => {
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
        handleCloseClassModal();
    };


    const handleBlockInputChange = (lessonIndex, blockIndex, value) => {

    };

    const handleAddBlock = async (value) => {

        const responce = await dispatch(postClassroomTaks({classroom_id: value.classroom, column_id:value.id}))
        dispatch(getClassroomDetail(value.classroom))
    };
    const  handlerAddNewColumn = async() => {
        const responce = await dispatch(postClassroomColumn())

    }

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
                    {classrooms.map((cls) => (
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
                        <Button onClick={() => {
                            dispatch(logout())
                            navigate("/login")
                        }}>
                            Выход
                        </Button>
                        <Avatar src="/images/profile.jpg" />
                        <SettingOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
                    </div>
                </Header>

                <Layout style={{ minHeight: '100vh' }}>
                    <Layout>
                        <Header className="header" style={{ backgroundColor: '#F4F4F4', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <h2 style={{ margin: 0, fontWeight: 'bold' }}>{classroom?.name}</h2>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <div>
                                    <a href="#" style={{ color: '#006FFD' }}>Список участников</a>
                                </div>
                                <Avatar.Group
                                    maxCount={3}
                                    size="large"
                                    maxStyle={{ backgroundColor: '#000', color: '#fff' }}
                                >
                                    {
                                        classroom?.members?.map((member, index) => (
                                            <Avatar src="https://randomuser.me/api/portraits/men/1.jpg" />
                                        ))
                                    }
                                </Avatar.Group>
                            </div>
                        </Header>

                        <Content style={{ padding: '20px', backgroundColor: '#F4F4F4' }}>
                            <hr />
                            <h2 style={{ fontSize: '24px' }}>Доска</h2>
                            <div>
                                <div className="lessons-board" style={{ display: "flex", gap: "15px", alignItems: "center", flexWrap: "wrap", flex: 1 }}>
                                    {classroom?.columns?.map((lesson, index) => (
                                        <div key={index} className="lesson" style={{ backgroundColor: "#FFFFFF", padding: "15px", borderRadius: "8px", width: "250px", minHeight: "320px", cursor: "pointer", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                            <Input placeholder="Название урока" value={lesson.title} style={styles.input} />
                                            <Input placeholder="Тема урока" value={lesson.topic} style={styles.input} />
                                            {lesson?.tasks?.map((block, blockIndex) => (
                                                <Input
                                                    key={blockIndex}
                                                    placeholder={`Дополнительные задания ${blockIndex + 1}`}
                                                    value={block}
                                                    onChange={(e) => handleBlockInputChange(index, blockIndex, e.target.value)}
                                                    style={styles.input}
                                                />
                                            ))}

                                            <Button type="text" icon={<PlusOutlined />} onClick={() => handleAddBlock(lesson)}>Добавить блок</Button>
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

            <Modal visible={isClassModalVisible} onCancel={handleCloseClassModal} footer={false} onOk={handleAddClass} title="Добавить класс">
                <Input placeholder="Название класса" value={newClass.name} onChange={(e) => setNewClass({ name: e.target.value })} />
               <div style={{textAlign:"right",marginTop:"20px",}}>
                   <Button type='primary' onClick={createClass}>
                       Cоздать
                   </Button>
               </div>
            </Modal>

            <Modal visible={isLessonModalVisible} onCancel={handleCloseLessonModal} onOk={handleAddLesson} title="Добавить урок">
                <Input placeholder="Название урока" value={newLesson.title} onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })} />
                <Input placeholder="Тема урока" value={newLesson.topic} onChange={(e) => setNewLesson({ ...newLesson, topic: e.target.value })} style={{ marginTop: "10px" }} />
            </Modal>
        </Layout>
    );
};

export default Main;
