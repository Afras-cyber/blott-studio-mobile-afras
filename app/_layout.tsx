import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";
import { useColorScheme } from "@/hooks/useColorScheme";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    const loadResources = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000)); 
      await SplashScreen.hideAsync(); 
    };

    loadResources();
  }, []);


  return (
    <ThemeProvider value={ DefaultTheme}>
      <Stack  screenOptions={{ headerShown: false }}>
        <Stack.Screen name="notification" />
        <Stack.Screen name="home"  />
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="error" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
