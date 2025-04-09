import "../global.css";
import { router, Stack } from "expo-router";

import { AuthProvider, useAuth } from "../contexts/auth-context";
import { useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function RootLayout() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}

function MainLayout() {
  const { setAuth } = useAuth();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log("user: ", session?.user);

      if (session) {
        setAuth(session.user);
        router.replace("/screens/(main)");
        return;
      }
      setAuth(null);
      router.replace("/screens/(auth)/signin");
    });
  }, []);
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="screens/(auth)/signin"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="screens/(auth)/signup"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="screens/(main)" options={{ headerShown: false }} />
      <Stack.Screen
        name="screens/(detail)/[id]"
        options={{ headerShown: true, title: "Sobre o producto" }}
      />
    </Stack>
  );
}
