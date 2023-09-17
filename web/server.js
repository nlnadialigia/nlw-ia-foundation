import axios from "axios";

export const server = axios.create({
  baseURL: "https://nlw-ia-foundation-server.vercel.app",
})