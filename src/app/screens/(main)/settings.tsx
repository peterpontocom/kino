import { Alert, SafeAreaView, Text, View } from "react-native";
import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/contexts/auth-context";

export default function Settings() {
  const { setAuth, user } = useAuth();

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    setAuth(null);

    if (error) {
      Alert.alert("Erro ao sair. Tente novamente.");
      return;
    }
  }
  return (
    <SafeAreaView className="flex-1 items-center justify-center p-4">
      <Text className="font-medium text-rose-500" onPress={handleSignOut}>
        Terminar sessão
      </Text>
    </SafeAreaView>
  );
}
