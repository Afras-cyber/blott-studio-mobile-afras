import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View, Text } from "react-native";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/dashboard");
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View>
      <Text style={{ color: "blue", fontSize: 18 }}>Home Primary</Text>
    </View>
  );
};

export default Home;
