import { CardProduct } from "@/src/components/layout/card-product";
import { Button } from "@/src/components/ui/button";
import { useAuth } from "@/src/contexts/auth-context";
import { useCart } from "@/src/contexts/cart-context";
import { supabase } from "@/src/lib/supabase";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, TouchableOpacity } from "react-native";
import * as Location from "expo-location";

interface UserInfo {
  name: string;
  email: string;
}

export default function Cart() {
  const { cart, removeFromCart } = useCart();
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState({ name: "", email: "" } as UserInfo);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
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

  async function fetchUserInfo() {
    if (!user?.id) return;

    try {
      const { data, error } = await supabase
        .from("users")
        .select("name, email")
        .eq("id", user.id)
        .single();
      if (error) {
        throw error;
      }
      if (data) {
        setUserInfo({ name: data.name, email: data.email });
      } else {
        setUserInfo({} as UserInfo);
      }
    } catch (error) {
      console.log("Erro ao buscar dados do usuário:", error);
    }
  }

  useEffect(() => {
    fetchUserInfo();
  }, [user]);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permissão de localização negada");
        return;
      }
      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        console.log("Erro ao obter localização: ", error);
      }
    }
    getCurrentLocation();
  }, []);

  async function handleFinalizeOrder() {
    console.log(
      "Pedido finalizado com os itens: ",
      "\n\nUser: ",
      userInfo,
      "\n\nCart: ",
      cart,
      "\n\nLocation: ",
      JSON.stringify(location ?? "Localização não disponível"),
    );
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
        <>
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
          <Text className="mb-3 mt-4 text-xl font-semibold">
            Total: {formattedTotal}
          </Text>
          <Button title="Finalizar pedido" onPress={handleFinalizeOrder} />
        </>
      )}
    </SafeAreaView>
  );
}
