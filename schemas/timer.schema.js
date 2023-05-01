import * as yup from "yup";

export const TIMER_SCHEMA = yup.object({
  minutes: yup
    .number("Debe ser un numero")
    .integer("Debe ser entero")
    .positive("Debe ser mayor a 0"),
});
