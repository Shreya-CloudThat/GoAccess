import React, { useEffect, useState } from 'react';
import { fetchData } from '../config/ApiCall';
import { useLocation, useParams } from 'react-router-dom';

function CheckoutfromVenue() {
  const [listsection, setListSection] = useState([]);
  const [selectedSection, setSelectedSection] = useState({
    id: '',
  });
  const [numberofTickets, setNumberofTickets] = useState({
    adult: '',
    child: '',
  });
  const [showTable, setShowTable] = useState(false);
  const [checkoutsStatus, setCheckoutStatus] = useState(false);
  const [bookingId, setBookingId] = useState(false);
const [bookingdetails, setBookingDetails] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
   console.log('searchParams from venue', location);
  const performanceId = searchParams.get('Id');
  // console.log("id",id)


   useEffect(() => {
     fetchData(
       'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/list-bookings/getBookingDataById',
       {
         method: 'getBookingDataById',
         booking_id: bookingId?.booking_id,
       }
     )
       .then((data) => {
         setBookingDetails(data);
       })
       .catch((error) => {
         console.error('Error fetching media items:', error);
       });
   }, [bookingId]);

   
  useEffect(() => {
    // Fetch Media Items
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/list-events/listSectionsAndPricesbyPerformanceId',
      {
        method: 'listSectionsAndPricesbyPerformanceId',
        performance_id: performanceId,
      }
    )
      .then((data) => {
        setListSection(data);
      })
      .catch((error) => {
        console.error('Error fetching media items:', error);
      });
  }, []);

  let user_id = JSON.parse(localStorage.getItem('access'))[0]?.user_id;

  const checkout = () => {
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/insert_booking/insertBooking',
      {
        method: 'insertBooking',
        ticket_price_id: listsection?.find(
          (item) => item.section_id === selectedSection?.id
        )?.ticket_price_id,
        performance_id: performanceId,
        section_id: selectedSection?.id,
        booked_by: user_id,
        no_of_rows: listsection?.find(
          (item) => item.section_id === selectedSection?.id
        )?.no_of_rows,
        row_capacity: listsection?.find(
          (item) => item.section_id === selectedSection?.id
        )?.row_capacity,
        no_of_tickets: Number(numberofTickets?.adult),
        price: listsection?.find(
          (item) => item.section_id === selectedSection?.id
        )?.price,
        total_price:
          listsection?.find((item) => item.section_id === selectedSection?.id)
            ?.price * Number(numberofTickets?.adult),
        // no_of_rows: 5,
        // row_capacity: 20,
        // no_of_tickets: 2,
        // price: 150,
        // total_price: 300,
      }
    )
      .then((data) => {
        setBookingId(data);
        setCheckoutStatus(true);
      })
      .catch((error) => {
        console.error('Error fetching media items:', error);
      });
  };

  console.log('listsection', listsection);
let user_detail = JSON.parse(localStorage.getItem('access'))[0];
  return (
    <div class="w-screen px-40">
      <div class="font-bold text-3xl mt-3">Checkout</div>
      <hr className="mt-2" />
      <div class="w-full flex mt-5 gap-10 md:flex-wrap ">
        {!checkoutsStatus ? (
          <>
            <div class=" bg-gray-300 rounded-lg p-10 w-1/3">
              <p className="text-2xl font-bold">Select Tickets</p>
              <hr className="text-violet-800 bg-violet-400" />

              <div className="mt-3 flex gap-3">
                <p className="inline font-base text-base mt-1">Section</p>
                <select
                  class="px-2 py-2 rounded-md w-full "
                  onChange={(e) =>
                    setSelectedSection({
                      ...selectedSection,
                      id: e.target.value,
                    })
                  }
                >
                  <option>Choose a section</option>
                  {listsection?.map((item, index) => (
                    <>
                      <option key={item.section_id} value={item.section_id}>
                        {item?.section_name} - {item?.section_description}
                      </option>
                    </>
                  ))}
                </select>
              </div>

              {selectedSection.id &&
                listsection?.map(
                  (item, index) =>
                    item.section_id === selectedSection.id && (
                      <p className="mt-2 text-base">
                        Available Seats : {item.available_seats}
                      </p>
                    )
                )}
              {selectedSection.id &&
                listsection?.map(
                  (item, index) =>
                    item.section_id === selectedSection.id && (
                      <div className="mt-3 flex gap-3">
                        <p className="inline font-base text-base mt-1">Adult</p>
                        <input
                          className="inline px-2 rounded-md py-2 w-full"
                          placeholder="Number of Tickets"
                          onChange={(e) =>
                            setNumberofTickets({
                              ...numberofTickets,
                              adult: e.target.value,
                            })
                          }
                        />
                        <div className="bg-violet-500 px-4  rounded-md text-white">
                          <p className="mt-2">{item.price}/-</p>
                        </div>
                      </div>
                    )
                )}
              <button
                className="py-2 px-5 border border-black bg-violet-500 rounded-lg text-white hover:bg-violet-400 shadow-md shadow-black mt-4"
                onClick={() =>
                  numberofTickets.adult.length > 0 && setShowTable(true)
                }
              >
                Add tickets
              </button>
            </div>

            <div class=" bg-gray-300 rounded-lg p-10 w-1/3">
              <p className="text-2xl font-bold">Order Summary</p>
              <hr className="text-violet-800 bg-violet-400" />
              {showTable && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 mt-2">
                    <tbody>
                      <tr>
                        <td
                          className="py-2 px-4 font-semibold bg-gray-500 text-center text-white"
                          colSpan="4"
                        >
                          Requested Tickets
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 font-semibold bg-gray-400">
                          Section
                        </td>
                        <td className="py-2 px-4 font-semibold bg-gray-400">
                          Category
                        </td>
                        <td className="py-2 px-4 font-semibold bg-gray-400">
                          Quantity
                        </td>
                        <td className="py-2 px-4 font-semibold bg-gray-400">
                          Price
                        </td>
                      </tr>
                      {listsection?.map((item, index) => {
                        if (item.section_id === selectedSection?.id) {
                          return (
                            <tr key={index}>
                              <td className="text-center bg-gray-200">
                                {item.section_name}
                              </td>
                              <td className="text-center bg-gray-200">
                                {item.ticket_category_description}
                              </td>
                              <td className="text-center bg-gray-200">
                                {numberofTickets.adult}
                              </td>
                              <td className="text-center bg-gray-200">
                                {item.price * numberofTickets.adult}
                              </td>
                            </tr>
                          );
                        }
                        return null;
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              <button
                className="py-2 px-5 border border-black bg-violet-500 rounded-lg text-white hover:bg-violet-400 shadow-md shadow-black mt-4"
                onClick={checkout}
              >
                Checkout
              </button>

              {checkoutsStatus && (
                <div
                  className={`fixed inset-0 ${
                    checkoutsStatus ? 'flex' : 'hidden'
                  } items-center justify-center z-50`}
                >
                  <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
                  <div className="bg-white p-8 rounded-md shadow-lg z-10 w-96">
                    <h2 className="text-2xl font-bold mb-4">
                      Booking Confirmation
                    </h2>
                    <p className="text-green-500 text-lg">
                      Your Booking is done!
                    </p>
                    <button
                      className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                      onClick={() => (window.location.href = '/about')}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center w-full mt-9">
              <div className="flex space-x-4">
                {/* Card 1 */}
                <div className=" bg-white shadow-md rounded-md p-6 w-96">
                  <h2 className="text-xl font-bold mb-4">
                    CheckOut Confirmation
                  </h2>
                  <p>
                    <b>Email:</b> <span>{user_detail?.email}</span>
                  </p>
                  <p className="mt-1">
                    <b>Event:</b> <span>{bookingdetails[0]?.event_name}</span>
                  </p>
                  <p className="mt-1">
                    <b>Venue:</b> <span>{bookingdetails[0]?.venue_name}</span>
                  </p>
                  <p className="mt-1">
                    <b>Date:</b>{' '}
                    <span>{bookingdetails[0]?.performance_date}</span>
                  </p>
                  <p className="mt-1">
                    <b>Created On:</b>{' '}
                    <span>{bookingdetails[0]?.booked_at}</span>
                  </p>
                </div>

                {/* Card 2 */}
                <div className=" bg-white shadow-md rounded-md p-6 w-auto">
                  <h2 className="text-xl font-bold mb-4">Ticket Allocation</h2>

                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-purple-600 mt-2">
                      <tbody>
                        <tr>
                          <td className="py-2 px-4 font-semibold bg-violet-800 text-white">
                            Ticket#
                          </td>
                          <td className="py-2 px-4 font-semibold  bg-violet-800 text-white">
                            Category
                          </td>
                          <td className="py-2 px-4 font-semibold  bg-violet-800 text-white">
                            Section
                          </td>
                          <td className="py-2 px-4 font-semibold  bg-violet-800 text-white">
                            Row
                          </td>
                          <td className="py-2 px-4 font-semibold  bg-violet-800 text-white">
                            Seat
                          </td>
                        </tr>

                        {bookingdetails[0]?.tickets?.data?.map(
                          (item, index) => (
                            <tr key={index}>
                              <td className="text-center bg-gray-200">#{index + 1}</td>
                              <td className="text-center bg-gray-200">
                                {item.ticket_category_description}
                              </td>
                              <td className="text-center bg-gray-200">
                                {item.section_description}
                              </td>
                              {/* <td className="text-center bg-gray-200">
                            {item.price * numberofTickets.adult}
                          </td> */}
                              <td className="text-center bg-gray-200">
                                {item.row_number}
                              </td>
                              <td className="text-center bg-gray-200">
                                {item.seat_number}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center w-full">
              <button
                className=" bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                onClick={() => (window.location.href = '/about')}
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CheckoutfromVenue;
