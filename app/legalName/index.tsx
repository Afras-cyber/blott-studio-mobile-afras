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

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
});

const Auth = () => {
  const route = useRouter();
  const AuthTextInput = ({ ...children }: TextInputProps) => {
    return (
      <TextInput
        className="border-b-2 text-[16px] border-gray-300 py-4 mb-4"
        {...children}
      />
    );
  };

  return (
    <View className="flex-1 ">
      <StatusBar barStyle="dark-content" />
      <Formik
        validationSchema={validationSchema}
        initialValues={{ firstName: "", lastName: "" }}
        onSubmit={() => {
          route.push("/legalName/notification");
        }}
      >
        {({
          touched,
          errors,
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
                  <Text className="text-primary text-[32px] font-bold my-4">
                    Your legal name
                  </Text>
                  <Text
                    className="text-[16px] mt-4 mb-6"
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
