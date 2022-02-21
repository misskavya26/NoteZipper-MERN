import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import MainScreen from '../../components/MainScreen/MainScreen';
import './RegisterPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { userRegisterAction } from '../../React-redux/Action/userAction';

const RegisterPage = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [picture, setPicture] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");
    const [passwordMessage, setPasswordMessage] = useState(null);
    const [picMessage, setPicMessage] = useState(null);

    const dispatch = useDispatch();

    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo) {
            navigate('/mynotes');
        }
    }, [navigate, userInfo])


    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setPasswordMessage('Passwords do not match');
        }
        else {
            dispatch(userRegisterAction(name, email, password, picture));
        }


    }

    const postDetails = (pics) => {
        if (pics === "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg") {
            setPicMessage('Please Select an Image');
        }
        setPicMessage(null);

        if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
            const data = new FormData();
            data.append('file', pics);
            data.append('upload_preset', 'notezipper');
            data.append('cloud_name', 'dsbrljzgq');
            fetch("https://api.cloudinary.com/v1_1/dsbrljzgq/image/upload", {
                method: 'post',
                body: data
            }).then((res) => res.json()).then((data) => setPicture(data.url.toString())).catch((error) => console.error())
        } else {
            setPicMessage('Please Select an Image');
        }
    }

    return (
        <>
            <MainScreen title='REGISTER'>
                <div className="localContainer">
                    {error && <Error variant='danger'>{error}</Error>}
                    {passwordMessage && <Error variant='danger'>{passwordMessage}</Error>}
                    {loading && <Loading />}

                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="formGroupName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formGroupConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>

                        {picMessage && <Error variant='danger'>{picMessage}</Error>}

                        <Form.Group controlId="pic">
                            <Form.Label>Profile Picture</Form.Label>
                            <Form.File
                                onChange={(e) => postDetails(e.target.files[0])}
                                id="custom-file"
                                type="image/png"
                                label="Upload Profile Picture"
                                custom
                            />
                        </Form.Group>
                        <Button type='submit'>Submit</Button>
                    </Form>
                    <Row>
                        <Col className='pt-3'>
                            Already Register ? <Link to='/login' style={{ color: 'blue' }}>
                                Login here
                            </Link>
                        </Col>
                    </Row>
                </div>
            </MainScreen>
        </>
    );
};

export default RegisterPage;
