import { ThemeProvider } from "./contexts/ThemeContext";
import { themeTokens } from "./themesTokens";
import Main from "./screens/Main";
import AuthStorageProvider from "./contexts/AuthStorageContext";
import AuthStorage from "./utils/AuthStorage";
import { NavigationContainer } from "@react-navigation/native";
import NavigationTab from "./navigation/NavigationTab";
import {
  applyMiddleware,
  legacy_createStore as createStore,
  compose,
} from "redux";
import { Provider } from "react-redux";
import { reducer as flashcardReducer } from "./reducers/flashcards.reducer";
// import { logger } from "./middlewares";

const authStorage = new AuthStorage("auth");
// const composedEnhancer = compose(applyMiddleware(logger));
const store = createStore(flashcardReducer);

export default function App() {
  return (
    <Provider store={store}>
      <AuthStorageProvider authStorage={authStorage}>
        <ThemeProvider ThemeTokens={themeTokens}>
          <NavigationContainer>
            <Main />
          </NavigationContainer>
        </ThemeProvider>
      </AuthStorageProvider>
    </Provider>
  );
}
