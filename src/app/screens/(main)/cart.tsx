import { CardProduct } from "@/src/components/layout/card-product";
import { Button } from "@/src/components/ui/button";
import { useAuth } from "@/src/contexts/auth-context";
import { useCart } from "@/src/contexts/cart-context";
import { supabase } from "@/src/lib/supabase";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import { useRouter } from "expo-router";

interface UserInfo {
  name: string;
  email: string;
}

interface CartItem {
  id: string;
  product_name: string;
  price: number;
  quantity: number;
  prep_time: number | null;
  image_url: string | null;
}

export default function Cart() {
  const { cart, removeFromCart, setCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo>({ name: "", email: "" });
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

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
        .from("user_profiles")
        .select("name, email")
        .eq("id", user.id)
        .single();
      if (error) throw error;
      if (data) {
        setUserInfo({ name: data.name, email: data.email });
      } else {
        setUserInfo({ name: "", email: "" });
      }
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
      Alert.alert("Erro", "Não foi possível carregar os dados do usuário.");
    }
  }

  useEffect(() => {
    fetchUserInfo();
  }, [user]);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Erro", "Permissão de localização negada.");
        return;
      }
      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        console.error("Erro ao obter localização:", error);
        Alert.alert("Erro", "Não foi possível obter a localização.");
      }
    }
    getCurrentLocation();
  }, []);

  async function handleFinalizeOrder() {
    if (!user?.id) {
      Alert.alert("Erro", "Você precisa estar logado para finalizar o pedido.");
      return;
    }
    if (cart.length === 0) {
      Alert.alert("Erro", "O carrinho está vazio.");
      return;
    }
    if (!location) {
      Alert.alert("Aviso", "Localização não disponível. Deseja continuar?", [
        { text: "Cancelar" },
        {
          text: "Continuar",
          onPress: () => handleFinalizeOrderWithoutLocation(),
        },
      ]);
      return;
    }

    await finalizeOrder(location);
  }

  async function handleFinalizeOrderWithoutLocation() {
    await finalizeOrder(null);
  }

  async function finalizeOrder(location: Location.LocationObject | null) {
    setLoading(true);
    try {
      // 1. Criar o pedido
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            user_id: user!.id,
            status: "pending",
            total_price: total,
            latitude: location?.coords.latitude ?? null,
            longitude: location?.coords.longitude ?? null,
          },
        ])
        .select()
        .single();

      if (orderError) {
        console.error("Erro ao criar pedido:", orderError);
        throw new Error("Erro ao criar o pedido.");
      }

      // 2. Criar os itens do pedido
      const orderItems: {
        order_id: string;
        product_id: string;
        vendor_id: string;
        quantity: number;
        unit_price: number;
      }[] = [];

      for (const item of cart) {
        const { data: product, error: productError } = await supabase
          .from("products")
          .select("vendor_id")
          .eq("id", item.id)
          .single();

        if (productError || !product) {
          console.error("Erro ao buscar produto:", productError);
          throw new Error(`Produto ${item.product_name} não encontrado.`);
        }

        orderItems.push({
          order_id: order.id,
          product_id: item.id,
          vendor_id: product.vendor_id,
          quantity: item.quantity,
          unit_price: item.price,
        });
      }

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) {
        console.error("Erro ao criar itens do pedido:", itemsError);
        throw new Error("Erro ao criar os itens do pedido.");
      }

      // 3. Limpar o carrinho e redirecionar
      setCart([]);
      Alert.alert("Sucesso", "Pedido finalizado com sucesso!");
      router.push("../");
    } catch (error: any) {
      console.error("Erro ao finalizar pedido:", error);
      Alert.alert(
        "Erro",
        error.message || "Não foi possível finalizar o pedido.",
      );
    } finally {
      setLoading(false);
    }
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
          <Button
            title={loading ? "Finalizando..." : "Finalizar pedido"}
            onPress={handleFinalizeOrder}
            disabled={loading}
          />
        </>
      )}
    </SafeAreaView>
  );
}
