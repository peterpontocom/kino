import { FlatList, Image, Text, View } from "react-native";
import { Button } from "@/components/ui/button";
import { products } from "@/constants/products";

import { ImageSourcePropType } from "react-native";

interface CardProductProps {
  imageUrl: ImageSourcePropType;
  title: string;
  price: number;
  validation: number;
}

export function CardProduct({
  imageUrl,
  title,
  price,
  validation,
}: CardProductProps) {
  return (
    <View className="mb-2 gap-1.5 rounded-md border border-zinc-300 p-1.5 first:mr-1">
      <View>
        <Image source={imageUrl} />
      </View>
      <Text className="Text-sm font-medium">{title}</Text>
      <View className="flex-row items-center justify-between">
        <Text className="text-xl font-semibold">{price}</Text>
        <Text className="text-xs">{validation}</Text>
      </View>
      <Button title="Adicionar" />
    </View>
  );
}
