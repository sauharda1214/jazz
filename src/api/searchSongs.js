export const searchSongs = async (query) => {
  if (!query) {
    console.error("Query is empty");
    return null;
  }

  const apiUrl = `https://saavn.me/search`;

  try {
    const [allResponse, songsResponse, albumsResponse, artistsResponse, playlistsResponse] = await Promise.all([
      fetch(`https://jsv-api.vercel.app/search/all?query=${query}`),
      fetch(`${apiUrl}/songs?query=${query}`),
      fetch(`${apiUrl}/albums?query=${query}`),
      fetch(`https://jsv-api.vercel.app/search/artists?query=${query}`),
      fetch(`${apiUrl}/playlists?query=${query}`),
    ]);

    const responses = {
      all: await allResponse.json(),
      songs: await songsResponse.json(),
      albums: await albumsResponse.json(),
      artists: await artistsResponse.json(),
      playlists: await playlistsResponse.json(),
    };

    return responses;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};
