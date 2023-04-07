import { StyleSheet, Image } from "react-native";
import React from "react";
import StyledView from "../../styled_components/StyledView";
import useThemedStyles from "../../hooks/useThemedStyles";
import StyledText from "../../styled_components/StyledText";
import { SafeAreaView } from "react-native-safe-area-context";
import GoBackIcon from "../../components/GoBackIcon";
import { useNavigation } from "@react-navigation/native";
import CourseForm from "../../components/CourseForm";
import { postCourseSchema } from "../../schemas/course.schemas";
import usePostCourse from "../../hooks/usePostCourse";

const AddCourseModal = () => {
  const styles = useThemedStyles(stylesCallback);
  const navigation = useNavigation();
  const { data, error, loading, postCourse } = usePostCourse();

  const initialValues = {
    name: "",
    status: "",
    priority: 1,
    description: "",
  };

  return (
    <StyledView main paddingDefault>
      <GoBackIcon
        style={styles.goBackIcon}
        goBack={navigation.goBack}
        color={styles.goBackIcon.color}
      />
      <StyledView style={styles.modal}>
        <Image
          style={styles.bookIcon}
          source={require("../../assets/book.png")}
        />
        <StyledText h3 bold>
          Añadir curso
        </StyledText>
        <StyledView style={styles.formContainer}>
          <CourseForm
            initialValues={initialValues}
            onSubmitForm={postCourse}
            validationSchema={postCourseSchema}
            loading={loading}
            data={data}
            error={error}
          />
        </StyledView>
      </StyledView>
    </StyledView>
  );
};

export default AddCourseModal;

const stylesCallback = (theme) =>
  StyleSheet.create({
    modal: { marginTop: 8, padding: 16 },
    goBackIcon: {
      color: theme.themeTokens.regularIconColor,
    },
    bookIcon: {
      width: 52,
      height: 52,
      marginBottom: 16,
    },
    formContainer: {
      marginTop: 16,
    },
  });
