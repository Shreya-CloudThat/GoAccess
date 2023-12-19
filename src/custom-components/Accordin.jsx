import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  useParams,
} from 'react-router-dom';

const Accordin = ({ title, content, isOpen, onClick }) => {
  const { id } = useParams();

  
  return (
    <div className="border rounded shadow mb-4 md:mb-0">
      <div
        className="pr-12 md:pr-40 p-3 cursor-pointer transition-bg duration-300 bg-violet-800 rounded-t-md"
        onClick={onClick}
      >
        <h3 className="text-xl font-semibold text-white text-left">{title}</h3>
      </div>
      <div
        className={`transition-all duration-300 bg-gray-200  ${
          isOpen ? 'max-h-screen p-2 px-4' : 'max-h-screen p-0'
        } overflow-hidden rounded-b-md`}
      >
        {isOpen && (
          // <Link to={`/book-tickets/${id}`}>
            <div className={`text-gray-700 ${isOpen ? 'w-full' : ''}`}>
              {content}
            </div>
          // </Link>
        )}
      </div>
    </div>
  );
};

export default Accordin;
