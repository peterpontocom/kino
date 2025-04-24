import { useCart } from "@/src/contexts/cart-context";
import { FontAwesome } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface CardProductProps {
  id: string;
  product_name: string;
  prep_time: string;
  image_url: string;
  price: string;
  variant?: "primary" | "secondary";
  handleRemoveFromCart?: (id: string) => void;
}

export function CardProduct({
  id,
  product_name,
  prep_time,
  image_url,
  price,
  variant = "primary",
  handleRemoveFromCart,
}: CardProductProps) {
  const { addToCart, cart, increaseQuantity, decreaseQuantity } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id,
      product_name,
      prep_time,
      image_url,
      price: parseFloat(price),
    });
    console.log("Produto adicionado ao carrinho: ", { id, product_name });
  };

  const itemInCart = cart.find((item) => item.id === id);

  return (
    <View className="mb-4 flex flex-row gap-4 rounded-lg border border-zinc-200 bg-white p-4 shadow-md">
      <View>
        <Image
          source={{ uri: image_url }}
          style={{ width: 100, height: 100 }}
          resizeMode="cover"
          alt="Imagem do produto"
          className="rounded-lg"
        />
      </View>
      <View className="flex-1 justify-between">
        <View className="flex-row items-center justify-between">
          <Text className="text-base font-medium">{product_name}</Text>
          {variant === "secondary" && (
            <TouchableOpacity
              onPress={() => handleRemoveFromCart?.(id)}
              className="text-zinc-600"
            >
              <FontAwesome name="trash-o" size={20} />
            </TouchableOpacity>
          )}
        </View>
        <Text className="text-2xl font-semibold">{price},00 KZS</Text>
        <View className="flex-row items-center justify-between">
          <Text className="items-center text-sm text-zinc-500">
            <FontAwesome name="clock-o" size={14} /> {prep_time} min
          </Text>
          {variant === "primary" && (
            <TouchableOpacity
              onPress={handleAddToCart}
              className="flex size-10 items-center justify-center rounded-full bg-rose-500"
            >
              <FontAwesome name="cart-plus" size={20} color={"#fff"} />
            </TouchableOpacity>
          )}
          {variant === "secondary" && itemInCart && (
            <View className="flex-row items-center gap-2">
              <TouchableOpacity onPress={() => decreaseQuantity(id)}>
                <FontAwesome name="minus" size={20} />
              </TouchableOpacity>
              <Text>{itemInCart.quantity}</Text>
              <TouchableOpacity onPress={() => increaseQuantity(id)}>
                <FontAwesome name="plus" size={20} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
