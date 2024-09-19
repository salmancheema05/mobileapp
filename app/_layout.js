import React from "react";
import { Stack } from "expo-router";
import { Provider } from "../Contextapi/Provider";
import { SafeAreaProvider } from "react-native-safe-area-context";
const _layout = () => {
  return (
    <SafeAreaProvider>
      <Provider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="home" />
          <Stack.Screen name="chating" />
          <Stack.Screen name="profile" />
          <Stack.Screen name="search" />
          <Stack.Screen name="signup" />
          <Stack.Screen name="login" />
        </Stack>
      </Provider>
    </SafeAreaProvider>
  );
};

export default _layout;
