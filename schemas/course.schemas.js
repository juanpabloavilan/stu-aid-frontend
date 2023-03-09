import * as yup from "yup";

const requiredErrorMessage = "Este campo es requerido";

const name = yup
  .string()
  .min(2, "Debe tener al menos 2 caracteres")
  .max(255, "Debe tener menos de 255 caracteres");
const description = yup
  .string()
  .min(2, "Debe tener al menos 2 caracteres")
  .max(255, "Debe tener menos de 255 caracteres");

const priority = yup
  .number()
  .integer("Debe se entero")
  .min(1, "Debe ser mayor o igual a 1")
  .max(5, "Debe ser menor o igual a 5");
const status = yup.string().oneOf(["active", "dismissed"]);

export const postCourseSchema = yup.object({
  name: name.required(requiredErrorMessage),
  description: description,
  priority: priority.required(requiredErrorMessage),
  status: status.required(requiredErrorMessage),
});

export const editCourseSchema = yup.object({
  name: name.required(requiredErrorMessage),
  description,
  priority,
  status,
});
