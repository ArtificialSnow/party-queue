import axios from "axios";

const KEY = "AIzaSyAwqL3qFSo4K_3W0dve7dvvIdAjpAkUSQA";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    key: KEY,
  },
});
