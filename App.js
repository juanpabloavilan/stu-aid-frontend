import { ThemeProvider } from "./contexts/ThemeContext";
import { themeTokens } from "./themesTokens";
import Main from "./screens/Main";
import AuthStorageProvider from "./contexts/AuthStorageContext";
import AuthStorage from "./utils/AuthStorage";
import { NavigationContainer } from "@react-navigation/native";
import NavigationTab from "./navigation/NavigationTab";

const authStorage = new AuthStorage("auth");

export default function App() {
  return (
    <NavigationContainer>
      <AuthStorageProvider authStorage={authStorage}>
        <ThemeProvider ThemeTokens={themeTokens}>
          <Main />
        </ThemeProvider>
      </AuthStorageProvider>
    </NavigationContainer>
  );
}
