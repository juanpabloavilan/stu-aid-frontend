import { NativeRouter } from "react-router-native";
import { ThemeProvider } from "./contexts/ThemeContext";
import { themeTokens } from "./themesTokens";
import Main from "./screens/Main";
import AuthStorageProvider from "./contexts/AuthStorageContext";
import AuthStorage from "./utils/AuthStorage";

const authStorage = new AuthStorage("auth");

export default function App() {
  return (
    <AuthStorageProvider authStorage={authStorage}>
      <ThemeProvider ThemeTokens={themeTokens}>
        <NativeRouter>
          <Main />
        </NativeRouter>
      </ThemeProvider>
    </AuthStorageProvider>
  );
}
