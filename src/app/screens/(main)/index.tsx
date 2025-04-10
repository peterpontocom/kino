import { CardProduct } from "@/src/components/layout/card-product";
import { Header } from "@/src/components/layout/header";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { useAuth } from "@/src/contexts/auth-context";
import { supabase } from "@/src/lib/supabase";
import { Link, router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  Alert,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";

export interface ProductProps {
  id: string;
  product_name: string;
  prep_time: string;
  description: string;
  image_url: string;
  category: string;
  vendors: { name: string }[] | null;
  price: number;
}

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
          price,
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

  const [searchText, setSearchText] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.product_name
        .toLocaleLowerCase()
        .includes(searchText.toLocaleLowerCase()),
    );
  }, [products, searchText]);

  return (
    <SafeAreaView className="flex-1 bg-zinc-50 px-6 py-4">
      <Header />
      <Text className="mb-2 mt-3 text-xl font-medium">
        Olá,{" "}
        <Text className="font-semibold" onPress={handleSignOut}>
          {firstName(name || "...")}
        </Text>
      </Text>
      <Input
        placeholder="O que vamos comer hoje?"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />

      {loading ? (
        <Text className="text-center text-gray-500">Carregando...</Text>
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.push(`/screens/(detail)/${item.id}`)}
            >
              <CardProduct
                id={item.id}
                image_url={item.image_url}
                prep_time={item.prep_time}
                product_name={item.product_name}
                price={item.price.toString()}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          className="mt-4"
        />
      )}
    </SafeAreaView>
  );
}
