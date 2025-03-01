import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { LocalStorageCore } from "@/core/local-storage.core";
import { MemoryStorageCore } from "@/core/memory-storage.core";
import api from "@/axios/axios";

export default function Index() {
	const [loading, setLoading] = useState(true);
	const [redirectTo, setRedirectTo] = useState<"/cloud/cloud" | "/auth/auth" | null>(null);

	useEffect(() => {
		const initialConfig = async () => {
			const token = (await new LocalStorageCore().read("auth")) as string;
			MemoryStorageCore.Instance.token = token;
			api.defaults.headers["Authorization"] = `Bearer ${MemoryStorageCore.Instance?.token ?? ""}`;

			setRedirectTo(token ? "/cloud/cloud" : "/auth/auth");
			setLoading(false);
		};

		initialConfig();
	}, []);

	if (redirectTo) {
		return <Redirect href={redirectTo} />;
	}

	return null;
}
