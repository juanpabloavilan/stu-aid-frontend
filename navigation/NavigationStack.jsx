import { createStackNavigator } from "@react-navigation/stack";
import LoginView from "../screens/LoginView";
import SignUpView from "../screens/SignUpView";
import HomeView from "../screens/HomeView";
import CourseView from "../screens/CourseView";
import AddCourseModal from "../screens/AddCourseModal";
import SubjectEditView from "../screens/SubjectEditView";
import NewSubjectView from "../screens/NewSubjectView";
import EditCourseModal from "../screens/EditCourseModal";
import DeleteCourseModal from "../screens/DeleteCourseModal";

const Stack = createStackNavigator();
const NavigationStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginView} />
      <Stack.Screen name="SignUp" component={SignUpView} />
      <Stack.Screen name="Home" component={HomeView} />
      <Stack.Screen name="CourseView" component={CourseView} />
      <Stack.Screen name="Subject" component={SubjectEditView} />
      <Stack.Screen name="New subject" component={NewSubjectView} />
      <Stack.Group
        screenOptions={{ presentation: "transparentModal", headerShown: false }}
      >
        <Stack.Screen name="AddCourseModal" component={AddCourseModal} />
        <Stack.Screen name="EditCourseModal" component={EditCourseModal} />
        <Stack.Screen name="DeleteCourseModal" component={DeleteCourseModal} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default NavigationStack;
