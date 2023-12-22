import { formattedURL } from "./getFormattedURL";
import { getAudio } from "../src/api/getAudiofile";

export async function downloadSong(url,filename, mp4url ) {
  try {
    let data;
    if(url != null){
      data = await getAudio(formattedURL(url));
    }
    let downloadURL = mp4url || (data?.data[0]?.downloadUrl[4]?.link);

    if (downloadURL) {
      const response = await fetch(downloadURL);
      const blob = await response.blob();

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error("Download URL not found.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
