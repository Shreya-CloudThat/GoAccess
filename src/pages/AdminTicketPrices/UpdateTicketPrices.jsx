import React, { useEffect, useState } from 'react';
import { fetchData } from '../../config/ApiCall';

const UpdateTicketPrices = ({ updateComponents, selectedId }) => {
  const [showslist, setShowsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [sectionlist, setSectionList] = useState([]);
  const [ticketpricelist, setTicketpriceList] = useState([]);
  const [ticketCategorylist, setTicketCategoryList] = useState([]);
//   const [ticketpricedetail, setTicketPriceDetail] = useState({
//     method: '',
//     show_id: '',
//     section_id: '',
//     ticket_category_id: '',
//     price: '',
//     created_by: '',
//   });

  const [ticketpricedetails, setTicketpriceDetails] = useState({
    show_id: '',
    section_id: '',
    ticket_category_id: '',
    price: '',

  });

      const handleDiscard = () => {
        // toggleComponent();
        updateComponents();
        // window.location.href = '/adminvenue';
      };

      const fieldData = [
        {
          title: 'Show',
        },
        {
          title: 'Section',
        },
        {
          title: 'Ticket Category',
        },
        {
          title: 'Price',
          placeholder: 'Enter the TicketPrice Price',
        },
      ];
 


  let user_id = JSON.parse(localStorage.getItem('access'))[0]?.user_id;

  console.log('ticketprice', ticketpricedetails);
  useEffect(() => {
    setLoading(true);
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/ticket-price/getTicketPrices',
      {
        method: 'getTicketPrices',
      }
    )
      .then((item) => {
        // console.log('response--', item);
        setTicketpriceList(item);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error in fetch:', error);
      });
  }, []);


  console.log('ticketpricelist', ticketpricelist?.find(
        (ticketprice) => console.log(ticketprice)))

    useEffect(() => {
      // Find the object in the data array that matches the Id from the URL
      const matchingVenue = ticketpricelist?.find(
        (ticketprice) => ticketprice?.ticket_price_id === selectedId
      );

      console.log("selectedId",selectedId)

      console.log('matchingVenue', matchingVenue);

      if (matchingVenue) {
        // Set the state based on the matching object
        setTicketpriceDetails({
          show_id: matchingVenue?.show_id,
          section_id: matchingVenue?.section_id,
          ticket_category_id: matchingVenue?.ticket_category_id,
          price: matchingVenue?.price,

          // name: matchingVenue.name,
          // description: matchingVenue.description,
          // street: matchingVenue?.address.split(', ')[0],
          // city: matchingVenue?.address.split(', ')[1],
          // country: matchingVenue?.address.split(', ')[2], // Set the appropriate value here
          // capacity: matchingVenue.capacity,
          // media_item_id: matchingVenue.media_item_id,
        });
      }
    }, [selectedId, ticketCategorylist]);

  const payload = {
    method: 'updateTicketPrice',
    show_id: '30638fb0-7557-4380-b6a0-145a06302870',
    section_id: 'a2226896-f1ed-4b96-92e4-312ab0d0f86d',
    ticket_category_id: 'eb6d54ce-02f0-4dfb-b58e-6b2a723e0afa',
    price: '100',
    created_by: user_id,
    ticket_price_id: '864814e9-a09b-4c63-b8b9-8679cca8af5f',
  };

  const updateTicketPrices = () => {
    setLoading(true);
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/ticket-price/updateTicketPrice',
      payload
    )
      .then((item) => {
        console.log('response--', item);
        setResponse(item);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error in fetch:', error);
      });
    updateComponents();
  };
  return (
    <div className="bg-gray-200 rounded-md w-2/3  flex  flex-col">
      {/* <span className="text-2xl px-3 py-3 mt-2 font-bold text-zinc-600">
        Create a New TicketPrice
      </span> */}
      {/* <hr className="w-full h-1 bg-gray-100 border-0 rounded  dark:bg-gray-700" /> */}
      {fieldData?.map((item, index) => (
        <div className="flex p-3 gap-5">
          <p className="font-semibold text-zinc-700 w-1/6 flex  align-middle">
            {item.title}
          </p>
          {item.title == 'Show' ? (
            <select
              class="px-2 py-2 rounded-md w-full"
              value={ticketpricedetails?.show_id || ''}
              onChange={(e) =>
                setTicketpriceDetails({
                  ...ticketpricedetails,
                  show_id: e.target.value,
                })
              }
            >
              <option>Choose a Show</option>
              {showslist.map((item) => (
                <option value={item.show_id}>{item.event_name}</option>
              ))}
              {/* <option>Hello</option> */}
            </select>
          ) : item.title == 'Section' ? (
            <select
              class="px-2 py-2 rounded-md w-full"
              value={ticketpricedetails?.section_id || ''}
              onChange={(e) =>
                setTicketpriceDetails({
                  ...ticketpricedetails,
                  section_id: e.target.value,
                })
              }
            >
              <option>Choose a Section </option>
              {sectionlist.map((item) => (
                <option value={item.section_id}>{item.section_name}</option>
              ))}
            </select>
          ) : item.title == 'Ticket Category' ? (
            <select
              class="px-2 py-2 rounded-md w-full"
              value={ticketpricedetails?.ticket_category_id || ''}
              onChange={(e) =>
                setTicketpriceDetails({
                  ...ticketpricedetails,
                  ticket_category_id: e.target.value,
                })
              }
            >
              <option>Choose a Ticket Category </option>
              {ticketCategorylist.map((item) => (
                <option value={item.id}>{item.description}</option>
              ))}
            </select>
          ) : (
            <input
              className="px-2 rounded-md py-2 w-full"
              placeholder={item.placeholder}
              value={ticketpricedetails?.price}
              onChange={(e) =>
                setTicketpriceDetails({
                  ...ticketpricedetails,
                  price: e.target.value,
                })
              }
            />
          )}
        </div>
      ))}
      <div className="flex ml-36 gap-3">
        <button
          className="bg-green-700 px-4 py-2 rounded-lg text-white"
          onClick={updateTicketPrices}
        >
          Save
        </button>
        <button
          onClick={handleDiscard}
          className="bg-red-700 px-4 py-2 rounded-lg text-white"
        >
          Discard
        </button>
      </div>
    </div>
  );
};

export default UpdateTicketPrices;
