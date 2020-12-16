import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Alert,
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";

const Product = (props) => {
    const productButtonStyle = (color) => {
        return {
            backgroundColor: color,
            borderRadius: 5,
            padding: 5,
            paddingTop: 0,
            paddingHorizontal: 10,
            margin: 10,
            marginHorizontal: 5
        };
    };

    const getButtonOpacity = (toDelete) => {
        if (toDelete) {
            return {
                opacity: 0.5,
            };
        } else {
            return {
                opacity: 1,
            };
        }
    };


    const textTitleStyle = (color) => {
        return {
            fontWeight: "bold",
            color: color,
            fontSize: 18,
        };
    };

    const textSmallStyle = (color) => {
        return {
            color: color,
            fontSize: 14,
            fontStyle: "italic",
        };
    };

    return (
        <TouchableOpacity
            title={props.title}
            style={{
                ...productButtonStyle(props.bgcolor),
            }}
            onPress={() => {
                props.setProductInfo(
                    {
                        ...props.product,
                        toDelete: !props.product.toDelete,
                    },
                    props.index
                );

                props.product.toDelete = !props.product.toDelete;
            }}
        >
            <View
                style={{
                    ...getButtonOpacity(props.product.toDelete),
                }}
            >
                <Text style={textTitleStyle(props.titleColor)}>{props.title}</Text>
                <Text style={textSmallStyle(props.smallColor)}>{props.small}</Text>
            </View>
        </TouchableOpacity>
    );
};

const Description = (props) => {
    return <Text style={styles.desc}>{props.desc}</Text>;
};

const Total = (props) => {
    return <Text style={styles.total}>{props.total}</Text>;
};

const TableContent = (props) => {
    const updateQtyById = (id, qty) => {
        let copyData = [...props.productData];
        // index for the chosen product
        const idx = copyData.findIndex((product) => product.id === id);
        let minQuantity = [copyData[idx].minQuantity];
        // Prevent NaN values on total ann validation for min quantity
        if (!qty || qty < 0) {
            Alert.alert("Quantity cannot be less than 0");
            qty = "";
        } else if (qty < minQuantity) {
            Alert.alert("Invalid Quantity! Min Quantity: " + minQuantity);
            qty = "";
        }

        copyData[idx].currentQuantity = qty;
        props.setProductData(copyData);
    };

    const updatePriceById = (id, price) => {
        // Prevent NaN values on total price
        if (!price || price < 0) {
            price = "";
        }
        let copyData = [...props.productData];
        const idx = copyData.findIndex((product) => product.id === id);
        copyData[idx].amount = price;
        props.setProductData(copyData);
    };

    const updateDiscountById = (id, discount) => {
        // Prevent out of range discount
        if (!discount || discount < 0 || discount > 100) {
            discount = "";
        }
        let copyData = [...props.productData];
        const idx = copyData.findIndex((product) => product.id === id);
        copyData[idx].discountPercent = discount;
        props.setProductData(copyData);
    };

    return (
        <Grid style={styles.gridWidth}>
            <View style={{ flex: 1, flexDirection: "column" }}>
                <View style={{ flex: 0.5 }}>
                    <Row>
                        <Col size={2}>
                            <TouchableOpacity style={styles.headButton}>
                                <Text>Product#</Text>
                            </TouchableOpacity>
                        </Col>
                        <Col size={3}>
                            <TouchableOpacity style={styles.headButton}>
                                <Text>Description</Text>
                            </TouchableOpacity>
                        </Col>
                        <Col size={2}>
                            <TouchableOpacity style={styles.headButton}>
                                <Text>Qty</Text>
                            </TouchableOpacity>
                        </Col>
                        <Col size={2}>
                            <TouchableOpacity style={styles.headButton}>
                                <Text>$</Text>
                            </TouchableOpacity>
                        </Col>
                        <Col size={2}>
                            <TouchableOpacity style={styles.headButton}>
                                <Text>-%</Text>
                            </TouchableOpacity>
                        </Col>
                        <Col size={2}>
                            <TouchableOpacity style={styles.headButton}>
                                <Text>Total</Text>
                            </TouchableOpacity>
                        </Col>
                    </Row>
                    {/* <View style={{flex: 0.5}}> */}
                    {props.productData.map((item, index) => {
                        return item ? (
                            <Row style={styles.row} key={item.id}>
                                <Col size={2}>
                                    <Product
                                        bgcolor="black"
                                        titleColor="#ffffff"
                                        smallColor="#ffffff"
                                        title={item.name}
                                        small={item.status}
                                        product={item}
                                        index={index}
                                        setProductInfo={(item, index) => {
                                            const tempProductData = JSON.parse(
                                                JSON.stringify(props.productData)
                                            );
                                            // console.log(item);
                                            // console.log(index);
                                            tempProductData[index] = item;
                                            // productData = tempProductData;
                                            props.setProductData(tempProductData);
                                        }}
                                    />
                                </Col>
                                <Col size={3}>
                                    <Description desc={item.description} />
                                </Col>
                                <Col size={2}>
                                    <View
                                        style={qtyStyle(item.currentQuantity ? "#fff466" : "#fff")}
                                    >
                                        <TextInput
                                            style={qtyText("#000000")}
                                            defaultValue={`${item.currentQuantity}`}
                                            keyboardType="numeric"
                                            onEndEditing={(e) =>
                                                updateQtyById(item.id, e.nativeEvent.text)
                                            }
                                            placeholder="Qty"
                                        />
                                    </View>
                                </Col>

                                <Col size={2}>
                                    {item.currentQuantity ? (
                                        <View style={styles.price}>
                                            <TextInput
                                                style={styles.priceText}
                                                defaultValue={`${item.amount}`}
                                                keyboardType="numeric"
                                                onEndEditing={(e) =>
                                                    updatePriceById(item.id, e.nativeEvent.text)
                                                }
                                                placeholder="Price"
                                            />
                                        </View>
                                    ) : null}
                                </Col>
                                <Col size={2}>
                                    {item.currentQuantity ? (
                                        <View style={styles.discount}>
                                            <TextInput
                                                style={styles.discountText}
                                                defaultValue={`${item.discountPercent}`}
                                                keyboardType="numeric"
                                                onEndEditing={(e) =>
                                                    updateDiscountById(item.id, e.nativeEvent.text)
                                                }
                                                placeholder="Discount"
                                            />
                                        </View>
                                    ) : null}
                                </Col>

                                <Col size={2}>
                                    {item.currentQuantity && item.amount ? (
                                        <Total
                                            total={
                                                item.currentQuantity *
                                                item.amount *
                                                ((100 - item.discountPercent) / 100)
                                            }
                                        />
                                    ) : null}
                                </Col>
                            </Row>
                        ) : null;
                    })}
                </View>
            </View>
        </Grid>
    );
};

const styles = StyleSheet.create({
    row: {
        top: 55,
        flexWrap: "nowrap",
        minHeight: 55
    },
    gridWidth: {
        flex: 2,
        justifyContent: "space-between",
        top: -20,
    },
    headButton: {
        marginHorizontal: 5,
        padding: 10,
        backgroundColor: "#e6e7e8",
        alignItems: "center",
        borderRadius: 5,
        fontSize: 18,
        fontWeight: "bold",
        height: 40,
    },
    desc: {
        paddingTop: 20,
        paddingHorizontal: 5,
        fontSize: 17,
        textAlignVertical: "auto"
    },
    price: {
        borderColor: "#000000",
        borderWidth: 1,
        padding: 8,
        margin: 10,
        borderRadius: 7,
        marginHorizontal: 20,
        alignItems: "center",
    },
    priceText: {
        // fontWeight: "bold",
        fontSize: 18,
    },
    discount: {
        borderColor: "#000000",
        borderWidth: 1,
        padding: 8,
        margin: 10,
        borderRadius: 7,
        marginHorizontal: 20,
        alignItems: "center",
    },
    discountText: {
        // fontWeight: "bold",
        fontSize: 18,
    },
    total: {
        paddingTop: 20,
        paddingHorizontal: 20,
        fontSize: 18,
        textAlign: "center"
    },
});

const qtyStyle = (color) => {
    return {
        alignItems: "center",
        padding: 8,
        backgroundColor: color,
        borderColor: "#000000",
        borderRadius: 4,
        borderWidth: 1,
        margin: 10,
        marginHorizontal: 15,
    };
};

const qtyText = (color) => {
    return {
        fontWeight: "600",
        fontSize: 18,
        color: color,
    };
};

export default TableContent;