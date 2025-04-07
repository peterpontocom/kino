import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { supabase } from "@/src/lib/supabase";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  async function signUpWithEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsLoading(true);

    function isValidEmail(email: string): boolean {
      return emailRegex.test(email);
    }

    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Preencha todos os campos.");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("As palavras-passe não coincidem.");
      setIsLoading(false);
      return;
    }
    if (password.length < 8) {
      Alert.alert("A palavra-passe deve ter pelo menos 8 caracteres.");
      setIsLoading(false);
      return;
    }
    if (!email) {
      Alert.alert("Insira um email válido.");
      setIsLoading(false);
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert("Insira um email válido.");
      setIsLoading(false);
      return;
    }
    if (!password) {
      Alert.alert("Insira uma palavra-passe válida.");
      setIsLoading(false);
      return;
    }
    if (!confirmPassword) {
      Alert.alert("Confirme a sua palavra-passe.");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            name: name,
          },
        },
      });
      if (error) {
        if (error.message.includes("User already registered")) {
          Alert.alert("Email já registado.");
          setIsLoading(false);
        } else {
          Alert.alert("Erro ao criar conta. Tente novamente.");
          setIsLoading(false);
        }
      } else {
        router.replace("/screens/(auth)/signin");
      }
    } catch (error) {
      if (error) Alert.alert("Erro, tente novamente");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 justify-between bg-white px-6 py-16">
      <View>
        <Text className="text-2xl font-semibold">Criar conta</Text>
        <Text className="text-sm text-zinc-800">
          Poucos passos para desfrutar de uma experiência incrível. Seu Kino tá
          te esperando!
        </Text>
        <Text className="mb-2 mt-5 font-medium">Nome completo</Text>
        <Input
          placeholder="Insira seu nome"
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <Text className="mb-2 mt-5 font-medium">Email</Text>
        <Input
          placeholder="Insira seu email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          autoCapitalize="none"
        />
        <Text className="mb-2 mt-5 font-medium">Palavra-passe</Text>
        <Input
          placeholder="Insira sua palavra-passe"
          onChangeText={(text) => setPassword(text)}
          value={password}
          autoCapitalize="none"
          secureTextEntry
        />
        <Text className="mb-2 mt-5 font-medium">Confirmar palavra-passe</Text>
        <Input
          placeholder="Insira sua palavra-passe"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          autoCapitalize="none"
          secureTextEntry
        />
        <View className="mb-8" />
        <Button
          title={isLoading ? "A criar conta..." : "Criar conta"}
          onPress={() => signUpWithEmail()}
          disabled={isLoading}
        />
      </View>

      <View className="flex-row justify-center gap-1">
        <Text className="text-zinc-500">Já tem conta?</Text>
        <Link href={"/screens/(auth)/signin"} asChild>
          <Text className="font-medium underline">Inicie sessão.</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}
