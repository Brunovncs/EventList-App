import React, { useContext, useState } from "react";
import {
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import { Button } from "@rneui/themed";
import { EventsContext } from "../EventContextFile"; // Atualize o contexto conforme necessário

export default ({ route, navigation }) => {
  const [event, setEvent] = useState(route.params ? route.params : {});
  const { dispatch } = useContext(EventsContext);
  const [isFiltered, setIsFiltered] = useState(false);

  const filterEvents = () => {
    dispatch({ type: "filterEventsByName", payload: { name: event.name } });
    console.log(event.name);
    if (event.name != "") {
      setIsFiltered(true);
      setEvent({ ...event, name: "" });
      navigation.goBack();
    }
  };

  const clearFilter = () => {
    dispatch({ type: "clearFilter" }); // Nova ação para limpar o filtro
    setIsFiltered(false);
    setEvent({ ...event, name: "" });
  };

  return (
    <View style={style.form}>
      <Text>Nome do Evento</Text>
      <TextInput
        style={style.input}
        onChangeText={(name) => setEvent({ ...event, name })}
        placeholder="Informe o nome do evento"
        value={event.name}
      />
      <View style={style.buttonContainer}>
        <Button
          buttonStyle={style.savebutton}
          title="Filtrar"
          onPress={filterEvents}
        />
        {isFiltered && (
          <Button
            buttonStyle={style.savebutton}
            title="Limpar Filtro"
            onPress={clearFilter}
          />
        )}
      </View>
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
  buttonContainer: {
    justifyContent: "center", // Centraliza os itens verticalmente
    alignItems: "center", // Centraliza os itens horizontalmente
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between", // Alinha os botões horizontalmente com espaço entre eles
    marginTop: 20,
  },
  savebutton: {
    height: 40,
    width: 150,
    padding: 0,
    borderRadius: 50,
    backgroundColor: "#e17055",
  },
});
