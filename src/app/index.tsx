import Calculator from "../../Components/Calculator";
import { Stack } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <>
    <Stack.Screen options={{title: 'Calculator'}}/>
    <Calculator/>
    </>
  );
}
