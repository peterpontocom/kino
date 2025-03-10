import { Header } from "@/components/layout/header";
import { Slot } from "expo-router";
import { Text, View } from "react-native";

export default function Layout() {
  return (
    <View>
      <Header />
      <Slot />
    </View>
  );
}
