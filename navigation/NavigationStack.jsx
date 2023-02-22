import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import SignUpView from "../screens/SignUpView";
import LoginView from "../screens/LoginView";
import HomeView from "../screens/HomeView";
import QuickFlashcardsView from "../screens/QuickFlashcardsView";
import MyCoursesView from "../screens/MyCoursesView";

const Tab = createBottomTabNavigator();
const NavigationTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="SignUp" component={SignUpView} />
      <Tab.Screen name="Login" component={LoginView} />
      <Tab.Screen name="Courses" component={MyCoursesView} />
      <Tab.Screen name="QuickFlashcards" component={QuickFlashcardsView} />
    </Tab.Navigator>
  );
};

export default NavigationTab;
