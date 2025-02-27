import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";
import { Link, Stack } from "expo-router";

export default function NotFoundScreen() {
  const [storedValue, setStoredValue] = useState<{ firstName: string; lastName: string } | null>(null);

  const loadStoredValue = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("auth");
      setStoredValue(jsonValue ? JSON.parse(jsonValue) : null);
    } catch (error) {
      console.error("Error fetching data from AsyncStorage", error);
    }
  };
  useEffect(() => {
    loadStoredValue();
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <SafeAreaView className="bg-[#05021B] flex-1 items-center justify-center px-5">
        <Text className="text-white text-3xl mb-2">
          Hey {storedValue?.firstName || "Guest"},
        </Text>
        <Text className="text-white text-lg mb-4 text-center">
          Something went wrong. Please try again later.
        </Text>
        <Link href="/" asChild>
          <TouchableOpacity className="bg-blue-500 px-6 py-3 rounded-lg mt-4">
            <Text className="text-white text-lg font-semibold">Go to Home</Text>
          </TouchableOpacity>
        </Link>
      </SafeAreaView>
    </>
  );
}
