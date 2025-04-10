import { CardProduct } from "@/src/components/layout/card-product";
import { useCart } from "@/src/contexts/cart-context";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Cart() {
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price, 0);
  const formattedTotal = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "KZS",
  });

  function handleRemoveAllItems() {
    cart.forEach((item) => removeFromCart(item.id));
  }

  function handleRemoveItem(id: string) {
    removeFromCart(id);
  }

  return (
    <SafeAreaView className="flex-1 bg-zinc-50 px-6 py-4">
      <Text className="text-2xl font-semibold">Seu carrinho</Text>
      <TouchableOpacity className="my-5">
        <Text className="text-rose-600" onPress={handleRemoveAllItems}>
          <FontAwesome name="close" /> Limpar lista
        </Text>
      </TouchableOpacity>
      {cart.length === 0 ? (
        <Text className="text-center text-gray-500">Carrinho vazio</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CardProduct
              id={item.id}
              product_name={item.product_name}
              prep_time={item.prep_time}
              image_url={item.image_url}
              price={item.price.toString()}
              variant="secondary"
              handleRemoveFromCart={() => handleRemoveItem(item.id)}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}
