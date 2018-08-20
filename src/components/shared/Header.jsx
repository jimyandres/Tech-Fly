import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const renderLogin = () => (
  <Nav className="ml-auto" navbar>
    <NavItem>
      <NavLink tag={Link} to="/account/login">Log In</NavLink>
    </NavItem>
    <NavItem>
      <NavLink tag={Link} to="/account/register">Register</NavLink>
    </NavItem>
  </Nav>
);

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.logOutClick = this.logOutClick.bind(this);
    this.renderGreeting = this.renderGreeting.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);
  }

  logOutClick(e) {
    e.preventDefault();
    const { logUserOutFunction } = this.props;
    logUserOutFunction();
  }

  toggleNavbar() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  renderGreeting(name) {
    return (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <span className="nav-link">Welcome, {name}
            | <a href="/logout" onClick={this.logOutClick}>Log Out</a>
          </span>
        </NavItem>
      </Nav>
    );
  }

  render() {
    const { isLoggedIn, firstName, id } = this.props.authentication;
    return (
      <header className="wrapper">
        <Navbar color="faed" light expand>
          <NavbarToggler onClick={this.toggleNavbar} />
          <NavbarBrand tag={Link} to="/">Tech&Fly</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              { id && id !== '' ?
                <NavItem>
                  <NavLink tag={Link} to={`/reservations/${id}`}>My Reservations</NavLink>
                </NavItem>
              : null }
            </Nav>
            { isLoggedIn ? this.renderGreeting(firstName) : renderLogin() }
          </Collapse>
        </Navbar>
      </header>
    );
  }
}

export default Header;
