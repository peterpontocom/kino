import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} />,
        }}
      />
      <Tabs.Screen
        name="chart"
        options={{
          headerShown: false,
          title: "Carrinho",
          tabBarIcon: ({ color }) => <FontAwesome name="bar-chart" size={24} />,
        }}
      />
    </Tabs>
  );
}
