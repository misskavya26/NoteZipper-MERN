import React from 'react';
import { Container, Row } from 'react-bootstrap';

const Footer = () => {
    return (
        <>
            <Container>
                <Row>
                    <p style={{
                        width: "100%",
                        position: "relative",
                        bottom: 0,
                        display: "flex",
                        justifyContent: "center",
                        paddingTop:"10px"
                    }}>CopyRight &copy; Note Zipper</p>
                </Row>
            </Container>
        </>
    );
};

export default Footer;
