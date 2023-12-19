export function formattedURL(url) {
  let urlParts = url.split("/");

  // Assuming the URL structure is always the same
  let songName = urlParts[7]; // Adjusted index
  let artistID = urlParts[8]; // Adjusted index

  return ["https://www.jiosaavn.com", "song", songName, artistID].join("/");
}
