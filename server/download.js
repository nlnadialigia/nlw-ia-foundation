import fs from "node:fs";
import ytdl from "ytdl-core";

export const download = (videoId) => {
  const videoURL = `https://www.youtube.com/shorts/${videoId}`
  console.log(`Realizando download do vídeo: ${videoId}`)
  ytdl(videoURL, {
    quality: "lowestaudio",
    filter: "audioonly"
  }).on("info", (info) => {
    const seconds = info.formats[0].approxDurationMs / 1000
    if (seconds > 60) {
      throw new Error("A duração desse vídeo é maior que 60 segundos.")
    }
  }).end("end", () => {
    console.log("Download finalizado")
  }).on("error", (error) => {
    console.log(`Não foi possível fazer o download do vídeo: ${error}`)
  }).pipe(fs.createWriteStream("./tmp/audio.mp4"))
}