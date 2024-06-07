import React, { useContext, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { EventsContext } from "../EventContextFile";
import { ListItem, Avatar, Button } from "@rneui/themed";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

export default (props) => {
  const { state, dispatch } = useContext(EventsContext);
  const navigation = useNavigation();

  console.log(state.events.length);

  const handleReservation = (event, nome, quantidade) => {
    navigation.navigate("ScheduleEvent", { event, nome, quantidade }); // Navega para a tela de agendamento de evento
  };

  const expandinfo = (event, nome, quantidade) => {
    navigation.navigate("ExpandInfo", { event, nome, quantidade }); // Navega para a tela de agendamento de evento
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
            expandinfo={expandinfo}
          />
        )}
      />
    </View>
  );
};

const EventItem = ({ event, dispatch, handleReservation, expandinfo }) => {
  if (!event) {
    console.log("Event não está definido");
    return null; // Retorna null ou algum componente de fallback se event não estiver definido
  }

  const [isChecked, setIsChecked] = useState(event.isChecked || false);
  const [isFav, setIsFav] = useState(event.isFav || false);

  const toggleCheck = (event) => {
    if (event.isChecked) {
      setIsChecked(false);
      dispatch({
        type: "updateEventIsChecked",
        payload: { id: event.id, isChecked: false },
      });
    }
  };

  const togglefav = () => {
    const newIsFav = !isFav;
    console.log(newIsFav);
    setIsFav(newIsFav);
    dispatch({
      type: "updateEventIsFav",
      payload: { id: event.id, isFav: newIsFav },
    });
  };

  return (
    <ListItem
      bottomDivider
      containerStyle={isChecked ? styles.checkedItem : styles.item}
    >
      <Avatar source={{ uri: event.avatarUrl }} size={100} />
      <ListItem.Content>
        <ListItem.Title style={styles.title}>{event.name}</ListItem.Title>
        <ListItem.Subtitle style={styles.subtitle}>{"Data: " + event.data}</ListItem.Subtitle>
        <ListItem.Subtitle style={styles.subtitle}>{"Local: " + event.local}</ListItem.Subtitle>
        <ListItem.Subtitle style={styles.subtitle}>
          {"Ingressos Disponíveis: " + event.ingDisp}
        </ListItem.Subtitle>
      </ListItem.Content>
      <Button
        onPress={() => {
          if (!event.isChecked) {
            handleReservation(event);
          } else {
            toggleCheck(event);
          }
        }}
        type="clear"
        icon={
          event.isChecked ? (
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
      <Button
        onPress={() => {
          expandinfo(event);
        }}
        type="clear"
        icon={<Icon name="menu" size={25} color="black" />}
      />
    </ListItem>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#b2bec3",
    padding: 10,
  },
  checkedItem: {
    backgroundColor: "#b2bec3",
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  title: {
    fontFamily: "Roboto",
    fontWeight: 'bold',
    fontSize: 20,
  },
  subtitle: {
    fontFamily: "Roboto",
    fontSize: 14,
  },
});
