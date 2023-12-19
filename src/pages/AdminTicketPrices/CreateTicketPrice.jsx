import React, { useEffect, useState } from 'react';
import { fetchData } from '../../config/ApiCall';

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
const CreateTicketPrice = ({ toggleComponent }) => {

  const [showslist, setShowsList] = useState([]);
  const [loading, setLoading] = useState(false);
   const [isFormValid, setIsFormValid] = useState(false);
  const [sectionlist, setSectionList] = useState([]);
  const [ticketCategorylist, setTicketCategoryList] = useState([]);
  const [ticketpricedetail, setTicketPriceDetail] = useState({
    method: '',
    show_id: '',
    section_id: '',
    ticket_category_id: '',
    price: '',
    created_by: ''
  });

  console.log('showslist', ticketpricedetail);

  useEffect(() => {
    setLoading(true);
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/shows/getShows',
      {
        method: 'getShows',
      }
    )
      .then((item) => {
        console.log('response--', item);
        setShowsList(item);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error in fetch:', error);
      });

  
      fetchData(
        'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/ticket-categories/getTicketCategories',
        {
          method: 'getTicketCategories',
        }
      )
        .then((item) => {
          // console.log('response--', item);
          setTicketCategoryList(item);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error in fetch:', error);
        });

        fetchData(
          'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/sections/getSections',
          {
            method: 'getSections',
          }
        )
          .then((item) => {
            console.log('response--', item);
            setSectionList(item);
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error in fetch:', error);
          });
  }, []);

  const handleDiscard = () => {
    toggleComponent(); // This sets showOtherComponent to false
  };

   let user_id = JSON.parse(localStorage.getItem('access'))[0]?.user_id;
  const payload = {
    method: 'insertTicketPrice',
    show_id: ticketpricedetail?.show_id,
    section_id: ticketpricedetail?.section_id,
    ticket_category_id: ticketpricedetail?.ticket_category_id,
    price: ticketpricedetail?.price,
    created_by: user_id,
  };
   const insertTicketPrice = () => {
     setLoading(true);
     fetchData(
       'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/ticket-price/insertTicketPrice',
       payload
     )
       .then((item) => {
         // console.log('response--', item);
         setResponse(item);
         setLoading(false);
       })
       .catch((error) => {
         console.error('Error in fetch:', error);
       });
     toggleComponent();
   };

   

  return (
    <div className="bg-gray-200 rounded-md w-2/3  flex  flex-col">
      <span className="text-2xl px-3 py-3 mt-2 font-bold text-zinc-600">
        Create a New TicketPrice
      </span>
      <hr className="w-full h-1 bg-gray-100 border-0 rounded  dark:bg-gray-700" />
      {fieldData?.map((item, index) => (
        <div className="flex p-3 gap-5">
          <p className="font-semibold text-zinc-700 w-1/6 flex  align-middle">
            {item.title}
          </p>
          {item.title == 'Show' ? (
            <select
              class="px-2 py-2 rounded-md w-full"
              onChange={(e) =>
                setTicketPriceDetail({
                  ...ticketpricedetail,
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
              onChange={(e) =>
                setTicketPriceDetail({
                  ...ticketpricedetail,
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
              onChange={(e) =>
                setTicketPriceDetail({
                  ...ticketpricedetail,
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
              onChange={(e) =>
                setTicketPriceDetail({
                  ...ticketpricedetail,
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
          onClick={insertTicketPrice}
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

export default CreateTicketPrice;
