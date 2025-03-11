import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { LocalStorageCore } from "@/core/local-storage.core";
import { MemoryStorageCore } from "@/core/memory-storage.core";
import api from "@/axios/axios";

export default function Index() {
	const [loading, setLoading] = useState(true);
	const [redirectTo, setRedirectTo] = useState<"/main/main" | "/auth/auth" | null>(null);

	useEffect(() => {
		const initialConfig = async () => {
			const localStorageCore = new LocalStorageCore();
			const token = (await localStorageCore.read("auth")) as string;
			const firstAccess = (await localStorageCore.read("firstAccess")) as boolean;

			MemoryStorageCore.Instance.token = token;
			api.defaults.headers["Authorization"] = `Bearer ${MemoryStorageCore.Instance?.token ?? ""}`;

			if (firstAccess === null) {
				await localStorageCore.create("firstAccess", false);
				MemoryStorageCore.Instance.firstAccess = true;
			}

			setRedirectTo(token ? "/main/main" : "/auth/auth");
			setLoading(false);
		};

		initialConfig();
	}, []);

	if (redirectTo) {
		return <Redirect href={redirectTo} />;
	}

	return null;
}
