import { Header } from "@/components/layout/header";
import { Slot } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";

export default function Layout() {
  return (
    <SafeAreaView className="flex-1 gap-4 bg-white px-4 py-3">
      <Header />
      <Slot />
    </SafeAreaView>
  );
}
