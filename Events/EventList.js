import React, { useContext, useState } from "react";
import { View, Text, Alert, FlatList, StyleSheet } from "react-native";
import { EventsContext } from "../EventContextFile";
import { ListItem, Avatar, Button } from "@rneui/themed";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

export default (props) => {
  const navigation = useNavigation();
  const { state, dispatch } = useContext(EventsContext);

  const handleReservation = (event, nome, quantidade) => {
    // Adicione 'nome' e 'quantidade' como parâmetros
    console.log(nome);
    // dispatch({ type: "markEventAsChecked", payload: { event, nome, quantidade } }); // Passa 'nome' e 'quantidade' como parte do payload
    navigation.navigate("ScheduleEvent", { event, nome, quantidade }); // Navega para a tela de agendamento de evento
  };

  return (
    <View>
      <FlatList
        keyExtractor={(event) => event.id.toString()}
        data={state.events}
        renderItem={({ item: event }) => (
          <EventItem
            event={event}
            dispatch={dispatch}
            handleReservation={handleReservation}
          />
        )}
      />
    </View>
  );
};

const EventItem = ({ event, dispatch, handleReservation }) => {
  // console.log("Event:", event);
  // console.log("Ingressos Disponíveis:", event.ingDisp);

  if (!event) {
    console.log("Event não está definido");
    return null; // Retorna null ou algum componente de fallback se event não estiver definido
  }

  const [isChecked, setIsChecked] = useState(event.isChecked || false);
  const [isFav, setIsFav] = useState(event.isFav || false);

  const toggleCheck = () => {
    if (isChecked) {
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }
  };

  const togglefav = () => {
    if (isFav) {
      setIsFav(false);
    } else {
      setIsFav(true);
    }
  };

  return (
    <ListItem
      bottomDivider
      containerStyle={isChecked ? styles.checkedItem : styles.item}
    >
      <Avatar rounded source={{ uri: event.avatarUrl }} size={70} />
      <ListItem.Content>
        <ListItem.Title>{event.name}</ListItem.Title>
        <ListItem.Subtitle>{"Data: " + event.data}</ListItem.Subtitle>
        <ListItem.Subtitle>{"Local: " + event.local}</ListItem.Subtitle>
        <ListItem.Subtitle>
          {"Ingressos Disponíveis: " + event.ingDisp}
        </ListItem.Subtitle>
      </ListItem.Content>
      <Button
        //   onPress={toggleCheck}
        onPress={() => {
          if (!isChecked) {
            handleReservation(event);
            toggleCheck();
          } else {
            toggleCheck();
          }
        }}
        type="clear"
        icon={
          isChecked ? (
            <Icon name="check-circle" size={25} color="#009432" />
          ) : (
            <Icon name="check-circle-outline" size={25} color="black" />
          )
        }
      />
      <Button
        onPress={togglefav}
        type="clear"
        icon={
          !isFav ? (
            <Icon name="star-outline" size={25} color="black" />
          ) : (
            <Icon name="star" size={25} color="#ffeaa7" />
          )
        }
      />
    </ListItem>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#b2bec3", // cor de fundo padrão
  },
  checkedItem: {
    backgroundColor: "#b2bec3", // cor de fundo quando o item está marcado
  },
});
