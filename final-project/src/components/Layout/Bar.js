import { React, useContext, useState } from 'react';
import logo from '../../logo.svg';
import {
    Navbar,
    NavItem,
    NavbarToggler,
    Collapse,
    NavLink,
    Nav,
    NavbarBrand,
    NavbarText
} from 'reactstrap';
import AuthContext from '../../store/auth-context';
function Bar() {
    const [isOpen, setIsOpen] = useState(false);

    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    const logoutHandle = () => {
        authCtx.logout();
    }

    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand href="/">
                <img src={logo} className="App-logo" alt="logo" /></NavbarBrand>
            <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="me-auto" navbar>
                    {isLoggedIn &&
                        <NavItem>
                            <NavLink href="/student">Manager</NavLink>
                        </NavItem>
                    }
                </Nav>
                <Nav>
                    {isLoggedIn &&
                        <NavbarText>{authCtx.email}</NavbarText>
                    }
                    {!isLoggedIn &&
                        <NavItem>
                            <NavLink href="/auth">Login</NavLink>
                        </NavItem>
                    }
                    <NavItem>
                        {isLoggedIn &&
                            <NavLink onClick={logoutHandle} href="#">Logout</NavLink>
                        }
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    );
}

export default Bar;