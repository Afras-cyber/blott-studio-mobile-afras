import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
  TextInputProps,
  StatusBar,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
});

const Auth = () => {
  const router = useRouter();
  const AuthTextInput = ({ ...children }: TextInputProps) => {
    return (
      <TextInput
        className="border-b-2 text-2xl border-gray-300 py-4 mb-4"
        {...children}
      />
    );
  };
  return (
    <View className="flex-1 p-3">
      <StatusBar barStyle="dark-content" />
      <Formik
        validationSchema={validationSchema}
        initialValues={{ firstName: "", lastName: "" }}
        onSubmit={async (values) => {
          try {
            const jsonValue = JSON.stringify(values);
            await AsyncStorage.setItem("auth", jsonValue);
            router.push("/notification");
          } catch (error) {
            console.error("Failed to save user data:", error);
          }
      
        }}
      >
        {({
          touched,
          values,
          isValid,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1"
          >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-4">
              <View className="flex-1 justify-between">
                <View className="mt-8">
                  <Text className="text-primary text-4xl font-bold my-4">
                    Your legal name
                  </Text>
                  <Text
                    className="text-xl mt-4 mb-6"
                    style={{ color: "#737373" }}
                  >
                    We need to know a bit about you so that we can create your
                    account.
                  </Text>
                  <View className="space-y-4">
                    <AuthTextInput
                      placeholder="First name"
                      placeholderTextColor={"#737373"}
                      onChangeText={handleChange("firstName")}
                      onBlur={handleBlur("firstName")}
                      value={values.firstName}
                    />
                    <AuthTextInput
                      placeholder="Last name"
                      placeholderTextColor={"#737373"}
                      onChangeText={handleChange("lastName")}
                      onBlur={handleBlur("lastName")}
                      value={values.lastName}
                    />
                  </View>
                </View>

                <View className="mb-8 items-end">
                  <TouchableOpacity
                    className="w-16 h-16 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: "#523AE4",
                      opacity:
                        touched.firstName == undefined
                          ? 0.5
                          : isValid
                          ? 1
                          : 0.5,
                    }}
                    onPress={handleSubmit as any}
                    disabled={!isValid}
                  >
                    <AntDesign name="right" size={24} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        )}
      </Formik>
    </View>
  );
};

export default Auth;
