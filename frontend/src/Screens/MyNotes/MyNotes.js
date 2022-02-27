import React, { useEffect } from 'react';
import './mynotes.css';
import { Accordion, Badge, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MainScreen from '../../components/MainScreen/MainScreen';
import { useDispatch, useSelector } from 'react-redux';
import { noteDeleteAction, noteListAction } from '../../React-redux/Action/noteAction';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import ReactMarkdown from 'react-markdown';

const MyNotes = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const noteList = useSelector((state) => state.noteList);
    const { loading, notes, error } = noteList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const noteCreate = useSelector((state) => state.noteCreate);
    const { success: successCreate } = noteCreate;

    const noteUpdate = useSelector((state) => state.noteUpdate);
    const { success: successUpdate } = noteUpdate;

    const noteDelete = useSelector((state) => state.noteDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = noteDelete;

    // const userProfile = useSelector((state) => state.userProfile);
    // const { success: successProfile } = userProfile;

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure you want to Delete this note?")) {
            dispatch(noteDeleteAction(id));
        }
    }

    useEffect(() => {
        dispatch(noteListAction());
        if (!userInfo) {
            navigate("/")
        }
    }, [dispatch, userInfo, navigate, successCreate, successUpdate, successDelete]);

    return (
        <>
            <MainScreen title={`Welcome ${userInfo && userInfo.name}`}>
                <Link to="/createnote">
                    <Button style={{ marginBottom: 13 }} size="lg" className='button-create'>Create new note</Button>
                </Link>

                {loading && <Loading size={150} />}
                {loadingDelete && <Loading size={150} />}
                {error && <Error variant='danger'>{error}</Error>}
                {errorDelete && <Error variant='danger'>{errorDelete}</Error>}

                {notes && notes
                    .reverse()
                    .map((note) => (
                        <Accordion key={note._id}>
                            <Card style={{ margin: 10 }}>
                                <Card.Header style={{ display: "flex" }}>
                                    <span style={{
                                        color: "black",
                                        textDecoration: "none",
                                        cursor: "pointer",
                                        fontSize: 18,
                                        flex: 1,
                                        alignSelf: "center",
                                        fontWeight: "bold"
                                    }}>

                                        <Accordion.Toggle
                                            as={Card.Text}
                                            variant="link"
                                            eventKey="0"
                                        >
                                            {note.title}
                                        </Accordion.Toggle>

                                    </span>

                                    <div>
                                        <Link to={`/note/${note._id}`}>
                                            <Button>Edit</Button>
                                        </Link>
                                        <Button
                                            onClick={() => deleteHandler(note._id)}
                                            className='mx-2'
                                            variant='danger'>Delete</Button>
                                    </div>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <h4>
                                            <Badge variant="secondary">
                                                Category : {note.category}
                                            </Badge>
                                        </h4>
                                        <blockquote className="blockquote mb-0">
                                            <ReactMarkdown>
                                                {note.content}
                                            </ReactMarkdown>
                                            <footer className="blockquote-footer">
                                                - Created by {note.createdAt.substring(0, 10)}
                                            </footer>
                                        </blockquote>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    ))
                }


            </MainScreen>
        </>
    );
};

export default MyNotes;
