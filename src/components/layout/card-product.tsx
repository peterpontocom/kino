import { FontAwesome } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";

export function CardProduct() {
  return (
    <View className="flex flex-row gap-4 rounded-lg bg-white p-4 shadow-md">
      <View>
        <Image
          source={{
            uri: "https://www.thespruceeats.com/thmb/6cxTGZQwI762roeAykXTMqo5JVE=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/91278862-56a8a49f3df78cf7729f5d47.jpg",
          }}
          style={{ width: 100, height: 100 }}
          resizeMode="cover"
          alt="Imagem do produto"
          className="rounded-lg"
          accessibilityLabel="Imagem do produto"
          accessibilityHint="Imagem do produto"
          accessibilityRole="image"
          accessibilityState={{ selected: false }}
          accessibilityLabelledBy="imagem-produto"
        />
      </View>
      <View className="flex-1 justify-between">
        <Text className="text-base font-medium">Nome do produto</Text>
        <Text className="text-2xl font-semibold">$ 4.40</Text>
        <View className="flex-row items-center justify-between">
          <Text className="items-center text-sm text-zinc-500">
            <FontAwesome name="clock-o" size={14} /> 22 min
          </Text>
          <View className="flex size-10 items-center justify-center rounded-full bg-rose-500">
            <FontAwesome name="cart-plus" size={20} color={"#fff"} />
          </View>
        </View>
      </View>
    </View>
  );
}
