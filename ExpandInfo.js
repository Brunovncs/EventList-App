import React, { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "@rneui/themed";
import { EventsContext } from "./EventContextFile";

export default ({ route, navigation }) => {
  const { event, nome, quantidade } = route.params; // Obtendo os parâmetros da rota
  const { name, data, local, ingDisp } = event; // Desestruturando as informações do evento

  const handleReservation = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.info}>Data: {data}</Text>
      <Text style={styles.info}>Local: {local}</Text>
      <Text style={styles.info}>Ingressos Disponíveis: {ingDisp}</Text>
      <View style={styles.buttonContainer}>
        <Button
          buttonStyle={styles.button}
          title="Voltar"
          onPress={handleReservation}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#b2bec3",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  button: {
    height: 40,
    width: 200,
    borderRadius: 50,
    backgroundColor: "#e17055",
  },
});
