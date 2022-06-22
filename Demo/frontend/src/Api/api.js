import axios from "axios";
const baseUrl = "http://localhost:8000";

//functions to make api calls
const api = {
    sleep: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    searchBook: (page, body) => {
        return axios.post(`${baseUrl}/search?page=${page}&perpage=8`, body);
    },
    getlistAuthor: () => {
        return axios.get(`${baseUrl}/authors`);
    },
    getlistPublisher: () => {
        return axios.get(`${baseUrl}/publishers`);
    },
}

export default api;