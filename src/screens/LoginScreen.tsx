import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
} from "react-native";
import { auth } from "../db/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
console.disableYellowBox = true;

const LoginScreen = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const handlerLogin = async () => {
    const value = await AsyncStorage.getItem("@storage_Key");
    auth;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: { user: any }) => {
        const user = userCredential.user;
        console.log("Logged in with", user.email);
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/user-not-found":
            alert("User not found !");
            break;

          case "auth/wrong-password":
            alert("Wrong password !");
            break;

          case "auth/invalid-email":
            alert("Invalid email !");
            break;
        }
      });
  };

  const handlerSingUp = async () => {
    navigation.replace("Register");
  };

  const handlerBack = async () => {
    navigation.replace("Select");
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.header}>Welcome Back!</Text>

          <Text style={styles.subtitle}>       Please sign in to your account</Text>

          <TextInput
            placeholder="Email"
            placeholderTextColor={"#ffffde"}
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor={"#ffffde"}
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />

          <TouchableOpacity onPress={handlerLogin} style={styles.button}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          <View>
            <View>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 0 }}>
                  <Text
                    style={{ justifyContent: "flex-start", color: "white" }}
                  >
                    Don't have an Account?
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity onPress={handlerSingUp}>
                    <Text
                      style={{
                        fontWeight: "900",
                        color: "#0066CC",
                        justifyContent: "flex-end",
                      }}
                    >
                      {" "}
                      Sign up
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: "80%",
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    color: "white",
    backgroundColor: "#0066CC",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    height: 50,
    marginBottom: 36,
  },
  input: {
    color: "white",
    backgroundColor: "#262b35",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    height: 50,
    marginBottom: 10,
  },
  buttonText: {
    color: "#f6f8fe",
    fontWeight: "700",
    fontSize: 16,
    position: "relative",
    top: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "white",
    top: -50,
  },
  subtitle: {
    color: "#ffffde",
    fontSize: 15,
    fontWeight: "100",
    alignItems: "center",
    marginBottom: 80,
  },
  inner: {
    padding: 30,

    justifyContent: "space-around",
  },
  header: {
    color: "white",
    fontSize: 36,
  },
  textInput: {},
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
  },
});
