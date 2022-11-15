import React, {createContext, useEffect, useState} from 'react';
import {getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, FacebookAuthProvider, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signInWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth";
import app from '../firebase/Firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const UserContext = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Sign in with google
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // Sign in with facebook
    const signInWithFacebook = () => {
        setLoading(true);
        return signInWithPopup(auth, facebookProvider);
    };

    // Create user with email and password
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Update user
    const updateUser = (userObj) => {
        return updateProfile(auth.currentUser, userObj);
    };

    // Send email verification
    const emailVarification = () => {
        return sendEmailVerification(auth.currentUser);
    };

    // Sign in user with user and password
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Password reset
    const passwordReset = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    // Log out
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    // Current User Observer
    useEffect(() => {
        return () => onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });
    }, [user]);

    const authInfo = {
        user,
        signInWithGoogle,
        signInWithFacebook,
        createUser,
        signInUser,
        logOut,
        passwordReset,
        updateUser,
        emailVarification,
        loading
    };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;