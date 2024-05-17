import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div>
            Some thing has wrong, <Link to={'/'} className='p-4 bg-gray-500 rounded-2xl text-white'>Back to home</Link>
        </div>
    );
}

export default Error;
