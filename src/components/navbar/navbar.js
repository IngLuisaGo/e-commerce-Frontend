import React from 'react';
import { Navbar, Container, Nav, DropdownButton, Dropdown} from 'react-bootstrap';
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';


export default class menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Navbar fixed="top" id="navbar" bg="primary" expand="lg" variant='dark'>
                <Container>
                    <Navbar.Brand href="#home">Stylolenanie.com</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {/*<Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>*/}
                        </Nav>
                        <DropdownButton id="dropdown-basic-button" title="Usuario" >

                            {/* <Dropdown.Header>
                                <Dropdown.Item href="#/action-1">
                                    <FontAwesomeIcon icon={faUserGear} /> Cerrar sesión</Dropdown.Item>
                            </Dropdown.Header> */}
                            <Dropdown.Header id="dropwown-header">
                                <Dropdown.Item href="#/action-1">
                                    <FontAwesomeIcon icon={faRightFromBracket} /> Cerrar sesión</Dropdown.Item>
                            </Dropdown.Header>
                            {/* <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
                        </DropdownButton>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        );
    }
}
