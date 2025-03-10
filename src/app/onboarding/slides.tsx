import { Image, Text, View } from "react-native";
import { slidesData } from "@/constants/slide-information";
import AppIntroSlider from "react-native-app-intro-slider";

export function Slides() {
  return (
    <AppIntroSlider
      data={slidesData}
      renderItem={({ item }) => {
        return (
          <View className="flex flex-1 items-center justify-center">
            <Image source={item.image} className="object-contain" />
            <Text className="mb-3 text-center font-heading text-2xl font-bold">
              {item.title}
            </Text>
            <Text className="text-center text-sm">{item.description}</Text>
          </View>
        );
      }}
      activeDotStyle={{ backgroundColor: "#F77C00" }}
      showNextButton={false}
      showDoneButton={false}
      dotStyle={{
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#F77C00",
        width: 10,
        height: 10,
      }}
    />
  );
}
