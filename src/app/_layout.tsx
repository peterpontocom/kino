import "../global.css";
// import {
//   Montserrat_400Regular,
//   Montserrat_500Medium,
//   Montserrat_600SemiBold,
//   Montserrat_700Bold,
//   useFonts,
// } from "@expo-google-fonts/montserrat";
import { Stack } from "expo-router";

export default function Layout() {
  // const [fontsLoaded] = useFonts({
  //   Montserrat_400Regular,
  //   Montserrat_500Medium,
  //   Montserrat_600SemiBold,
  //   Montserrat_700Bold,
  // });

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
