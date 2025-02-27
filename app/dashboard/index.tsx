import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import moment from "moment";
import { Link } from "expo-router";
import { openBrowserAsync } from "expo-web-browser";
import useFetch from "@/hooks/useFetch";
import { fetchNews } from "@/api/news";
import { useEffect, useState } from "react";
import { NewsTypes } from "@/types";
const Dashboard = () => {
  const [data, setData] = useState<NewsTypes[]>([]);
  const onFetch = async () => {
    const response = await fetchNews({ category: "general" });
    setData(response);
  };
  useEffect(() => {
    onFetch();
  }, []);
  return (
    <View className="bg-[#05021B] p-3 flex-1">
      <Text className="text-white text-[24px]">Hey Afras</Text>
      <FlatList
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
                className="w-[26%] h-[100px]  rounded-lg"
                resizeMode="cover"
              />
              <View className="w-[70%]">
                <View className="flex-row items-center justify-between">
                  <Text className="text-[#FFFFFFB2] text-sm">
                    {item.source}
                  </Text>
                  <Text className="text-[#FFFFFFB2] text-sm">{}</Text>
                </View>
                <Text className="text-[#FFFFFF] mt-1 text-lg flex-wrap">
                  {item.title}
                </Text>
              </View>
            </View>
          </Link>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default Dashboard;
