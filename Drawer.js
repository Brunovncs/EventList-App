import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { EventsProvider, EventsContext } from "./EventContextFile";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Button, Icon } from "@rneui/themed";
import { Alert } from "react-native";

import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";

import EventListEdit from "./Events/EventListEdit";
import ConfigEvents from "./Events/ConfigEvents";
import EventList from "./Events/EventList";
import EventForm from "./Events/EventForm";
import EditarEvento from "./Events/EditarEvento";
import ScheduleEvent from "./Events/ScheduleEvent";

import { TabView, TabBar } from "react-native-tab-view";

import { useNavigation } from "@react-navigation/native";
import TabViewExample from "./TabView";

const Drawer = createDrawerNavigator();

export default (props) => (
  <EventsProvider>
    <Drawer.Navigator initialRouteName="Eventos" screenOptions={screenOptions}>
    <Drawer.Screen // Aba de eventos
        name="Eventos"
        component={TabViewExample}
    />
      <Drawer.Screen // Aba de configurações
        name="Configurações"
        component={ConfigEvents}
        options={({ navigation }) => {
          const { dispatch } = useContext(EventsContext);
          return {
            title: "Configurações",
            headerRight: () => (
              <View style={styles.buttonContainer}>
                <Button
                  onPress={() => navigation.navigate("EventForm")}
                  type="clear"
                  icon={<Icon name="add" size={25} color="white" />}
                />
                <Button
                  onPress={() =>
                    Alert.alert(
                      "Excluir todos os Usuários",
                      "Deseja excluir todos os usuarios?",
                      [
                        {
                          text: "Sim",
                          onPress() {
                            dispatch({
                              type: "deleteAllEvents",
                            });
                          },
                        },
                        {
                          text: "Não",
                        },
                      ]
                    )
                  }
                  type="clear"
                  icon={<Icon name="delete" size={25} color="white" />}
                />
              </View>
            ),
          };
        }}
      />
      <Drawer.Screen
        name="EventForm"
        component={EventForm}
        options={{
          title: "Formulário de Usuários",
          drawerItemStyle: { display: "none" },
          headerLeft: () => {
            const navigation = useNavigation(); // Use useNavigation hook here
            return (
              <Button
                onPress={() => navigation.navigate("Eventos")}
                type="clear"
                icon={<Icon name="arrow-left" size={25} color="white" />}
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name="EditarEvento"
        component={EditarEvento}
        options={({ navigation }) => {
          const { dispatch } = useContext(EventsContext);
          return {
            title: "Editar Evento",
            drawerItemStyle: { display: "none" },
            headerLeft: () => {
              const navigation = useNavigation(); // Use useNavigation hook here
              return (
                <Button
                  onPress={() => navigation.navigate("Configurações")}
                  type="clear"
                  icon={<Icon name="arrow-left" size={25} color="white" />}
                />
              );
            },
          };
        }}
      />
        <Drawer.Screen
        name="ScheduleEvent"
        component={ScheduleEvent}
        options={({ navigation }) => {
          const { dispatch } = useContext(EventsContext);
          return {
            title: "Reservar Evento",
            drawerItemStyle: { display: "none" },
            headerLeft: () => {
              const navigation = useNavigation(); // Use useNavigation hook here
              return (
                <Button
                  onPress={() => navigation.navigate("Eventos")}
                  type="clear"
                  icon={<Icon name="arrow-left" size={25} color="white" />}
                />
              );
            },
          };
        }}
      />
      {/* Outras telas Drawer aqui */}
    </Drawer.Navigator>
  </EventsProvider>
);

const screenOptions = {
  headerStyle: {
    backgroundColor: "#333",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row", // Alinha os botões horizontalmente
    alignItems: "center", // Centraliza os botões verticalmente
  },
});
