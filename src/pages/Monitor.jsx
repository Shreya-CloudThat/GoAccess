import React from 'react';

const Monitors = () => {
  return (
    <div>
      <div className="mx-20 my-10">
        <p className="bg-gradient-to-r text-2xl font-bold from-violet-900 via-violet-500 to-slate-100 text-white p-3 rounded-md">
          Bot
        </p>
        <hr />
        <div className="flex gap-3 flex-wrap my-5">
          <button className="bg-emerald-700 py-2 px-7 rounded-md text-white">
            Start Bot
          </button>
          <button className="bg-violet-600 py-2 px-7 rounded-md text-white">
            Stop Bot
          </button>
          <button className="bg-red-700 py-2 px-7 rounded-md text-white">
            Delete all bookings
          </button>
        </div>
        <div className="max-h-96 min-h-96 h-1/2">
          <textarea
            id="message"
            rows="12"
            class="block p-3 w-2/3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
           
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Monitors;
