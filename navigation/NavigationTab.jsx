import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import QuickFlashcardsView from "../screens/QuickFlashcardView/QuickFlashcardsView";
import MyCoursesView from "../screens/Courses/MyCoursesView";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ProfileView from "../screens/ProfileView";
import ProfileIcon from "react-native-vector-icons/FontAwesome5";
import useThemedStyles from "../hooks/useThemedStyles";

const Tab = createBottomTabNavigator();
const NavigationTab = () => {
  const styles = useThemedStyles(stylesCallback);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.bar,
      }}
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
    bar: {
      backgroundColor: theme.themeTokens.backgroundColor,
      color: theme.themeTokens.colors.blue,
      borderTopWidth: 0,
    },
  });

export default NavigationTab;
