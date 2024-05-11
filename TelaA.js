import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import  { UsersProvider, UsersContext } from "./UserContextFile";
import { Alert } from "react-native";
import { Button, Icon } from "@rneui/themed";
import { NavigationContainer } from "@react-navigation/native";
import UserList from "./UserList";
import UserForm from "./UserForm";

const Stack = createNativeStackNavigator();

export default (props) => {
    return (
      <UsersProvider>
        {/* <NavigationContainer> */}
          <Stack.Navigator
            initialRouteName="UserList"
            screenOptions={screenOptions}
          >
            <Stack.Screen
              name="UserList"
              component={UserList}
              options={({ navigation }) => {
                useContext(UsersContext);
                const { dispatch } = useContext(UsersContext);
                return {
                  title: "Lista de Usuários",
                  headerRight: () => (
                    <>
                      <Button
                        onPress={() => navigation.navigate("UserForm")}
                        type="clear" // pode ser solid ou outline, nesse caso é sem fundo
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
                        type="clear" // pode ser solid ou outline, nesse caso é sem fundo
                        icon={<Icon name="delete" size={25} color="white" />}
                      />
                    </>
                  ),
                };
              }}
            />
            <Stack.Screen
              name="UserForm"
              component={UserForm}
              options={{
                title: "Formulário de Usuários",
              }}
            />
          </Stack.Navigator>
        {/* </NavigationContainer> */}
      </UsersProvider>
    );
  };
  
  const style = StyleSheet.create({
    texto: {
      fontSize: 50,
    },
    tela: {
      flex: 1, // significa que pode oculpar a tela inteira
      justifyContent: "center", // eixo principal (vertical) conteudo é centralizado
      alignItems: "center",
    },
  });
  
  const screenOptions = {
    headerStyle: {
      backgroundColor: "#333",
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
    },
  };