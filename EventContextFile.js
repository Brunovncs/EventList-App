import React, { createContext, useContext, useEffect, useReducer } from "react";
import events from "./Events/events";
import EditarEvento from "./Events/EditarEvento";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EventsContext = createContext({});
const initialState = { events };

const actions = {
  // Adicione esta ação ao seu objeto de ações
  markEventAsChecked(state, action) {
    //console.log("Payload antes de chamar markEventAsChecked:", action.payload); // Adicione esta linha

    const { event, nome, quantidade } = action.payload;
    
    const updatedEvents = state.events.map((e) => {
      // if (event && event.id) {
        if (e.id === event.id) {
          // console.log("Esse é o event:", event)
          // Verifica se há ingressos disponíveis para reserva
          if (e.ingDisp >= quantidade) {
            return {
              ...e,
              isChecked: true,
              ingDisp: e.ingDisp - quantidade, // Diminui o número de ingressos disponíveis
              reservations: [...(e.reservations || []), { nome, quantidade }],
            };
          } else {
            // Se não houver ingressos disponíveis suficientes, mantém o evento inalterado
            return e;
          }
        }
      // } else {
      //   console.error("Event ou event.id é undefined");
      //   console.log("Nomes: ", nome)
      // }
      return e;
    });
    saveEvents(updatedEvents);
    return {
      ...state,
      events: updatedEvents,
    };
  },
  unmarkEventAsChecked(state, action) {
    const eventId = action.payload.id; // Ajuste aqui para acessar a propriedade 'id' corretamente
    const updatedEvents = state.events.map((u) =>
      u.id === eventId? {...u, isChecked: false } : u
    );
    saveEvents(updatedEvents);
    return {
     ...state,
      events: updatedEvents,
    };
  },  
  deleteAllEvents(state, action) {
    deleteEvents();
    return {
      ...state,
      events: [],
    };
  },
  carregarEvents(state, action) {
    const loadedEvents = action.payload.events;
    return {
      ...state,
      events: loadedEvents,
    };
  },
  gerarRandom(state, action) {
    const loadedEvents = action.payload;
    return {
      ...state,
      events: loadEvents,
    };
  },
  deleteEvent(state, action) {
    const event = action.payload;
    const updatedEvents = state.events.filter((u) => u.id !== event.id);
    return {
      ...state, //opcional no caso de 1 estado, se tiver mais estados precisa clonalos com essa linha
      events: updatedEvents,
    }; //estado é evoluido
  },
  createEvent(state, action) {
    const event = action.payload;
    event.id = Math.random();
    const updatedEvents = [...state.events, event];
    saveEvents(updatedEvents);
    return {
      ...state,
      events: updatedEvents,
    };
  },
  updateEvent(state, action) {
    const updated = action.payload;
    const updatedEvents = state.events.map((u) =>
      u.id === updated.id ? updated : u
    );
    saveEvents(updatedEvents);
    return {
      ...state,
      events: updatedEvents,
    };
  },
};

async function saveEvents(events) {
  try {
    await AsyncStorage.setItem("events", JSON.stringify(events));
  } catch (error) {
    console.error("Error ao salvar os usuarios no AsyncStorage: ", error);
  }
}

async function deleteEvents(events) {
  try {
    await AsyncStorage.removeItem("events");
    console.log("Usuarios removidos com sucesso");
  } catch (error) {
    console.log("Erro ao remover os usuarios do AsyncStorage", error);
  }
}

async function loadEvents() {
  try {
    const events = await AsyncStorage.getItem("events");
    return { events: events ? JSON.parse(events) : [] };
  } catch (error) {
    console.error("Erro ao carregar os usuarios do AsyncStorage", error);
    return { events: [] };
  }
}

export const EventsProvider = (props) => {
  function reducer(state, action) {
    const fn = actions[action.type];
    return fn ? fn(state, action) : state;
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchData() {
      const loadedEvents = await loadEvents();
      dispatch({ type: "carregarEventos", payload: loadedEvents });
    }
    fetchData();
  }, []);

  return (
    <EventsContext.Provider value={{ state, dispatch }}>
      {props.children}
    </EventsContext.Provider>
  );
};

export { EventsContext };
