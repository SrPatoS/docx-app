import axios from "axios";
import { environment } from "@/environment";
import { LocalStorageCore } from "@/core/local-storage.core";

const api = axios.create({
	baseURL: environment.baseUrl,
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 5000,
	timeoutErrorMessage: "Erro de conexão com o servidor"
});
api.defaults.headers["api-key"] = environment.apiKey;

export default api;
