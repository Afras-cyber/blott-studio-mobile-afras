import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Error() {
  const [storeedValue, setStoredValue] = useState<{
    firstName: string;
    lastName: string;
  } | null>(null);
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
    <SafeAreaView className="bg-[#05021B] p-3 py-4 flex-1">
  <Text className="text-white text-4xl mb-8 font-extrabold">
        Hey {storeedValue?.firstName}
      </Text>
      <Text className="text-white font-extrabold text-xl mb-2">
        Something went wrong. Please try again later.
      </Text>
    </SafeAreaView>
  );
}
