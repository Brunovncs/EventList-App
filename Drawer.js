import React from "react"
import TelaA from "./TelaA"
import TelaB from "./TelaB"
import TelaC from "./TelaC"
import {createDrawerNavigator} from "@react-navigation/drawer";
import Tab from "./Tab";

const Drawer = createDrawerNavigator()

export default props => (
    <Drawer.Navigator initialRouteName="TelaA">
        <Drawer.Screen name="Eventos" component={TelaA}/>
        <Drawer.Screen name="TelaB" component={TelaB}/>
        <Drawer.Screen name="Configurações" component={TelaC}/>
    </Drawer.Navigator>
)