import React, { createContext, useContext, useEffect, useReducer } from "react";
import users from "./users";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UsersContext = createContext({});
const initialState = { users };

async function saveUsers(users) {
  try {
    await AsyncStorage.setItem("users", JSON.stringify(users));
  } catch (error) {
    console.log("Erro ao salvar os usuários no AsyncStorage ", error);
  }
}

async function loadUsers() {
  try {
    const users = await AsyncStorage.getItem("users");
    return { users: users ? JSON.parse(users) : [] };
  } catch (error) {
    console.error("Erro ao carregar os usuarios do AsyncStorage", error);
    return { users: [] };
  }
}

async function deleteUsers(user) {
  try {
    await AsyncStorage.removeItem("users");
    console.log("Usuarios removidos com sucesso");
  } catch (error) {
    console.log("Erro ao remover os usuarios do AsyncStorage", error);
  }
}

const actions = {
  deleteAllUsers(state, action){
    deleteUsers()
    return {
      ...state,
      users: []
    }
  },
  carregarUsers(state, action) {
    const loadedUsers = action.payload.users;
    return {
      ...state,
      users: loadedUsers,
    };
  },
  gerarRandom(state, action) {
    const loadedUsers = action.payload;
    return {
      ...state,
      users: loadedUsers,
    };
  },
  deleteUser(state, action) {
    const user = action.payload;
    const updatedUsers = state.users.filter((u) => u.id !== user.id);
    return {
      ...state, //opcional no caso de 1 estado, se tiver mais estados precisa clona-los com essa linha
      users: updatedUsers,
    }; //estado é evoluido
  },
  createUser(state, action) {
    const user = action.payload;
    user.id = Math.random();
    const updatedUsers = [...state.users, user];
    saveUsers(updatedUsers);
    return {
      ...state,
      users: updatedUsers,
    };
  },
  updateUser(state, action) {
    const updated = action.payload;
    const updatedUsers = state.users.map((u) =>
      u.id === updated.id ? updated : u
    );
    saveUsers(updatedUsers);
    return {
      ...state,
      users: updatedUsers,
    };
  },
};

export const UsersProvider = (props) => {
  useEffect(() => {
    async function fetchData() {
      const loadedUsers = await loadUsers();
      if (loadedUsers.users.length !== 0) {
        dispatch({
          type: "carregaUsers",
          payload: loadedUsers.users,
        });
      } else {
        dispatch({
          type: "gerarRandom",
          payload: users,
        });
      }
    }
    fetchData();
  }, []);

  function reducer(state, action) {
    const fn = actions[action.type];
    return fn ? fn(state, action) : state;
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UsersContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {props.children}
    </UsersContext.Provider>
  );
};

export { UsersContext }