import React, { useContext, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "@rneui/themed";
import { TextInput } from "react-native";
import { EventsContext } from "../EventContextFile";

export default ({ route, navigation }) => {
    const [nome, setNome] = useState(""); // Estado para armazenar o nome do usuário
    const [quantidadeIngressos, setQuantidadeIngressos] = useState(""); // Estado para armazenar a quantidade de ingressos
    const { dispatch } = useContext(EventsContext);
    const { toggleCheck } = useContext(EventsContext);
  
    const handleReservation = () => {
      // Verifica se o nome e a quantidade de ingressos foram preenchidos
      if (nome.trim() === "" || quantidadeIngressos.trim() === "") {
        // Se algum dos campos estiver vazio, exibe um alerta
        alert("Por favor, preencha o nome e a quantidade de ingressos.");
        return;
      }
  
      // Converte a quantidade de ingressos para um número inteiro
      const quantidade = parseInt(quantidadeIngressos);
  
      // Verifica se a quantidade de ingressos é um número válido
      if (isNaN(quantidade) || quantidade <= 0) {
        alert("Por favor, insira uma quantidade válida de ingressos.");
        return;
      }
  
      // Dispara a ação para reservar os ingressos
      dispatch({
        type: "markEventAsChecked",
        payload: { event: route.params.event, nome, quantidade },
      });
  
    // Limpa os campos após o sucesso da reserva
      setNome("");
      setQuantidadeIngressos("");

      // toggleCheck();

      // Navega de volta para a tela anterior
      navigation.goBack();
    };
  
    return (
      <View style={style.form}>
        <Text>Nome</Text>
        <TextInput
          style={style.input}
          value={nome}
          onChangeText={(text) => setNome(text)}
        />
  
        <Text>Quantos ingressos deseja reservar?</Text>
        <TextInput
          style={style.input}
          value={quantidadeIngressos}
          onChangeText={(text) => setQuantidadeIngressos(text)}
          keyboardType="numeric" // Define o teclado como numérico para facilitar a entrada de números
        />
  
        <Button title="Reservar" onPress={handleReservation} />
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

