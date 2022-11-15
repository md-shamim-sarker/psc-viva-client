import React, {useContext} from 'react';
import {AuthContext} from '../../contexts/UserContext';

const Filter = () => {
    const {user} = useContext(AuthContext);
    const onSubmitHandler = (event) => {
        event.preventDefault();
        const form = event.target;
        const topic = form.topic.value;
        const hardLevel = form.hardLevel.value;
        const importancy = form.importancy.value;
        const access = form.access.value;
        const filter = {topic, hardLevel, importancy, access};
        console.log(filter);
    };
    return (
        <div className='w-11/12 lg:w-1/4 mx-auto mt-24 mb-14'>
            <h2 className='text-3xl font-bold text-center'>Filter Page</h2>
            <form onSubmit={onSubmitHandler}>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-bold">Select A Topic</span>
                    </label>
                    <select className="select select-bordered" name='topic'>
                        <option>About Own</option>
                        <option>Cadre Choice</option>
                        <option>Own Country</option>
                        <option>Own University</option>
                        <option>Own Subject</option>
                        <option>Own Birthplace</option>
                        <option>Independence War</option>
                        <option>International Issues</option>
                        <option>Others Topic</option>
                        <option>All</option>
                    </select>

                    <label className="label">
                        <span className="label-text font-bold">Select Hard Level</span>
                    </label>
                    <select className="select select-bordered" name='hardLevel'>
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                        <option>All</option>
                    </select>

                    <label className="label">
                        <span className="label-text font-bold">Select Importancy</span>
                    </label>
                    <select className="select select-bordered" name='importancy'>
                        <option>Less Important</option>
                        <option>Medium Important</option>
                        <option>Most Important</option>
                        <option>All</option>
                    </select>

                    <label className="label">
                        <span className="label-text font-bold">Select Access</span>
                    </label>
                    <select className="select select-bordered" name='access'>
                        <option>All Public Questions</option>
                        <option value={user?.uid}>Only My Questions</option>
                    </select>
                </div>
                <button type='submit' className='btn btn-primary w-full mt-5'>Filter Out</button>
            </form>
        </div>
    );
};

export default Filter;