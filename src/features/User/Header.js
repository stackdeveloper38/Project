import React, { Component } from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
class Header extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col xs="12">
                        <ul className="list-group">
                            <li className="list-group-item text-left"><a href="/Notifications">Notifications</a></li>
                            <li className="list-group-item text-left"><a href="/Candidates">Candidates</a></li>
                            <li className="list-group-item text-left"><a href="/Dashboard">Students</a></li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default Header;