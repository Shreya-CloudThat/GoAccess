import React, { useEffect, useState } from 'react';
import Accordin from '../custom-components/Accordin';
import '../assets/css/style.css';
import SlideShow from '../custom-components/SlideShow';
import BookTicktes from './BookTicktes';
import { fetchData } from '../config/ApiCall';

// import Tooltip from '../custom-components/Tooltip';

const Events = () => {
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);
  const [showbookingComponent, setShowBookingComponent] = useState(false);
  const [selectitem, setSelectItem] = useState({
    id: '',
    name: '',
    description:''
  });
  const [listevent, setListEvent] = useState([]);

  const handleAccordionClick = (index) => {
    if (index === openAccordionIndex) {
      setOpenAccordionIndex(null);
    } else {
      setOpenAccordionIndex(index);
    }
  };

  const accordionData = [
    {
      title: 'Concert',
      content: [
        'Rock concert of the decade',
        'Arrhythmia: Graffiti',
        'Battle of the Brass Bands',
        'Jesse Lewis Unplugged',
        'Almost (Mostly) Morrison',
      ],
    },
    {
      title: 'Theatre',
      content: [
        "Shane's Sock Puppets",
        'Carnival Comes to Town',
        'Flamenco Finale',
        'Madame Butterfly',
        'Mime Mania!',
        'Tutu Tchai',
        'Punch and Judy (with a Twist)',
        'ABcabc',
      ],
    },
    {
      title: 'Sporting',
      content: [
        'Brazil vs. Italy',
        'All State Football Championship',
        'Chris Lewis Quarterfinals',
        'Crew You',
        'Extreme Snowboarding Finals',
        'Slap Shot',
        'Giants of the Game',
      ],
    },
  ];

  const handleBooking = (event_name, event_id, description) => {
    // window.location.href = '/booking-ticket';
    setShowBookingComponent(!showbookingComponent);
    setSelectItem({ id: event_id, name: event_name, description: description });
  };

  console.log('selectitem', selectitem);

  useEffect(() => {
    // Fetch Media Items
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/list-events/listEvents',
      {
        method: 'listEvents',
      }
    )
      .then((data) => {
        setListEvent(data);
      })
      .catch((error) => {
        console.error('Error fetching media items:', error);
      });
  }, []);

  console.log('listevent', listevent);
  // console.log('listVenuesbyEventId', listVenuesbyEventId);

  return (
    <div className="flex mt-5 justify-center items-center">
      <div className="md:flex md:flex-wrap justify-center gap-10 w-full">
        {/* Accordion ----------------- */}

        {showbookingComponent ? (
          <BookTicktes title={selectitem?.name} id={selectitem?.id} description={selectitem?.description}/>
        ) : (
          <>
            <div className="md:w-auto">
              {listevent?.map((data, index) => (
                <Accordin
                  key={index}
                  title={data.description}
                  content={data.events?.data?.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      onClick={() =>
                        handleBooking(
                          item.event_name,
                          item.event_id,
                          item.description
                        )
                      }
                    >
                      <p className="cursor-pointer">{item.event_name}</p>
                      <br />
                    </div>
                  ))}
                  isOpen={index === openAccordionIndex}
                  onClick={() => handleAccordionClick(index)}
                />
              ))}
            </div>

            <div className="w-auto md:w-1/2">
              {/* {listevent?.map((data, index) => ( */}
              <SlideShow listEvent={listevent} />
              {/* ))} */}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Events;
