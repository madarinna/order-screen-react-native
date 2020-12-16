import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";

import TableContent from "./TableContent";
import { TopNavbar } from "./TopNavbar";
import { getProductData } from "../data/getData";
import Buttons from "./button";

export default function OrderScreenComponent() {
    const productDataRaw = getProductData();
    const [productData, setProductData] = useState([]);
    const [addProduct, setAddProduct] = useState([]);
    const [customerName, setCustomerName] = useState("");

    const isNameInProductData = (name) => {
        return productData.findIndex(product => product.name === name);
    }


    useEffect(() => {
        const prevProductData = [...productData];
        const newProductNames = addProduct.filter(productName => isNameInProductData(productName) === -1);
        const newProductData = Object.entries(productDataRaw).filter(([key, value]) => {
            return newProductNames.includes(key)
        }).map(([name, value]) => {
            return {
                id: value.id.toString(),
                name,
                status: value.status,
                description: value.description,
                discountPercent: value.discountPercent,
                minQuantity: value.minQuantity,
                toDelete: false,
                currentQuantity: "",
                amount: 100.00,
            };
        })

        setProductData(
            [...prevProductData, ...newProductData]
        );
    }, [addProduct]);

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <TopNavbar
                productData={productData}
                customerName={customerName}
                setCustomerName={setCustomerName}
            />
            <TableContent
                productData={productData}
                setProductData={setProductData}
            />
            <Buttons
                addProduct={addProduct}
                setAddProduct={setAddProduct}
                productDataRaw={productDataRaw}
                productData={productData}
                setProductData={setProductData}
                customerName={customerName}
            />
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
