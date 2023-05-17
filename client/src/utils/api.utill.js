import axios from "axios";

const instance = axios.create({
  headers: {
    "Allow-Access-Origin-Request":
      process.env.NODE_ENV === "production" ? `${process.env.BASE_URL}` : "*",
  },
  proxy: {
    host: "127.0.0.1",
    port: process.env.PORT || 3001,
    protocol: process.env.NODE_ENV === "production" ? `https://` : `http://`,
  },
});

export default instance;
