import React from 'react'
import './App.css';

const Loader = () => {
    return (
        <div className='spinner-container'>
            <div className="spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Loader
