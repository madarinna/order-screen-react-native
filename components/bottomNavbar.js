import * as React from "react";
import {
    Provider as PaperProvider,
    BottomNavigation,
} from "react-native-paper";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import OrderScreenComponent from "./OrderScreenComponent";

const HomeRoute = () => {
    return <OrderScreenComponent />;
};

const SendRoute = () => {
    return <OrderScreenComponent />;
};

const ShippingRoute = () => {
    return <OrderScreenComponent />;
};

const OrdersRoute = () => {
    return <OrderScreenComponent />;
};

const AccountRoute = () => {
    return <OrderScreenComponent />;
};

const TrackRoute = () => {
    return <OrderScreenComponent />;
};

const BottomNavbar = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: "home", icon: "home-outline" },
        { key: "send", icon: "email-send-outline" },
        { key: "shipping", icon: "truck-fast-outline" },
        { key: "orders", icon: "printer" },
        { key: "account", icon: "account-outline" },
        { key: "track", icon: "speedometer-slow" },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        home: HomeRoute,
        send: SendRoute,
        shipping: ShippingRoute,
        orders: OrdersRoute,
        account: AccountRoute,
        track: TrackRoute,
    });

    return (
        <>
            <PaperProvider
                settings={{
                    icon: (props) => (
                        <MaterialIcon
                            {...props}
                            style={{
                                // size: 40,
                                fontSize: 40,
                                width: 40,
                                height: 40,
                            }}
                        />
                    ),
                }}
            >
                <BottomNavigation
                    barStyle={{
                        width: "100%",
                        height: "8%",
                        backgroundColor: "black",
                        borderLeftWidth: 20,
                        borderRightWidth: 20,
                    }}
                    style={{
                        padding: 0,
                        margin: 0,
                        display: "flex",
                        justifyContent: "space-between",
                        // flexWrap: "wrap",
                        flexDirection: "column",
                        alignItems: "stretch",
                        alignContent: "space-between",
                        padding: 0,
                        margin: 0,
                    }}
                    navigationState={{ index, routes }}
                    onIndexChange={setIndex}
                    renderScene={renderScene}
                />
            </PaperProvider>
        </>
    );
};

export default BottomNavbar;
