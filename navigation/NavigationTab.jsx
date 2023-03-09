import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import QuickFlashcardsView from "../screens/QuickFlashcardsView";
import MyCoursesView from "../screens/MyCoursesView";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ProfileView from "../screens/ProfileView";
import ProfileIcon from "react-native-vector-icons/FontAwesome5";
import useThemedStyles from "../hooks/useThemedStyles";

const Tab = createBottomTabNavigator();
const NavigationTab = () => {
  const styles = useThemedStyles(stylesCallback);
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}
    >
      <Tab.Screen
        name="Courses"
        component={MyCoursesView}
        options={{
          tabBarLabel: "Cursos",
          tabBarIcon: ({ color, size }) => (
            <Icon name="book" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="QuickFlashcards"
        component={QuickFlashcardsView}
        options={{
          tabBarLabel: "Flashcards",
          tabBarIcon: ({ color, size }) => (
            <Icon name="cards" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileView}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <ProfileIcon name="user-circle" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const stylesCallback = (theme) =>
  StyleSheet.create({
    tabBarStyle: {
      backgroundColor: theme.themeTokens.backgroundColor,
    },
  });

export default NavigationTab;
