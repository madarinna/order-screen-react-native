import React from 'react';
// import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react-native";
import Button from "../components/button";
import { getProductData } from '../data/getData';
import { Alert } from 'react-native';
import { jest } from '@jest/globals';

jest.spyOn(Alert, 'alert');


describe(Button, () => {

    test("renders all buttons", () => {
        const { getByTestId } = render(<Button
            addProduct={[]}
            productDataRaw={[]}
            productData={[]}
            customerName="ina"
        />);
        expect(getByTestId("confirmButton")).toBeTruthy();
        expect(getByTestId("crossButton")).toBeTruthy();
        expect(getByTestId("plusButton")).toBeTruthy();
    });

    test("check alert if no customerName", () => {
        const setTempAddProduct = (tempAddProduct) => {
            console.log(tempAddProduct);
        }

        const { getByTestId, getByText } = render(<Button
            addProduct={[]}
            productDataRaw={getProductData()}
            productData={[]}
            addProduct={[]}
            customerName="ina"
        />);
        fireEvent.press(getByTestId("plusButton"));

        expect(getByText("screw")).toBeTruthy();
    });

    test("check alert if no customer selected", () => {
        const { getByTestId, getByText } = render(<Button
            addProduct={[]}
            productDataRaw={[]}
            productData={[]}
            addProduct={[]}
            customerName=""
        />);

        jest.spyOn(Alert, 'alert');
        fireEvent.press(getByTestId("plusButton"));

        expect(Alert.alert).toHaveBeenCalledWith("Please Select Customer First!")
    });

    test("check alert if no productData in table", () => {
        const { getByTestId, getByText } = render(<Button
            addProduct={[]}
            productDataRaw={[]}
            productData={[]}
            addProduct={[]}
            setAddProduct={console.log}
            customerName=""
        />);

        jest.spyOn(Alert, 'alert');
        fireEvent.press(getByTestId("confirmButton"));

        expect(Alert.alert).toHaveBeenCalledWith("Please Input Product Data First!")
    });
});
