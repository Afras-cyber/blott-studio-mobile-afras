import { View, Text, FlatList, Image, Platform, ActivityIndicator } from "react-native";
import { Link, useRouter } from "expo-router";
import { openBrowserAsync } from "expo-web-browser";
import { fetchNews } from "@/api/news";
import { useEffect, useState } from "react";
import { NewsTypes } from "@/types";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Dashboard = () => {
  const [data, setData] = useState<NewsTypes[]>([]);
  const [loading, setLoading] = useState(false);
  const [storeedValue, setStoredValue] = useState<{
    firstName: string;
    lastName: string;
  } | null>(null);
  const router = useRouter();

  const onFetch = async () => {
    try {
      setLoading(true);
      const response = await fetchNews({
        category: "general",
      });
      setData(response);
      setLoading(false);
    } catch (err) {
      router.push("/dashboard/error");
    }
  };
  const loadStoredValue = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("auth");
      setStoredValue(jsonValue ? JSON.parse(jsonValue) : null);
    } catch (error) {
      console.error("Error fetching data from AsyncStorage", error);
    }
  };
  useEffect(() => {
    onFetch();
    loadStoredValue();
  }, []);
  return (
    <SafeAreaView className="bg-[#05021B] p-3 flex-1">
      <Text className="text-white text-4xl mb-2">
        Hey {storeedValue?.firstName}
      </Text>
      {
        loading ? <ActivityIndicator color="white" size="large" /> :<FlatList
        data={data}
        renderItem={({ item }) => (
          <Link
            target="_blank"
            className="my-4"
            href={item.url as any}
            onPress={async (event) => {
              if (Platform.OS !== "web") {
                event.preventDefault();
                await openBrowserAsync(item.url as any);
              }
            }}
          >
            <View className="flex-row items-center gap-4  ">
              <Image
                source={
                  item?.thumbnail
                    ? { uri: item.thumbnail }
                    : require("../../assets/images/icon.png")
                }
                className="w-[26%] h-[100px]"
                resizeMode="cover"
              />
              <View className="w-[70%]">
                <View className="flex-row items-center justify-between">
                  <Text className="text-[#FFFFFFB2] text-sm">
                    {item.source}
                  </Text>
                  <Text className="text-[#FFFFFFB2] text-sm">{item.date}</Text>
                </View>
                <Text
                  className="text-[#FFFFFF] mt-1 text-lg flex-wrap"
                  ellipsizeMode="tail"
                  numberOfLines={2}
                >
                  {item.title}
                </Text>
              </View>
            </View>
          </Link>
        )}
        keyExtractor={(item, index) => `${item.id.toString()}-${index}`}
      />
      }
      
    </SafeAreaView>
  );
};

export default Dashboard;
