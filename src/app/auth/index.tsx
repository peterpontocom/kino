import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import GoogleIcon from "../../assets/icons/google-logo.svg";
import { useNavigation } from "expo-router";

export default function SignIn() {
  const { control } = useForm();
  const navigation = useNavigation<any>();

  function handleSignIn() {
    navigation.navigate("screens");
  }

  return (
    <SafeAreaView className="flex-1 bg-white px-4 py-3 font-body">
      <Image source={require("../../../assets/images/icon.png")} />
      <View className="gap-1">
        <Text className="mt-5 font-heading text-2xl font-bold">
          Bem-vindo de volta
        </Text>
        <Text className="text-sm text-zinc-500">
          Preencha seus dados para continuar
        </Text>
      </View>
      <View className="mt-8 gap-5">
        <View className="gap-2">
          <Text className="text-sm font-medium">Email</Text>
          <Input
            formProps={{ name: "email", control }}
            inputProps={{ placeholder: "Insira seu email" }}
          />
        </View>
        <View className="gap-2">
          <Text className="text-sm font-medium">Palavra-passe</Text>
          <Input
            formProps={{ name: "password", control }}
            inputProps={{
              placeholder: "Insira sua palavra-passe",
              secureTextEntry: true,
              autoCapitalize: "none",
            }}
          />
        </View>
      </View>
      <Text className="my-4 text-sm font-medium text-emerald-700">
        Esqueceu a palavra-passe?
      </Text>
      <Button title="Iniciar sessão" onPress={handleSignIn} />
      <Text className="mt-4 text-center text-sm text-zinc-500">
        Não tem uma conta?{" "}
        <Text className="font-semibold text-emerald-700">Crie uma.</Text>
      </Text>
      <View className="mb-7 mt-4 flex-row items-center justify-center gap-3">
        <View className="h-[1px] flex-1 bg-zinc-400" />
        <Text className="text-center text-sm font-bold text-zinc-500">Ou</Text>
        <View className="h-[1px] flex-1 bg-zinc-400" />
      </View>
      <TouchableOpacity className="flex-row items-center justify-center gap-3 rounded-md border border-zinc-200 p-3">
        <GoogleIcon />
        <Text className="text-center font-semibold text-zinc-600">
          Continuar com Google
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
