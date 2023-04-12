import * as yup from "yup";
export const FrontReverseSchema = yup.object({
  front: yup.string().min(2).required(),
  back: yup.string().min(2).required(),
});

export const TrueFalseSchema = yup.object({
  front: yup.string().min(2).required(),
  back: yup.string().min(2).required(),
});
