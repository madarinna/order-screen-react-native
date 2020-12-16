import React from 'react';
// import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react-native";
import { TopNavbar } from "../components/TopNavbar";


describe(TopNavbar, () => {

    test("check customer name renders", () => {
        const { getByText } = render(<TopNavbar
            productData={[]}
            customerName="ina"
        />);
        expect(getByText("ina")).toBeTruthy();
    });

    test("check total price", () => {
        const { getByText } = render(<TopNavbar
            productData={[
                {
                    id: "XL285",
                    name: "drill",
                    status: "unassigned",
                    description: "1/2 drill",
                    discountPercent: 0,
                    minQuantity: 1,
                    toDelete: false,
                    currentQuantity: 1,
                    amount: 100.00,
                },
                {
                    id: "XL284",
                    name: "drill",
                    status: "unassigned",
                    description: "1/2 drill 2",
                    discountPercent: 0,
                    minQuantity: 1,
                    toDelete: false,
                    currentQuantity: 1,
                    amount: 50.00,
                }
            ]}
            customerName="ina"
        />);
        expect(getByText("150")).toBeTruthy();
    });

    test("check customer list modals", () => {
        const { getByTestId, getByText } = render(<TopNavbar
            productData={[]}
            customerName="ina"
        />);
        fireEvent.press(getByTestId('customerButton'));

        expect(getByText("bob")).toBeTruthy();
    });
});
