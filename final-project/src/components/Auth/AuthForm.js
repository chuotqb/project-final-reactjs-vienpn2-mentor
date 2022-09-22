import { React, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
    Form,
    FormGroup,
    Input,
    Label,
    Button,
} from 'reactstrap';
import AuthContext from "../../store/auth-context";

const AuthForm = () => {
    const navigate = useNavigate();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const authCtx = useContext(AuthContext);


    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        setIsLoading(true);
        let url;
        if (isLogin) {
            url =
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDalqAj8o4WmbRLety25dK4hLMkSdAHBlQ';
        } else {
            url =
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDalqAj8o4WmbRLety25dK4hLMkSdAHBlQ';
        }
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                setIsLoading(false);
                if (res.ok) {
                    return res.json();
                } else {
                    return res.json().then((data) => {
                        let errorMessage = 'Authentication failed!';
                        throw new Error(errorMessage);
                    });
                }
            })
            .then((data) => {
                authCtx.login(data.idToken)
                authCtx.email = data.email;
                navigate('/');
            })
            .catch((err) => {
                alert(err.message);
            });
    };


    return (
        <div className="form-auth">
            <h2 className="text-center">{isLogin ? 'Login' : 'Register'}</h2>
            <Form className="form" onSubmit={submitHandler}>
                <FormGroup>
                    <Label for="email">Username</Label>
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="example@example.com"
                        required
                        innerRef={emailInputRef}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="********"
                        required
                        innerRef={passwordInputRef}
                    />
                </FormGroup>
                <div className="d-flex flex-column justify-content-center">
                    {!isLoading &&
                        <Button className="mb-1">{isLogin ? 'Login' : 'Create Account'}</Button>
                    }
                    {isLoading && <p>Loading...</p>}
                    <br></br>
                    <Button onClick={switchAuthModeHandler}>
                        {isLogin ? 'Create new account' : 'Login with existing account'}
                    </Button>
                </div>
            </Form>
        </div>

    );
};

export default AuthForm;
