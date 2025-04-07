import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { supabase } from "@/src/lib/supabase";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsLoading(true);

    function isValidEmail(email: string): boolean {
      return emailRegex.test(email);
    }
    if (!isValidEmail(email)) {
      Alert.alert("Insira um email válido.");
      setIsLoading(false);
      return;
    }
    if (!email || !password) {
      Alert.alert("Preencha todos os campos");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          Alert.alert("Email ou palavra-passe inválidos.");
          setIsLoading(false);
        } else {
          console.log(error.message);
          Alert.alert("Erro ao iniciar sessão. Tente novamente.");
          setIsLoading(false);
        }
      } else {
        router.replace("/screens/(main)");
      }
    } catch (error) {
      Alert.alert("Erro inesperado. Tente novamente.");
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 justify-between bg-white px-6 py-16">
      <View>
        <Text className="text-2xl font-semibold">Iniciar Sessão</Text>
        <Text className="text-sm text-zinc-800">
          Bem-vindo de volta, preparamos algo delicioso para ti. Seu Kino em
          poucos segundos.
        </Text>
        <Text className="mb-2 mt-5 font-medium">Email</Text>
        <Input
          placeholder="Insira seu email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="emailAddress"
          keyboardType="email-address"
          returnKeyType="next"
          autoFocus
        />
        <Text className="mb-2 mt-5 font-medium">Palavra-passe</Text>
        <Input
          placeholder="Insira sua senha"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="password"
          keyboardType="default"
          returnKeyType="done"
        />
        <Text className="mb-8 mt-2 text-right">Esqueceu a senha?</Text>
        <Button
          title={isLoading ? "Carregando" : "Iniciar sessão"}
          onPress={handleSignIn}
        />
      </View>

      <View className="flex-row justify-center gap-1">
        <Text className="text-zinc-500">Não tem conta?</Text>
        <Link href={"/screens/(auth)/signup"} asChild>
          <Text className="font-medium underline">Crie uma.</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}
