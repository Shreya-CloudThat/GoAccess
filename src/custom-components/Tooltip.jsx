import React from 'react'

const Tooltip = ({ text, tooltipText }) => {
  return (
    <div className="relative inline-block">
      <span className="text">{text}</span>
      <div className="tooltip opacity-0 group-hover:opacity-100 right-0 -mt-8 bg-gray-800 text-white p-2 rounded-md text-sm shadow-md absolute transition-opacity duration-300">
        {tooltipText}
      </div>
    </div>
  );
};

export default Tooltip
