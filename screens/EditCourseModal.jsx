import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import React, { useEffect } from "react";
import StyledModal from "../components/StyledModal";
import StyledView from "../styled_components/StyledView";
import StyledText from "../styled_components/StyledText";
import CourseForm from "../components/CourseForm";
import useFetchCourseSubjects from "../hooks/useFetchCourseSubjects";
import LoadingSpinner from "../components/LoadingSpinner";
import { editCourseSchema } from "../schemas/course.schemas";
import usePutCourse from "../hooks/usePutCourse";
import { useNavigation, useRoute } from "@react-navigation/native";
import StyledModalScreen from "../components/StyledModalScreen";

const EditCourseModal = () => {
  const route = useRoute();
  const {
    params: { id },
  } = route;
  const { loading, data, error, execute } = useFetchCourseSubjects(Number(id));
  const {
    loading: loadingPut,
    data: dataPut,
    error: errorPut,
    putCourse,
  } = usePutCourse(id);
  const navigation = useNavigation();

  useEffect(() => {
    execute();
  }, []);

  return (
    <StyledModalScreen>
      {loading && <LoadingSpinner />}
      {data && (
        <>
          <StyledText blue h3 bold>
            Editar curso
          </StyledText>
          <CourseForm
            initialValues={{
              name: data.name,
              status: data.status,
              priority: data.priority,
              description: data.description,
            }}
            validationSchema={editCourseSchema}
            onSubmitForm={putCourse}
            loading={loadingPut}
            error={errorPut}
            data={dataPut}
          />
          <TouchableWithoutFeedback
            onPress={() => {
              console.log("Closing modal");
              navigation.goBack();
            }}
          >
            <View>
              <StyledView
                blue
                rounded
                alignCenter
                justifyCenter
                style={styles.button}
              >
                <StyledText h5 bold>
                  CERRAR
                </StyledText>
              </StyledView>
            </View>
          </TouchableWithoutFeedback>
        </>
      )}
      {error && (
        <StyledText error>{error.message || JSON.stringify(error)}</StyledText>
      )}
    </StyledModalScreen>
  );
};

export default EditCourseModal;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 16,
  },
});
