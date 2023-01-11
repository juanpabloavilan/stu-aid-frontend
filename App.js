import { StatusBar } from "expo-status-bar";
import { NativeRouter } from "react-router-native";
import { ThemeProvider } from "./contexts/ThemeContext";
import { themeTokens } from "./themesTokens";
import Main from "./components/main/Main";

export default function App() {
  return (
    <ThemeProvider ThemeTokens={themeTokens}>
      <StatusBar style="auto" />
      <NativeRouter>
        <Main />
      </NativeRouter>
    </ThemeProvider>
  );
}
