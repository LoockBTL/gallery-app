import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import PhotoScreen from "./PhotoScreen";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { TNavigation } from "../types/navigation.type";
const Stack = createNativeStackNavigator<TNavigation>();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Photo" component={PhotoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
