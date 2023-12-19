export const callApiForUserDetails = async (email) => {
  // Prepare the payload for the API request
  const apiPayload = {
    method: 'getUserDetailsbyEmail',
    email: email,
  };

  let response = await fetch(
    'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/user-details/getUserDetailsbyEmail',
    {
      method: 'POST', // Use the appropriate HTTP method for your API
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiPayload),
    }
  ).then((res) => res.json());
  return response;
};
