import React, {useContext} from 'react';
import {AuthContext} from '../../contexts/UserContext';

const AddQuestions = () => {
    const {user} = useContext(AuthContext);
    const onSubmitHandler = (event) => {
        event.preventDefault();
        const email = user?.email;
        const uid = user?.uid;
        const form = event.target;
        const topic = form.topic.value;
        const hardLevel = form.hardLevel.value;
        const importancy = form.importancy.value;
        const access = form.access.value;
        const question = form.question.value;
        const answer = form.answer.value;
        const addDate = Date().slice(4, 15);
        const questions = {email, uid, topic, hardLevel, importancy, access, question, answer, addDate};
        console.log(questions);

        fetch('https://bcs-viva-server.vercel.app/questions', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(questions)
        })
            .then(() => {
                console.log('Data added successfully!!');
            })
            .catch(err => {
                console.log(err);
            });
    };
    return (
        <div className='w-11/12 lg:w-2/4 mx-auto mt-24 mb-14'>
            <h2 className='text-3xl font-bold text-center mb-5'>Add Questions</h2>
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
                    </select>

                    <label className="label">
                        <span className="label-text font-bold">Select Hard Level</span>
                    </label>
                    <select className="select select-bordered" name='hardLevel'>
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>

                    <label className="label">
                        <span className="label-text font-bold">Select Importancy</span>
                    </label>
                    <select className="select select-bordered" name='importancy'>
                        <option>Less Important</option>
                        <option>Medium Important</option>
                        <option>Most Important</option>
                    </select>

                    <label className="label">
                        <span className="label-text font-bold">Select Privacy</span>
                    </label>
                    <select className="select select-bordered" name='access'>
                        <option>Public</option>
                        <option>Private</option>
                    </select>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Write A Viva Question</span>
                        </label>
                        <textarea name='question' className="textarea textarea-bordered h-24" placeholder="Viva Question"></textarea>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Write The Answer</span>
                        </label>
                        <textarea name='answer' className="textarea textarea-bordered h-24" placeholder="Viva Question Answer"></textarea>
                    </div>
                </div>
                <button type='submit' className='btn btn-primary w-full mt-5'>Add Question</button>
            </form>
        </div>
    );
};

export default AddQuestions;