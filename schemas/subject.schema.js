import * as yup from "yup";

const requiredErrorMessage = "Este campo es requerido";
const id = yup.number().integer();
const name = yup
  .string()
  .min(2, "Debe tener al menos 2 caracteres")
  .max(255, "Debe tener menos de 255 caracteres");
const flashcards = yup.array();
const status = yup.string().oneOf(["active", "unactive"]);

export const upsertSubject = yup.object({
  id: id,
  name: name.required(requiredErrorMessage),
  flashcards: flashcards,
  status: status,
});
