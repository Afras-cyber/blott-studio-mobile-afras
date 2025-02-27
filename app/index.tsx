import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View, Text, Image } from "react-native";
const LOGO = require("../assets/images/icon.png");

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/dashboard");
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View className="bg-[#05021B] flex-1 justify-center items-center">
      <Image
        source={LOGO}
        className="w-40 h-40"
        resizeMode="contain"
      />
    </View>
  );
};

export default Home;
