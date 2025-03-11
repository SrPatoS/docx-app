import axios from "axios";
import { environment } from "@/environment";

const api = axios.create({
	baseURL: environment.baseUrl,
	timeout: 5000,
	timeoutErrorMessage: "Erro de conexão com o servidor",
});

api.interceptors.request.use((config) => {

	if (config.data instanceof FormData) {
		config.headers["Content-Type"] = "multipart/form-data";
	} else {

		config.headers["Content-Type"] = "application/json";
	}

	config.headers["api-key"] = environment.apiKey;

	return config;
});

export default api;
