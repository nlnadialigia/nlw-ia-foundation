import axios from "axios";

export const server = axios.create({
  baseURL: "https://nlw-ia-foundation-server.vercel.app",
  // baseURL: "http://localhost:3333"
})