import React, { useEffect, useState } from 'react';
import Accordin from '../custom-components/Accordin';
import '../assets/css/style.css';
import SlideShow from '../custom-components/SlideShow';
import { fetchData } from '../config/ApiCall';
import BookTicktes from './BookTicktes';
import BookTicketsfromVenue from './BookTicketsfromVenue';
import { callApiForUserDetails } from '../custom-components/GetUserByEmail';


// import Tooltip from '../custom-components/Tooltip';

const Venues = () => {
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);
  const [showbookingComponent, setShowBookingComponent] = useState(false);
  const [selectitem, setSelectItem] = useState({
    id: '',
    name: '',
    description:''
  });
  const [userdetail, setUserDetails] = useState('');
  const [listvenue, setListVenue] = useState([]);

  const handleAccordionClick = (index) => {
    if (index === openAccordionIndex) {
      setOpenAccordionIndex(null);
    } else {
      setOpenAccordionIndex(index);
    }
  };

  const handleBooking = (venue_id, venue_name, description) => {
    // window.location.href = '/booking-ticket';
    setShowBookingComponent(!showbookingComponent);
    setSelectItem({ id: venue_id, name: venue_name, description: description });
  };

  const accordionData = [
    {
      title: 'Boston',
      content: ['Boston Symphony Hall'],
    },
    {
      title: 'Paris',
      content: ['Opera Garnier'],
    },
    {
      title: 'Sydney',
      content: ['Sydney Opera House'],
    },
    {
      title: 'Toronto',
      content: ['Roy Thomson Hall', 'BMO Field'],
    },
  ];

   let user_id = JSON.parse(localStorage.getItem('access'))


  console.log('userdetail-->', user_id);

  useEffect(() => {
    // Fetch Media Items
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/list-venues/listVenues',
      {
        method: 'listVenues',
      }
    )
      .then((data) => {
        setListVenue(data);
      })
      .catch((error) => {
        console.error('Error fetching media items:', error);
      });
  }, []);
  console.log('listvenue', listvenue);
  const venuesByCity = {};

  listvenue.forEach((data) => {
    const city = data.city;
    if (!venuesByCity[city]) {
      venuesByCity[city] = [];
    }
    venuesByCity[city].push(data);
  });

  return (
    <div className="flex flex-col mt-5 justify-center items-center">
      <div className=" md:flex md:flex-wrap justify-center gap-10 w-full">
        {/* Accordion ----------------- */}
        {showbookingComponent ? (
          <BookTicketsfromVenue
            title={selectitem.name}
            id={selectitem.id}
            description={selectitem.description}
          />
        ) : (
          <>
            <div className="md:w-auto">
              {Object.entries(venuesByCity).map(([city, venues], index) => (
              <Accordin
                key={index}
                title={city}
                content={venues.map((venue) => (
                  <div
                    key={venue.venue_id}
                    onClick={() =>
                      handleBooking(
                        venue.venue_id,
                        venue.name,
                        venue.description
                      )
                    }
                  >
                    <p className="cursor-pointer">{venue.name}</p>
                    <br />
                  </div>
                ))}
                isOpen={index === openAccordionIndex}
                onClick={() => handleAccordionClick(index)}
              />
              ))}
              {/* {listvenue.map((data, index) => (
                <Accordin
                  key={index}
                  title={data.city}
                  content={
                    // data.content?.map((item, itemIndex) => (
                    <div
                      key={data.venue_id}
                      onClick={() =>
                        handleBooking(
                          data.venue_id,
                          data.name,
                          data.description
                        )
                      }
                    >
                      <p className="cursor-pointer">{data.name}</p>
                      <br />
                    </div>
                    // ))
                  }
                  isOpen={index === openAccordionIndex}
                  onClick={() => handleAccordionClick(index)}
                />
              ))} */}
            </div>

            <div className="w-auto md:w-1/2">
              <SlideShow listVenue={listvenue} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Venues;
