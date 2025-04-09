import { supabase } from "@/src/lib/supabase";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";

interface ProductDetailsProps {
  id: string;
  product_name: string;
  prep_time: string;
  description: string;
  image_url: string;
  category: string;
  vendors: { name: string }[] | null;
  price: number;
}

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<ProductDetailsProps | null>(null);

  async function fetchProductDetails() {
    try {
      const { data, error } = await supabase
        .from("products")
        .select(
          "id, product_name, prep_time, description, image_url, category, vendors (name), price",
        )
        .eq("id", id)
        .single();
      if (error) throw error;
      setProduct(data as ProductDetailsProps);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  }

  useEffect(() => {
    if (id) fetchProductDetails();
  }, [id]);

  return (
    <SafeAreaView className="flex-1 bg-zinc-50 px-6 py-4">
      <Image
        source={{
          uri: product?.image_url,
        }}
        style={{ width: "100%", height: 200 }}
        resizeMode="cover"
        alt="Imagem do produto"
        className="my-4 rounded-2xl"
      />
      <View className="flex-row items-center justify-between">
        <Text className="text-2xl font-semibold">{product?.product_name}</Text>
        <Text className="text-xl font-medium">{product?.price},00 KZS</Text>
      </View>
      <View>
        <Text className="items-center text-sm text-zinc-500">
          <FontAwesome name="clock-o" size={14} /> {product?.prep_time} min
        </Text>
      </View>
      <Text className="mt-3 text-xl font-medium">Descrição</Text>
      <Text className="mt-3 text-base text-zinc-500">
        {product?.description}
      </Text>
    </SafeAreaView>
  );
}
