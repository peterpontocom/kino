import { bannerData } from "@/constants/ad-banner";
import { Link } from "expo-router";
import { Text, View, Image, FlatList } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
export function AdSlider() {
  return (
    <View className="relative">
      <Image
        source={require("@/assets/image/ad-kfc.png")}
        className="w-full rounded-lg object-contain"
      />
      <Link
        href={"/"}
        className="absolute bottom-3 left-6 rounded-full border border-black bg-zinc-50 p-3.5 py-2.5 text-sm font-semibold text-black"
      >
        Realizar pedido
      </Link>
    </View>
  );
}
