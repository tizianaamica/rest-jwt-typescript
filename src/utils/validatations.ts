import * as yup from "yup";

export const emailValidate = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const bodyValidate = yup.object().shape({
  name: yup
    .string()
    .required()
    .min(2)
    .max(50)
    .matches(/^[A-Za-z\s]+$/, "Invalid name"),
});

export const animalValidate = yup.object().shape({
  name: yup
    .string()
    .required()
    .min(2)
    .max(50)
    .matches(/^[A-Za-z\s]+$/, "Invalid name"),
  species: yup.string().required(),
  zone: yup.string().required(),
});

export const commentValidate = yup.object().shape({
  body: yup.string().required().min(2),
  author: yup.string().required().min(2),
  animalId: yup.string().required(),
});

export const replyValidate = yup.object().shape({
  body: yup.string().required().min(2),
  author: yup.string().required().min(2),
});
