export const searchSongs = async (query) => {
  if (!query) {
    console.error("Query is empty");
    return null;
  }

  const apiUrl = `https://saavn.me/search`;

  try {
    const [ songsResponse, albumsResponse, artistsResponse, playlistsResponse] = await Promise.all([
      fetch(`${apiUrl}/songs?query=${query}`),
      fetch(`${apiUrl}/albums?query=${query}`),
      fetch(`https://jsv-api.vercel.app/search/artists?query=${query}`),
      fetch(`${apiUrl}/playlists?query=${query}`),
    ]);

    const responses = {
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
