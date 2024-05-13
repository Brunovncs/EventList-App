import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import EventList from "./Events/EventList";
import EventListEdit from "./Events/EventListEdit";

const initialLayout = { width: Dimensions.get("window").width };

const HomeScreen = () => (
    <View style={[styles.scene, { backgroundColor: "#b2bec3" }]}>
    <EventList />
  </View>
);

const ManageEventsScreen = () => (
    <View style={[styles.scene, { backgroundColor: "#b2bec3" }]}>
    <EventListEdit />
   </View>
);

export default function TabViewExample() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "home", title: "Home" },
    { key: "manage", title: "Gerenciar Eventos" },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "home":
        return <HomeScreen />;
      case "manage":
        return <ManageEventsScreen />;
      default:
        return null;
    }
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
    />
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: "#636e72",
  },
  indicator: {
    backgroundColor: "#00b894",
  },
});
