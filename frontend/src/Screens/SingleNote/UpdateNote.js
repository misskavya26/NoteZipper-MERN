import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import MainScreen from '../../components/MainScreen/MainScreen'
import { noteDeleteAction, noteUpdateAction } from '../../React-redux/Action/noteAction';

const UpdateNote = () => {

    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [category, setCategory] = useState();
    const [date, setDate] = useState("");

    const { id } = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const noteUpdate = useSelector((state) => state.noteUpdate);
    const { loading, error } = noteUpdate;

    const noteDelete = useSelector((state) => state.noteDelete);
    const { loading: loadingDelete, error: errorDelete } = noteDelete;

    useEffect(() => {
        const fetching = async () => {
            const { data } = await axios.get(`/api/notes/${id}`)

            setTitle(data.title);
            setContent(data.content);
            setCategory(data.category);
            setDate(data.updatedAt);
        }

        fetching();
    }, [id, date])

    const resetHandler = () => {
        setTitle("");
        setContent("");
        setCategory("");
    }

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(noteUpdateAction(id, title, content, category));
        if (!title || !content || !category) return;

        resetHandler();
        navigate('/mynotes');
    }

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure you want to Delete this note?")) {
            dispatch(noteDeleteAction(id));
        }
        navigate('/mynotes');
    }

    return (
        <>
            <MainScreen title={'Update Note'}>
                <Card>
                    <Card.Header>Update Note</Card.Header>
                    <Card.Body>
                        {error && <Error variant='danger'>{error}</Error>}
                        {errorDelete && <Error variant='danger'>{errorDelete}</Error>}
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='formGroupTitle'>
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type='text'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId='formGroupContent'>
                                <Form.Label>Content</Form.Label>
                                <Form.Control
                                    as='textarea'
                                    rows={4}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </Form.Group>

                            {content &&
                                <Card>
                                    <Card.Header>Note Preview</Card.Header>
                                    <Card.Body>
                                        <ReactMarkdown>{content}</ReactMarkdown>
                                    </Card.Body>
                                </Card>
                            }

                            <Form.Group controlId='formGroupCategory'>
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    type='text'
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                />
                            </Form.Group>

                            {loading && <Loading />}
                            {loadingDelete && <Loading />}

                            <Button type='submit'>Update Note</Button>
                            <Button
                                className='mx-2'
                                variant='danger'
                                onClick={() => deleteHandler(id)}>Delete Note</Button>
                        </Form>
                    </Card.Body>
                    <Card.Footer className='text-muted'>
                        - Updated on {date.substring(0, 10)}
                    </Card.Footer>
                </Card>
            </MainScreen>
        </>
    )
}

export default UpdateNote