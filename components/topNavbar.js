import React, { useState } from "react";
import {
    StyleSheet,
    Modal,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Alert,
} from "react-native";
import { Card } from "react-native-elements";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

import { getCustomerData } from "../data/getData";

const CustomerList = ({ updateCustomer }) => {
    // Get Customer data
    const customerDataRaw = getCustomerData();
    const customerData = Object.entries(customerDataRaw).map(([name, value]) => {
        return {
            id: value.id.toString(),
            name,
            PO: value.PO,
            address: value.address,
        };
    });

    // On Customer Press
    const pressHandler = (customerName) => {
        updateCustomer(customerName);
    };
    return (
        <View style={listStyles.container}>
            <Text
                style={{
                    fontWeight: "700",
                    fontSize: 25,
                    textAlign: "center",
                    marginTop: 10,
                    borderBottomColor: "#CCC",
                    borderBottomWidth: 1,
                    paddingBottom: 15,
                }}
            >
                Select Customer
            </Text>
            <FlatList
                data={customerData}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={listStyles.itemContainer}
                        onPress={() => pressHandler(item.name)}

                    >
                        <Card>
                            <Text style={{ fontSize: 20, fontWeight: "700" }}>
                                {item.name}
                            </Text>
                            <View style={{ flexDirection: "row" }}>
                                <Text>ID: {item.id}</Text>
                                <Text style={{ marginLeft: 15 }}>PO: {item.PO}</Text>
                            </View>

                            <Text>Address: {item.address}</Text>
                        </Card>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

export const ModalContent = ({ content, onClose }) => {
    const closeHandler = () => {
        onClose(false);
    };
    return (
        <>
            {/* Fade Background Overlay  */}
            <View style={modalStyles.overlay}></View>

            {/* Modal Box  */}
            <TouchableOpacity
                style={{
                    position: "absolute",
                    top: "15%",
                    right: "10%",
                    width: 60,
                    height: 60,
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 10,
                }}
                onPress={() => onClose(false)}
                testID="customerButton"
            >
                <MaterialIcon
                    name="close-thick"
                    style={{
                        // size: 40,
                        color: "#ccc",
                        fontSize: 20,
                        width: 20,
                        height: 20,
                    }}
                />
            </TouchableOpacity>
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1,
                }}
            >
                {content}
            </View>
        </>
    );
};

export const TopNavbar = (props) => {
    const [showModal, setShowModal] = useState(false);
    // const [customerID, setCustomerID] = useState("Select Customer");

    const updateCustomer = (customerName) => {
        props.setCustomerName(customerName);
        setShowModal(false);
    };

    const getTotalPrice = () => {
        return props.productData.reduce((accumulator, product) => {
            return (
                accumulator +
                product.currentQuantity *
                product.amount *
                ((100 - product.discountPercent) / 100)
            );
        }, 0);
    };

    // console.log(getTotalPrice())

	return (
		<View style={styles.topNavbarContainer}>
			<TouchableOpacity
				style={styles.leftButton}
				onPress={() => setShowModal(true)}
			>
				<Text
					style={{
						fontWeight: "700",
						textAlign: "center",
						fontSize: 16
					}}
				>
					{props.customerName ? props.customerName : "Select Customer"}
				</Text>
			</TouchableOpacity>
            <View style={styles.middleInfo}>
                <Text
                    style={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: 20
                    }}
                >
                    Open 14404
                </Text>
            </View>

            <View>
                <Text
                    style={{
                        color: "#fffa43",
                        fontWeight: "700",
                        fontSize: 20
                    }}
                >
                    {getTotalPrice()}
                </Text>
            </View>

            {/* Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => {
                    setShowModal(false);
                }}
            >
                <ModalContent
                    content={<CustomerList updateCustomer={updateCustomer} />}
                    onClose={setShowModal}
                />
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    topNavbarContainer: {
        alignSelf: "stretch",
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        padding: 10,
        height: "8%",
        marginVertical: 40,
    },
    leftButton: {
        backgroundColor: "#fffa43",
        borderRadius: 30,
        paddingVertical: 5,
        paddingHorizontal: 10,
        width: 150,
        height: 40,
        justifyContent: "center"
    },
    middleInfo: {
        borderColor: "white",
        borderWidth: 2,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 50,
        position: "absolute",
        marginLeft: 320
    },
});

const modalStyles = StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: "#000",
        opacity: 0.8,
    },
});

const listStyles = StyleSheet.create({
    container: {
        position: "relative",
        zIndex: 1,
        flex: 0.7,
        display: "flex",
        width: "80%",
        // paddingVertical: 15,
        backgroundColor: "white",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});
