import { ActivityIndicator, Text, View } from "react-native";
import { CartProvider } from "../contexts/cart-context";

export default function App() {
  return (
    <CartProvider>
      <View className="flex-1 flex-col items-center justify-center gap-3 bg-white">
        <ActivityIndicator className="text-rose-500" size={60} />
        <Text className="text-sm italic">
          Seu kino dentro de alguns instantes...
        </Text>
      </View>
    </CartProvider>
  );
}
