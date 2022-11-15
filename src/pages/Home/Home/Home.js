import React from 'react';
import {useLoaderData} from 'react-router-dom';
import Banner from '../Banner/Banner';

const Home = () => {
    const questions = useLoaderData();
    console.log(questions);
    return (
        <div>
            <Banner></Banner>
            <h2 className='text-3xl font-bold text-center my-8'>COLLECTION OF ALL QUESTIONS</h2>
            <div className='mb-10'>
                {
                    questions.map((question, index) =>
                        <div key={question?._id} tabIndex={0} className="w-11/12 lg:w-4/5 mx-auto collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-1">
                            <div className="collapse-title text-xl font-medium">
                                <strong>Question {index + 1}.</strong> {question?.question}
                            </div>
                            <div className="collapse-content">
                                <p><strong>Answer: </strong>{question?.answer}</p>
                                <div className="flex gap-2 flex-wrap mt-3">
                                    <button className="btn btn-sm btn-primary">{question?.topic}</button>
                                    <button className="btn btn-sm bg-green-800 text-white">{question?.hardLevel}</button>
                                    <button className="btn btn-sm bg-orange-800 text-white">{question?.importancy}</button>
                                </div>
                            </div>
                        </div>)
                }
            </div>
        </div>
    );
};

export default Home;