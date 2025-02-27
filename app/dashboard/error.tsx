import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Error() {
  return (
    <SafeAreaView className="bg-[#05021B] p-3 flex-1">
      <Text className="text-white text-4xl mb-2">Hey Afras</Text>
      <Text className="text-white text-xl mb-2">Something went wrong. Please try again later.</Text>
    </SafeAreaView>
  );
}
