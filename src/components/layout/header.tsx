import { Text, View, Image } from "react-native";

export function Header() {
  return (
    <View className="gap-4">
      <View className="flex-row items-center justify-between">
        <Image source={require("@/assets/icons/kino-logo.png")} />
        <View className="relative rounded-md border border-zinc-300 p-2.5">
          <Image source={require("@/assets/icons/Bell.png")} />
          <View className="absolute right-2.5 top-2.5 size-2.5 rounded-full bg-rose-500" />
        </View>
      </View>
      <View className="flex-row items-center justify-between rounded-md border border-zinc-200 bg-zinc-100 p-2.5">
        <Text className="font-body text-zinc-500">O que vamos comer hoje?</Text>
        <Image source={require("@/assets/icons/MagnifyingGlass.png")} />
      </View>
    </View>
  );
}
