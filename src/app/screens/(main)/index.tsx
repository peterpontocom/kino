import { CardProduct } from "@/src/components/layout/card-product";
import { Header } from "@/src/components/layout/header";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { useAuth } from "@/src/contexts/auth-context";
import { supabase } from "@/src/lib/supabase";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Alert, SafeAreaView, Image, FlatList } from "react-native";

export default function Home() {
  const { setAuth, user } = useAuth();
  const [name, setName] = useState();

  async function fetchUserData() {
    if (!user?.id) return;

    try {
      const { data, error } = await supabase
        .from("users")
        .select("name")
        .eq("id", user.id)
        .single();
      if (error) {
        console.log("Erro ao buscar dados do usuário.");
        setAuth(null);
        return;
      }
      setName(data?.name || "Usuário");
    } catch {
      Alert.alert("Erro ao buscar dados do usuário.");
      setAuth(null);
      return;
    }
  }

  useEffect(() => {
    fetchUserData();
  }, [user]);

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    setAuth(null);

    if (error) {
      Alert.alert("Erro ao sair. Tente novamente.");
      return;
    }
  }

  function firstName(name: string) {
    const names = name.split(" ");
    return names[0];
  }

  // --

  interface ProductProps {
    id: string;
    product_name: string;
    prep_time: string;
    description: string;
    image_url: string;
    category: string;
    vendors: { name: string }[] | null;
  }

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductProps[]>([]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from<"products", ProductProps>(
        "products",
      ) // Adiciona a tipagem explícita
        .select(`
          id,
          product_name,
          prep_time,
          description,
          image_url,
          category,
          vendors (name)
        `);

      if (error) {
        throw error; // Lança o erro para ser tratado no catch
      }

      if (data) {
        setProducts(data); // Define os produtos apenas se data não for null
      } else {
        setProducts([]); // Garante que products não será undefined
      }

      console.log(data);
    } catch (error) {
      Alert.alert("Erro ao buscar produtos.");
      console.log(error);
    } finally {
      setLoading(false); // Garante que o loading será atualizado
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // const renderItem = ({ item }: { item: ProductProps }) => (

  // );

  return (
    <SafeAreaView className="flex-1 bg-zinc-50 px-6 py-4">
      <Header />
      <Text className="mb-2 mt-3 text-xl font-medium">
        Olá,{" "}
        <Text className="font-semibold" onPress={handleSignOut}>
          {firstName(name || "...")}
        </Text>
      </Text>
      <Input placeholder="O que vamos comer hoje?" />

      {loading ? (
        <Text className="text-center text-gray-500">Carregando...</Text>
      ) : (
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <View className="mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <Image source={{ uri: item.image_url }} />
              <Text>{item.product_name}</Text>
              {/* <Text>Store: {item.vendors[0]?.name}</Text> */}
              <Text>Category {item.category}</Text>
              <Text>Prep Time: {item.prep_time} min</Text>
              <Text>{item.description}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          className="mt-4"
        />
      )}
    </SafeAreaView>
  );
}
