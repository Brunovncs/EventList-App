import React, { useContext, useState } from "react";
import { Text } from "@rneui/base";
import { Button } from "@rneui/themed";
import { TextInput, View } from "react-native";
import { StyleSheet } from "react-native";
import { UsersContext } from "./UserContextFile";

export default ({ route, navigation }) => {
  const [user, setUser] = useState(route.params ? route.params : {});
  const { dispatch } = useContext(UsersContext);

  return (
    <View style={style.form}>
      <Text>Nome</Text>
      <TextInput
        style={style.input}
        onChangeText={(name) => setUser({ ...user, name })}
        placeholder="Informe o nome"
        value={user.name}
      />

      <Button
        title="Salvar"
        onPress={() => {
          dispatch({
            type: user.id ? "updateUser" : "createUser",
            payload: user,
          });
          navigation.goBack();
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
  },

  form: {
    padding: 15,
  },
});