export const fetchData = async (url, Payload) => {
  // console.log("Hello")
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  
      },
      body: JSON.stringify(Payload),
      //   mode: 'no-cors',
    })

    console.log("res",response)
   
    const jsonData = await response.json();
    // console.log('response_data', jsonData);
    return jsonData;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// const deleteData = async (url, Payload) => {
//   try {
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(Payload),
//     });
//     const jsonData = await response.json();
//     const data = HSON.parse(jsonData)
//     console.log('jsonData', jsonData);
//     return data;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error;
//   }
// };

// export { fetchData, deleteData };
