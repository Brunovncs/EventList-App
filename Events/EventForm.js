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
 
 

// import React, { useContext, useState } from "react";
// import { Text } from "@rneui/base";
// import { Button } from "@rneui/themed";
// import { TextInput, View } from "react-native";
// import { StyleSheet } from "react-native";
// import { EventsContext } from "./UserContextFile";

// export default ({ route, navigation }) => {
//   const [user, setUser] = useState(route.params ? route.params : {});
//   const { dispatch } = useContext(EventsContext);

//   return (
//     <View style={style.form}>
//       <Text>Nome</Text>
//       <TextInput
//         style={style.input}
//         onChangeText={(name) => setUser({ ...user, name })}
//         placeholder="Informe o nome"
//         value={user.name}
//       />

//       <Button
//         title="Salvar"
//         onPress={() => {
//           dispatch({
//             type: user.id ? "updateUser" : "createUser",
//             payload: user,
//           });
//           navigation.goBack();
//         }}
//       />
//     </View>
//   );
// };

// const style = StyleSheet.create({
//   input: {
//     height: 40,
//     borderColor: "gray",
//     borderWidth: 1,
//     marginBottom: 10,
//   },

//   form: {
//     padding: 15,
//   },
// });