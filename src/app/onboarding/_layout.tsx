import { View, Image, SafeAreaView } from "react-native";
import { Slides } from "./slides";
import { Button } from "@/components/ui/button";
import { useNavigation } from "expo-router";

export default function Layout() {
  const navigation = useNavigation<any>();

  function navigateToScreen(screenName: string) {
    navigation.navigate(screenName);
  }

  return (
    <SafeAreaView className="flex-1 justify-between bg-white p-4">
      <Image source={require("../../assets/icons/kino-logo.png")} />
      <Slides />
      <View className="mb-16 gap-2">
        <Button
          title="Iniciar sessão"
          onPress={() => navigateToScreen("auth")}
        />
        <Button title="Criar conta" variant="secondary" />
      </View>
    </SafeAreaView>
  );
}
