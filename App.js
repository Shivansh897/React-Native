import React from "react";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import store, { persistor } from "./Store/store";
import Spendings from "./components/Spendings";
import AddBudget from "./components/AddBudget";
import { PersistGate } from "redux-persist/integration/react";

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <View style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="AddBudget">
              <Stack.Screen name="AddBudget" component={AddBudget} />

              <Stack.Screen name="Spendings" component={Spendings} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
