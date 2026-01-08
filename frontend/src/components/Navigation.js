import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHome, FaTrophy, FaUsers } from 'react-icons/fa';

function Navigation() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/3/32/Flag_of_Pakistan.svg" 
            alt="Pakistan Flag" 
            height="30"
            className="me-2"
          />
          Pakistan Cricket Teams
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/"><FaHome className="me-1" /> Home</Nav.Link>
            <Nav.Link as={Link} to="/tournaments"><FaTrophy className="me-1" /> Tournaments</Nav.Link>
            <Nav.Link as={Link} to="/players"><FaUsers className="me-1" /> Players</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;