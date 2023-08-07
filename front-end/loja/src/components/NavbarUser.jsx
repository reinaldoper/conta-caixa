import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import PropTypes from 'prop-types';

const NavbarUser = ({ data }) => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container style={{ backgroundColor: '#c4c776', borderRadius: '5px'}}>
        <Navbar.Brand href="/">Login - Page</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="clean">Delete</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="create">Transaction-Create</NavDropdown.Item>
              <NavDropdown.Item href="transaction">
                Transaction
              </NavDropdown.Item>
              <NavDropdown.Item href="recover">RecoverAccount</NavDropdown.Item>
              <NavDropdown.Item href="cashback">Cashback - Create</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          { data ? <span style={{marginRight: '1.5vw'}}>cpf: { data.cpf }</span>: null}
          { data ? <span style={{marginLeft: '1.5vw'}}>name: { data.name } </span>: null }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

NavbarUser.propTypes = {
  data: PropTypes.object.isRequired,
};

export default NavbarUser;
