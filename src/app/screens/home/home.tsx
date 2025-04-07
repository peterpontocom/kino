import { Button } from "@/src/components/ui/button";
import { useAuth } from "@/src/contexts/auth-context";
import { supabase } from "@/src/lib/supabase";
import { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";

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

  return (
    <View className="flex-1 items-center justify-center bg-white px-4 py-16">
      <Text className="text-2xl font-semibold">Bem-vindo de volta!</Text>
      <Text>Hello, {name || "..."}</Text>
      <Button title="Sair" onPress={handleSignOut} />
    </View>
  );
}
