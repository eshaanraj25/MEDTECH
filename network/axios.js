import axios from "axios";
console.log("NEXT_PUBLIC_SERVER_URL", process.env.NEXT_PUBLIC_SERVER_URL);
if (!process.env.NEXT_PUBLIC_SERVER_URL) {
  throw new Error("NO SERVER URL FOUND");
}

export default axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/`,
  headers: {},
  withCredentials: true,
});
