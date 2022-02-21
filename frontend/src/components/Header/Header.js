import React, { useEffect } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogoutAction } from '../../React-redux/Action/userAction';

const Header = ({ setSearch }) => {

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(userLogoutAction());
        navigate('/')
    };

    useEffect(() => { }, [userInfo])

    return (
        <>
            <Navbar bg="primary" expand="lg" variant='dark'>
                <Container>
                    <Navbar.Brand href="/">
                        <Link to="/">
                            Note Zipper
                        </Link>
                    </Navbar.Brand>


                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="ml-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            {userInfo ? (
                                <>
                                    <Nav.Link href="/mynotes">
                                        <Link to="/mynotes">
                                            My Notes
                                        </Link>
                                    </Nav.Link>
                                    <NavDropdown title={`${userInfo?.name}`} id="navbarScrollingDropdown">
                                        <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={logoutHandler}>
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </>) : (
                                <Nav.Link href="/login">
                                    <Link to="/login">
                                        Login
                                    </Link>
                                </Nav.Link>
                            )}
                        </Nav>


                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
