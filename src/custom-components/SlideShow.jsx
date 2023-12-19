import React, { useState, useEffect } from 'react';

const slides = [
  {
    title: 'Giant Of the Game',
    description:
      "Hear the sounds that have the critics abuzz. Be one of the first American audiences to experience Portuguese phenomenon Arrhythmia play all the tracks from their recently-released 'Graffiti' -- the show includes a cameo with world-famous activist and graffiti artist Bansky.",
  },
  {
    title: 'Arrhythmia: Graffiti',
    description:
      "Hear the sounds that have the critics abuzz. Be one of the first American audiences to experience Portuguese phenomenon Arrhythmia play all the tracks from their recently-released 'Graffiti' -- the show includes a cameo with world-famous activist and graffiti artist Bansky.",
  },
  {
    title: 'Jesse Lewis Unplugged',
    description:
      "It's one night only for this once-in-a-lifetime concert-in-the-round with Grammy winning folk and blues legend Jesse Lewis. Entirely stripped of elaborate recording production, Lewis' music stands entirely on its own and has audiences raving it's his best work ever. With limited seating this final concert, don't dare to miss this classic you can tell your grandkids about when they develop some real taste in music.",
  },
];

const SlideShow = ({ listEvent, listVenue }) => {
  const [venueIndex, setVenueIndex] = useState(0);
  const [eventIndex, setEventIndex] = useState(0);

  // const [venue, setVenue] = useState(0);

  const venue = listVenue;

  useEffect(() => {
    const venueInterval = setInterval(() => {
      setVenueIndex((prevIndex) => (prevIndex + 1) % listVenue?.length);
    }, 3000);
    const eventInterval = setInterval(() => {
      setEventIndex((prevIndex) => (prevIndex + 1) % listEvent?.length);
    }, 3000); // Change slide every 3 seconds
    console.log('always');
    return () => {
      clearInterval(venueInterval);
      clearInterval(eventInterval);
    };
  }, [listEvent,listVenue]);

  console.log('listEvent', listEvent);

  return (
    <div className="min-w-full md:min-w-3/4 max-h-60 md:max-h-72 flex items-center justify-center bg-black rounded-md overflow-hidden">
      <div className="slideshow-container">
        {listEvent?.map((slide, index) =>
          // Check if events.data is present and not an empty array
          // slide.events?.data &&
          // slide.events.data.length > 0 && (
          slide?.events?.data?.map((item, itemIndex) => (
            <div
              key={index}
              className={`slide ${
                index === eventIndex ? 'active' : 'hidden'
              }`}
            >
              <div key={itemIndex}>
                <img src={item.url} className="h-36 w-32 mt-10" />
                <h2 className="text-2xl font-semibold text-violet-400 font-mono">
                  {item.event_name}
                </h2>
                <p className="text-gray-600 text-white mt-3 overflow-hidden overflow-ellipsis">
                  {item.description}
                </p>
                <br />
              </div>
            </div>
          ))
        )}

        {listVenue?.map((venue, index) => (
          <div
            key={index}
            className={`slide ${index === venueIndex ? 'active' : 'hidden'}`}
            // className="slide active"
          >
            <img src={venue.url} className="h-36 w-32 mt-5" />
            <h2 className="text-2xl font-semibold text-violet-400 font-mono">
              {venue.name}
            </h2>
            <p className="text-gray-600 text-white mt-3 overflow-hidden overflow-ellipsis">
              {venue.description}
            </p>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlideShow;
