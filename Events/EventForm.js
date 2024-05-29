import React, { useContext, useState } from "react";
import { Text, TextInput, View, Image } from "react-native";
import { Button } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { EventsContext } from "../EventContextFile"; // Atualize o contexto conforme necessário

export default ({ route, navigation }) => {
  const [event, setEvent] = useState(route.params ? route.params : {});
  const { dispatch } = useContext(EventsContext);

  return (
    <View style={style.form}>
      <Text>Nome</Text>
      <TextInput
        style={style.input}
        onChangeText={(name) => setEvent({ ...event, name })}
        placeholder="Informe o nome"
        value={event.name}
      />

      <Text>Data</Text>
      <TextInput
        style={style.input}
        onChangeText={(data) => setEvent({ ...event, data })}
        placeholder="Informe a data"
        value={event.data}
      />

      <Text>Local</Text>
      <TextInput
        style={style.input}
        onChangeText={(local) => setEvent({ ...event, local })}
        placeholder="Informe o local"
        value={event.local}
      />

      <Text>Ingressos Disponíveis</Text>
      <TextInput
        style={style.input}
        onChangeText={(ingDisp) => setEvent({ ...event, ingDisp })}
        placeholder="Informe o número de ingressos disponíveis"
        value={event.ingDisp}
      />

      <Text>URL da Imagem do Perfil</Text>
      <TextInput
        style={style.input}
        onChangeText={(avatarUrl) => setEvent({ ...event, avatarUrl })}
        placeholder="Informe a URL da imagem do perfil"
        value={event.avatarUrl}
      />
      <View style={style.buttonview}>
      <Button
          buttonStyle={style.savebutton}
          title="Criar evento"
          onPress={() => {
            dispatch({
              type: event.id ? "updateEvent" : "createEvent",
              payload: event,
            });
            navigation.goBack();
          }}
        />
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
  savebutton: {
    height: 40,
    width: 200,
    padding: 0,
    borderRadius: 50,
    backgroundColor: "#e17055",
  },
  buttonview: {
    justifyContent: 'center', // Centraliza os itens verticalmente
    alignItems: 'center', // Centraliza os itens horizontalmente
  }
});