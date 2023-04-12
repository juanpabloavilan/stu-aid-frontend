import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import LoginView from "../screens/Authorization/LoginView";
import SignUpView from "../screens/Authorization/SignUpView";
import HomeView from "../screens/HomeView";
import CourseView from "../screens/Subjects/CourseView";
import AddCourseModal from "../screens/Courses/AddCourseModal";
import NewSubjectView from "../screens/Subjects/NewSubjectView";
import EditCourseModal from "../screens/Courses/EditCourseModal";
import DeleteCourseModal from "../screens/Courses/DeleteCourseModal";
import SubjectView from "../screens/Flashcards/SubjectView";
import DeleteSubjectModal from "../screens/Subjects/DeleteSubjectModal";
import LoadingSpinner from "../components/LoadingSpinner";
import LogoView from "../screens/LogoView";
import useSetTheme from "../hooks/useSetTheme";
import useAutoLogin from "../hooks/useAutoLogin";
import FrontReverseQuestion from "../screens/Flashcards/FrontReverseQuestion";
import TrueFalseQuestion from "../screens/Flashcards/TrueFalseQuestion";
import ElaboratedQuestion from "../screens/Flashcards/ElaboratedQuestion";
import DeleteFlashcardModal from "../screens/Flashcards/DeleteFlashcardModal";

const Stack = createStackNavigator();
const NavigationStack = () => {
  const { isAuthorized, loading } = useAutoLogin();
  const currentTheme = useSetTheme();

  if (loading) {
    return <LoadingSpinner />;
  } else {
    return (
      <>
        <StatusBar style={currentTheme === "dark" ? "light" : "dark"} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Logo" component={LogoView} />
          <Stack.Screen name="Login" component={LoginView} />
          <Stack.Screen name="SignUp" component={SignUpView} />

          <Stack.Screen name="Home" component={HomeView} />
          <Stack.Screen name="CourseView" component={CourseView} />
          <Stack.Screen name="Subject" component={SubjectView} />
          <Stack.Group
            screenOptions={{
              presentation: "transparentModal",
              headerShown: false,
            }}
          >
            <Stack.Screen name="New subject" component={NewSubjectView} />
            <Stack.Screen name="AddCourseModal" component={AddCourseModal} />
            <Stack.Screen name="EditCourseModal" component={EditCourseModal} />
            <Stack.Screen
              name="DeleteCourseModal"
              component={DeleteCourseModal}
            />
            <Stack.Screen
              name="DeleteSubjectModal"
              component={DeleteSubjectModal}
            />
            <Stack.Screen
              name="FrontReverseQuestionModal"
              component={FrontReverseQuestion}
            />
            <Stack.Screen
              name="TrueFalseQuestionModal"
              component={TrueFalseQuestion}
            />
            <Stack.Screen
              name="ElaboratedQuestionModal"
              component={ElaboratedQuestion}
            />
            <Stack.Screen
              name="DeleteFlashcardModal"
              component={DeleteFlashcardModal}
            />
          </Stack.Group>
        </Stack.Navigator>
      </>
    );
  }
};

export default NavigationStack;
