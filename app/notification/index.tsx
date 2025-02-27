import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

const Notification = () => {
  return (
    <SafeAreaView className="flex-1 bg-white p-6">
      <View className="flex-1 justify-center items-center p-4">
        <Image
          source={require("../../assets/images/notification_icon.png")}
          className="w-24 h-24 mb-4"
          resizeMode="contain"
        />
        <Text className="text-lg font-semibold text-center text-[24px]">
          Get the most out of Blott ✅
        </Text>
        <Text className="text-gray-600 text-center mt-2 text-[16px]">
          Allow notifications to stay in the loop with your payments, requests,
          and groups.
        </Text>
      </View>
      <TouchableOpacity
        className="bg-[#523AE4] py-4 rounded-full items-center mx-5 mb-8"
        onPress={() =>
          Alert.alert(
            `“Blott” Would Like to Send You Notifications`,
            "Notifications may include alerts, sounds, and icon badges. These can be configured in Settings.",
            [
              {
                text: "Don't Allow",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              {
                text: "Allow",
                onPress: () => console.log("Allow Pressed"),
              },
            ]
          )
        }
      >
        <Text className="text-white font-semibold text-lg">Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Notification;
