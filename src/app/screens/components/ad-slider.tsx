import { bannerData } from "@/constants/ad-banner";
import { Link } from "expo-router";
import { Text, View, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
export function AdSlider() {
  return (
    <AppIntroSlider
      data={bannerData}
      renderItem={({ item }) => {
        return (
          <View className="relative">
            <Image
              source={item.image}
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
      }}
      activeDotStyle={{ backgroundColor: "#F77C00", display: "none" }}
      showNextButton={false}
      showDoneButton={false}
      dotStyle={{
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#F77C00",
        width: 10,
        height: 10,
        display: "none",
      }}
    />
  );
}
