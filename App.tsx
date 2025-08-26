import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import { RootStackParamList } from "./types/navigation";
import { AuthProvider } from "./src/presentation/contexts/AuthContext";
import LoginScreen from "./src/presentation/screens/LoginScreen";
import SignupScreen from "./src/presentation/screens/SignupScreen";
import HomeScreen from "./src/presentation/screens/HomeScreen";


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
