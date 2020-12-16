import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal,
    Alert,
    FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useDeviceOrientation } from "@react-native-community/hooks";
import { Card } from "react-native-elements";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

const ProductList = (props) => {
    //  Get Product Data
    const allProduct = Object.entries(props.productDataRaw).map(
        ([name, value], index) => {
            return {
                id: value.id.toString(),
                name,
                description: value.description,
                index: index,
            };
        }
    );

    const updateTempAddProduct = (name) => {
        let copyTempAddProduct = [...props.tempAddProduct];
        if (!copyTempAddProduct.includes(name)) {
            copyTempAddProduct.push(name);
        } else if (copyTempAddProduct.includes(name)) {
            copyTempAddProduct = copyTempAddProduct.filter((obj) => {
                return obj !== name;
            });
        }

        props.setTempAddProduct(copyTempAddProduct);
    };

    // for selecting the product, customer can select multiple
    return (
        <View style={styles.listContainer}>
            <Text
                style={{
                    fontWeight: "700",
                    fontSize: 25,
                    textAlign: "center",
                    marginTop: 20,
                    borderBottomColor: "#CCC",
                    borderBottomWidth: 1,
                    paddingBottom: 15,
                }}
            >
                Select Items
			</Text>

            <FlatList
                data={allProduct}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            updateTempAddProduct(item.name);
                        }}
                        testID={item.id}
                    >
                        <Card
                            containerStyle={
                                props.tempAddProduct.includes(item.name)
                                    ? { opacity: 0.5 }
                                    : null
                            }
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: "700",
                                }}
                            >
                                {item.name}
                            </Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                }}
                            >
                                <Text>ID: {item.id}</Text>
                            </View>

                            <Text style={{ fontSize: 20, fontWeight: "700" }}>
                                Description: {item.description}
                            </Text>
                        </Card>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const CircleButtonPlus = (props) => (
    <TouchableOpacity
        onPress={props.function}
        style={{
            backgroundColor: props.color,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
            top: 120,
            margin: 70,
            padding: 15,
            height: 75,
            width: 75,
        }}
        testID="plusButton"
    >
        <Feather name={props.icon} size={30} />
    </TouchableOpacity>
);

const CircleButtonCross = (props) => (
    <TouchableOpacity
        onPress={() => clearAllSelection(props.productData, props.setProductData)}
        style={{
            backgroundColor: props.color,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
            top: 120,
            margin: 70,
            padding: 15,
            height: 75,
            width: 75,
        }}
        testID="crossButton"
    >
        <Feather name={props.icon} size={30} />
    </TouchableOpacity>
);

const OvalButton = (props) => (
    <TouchableOpacity
        disabled={props.dis}
        onPress={props.function}
        style={{
            borderRadius: props.borderRadius,
            padding: props.padding,
            height: props.height,
            width: props.width,
            marginBottom: props.marginBottom,
            top: 120,
            margin: 10,
            backgroundColor: "#ffff00",
            alignItems: "center",
            justifyContent: "center",
        }}
        testID={props.testID}
    >
        <Text
            style={{ color: "black", fontSize: props.fontSize, fontWeight: "bold" }}
        >
            {props.text}
        </Text>
    </TouchableOpacity>
);

const clearAllSelection = (productData, setProductData) => {
    let tempProductData = JSON.parse(JSON.stringify(productData));

    tempProductData = tempProductData.filter((obj) => {
        return obj.toDelete == false;
    });

    setProductData(tempProductData);
};

const addAllSelection = (
    addProduct,
    setAddProduct,
    tempAddProduct,
    setModalVisible
) => {
    addProduct = [];

    tempAddProduct.forEach((product) => {
        addProduct.push(product);
    });

    setAddProduct(addProduct);

    tempAddProduct.length = 0;

    setModalVisible(false);

    return addProduct, tempAddProduct;
};

const Button = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [tempAddProduct, setTempAddProduct] = useState([]);

    const { landscape } = useDeviceOrientation();

    return (
        <>
            <View style={styles.container}>
                <CircleButtonPlus
                    color="#ffff00"
                    icon="plus"
                    top={landscape ? "20%" : "40%"}
                    function={() => {
                        console.log("Hello", props.customerName);
                        if (!props.customerName) {
                            Alert.alert("Please Select Customer First!");
                            return;
                        }
                        setModalVisible(true);
                    }}
                />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(false);
                    }}
                >
                    {/* this will be the place for adding items */}
                    <View style={styles.overlay}></View>

                    {/* Modal Box  */}
                    <TouchableOpacity
                        style={{
                            position: "absolute",
                            top: "12%",
                            right: "10%",
                            width: 60,
                            height: 60,
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 10,
                        }}
                        onPress={() => setModalVisible(false)}
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
                        }}
                    >
                        <ProductList
                            productDataRaw={props.productDataRaw}
                            productData={props.productData}
                            tempAddProduct={tempAddProduct}
                            setTempAddProduct={setTempAddProduct}
                        />
                        <OvalButton
                            text="Add"
                            fontSize={20}
                            height={50}
                            width={150}
                            borderRadius={20}
                            padding={5}
                            marginBottom={250}
                            function={() => {
                                addAllSelection(
                                    props.addProduct,
                                    props.setAddProduct,
                                    tempAddProduct,
                                    setModalVisible
                                );
                            }}
                        />
                    </View>
                </Modal>
                <OvalButton
                    text="Confirm"
                    fontSize={30}
                    height={75}
                    width={300}
                    borderRadius={50}
                    padding={10}
                    top={landscape ? "20%" : "40%"}
                    function={() => {
                        if (!props.customerName || props.productData.length === 0) {
                            Alert.alert("Please Input Product Data First!");
                            return;
                        }
                        props.setProductData([]);
                        props.setAddProduct([]);
                        console.log("confirmed products: ");
                        console.log(props.productData);
                    }}
                    testID="confirmButton"
                />
                <CircleButtonCross
                    color="#d3d3d3"
                    icon="x"
                    top={landscape ? "20%" : "40%"}
                    productData={props.productData}
                    setProductData={props.setProductData}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "row",
    },
    overlay: {
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: "#000",
        opacity: 0.8,
    },
    listContainer: {
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
    buttonClicked: {
        opacity: 0.2,
    },
    buttonNotClicked: {
        opacity: 1,
    },
});

export default Button;
