import { server } from "./server.js";

const form = document.getElementById("form")
const input = document.getElementById("url")
const content = document.getElementById("content")

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  content.classList.add("placeholder")
  content.classList.remove("content")

  const videoURL = input.value;

  if (!videoURL.includes("shorts")) {
    content.classList.add("content")
    return content.textContent = "Esse vídeo não parece ser um short!"
  }

  const [_, params] = videoURL.split("/shorts/")
  const [videoId] = params.split("?")

  content.textContent = "Obtendo o texto do audio"

  const transcription = await server.get(`/summary/${videoId}`)

  content.textContent = "Realizando o resumo..."

  const summary = await server.post("summary", {
    text: transcription.data.result
  })

  content.textContent = summary.data.result
  content.classList.remove("placeholder")
})