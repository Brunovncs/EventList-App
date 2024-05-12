import React from "react";
import { StyleSheet } from "react-native";
import UserList from "./UserList";

export default (props) => {
  return (
    <UserList />
  );
};

const style = StyleSheet.create({
  texto: {
    fontSize: 50,
  },
  tela: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
