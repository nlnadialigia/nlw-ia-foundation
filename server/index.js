import cors from "cors";
import express from 'express';
import { convert } from "./convert.js";
import { download } from "./download.js";
import { summarize } from "./summarize.js";
import { transcribe } from "./transcribe.js";

const app = express()
app.use(express.json())
app.use(cors({
  origin: "*",
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
}));

app.get("/summary/:id", async (request, response) => {
  try {
    await download(request.params.id)
    const audioConverted = await convert()

    const result = await transcribe(audioConverted)

    response.setHeader('Access-Control-Allow-Origin', 'https://nlw-ia-foundation-web.vercel.app');
    return response.json({ result })
  } catch (error) {
    console.log(error)
    return response.json({ error })
  }
})

app.post("/summary", async (request, response) => {
  try {
    const result = await summarize(request.body.text)

    response.setHeader('Access-Control-Allow-Origin', 'https://nlw-ia-foundation-web.vercel.app');
    return response.json({ result })
  } catch (error) {
    console.log(error)
    return response.json({ error })
  }
})

app.listen(3333, () => console.log("Server is running..."))