import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";
import "../App.css";

class NavbarMain extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      user: props.user,
      isPrivileged:
        props.user.role === "Admin" || props.user.role === "Privileged",
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <div>
        <Navbar
          color="faded"
          dark
          expand="md"
          fixed={`top`}
          className="navDark"
        >
          <Container>
            <NavbarBrand href="/">World Tourism</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/#about">About</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/#packageBody">Package</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/#servicesBody">Services</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/#contactBody">Contact</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/wishlist">Your Wishlist</NavLink>
                </NavItem>
                {this.state.user.firstName ? (
                  <>
                    <NavItem>
                      {this.state.isPrivileged ? (
                        <NavLink href="/dashboard">Dashboard</NavLink>
                      ) : (
                        <NavItem>
                          <NavLink href="">
                            Welcome, {this.state.user.firstName}!
                          </NavLink>
                        </NavItem>
                      )}
                    </NavItem>
                    <NavItem>
                      <NavLink
                        href="/auth/logout"
                        className="btn btn-warning "
                        color="warning"
                      >
                        <i className="fas fa-sign-out-alt"></i>&nbsp; Log out
                      </NavLink>
                    </NavItem>
                  </>
                ) : (
                  <NavItem>
                    <NavLink
                      href="/auth/login"
                      className="btn btn-success "
                      color="success"
                    >
                      <i className="fas fa-sign-in-alt"></i>&nbsp; Login
                    </NavLink>
                  </NavItem>
                )}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default NavbarMain;
