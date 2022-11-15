import React, {useContext, useState} from 'react';
import login from '../../assets/login.svg';
import {FcGoogle} from 'react-icons/fc';
import {SiFacebook} from 'react-icons/si';
import Navbar from '../../shared/Navbar';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {AuthContext} from '../../contexts/UserContext';

const Login = () => {
    const [email, setEmail] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const {signInWithGoogle, signInWithFacebook, signInUser, passwordReset} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    // Sign in with email and password
    const formController = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        setEmail(email);
        setErrorMessage(null);
        signInUser(email, password)
            .then((result) => {
                console.log(result);
                navigate("/my-questions");
            })
            .catch((err) => {
                const errMsg = err.message;
                console.log(errMsg);
                setErrorMessage(errMsg.split(': ')[1]);
            });
    };

    // Sign in with google
    const signInWithGoogleHandler = () => {
        signInWithGoogle()
            .then((result) => {
                console.log(result);
                navigate(from, {replace: true});
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // Sign in with facebook
    const signInWithFacebookHandler = () => {
        signInWithFacebook()
            .then((result) => {
                console.log(result);
                navigate(from, {replace: true});
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // Password reset
    const passwordResetHandler = () => {
        passwordReset(email)
            .then(() => {
                alert(`Password reset email send to ${email}`);
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            <Navbar></Navbar>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse gap-10 mt-16">
                    <div className="flex justify-center w-full">
                        <img src={login} alt="login_image" className='w-[32.9rem]' />
                    </div>
                    <div className="w-full card flex-shrink-0 max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <h2 className='text-center text-2xl font-bold'>LOGIN</h2>
                            <form onSubmit={formController}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" name='email' placeholder="email" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" name='password' placeholder="password" className="input input-bordered" />
                                    <label className="label">
                                        <button onClick={passwordResetHandler} className="label-text-alt link link-hover underline">Forgot password?</button>
                                        <span className='text-red-600 text-sm'>{errorMessage}</span>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <button type='submit' className="btn btn-primary">Login</button>
                                    <div className='flex gap-x-1 justify-center mt-2'>
                                        <span>You don't have an account?</span>
                                        <Link to={"/register"} className="hover:underline text-blue-600 font-bold">Register</Link>
                                    </div>
                                </div>
                            </form>
                            <div className="divider">Or Login With</div>
                            <div className='flex justify-center gap-3'>
                                <FcGoogle onClick={signInWithGoogleHandler} className='w-5 h-5 cursor-pointer' title='Login with Google'></FcGoogle>
                                <SiFacebook onClick={signInWithFacebookHandler} className='w-5 h-5 text-blue-600 cursor-pointer' title='Login with Facebook'></SiFacebook>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;