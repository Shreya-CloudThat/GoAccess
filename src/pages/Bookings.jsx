import { Table } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import TableWithPagination from '../custom-components/TableWithPagination';
import TablePagination from '../custom-components/TablePagination';
import { fetchData } from '../config/ApiCall';
import { Radio, ThreeDots } from 'react-loader-spinner';

const Bookings = () => {
  const [bookingdetail, setBookingDetail] = useState([]);
  const [loading, setLoading] = useState(false);

  const column = [
    {
      title: 'No.',
    },

    {
      title: 'Event Name',
    },
    {
      title: 'Venue Name',
    },
    {
      title: 'Performance Date',
    },
    {
      title: 'Performance Time',
    },
    {
      title: 'Row No. - Seat No.',
    },
    {
      title: 'Section',
    },
    // {
    //   title: 'Created On',
    // },
    {
      title: 'Total ticktes',
    },
    {
      title: 'Total price',
    },
    {
      title: '',
    },
  ];

  let user_id = JSON.parse(localStorage.getItem('access'))[0]?.user_id;
  

  const deleteBooking = (id) => {
    setLoading(true);
    console.log(
      'ID_----------------------',
      bookingdetail?.find((item) => item.booking_id === id)?.tickets?.data
        ?.length
    );
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/cancel-booking/cancelBooking',
      {
        method: 'cancelBooking',
        booking_id: id,
        performance_id: bookingdetail?.find((item) => item.booking_id === id)
          ?.performance_id,
        section_id: bookingdetail?.find((item) => item.booking_id === id)
          ?.tickets?.data?.[0]?.section_id,
        no_of_tickets: bookingdetail?.find((item) => item.booking_id === id)
          ?.tickets?.data?.length,
      }
    )
      .then((item) => {
        console.log('response--', item);
        //  setResponse(item);
        setLoading(false);
        // window.location.reload();
      })
      .catch((error) => {
        console.error('Error in fetch:', error);
      });
    // getBookingsByUserId();
    window.location.reload();
    // getVenues();
  };

  let userId = JSON.parse(localStorage.getItem('access'))[0]?.user_id;
  const getBookingsByUserId = () => {
    setLoading(true);
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/list-bookings/getBookingsByUserId',
      {
        method: 'getBookingsByUserId',
        user_id: userId,
      }
    )
      .then((item) => {
        console.log('response--', item);
        setBookingDetail(item);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error in fetch:', error);
      });
  };

  console.log('bookingdetail-->', bookingdetail);
  useEffect(() => {
    getBookingsByUserId();
  }, []);

  let tableData = [
    {
      method: 'getBookingsByUserId',
      res: bookingdetail,
    },
  ];

  console.log('booking--', bookingdetail);
  return (
    <div>
      {loading ? (
        // If loading is true, show the loading spinner (assuming Audio is a loading spinner component)
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // height: '100vh',
          }}
        >
          <ThreeDots
            height="50"
            width="60"
            radius="9"
            color="purple"
            ariaLabel="loading"
            wrapperStyle={{ marginTop: '200px' }} // Example styles
            wrapperClass="custom-loader"
          />
        </div>
      ) : (
        <div className="container p-4">
          {/* <TableWithPagination /> */}
          <TablePagination
            data={tableData}
            itemsPerPage={5}
            column={column}
            deleteBooking={deleteBooking}
          />
        </div>
      )}
    </div>
  );
};

export default Bookings;
