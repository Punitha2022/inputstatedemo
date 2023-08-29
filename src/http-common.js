import axios from "axios";
const http= axios.create({
    baseURL:"http://localhost:8082",
    headers:{"ContentType":"application/json"}
})
export default http;