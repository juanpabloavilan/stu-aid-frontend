import * as yup from "yup";

const requiredErrorMessage = "Este campo es requerido";
const fullname = yup
  .string()
  .min(2, "Debe tener al menos 2 caracteres")
  .max(255, "Debe tener menos de 255 caracteres");
const email = yup.string().email("Debe ser un email válido");
const password = yup
  .string()
  .min(8, "Debe tener al menos 8 caracteres")
  .max(255, "Debe tener menos de 255 caracteres");

export const signUpSchema = yup.object({
  fullname: fullname.required(requiredErrorMessage),
  email: email.required(requiredErrorMessage),
  password: password.required(requiredErrorMessage),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Las contraseñas deben coincidir")
    .required(requiredErrorMessage),
});

export const loginSchema = yup.object({
  email: email.required(requiredErrorMessage),
  password: password.required(requiredErrorMessage),
});
