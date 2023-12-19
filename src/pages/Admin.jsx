import React, { useState } from 'react';
import AdminBooking from './AdminBook/AdminBooking';
import AdminEventCategory from './AdminEventCategories/AdminEventCategory';
import AdminEventForm from './AdminEvents/AdminEventForm';
import AdminMediaItems from './AdminMediaItems/AdminMediaItems';
import AdminPerformances from './AdminPerformance/AdminPerformances';
import AdminSection from './AdminSection/AdminSection';
import AdminSectionAllocation from './AdminSectionAllocation/AdminSectionAllocation';
import AdminShows from './AdminShow/AdminShows';
import AdminTickets from './AdminTickets/AdminTickets';
import AdminTicketCategory from './AdminTicketCategory/AdminTicketCategory';
import AdminTicketPrices from './AdminTicketPrices/AdminTicketPrices';
import AdminVenue from './AdminVenue/AdminVenue';

const button = [
  // {
  //   title: 'Bookings',
  // },
  {
    title: 'Event Categories',
  },
  {
    title: 'Media Items',
  },
  {
    title: 'Events',
  },
  {
    title: 'Venues',
  },
  {
    title: 'Shows',
  },
  {
    title: 'Performances',
  },
  {
    title: 'Sections',
  },
  {
    title: 'Section Allocations',
  },
  {
    title: 'Ticket Categories',
  },
  {
    title: 'Ticket Prices',
  },
];

const Admin = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const handleClick = (componentName) => {
    setSelectedComponent(componentName);
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="flex gap-10 w-10/12 mt-9">
          <div className="flex w-3/12 bg-violet-900 rounded-sm">
            <div className="flex flex-col m-4 w-full">
              {button.map((item, index) => (
                <div
                  key={index}
                  className={`mt-1 transition duration-300 transform hover:scale-105 shadow-lg cursor-pointer 
                  ${
                    activeButton === item.title
                      ? 'transition duration-300 transform scale-105 bg-gradient-to-r from-violet-700 to-violet-900'
                      : 'bg-violet-900 '
                  } 
                  focus:shadow-inner border-2 rounded-md px-2 py-2 w-full text-base text-white focus:from-gray-300`}
                  onClick={() => {
                    handleClick(item.title);
                    setActiveButton(item.title);
                  }}
                >
                  {item.title}
                </div>
              ))}
            </div>
          </div>

          {/* {selectedComponent === 'Bookings' && <AdminBooking />} */}
          {selectedComponent === 'Event Categories' && <AdminEventCategory />}
          {selectedComponent === 'Events' && <AdminEventForm />}
          {selectedComponent === 'Media Items' && <AdminMediaItems />}
          {selectedComponent === 'Performances' && <AdminPerformances />}
          {selectedComponent === 'Sections' && <AdminSection />}
          {selectedComponent === 'Section Allocations' && (
            <AdminSectionAllocation />
          )}
          {selectedComponent === 'Shows' && <AdminShows />}
          {/* {selectedComponent === 'Tickets' && <AdminTickets />} */}
          {selectedComponent === 'Ticket Categories' && <AdminTicketCategory />}
          {selectedComponent === 'Ticket Prices' && <AdminTicketPrices />}
          {selectedComponent === 'Venues' && <AdminVenue />}
        </div>
      </div>
    </>
  );
};

export default Admin;
