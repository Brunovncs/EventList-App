import React, { useContext } from "react";
import { View, Text, Alert, FlatList, StyleSheet } from "react-native";
import { EventsContext } from "../EventContextFile";
import { ListItem, Avatar, Icon, Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native"; // Import the hook

export default () => { // Arquivo responsável por editar eventos específicos
  const { state, dispatch } = useContext(EventsContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(event) => event.id.toString()}
        data={state.events}
        renderItem={getEventItems}
      ></FlatList>
    </View>
  );

  function confirmEventDeletion(event) {
    Alert.alert("Excluir Usuário", "Deseja excluir o usuario?", [
      {
        text: "Sim",
        onPress() {
          dispatch({
            type: "deleteEvent",
            payload: event,
          });
          console.warn("delete: " + event.id);
        },
      },
      {
        text: "Não",
      },
    ]);
  }

  function getActions(event) {
    return (
      <>
        <Button
          onPress={() => navigation.navigate("EditarEvento", { event })}
          type="clear"
          icon={<Icon name="edit" size={25} color="black" />}
        />
        <Button
          onPress={() => confirmEventDeletion(event)}
          type="clear"
          icon={<Icon name="delete" size={25} color="black" />}
        />
        <Button
          //onPress={()=>confirmEventDeletion(event)}
          type="clear"
          icon={<Icon name={"star-outline"} size={25} color="black" />}
        />
      </>
    );
  }

  function getEventItems({ item: event }) {
    return (
      // <ListItem onPress={()=>props.navigation.navigate('EventForm', event)} bottomDivider>
      <ListItem bottomDivider containerStyle={styles.item}>
        <Avatar rounded source={{ uri: event.avatarUrl }} size={70}/>
        <ListItem.Content>
          <ListItem.Title>{event.name}</ListItem.Title>
          <ListItem.Subtitle>{"Data: " + event.data}</ListItem.Subtitle>
          <ListItem.Subtitle>{"Local: " + event.local}</ListItem.Subtitle>
          <ListItem.Subtitle>
            {"Ingressos Disponíveis: " + event.ingDisp}
          </ListItem.Subtitle>
        </ListItem.Content>
        {getActions(event)}
      </ListItem>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b2bec3", // Altere para a cor de fundo desejada
  },
  item: {
    backgroundColor: "#b2bec3", // cor de fundo padrão
  },
});