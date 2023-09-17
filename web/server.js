import axios from "axios";

const server = axios.create({
  baseURL: "https://nlw-ia-foundation-server.vercel.app",
  // baseURL: "http://localhost:3333"
})

server.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
server.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export { server };
