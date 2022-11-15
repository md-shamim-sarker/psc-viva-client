import React, {useContext, useState} from 'react';
import login from '../../assets/login.svg';
import Navbar from '../../shared/Navbar';
import {Link} from 'react-router-dom';
import {AuthContext} from '../../contexts/UserContext';

const Registration = () => {
    const {createUser, updateUser, emailVarification, logOut} = useContext(AuthContext);
    const [errMsg, setErrMsg] = useState(null);

    const formController = (event) => {
        event.preventDefault();
        const form = event.target;
        const fullName = form.fullName.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        if(password !== confirmPassword) {
            setErrMsg('Password is not matched.');
            return;
        }
        const user = {fullName, email, password};
        setErrMsg(null);
        console.log(user);
        createUser(email, password)
            .then(() => {
                updateUser({displayName: fullName})
                    .then(() => {
                        emailVarification()
                            .then(() => {
                                logOut().then().catch();
                                alert(`Send a email verification to ${email}`);
                            })
                            .then(err => console.log(err));
                    })
                    .then(err => console.log(err));
            })
            .catch(err => console.log(err));
    };
    return (
        <>
            <Navbar></Navbar>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse gap-10 mt-16">
                    <div className="flex justify-center w-full">
                        <img src={login} alt="login_image" className='w-[35rem]' />
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <h2 className='text-center text-2xl font-bold'>REGISTRATION</h2>
                            <form onSubmit={formController}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Full Name</span>
                                    </label>
                                    <input type="text" name='fullName' placeholder="full name" className="input input-bordered" />
                                </div>
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
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Confirm Password</span>
                                    </label>
                                    <input type="password" name='confirmPassword' placeholder="confirm password" className="input input-bordered" />
                                </div>
                                <p className='text-red-600'>{errMsg}</p>
                                <div className="form-control mt-5">
                                    <button type='submit' className="btn btn-primary">Register</button>
                                    <div className='flex gap-x-1 justify-center mt-2'>
                                        <span>Already have an account?</span>
                                        <Link to={"/login"} className="hover:underline text-blue-600 font-bold">Login</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Registration;