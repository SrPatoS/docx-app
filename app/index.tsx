import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { LocalStorageCore } from "@/core/local-storage.core";
import { MemoryStorageCore } from "@/core/memory-storage.core";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const initialConfig = async () => {
    MemoryStorageCore.instance.token = await new LocalStorageCore().read("auth") as string;
  }

  useEffect(() => {
    setLoading(true);
    initialConfig().then(() => {
      setLoading(false);
    })
  }, []);

  if (!loading) return null;

  return <Redirect href='/auth/auth'/>
}