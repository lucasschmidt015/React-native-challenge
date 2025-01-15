import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";


type GradientHeaderProps = {
  title: string;
};

function GradientHeader({ title }: GradientHeaderProps) {
  return (
    <LinearGradient
      colors={["#9B87F5", "#7E69AB"]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.headerContainer}
    >
      <Text style={styles.headerText}>{title}</Text>
    </LinearGradient>
  );
}

export default function RootLayout() {
  return <Stack screenOptions={{ 
    header: () => <GradientHeader title="My Tasks"/>
  }} />;
}



const styles = StyleSheet.create({
  headerContainer: {
    height: 80, // Adjust height as per your needs
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
})