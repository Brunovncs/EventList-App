import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { UsersProvider, UsersContext } from "./UserContextFile";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Button, Icon } from "@rneui/themed";
import { Alert } from "react-native";
import UserList from "./UserList";
import UserForm from "./UserForm";

import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from "@react-navigation/native";


const Drawer = createDrawerNavigator();

export default (props) => (
  <UsersProvider>
    <Drawer.Navigator
      initialRouteName="Eventos"
      screenOptions={screenOptions}
    >
      <Drawer.Screen
        name="Eventos"
        component={UserList}
        options={({ navigation }) => {
          const { dispatch } = useContext(UsersContext);
          return {
            title: "Lista de Eventos",
            headerRight: () => (
              <View style={styles.buttonContainer}>
                <Button
                  onPress={() => navigation.navigate("UserForm")}
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
                              type: "deleteAllUsers",
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
        name="UserForm"
        component={UserForm}
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
      {/* Outras telas Drawer aqui */}
    </Drawer.Navigator>
  </UsersProvider>
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
      flexDirection: 'row', // Alinha os botões horizontalmente
      alignItems: 'center', // Centraliza os botões verticalmente
    },
  });