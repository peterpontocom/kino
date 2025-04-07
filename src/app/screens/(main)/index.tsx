import { Header } from "@/src/components/layout/header";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { useAuth } from "@/src/contexts/auth-context";
import { supabase } from "@/src/lib/supabase";
import { useEffect, useState } from "react";
import { View, Text, Alert, SafeAreaView } from "react-native";

export default function Home() {
  const { setAuth, user } = useAuth();
  const [name, setName] = useState();

  async function fetchUserData() {
    if (!user?.id) return;

    try {
      const { data, error } = await supabase
        .from("users")
        .select("name")
        .eq("id", user.id)
        .single();
      if (error) {
        console.log("Erro ao buscar dados do usuário.");
        setAuth(null);
        return;
      }
      setName(data?.name || "Usuário");
    } catch {
      Alert.alert("Erro ao buscar dados do usuário.");
      setAuth(null);
      return;
    }
  }

  useEffect(() => {
    fetchUserData();
  }, [user]);

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    setAuth(null);

    if (error) {
      Alert.alert("Erro ao sair. Tente novamente.");
      return;
    }
  }

  function firstName(name: string) {
    const names = name.split(" ");
    return names[0];
  }

  return (
    <SafeAreaView className="flex-1 bg-white px-6 py-4">
      <Header />
      <Text className="mb-2 mt-3 text-xl font-medium">
        Olá,{" "}
        <Text className="font-semibold" onPress={handleSignOut}>
          {firstName(name || "...")}
        </Text>
      </Text>
      <Input placeholder="O que vamos comer hoje?" />
    </SafeAreaView>
  );
}
