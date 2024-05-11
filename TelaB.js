import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default (props) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Aqui é a Tela B!</Text>
      <Button
        title="Ir para Tela C"
        onPress={() => props.navigation.navigate("TelaC")}
      />
    </View>
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