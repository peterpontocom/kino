import { FontAwesome } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";

interface CardProductProps {
  id: string;
  product_name: string;
  prep_time: string;
  image_url: string;
  price: string;
}

export function CardProduct({
  product_name,
  prep_time,
  image_url,
  price,
}: CardProductProps) {
  return (
    <View className="mb-4 flex flex-row gap-4 rounded-lg bg-white p-4 shadow-md">
      <View>
        <Image
          source={{
            uri: image_url,
          }}
          style={{ width: 100, height: 100 }}
          resizeMode="cover"
          alt="Imagem do produto"
          className="rounded-lg"
        />
      </View>
      <View className="flex-1 justify-between">
        <Text className="text-base font-medium">{product_name}</Text>
        <Text className="text-2xl font-semibold">{price},00 KZS</Text>
        <View className="flex-row items-center justify-between">
          <Text className="items-center text-sm text-zinc-500">
            <FontAwesome name="clock-o" size={14} /> {prep_time} min
          </Text>
          <View className="flex size-10 items-center justify-center rounded-full bg-rose-500">
            <FontAwesome name="cart-plus" size={20} color={"#fff"} />
          </View>
        </View>
      </View>
    </View>
  );
}
