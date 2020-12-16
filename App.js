import React from "react";
import { StyleSheet, View } from "react-native";
import BottomNavbar from "./components/bottomNavbar";

export default function App() {
	return (
		<View style={styles.container}>
			<BottomNavbar />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "center",
	},
});
