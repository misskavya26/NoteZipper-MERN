import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Error from '../../components/Error';
import MainScreen from '../../components/MainScreen/MainScreen'
import { useNavigate } from 'react-router-dom';
import { userProfileAction } from '../../React-redux/Action/userAction';
import Loading from '../../components/Loading';
import './ProfilePage.css';

const ProfilePage = () => {

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userProfile = useSelector((state) => state.userProfile);
    const { loading, error, success } = userProfile;

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [picture, setPicture] = useState();
    const [picMessage, setPicMessage] = useState();

    const navigate = useNavigate();

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

    useEffect(() => {
        if (!userInfo) {
            navigate('/');
        }
        else {
            setName(userInfo.name);
            setEmail(userInfo.email);
            setPicture(userInfo.picture);
        }

    }, [navigate, userInfo])


    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(userProfileAction({ name, email, password, picture }));

    }

    return (
        <>
            <MainScreen title={'EDIT PROFILE'}>
                <div>
                    <Row className='profileContainer'>
                        <Col md={6}>
                            <Form onSubmit={submitHandler}>

                                {loading && <Loading />}
                                {success && <Error variant='success'>Updated Successfully</Error>}
                                {error && <Error variant='danger'>{error}</Error>}

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
                        </Col>
                        <Col>
                            <img src={picture} alt={name} className='profilePic' />
                        </Col>
                    </Row>
                </div>
            </MainScreen>
        </>
    )
}

export default ProfilePage