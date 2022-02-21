import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import MainScreen from '../../components/MainScreen/MainScreen';
import './LoginPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginAction } from '../../React-redux/Action/userAction';

const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo) {
            navigate('/mynotes')
        }
    }, [navigate, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault();

        dispatch(userLoginAction(email, password));
    }



    return (
        <MainScreen title='LOGIN'>
            <div className="localContainer">
                {error && <Error variant='danger' >{error}</Error>}
                {loading && <Loading />}
                <Form onSubmit={submitHandler}>
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
                    <Button type='submit'>Submit</Button>
                </Form>
                <Row>
                    <Col className='pt-3'>
                        New Customer ?
                        <Link to='/register' style={{ color: "blue" }}> Register Here
                        </Link>
                    </Col>
                </Row>
            </div>

        </MainScreen>
    );
};

export default LoginPage;
