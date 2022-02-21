import React, { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import MainScreen from '../../components/MainScreen/MainScreen'
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { noteCreateAction } from '../../React-redux/Action/noteAction';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import Error from '../../components/Error';

const SingleNote = () => {

    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [category, setCategory] = useState();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const noteCreate = useSelector((state) => state.noteCreate);
    const { loading, error } = noteCreate;

    const resetHandler = () => {
        setTitle("");
        setContent("");
        setCategory("");
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if (!title || !content || !category) return;
        dispatch(noteCreateAction(title, content, category));

        resetHandler();
        navigate("/mynotes");
    }

    return (
        <>
            <MainScreen title={'Create a Note'}>
                <Card>
                    <Card.Header>Create a Note</Card.Header>
                    <Card.Body>
                        <Form onSubmit={submitHandler}>
                            {error && <Error variant='danger'>{error}</Error>}
                            <Form.Group controlId="formGroupTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formGroupContent">
                                <Form.Label>Content</Form.Label>
                                <Form.Control
                                    as="textarea"
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
                                </Card>}

                            <Form.Group controlId="formGroupCategory">
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                />
                            </Form.Group>

                            {loading && <Loading />}
                            <Button type='submit'>Create Note</Button>
                            <Button className='mx-2' variant='danger' onClick={resetHandler}>Reset Fields</Button>
                        </Form>
                    </Card.Body>
                    <Card.Footer className='text-muted'>
                        Creating on - {new Date().toLocaleDateString()}
                    </Card.Footer>
                </Card>
            </MainScreen>
        </>
    )
}

export default SingleNote