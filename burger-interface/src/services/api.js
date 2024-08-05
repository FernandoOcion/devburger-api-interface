// yarn add axios (biblioteca para integrar o back)
import axios from "axios";

export const api = axios.create({
	baseURL: "http://localhost:3001",
});
