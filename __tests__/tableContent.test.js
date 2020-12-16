import React from 'react';
import { render } from "@testing-library/react-native";
import TableContent from "../components/TableContent";


describe(TableContent, () => {

    test("renders label", () => {
        const { getByText } = render(<TableContent productData={[
            {
                id: "XL285",
                status: "unassigned",
                description: "1/2 drill",
                discountPercent: 20,
                minQuantity: 1,
                toDelete: false,
                currentQuantity: "",
                amount: 100.00,
            }
        ]} />);
        expect(getByText("1/2 drill")).toBeTruthy();
    });
});
