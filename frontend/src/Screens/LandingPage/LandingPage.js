import React, { useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import './LandingPage.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo) {
            navigate('/mynotes');
        }
    }, [navigate, userInfo])




    return (
        <>
            <div className="main">
                <Container>
                    <div className="intro-text">
                        <div>
                            <h1 className="title">Welcome to Note Zipper</h1>
                            <p className="sub-title">One Safe place for all your notes.</p>
                        </div>
                        <div className="buttons">
                            <a href="/login">
                                <Button size='lg' className='landing-btn'>Login</Button>
                            </a>
                            <a href="/register">
                                <Button size='lg' className='landing-btn' variant='outline-primary'>Signup</Button>
                            </a>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
};

export default LandingPage;
