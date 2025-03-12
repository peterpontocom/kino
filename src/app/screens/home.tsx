import { FlatList, ScrollView, View } from "react-native";
import { AdSlider } from "./components/ad-slider";
import { FilterButton } from "./components/filter-button";
import { CardProduct } from "../../components/ui/card-product";
import { products } from "../../constants/products";

export default function Home() {
  return (
    <>
      {/* <AdSlider /> */}
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row gap-2 overflow-auto"
        >
          <FilterButton />
        </ScrollView>
        <FlatList
          className="mt-3 grid grid-cols-2 gap-2"
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          data={products}
          renderItem={(product) => (
            <CardProduct
              imageUrl={product.item.imageUrl}
              price={product.item.price}
              title={product.item.title}
              validation={product.item.validation}
            />
          )}
        />
      </View>
    </>
  );
}
