import { FontAwesome } from "@expo/vector-icons";
import { Image, SafeAreaView, Text, View } from "react-native";

export default function ProductDetail() {
  return (
    <SafeAreaView className="flex-1 bg-zinc-50 px-6 py-4">
      <Image
        source={{
          uri: "https://www.thespruceeats.com/thmb/6cxTGZQwI762roeAykXTMqo5JVE=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/91278862-56a8a49f3df78cf7729f5d47.jpg",
        }}
        style={{ width: "100%", height: 200 }}
        resizeMode="cover"
        alt="Imagem do produto"
        className="my-4 rounded-2xl"
        accessibilityLabel="Imagem do produto"
        accessibilityHint="Imagem do produto"
        accessibilityRole="image"
        accessibilityState={{ selected: false }}
        accessibilityLabelledBy="imagem-produto"
      />
      <View className="flex-row items-center justify-between">
        <Text className="text-2xl font-semibold">Nome do produto</Text>
        <Text className="text-xl font-medium">$ 4.40</Text>
      </View>
      <View>
        <Text className="items-center text-sm text-zinc-500">
          <FontAwesome name="clock-o" size={14} /> 22 min
        </Text>
      </View>

      <Text className="mt-3 text-xl font-medium">Descrição</Text>
      <Text className="mt-3 text-base text-zinc-500">
        A feijoada é um prato tradicional brasileiro feito com feijão preto,
        diversas carnes suínas e acompanhamentos como arroz, couve, farofa e
        laranja. É conhecido por seu sabor rico e consistência reconfortante,
        sendo considerado um dos pratos mais emblemáticos da culinária
        brasileira.
      </Text>
    </SafeAreaView>
  );
}
