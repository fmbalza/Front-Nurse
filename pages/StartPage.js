import * as React from "react";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const StartPage = () => {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={["#FFFFFF", "#D6FFE9"]}
      style={{
        height: "100%",
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <Image
          source={require("../assets/nurse_logo.png")}
          style={{ width: 200, height: 230 }}
        />

        <Text
          style={{
            fontSize: 95,
            textAlign: "center",

            color: "#00826B",
            fontWeight: "500",
          }}
        >
          Nurse
        </Text>
        <Text
          style={{
            fontSize: 15,
            textAlign: "center",
            color: "#00826B",
            fontWeight: "400",
          }}
        >
          Innovando tu bienestar
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("WelcomePage")}
          style={{
            width: "80%",
            marginTop: 80,
            height: "13%",
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#00826B",
            elevation: 5,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 25,
              fontWeight: "300",
            }}
          >
            Comenzar
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default StartPage;
