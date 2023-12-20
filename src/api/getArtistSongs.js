

export const getArtistSongs = async (artistID) => {
    const apiURL = `https://jsv-api.vercel.app/artists/${artistID}/songs?page=1`;
    try {
      const response = await fetch(apiURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      // Check if the request was successful (status code 200)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Parse the JSON from the response
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      // Handle any errors that occurred during the fetch
      return error
    }
  };