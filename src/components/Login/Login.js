import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';

function Login() {
    const [user, setUser] = useState({
        isSignedIn: false,
        name: "",
        email: "",
        password: "",
        photo: "",
        err: "",
        success: false
    })

    initializeLoginFramework();

    const [newUser, setNewUser] = useState(false)

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, true)
            })
    }
    const fbSignIn = () => {
        handleFbSignIn()
            .then(res => {
                handleResponse(res, true)
            })
    }
    const signOut = () => {
        handleSignOut()
            .then(res => {
                handleResponse(res, false)
            })
    }
    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        if(redirect){
            history.replace(from)
        }
    }
    const handleBlur = (e) => {
        // console.log(e.target.name, e.target.value)
        let isFieldValid = true;
        if (e.target.name === "email") {
            // const isEmailValid = /\S+@\S+\.\S+/.test(e.target.value);
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
            // console.log(isEmailValid);
        }
        if (e.target.name === "password") {
            const isPasswordValid = e.target.value.length >= 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);   // /\d{1}.test(1) = true;
            // console.log(isPasswordValid && passwordHasNumber);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }
    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }
        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    handleResponse(res, true)
                })
        }
        e.preventDefault(); // loading off
    }

    return (
        <div style={{ textAlign: "center" }}>

            {/* Google Sign in Started */}
            {
                user.isSignedIn ? <button onClick={signOut}>Google Sign Out</button>
                    : <button onClick={googleSignIn}>Google Sign in</button>
            }
            <br />
            <button onClick={fbSignIn}>Sign in using Facebook</button>
            {
                user.isSignedIn && <div>
                    <p>Welcome, <strong>{user.name}</strong></p>
                    <p>Your email address is: {user.email}</p>
                    <img src={user.photo} alt="" />
                </div>
            }

            <h1>Our own Authentication</h1>
            <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} id="" />
            <label htmlFor="newUser">New user sign up</label>
            <form onSubmit={handleSubmit}>
                {newUser && <input type="text" onBlur={handleBlur} name="name" id="" placeholder="your name" />} <br />
                <input type="email" onBlur={handleBlur} name="email" id="" placeholder="your email address" required /> <br />
                <input type="password" onBlur={handleBlur} name="password" id="" placeholder="your password" required /> <br />
                <input type="submit" value={newUser ? "Sign up" : "Sign in"} />
            </form>
            <p style={{ color: "red" }}>{user.err}</p>
            {user.success && <p style={{ color: "green" }}>Account {newUser ? "created" : "logged in"} successfully!!</p>}
        </div>
    );
}

export default Login;