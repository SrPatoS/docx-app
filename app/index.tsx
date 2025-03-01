import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { LocalStorageCore } from "@/core/local-storage.core";
import { MemoryStorageCore } from "@/core/memory-storage.core";
import { logger } from "react-native-logs";
import { Event } from "@/core/event/event";

export default function Index() {
	const [loading, setLoading] = useState(true);
	const [redirectTo, setRedirectTo] = useState<"/cloud/cloud" | "/auth/auth" | null>(null);

	useEffect(() => {
		const initialConfig = async () => {
			const token = (await new LocalStorageCore().read("auth")) as string;
			MemoryStorageCore.instance.token = token;

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
