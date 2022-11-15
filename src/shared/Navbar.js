import React, {useContext, useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {FaBars} from 'react-icons/fa';
import {GrClose} from 'react-icons/gr';
import {AuthContext} from '../contexts/UserContext';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const {user, logOut} = useContext(AuthContext);

    const openHandler = () => {
        setOpen(!open);
    };

    return (
        <nav className='w-full flex justify-between items-center px-5 bg-blue-200 py-2 fixed top-0 z-50'>
            <Link to={"/"} className="text-xl font-bold">BCS VIVA</Link>
            <div className='flex justify-between items-center gap-x-5'>
                {/* For Desktop */}
                <div className='hidden lg:flex gap-x-5 items-center font-bold'>
                    <NavLink to={"/"} className={({isActive}) => isActive ? 'text-blue-800' : undefined}>
                        Home
                    </NavLink>
                    <NavLink to={"/filter"} className={({isActive}) => isActive ? 'text-blue-800' : undefined}>
                        Filter
                    </NavLink>
                    <NavLink to={"/my-questions"} className={({isActive}) => isActive ? 'text-blue-800' : undefined}>
                        My Questions
                    </NavLink>
                    <NavLink to={"/add-questions"} className={({isActive}) => isActive ? 'text-blue-800' : undefined}>
                        Add Questions
                    </NavLink>
                    <NavLink to={"/about"} className={({isActive}) => isActive ? 'text-blue-800' : undefined}>
                        About
                    </NavLink>
                </div>
                {
                    user?.uid && <div className='btn btn-primary btn-sm'>
                        Hello, {user?.displayName}
                    </div>
                }
                {
                    user?.uid
                        ? <button onClick={logOut} className='btn btn-primary btn-sm hidden lg:block'>Logout</button>
                        : <NavLink to={"/login"} className='btn btn-primary btn-sm'>
                            Login
                        </NavLink>
                }

                {/* For Mobile */}
                <button onClick={openHandler} className="block lg:hidden">
                    {
                        open
                            ? <GrClose className='w-5 h-5'></GrClose>
                            : <FaBars className='w-5 h-5'></FaBars>
                    }
                </button>
            </div>

            <div onClick={openHandler} className={`fixed top-14 right-2 z-50 ${open ? 'block' : 'hidden'}`}>
                <div className='flex flex-col w-56 rounded-xl fixed top-14 z-96 right-2 bg-blue-200 overflow-hidden font-bold py-3'>
                    <NavLink to={"/"} className={`w-full pl-5 py-2`}>
                        Home
                    </NavLink>
                    <NavLink to={"/filter"} className={`w-full pl-5 py-2`}>
                        Filter
                    </NavLink>
                    <NavLink to={"/my-questions"} className={`w-full pl-5 py-2`}>
                        My Questions
                    </NavLink>
                    <NavLink to={"/add-questions"} className={`w-full pl-5 py-2`}>
                        Add Questions
                    </NavLink>
                    <NavLink to={"/about"} className={`w-full pl-5 py-2`}>
                        About
                    </NavLink>
                    {
                        user?.uid && <div onClick={logOut} className='w-full pl-5 py-2 cursor-pointer'>Logout</div>
                    }
                </div>
            </div>
        </nav>
    );
};

export default Navbar;