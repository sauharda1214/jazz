import { formattedURL } from "./getFormattedURL";
import { getAudio } from "../src/api/getAudiofile";

export async function downloadSong(url, filename) {
  const data = await getAudio(formattedURL(url));
  const downloadURL = await data?.data[0]?.downloadUrl[4]?.link
  console.log(data)
    fetch(downloadURL)
      .then(response => response.blob())
      .then(blob => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(error => console.error('Error:', error));
  }
  