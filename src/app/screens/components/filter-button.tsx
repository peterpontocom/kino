import { FlatList, Image, Text, TouchableHighlight, View } from "react-native";

interface FilterButtonProps {
  // title: string;
  // iconUrl: string;
  onPress?: () => void;
}

const filterList = [
  {
    id: 1,
    title: "Burger",
    image: require("@/assets/icons/hamburger-02.png"),
  },
  {
    id: 2,
    title: "Pizza",
    image: require("@/assets/icons/pizza-02.png"),
  },
  {
    id: 3,
    title: "Caseiro",
    image: require("@/assets/icons/organic-food.png"),
  },
  {
    id: 4,
    title: "Vegetariano",
    image: require("@/assets/icons/vegetarian-food.png"),
  },
];

export function FilterButton({ onPress }: FilterButtonProps) {
  return (
    <>
      <FlatList
        data={filterList}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className="mr-2 w-[100px] flex-row items-center justify-center gap-2 rounded-lg border border-zinc-300 p-2">
            <Image source={item.image} className="size-5" />
            <Text className="font-semibold text-zinc-500">{item.title}</Text>
          </View>
        )}
      />
    </>
  );
}
