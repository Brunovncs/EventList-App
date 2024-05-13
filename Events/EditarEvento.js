import React, { useContext, useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "@rneui/themed";
import { TextInput } from "react-native";
import { EventsContext } from "../EventContextFile";

export default ({ route, navigation }) => {
  const [event, setEvent] = useState(route.params ? route.params.event : {});
  const { dispatch } = useContext(EventsContext);

  useEffect(() => {
    // Atualize o evento ao receber novos parâmetros
    if (route.params?.event) {
      setEvent(route.params.event);
    }
  }, [route.params?.event]);

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

      <Button
        title="Salvar"
        onPress={() => {
          dispatch({
            type: event.id ? "updateEvent" : "createEvent",
            payload: event,
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
