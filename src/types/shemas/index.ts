import * as yup from "yup";

export const otpSchema = yup.object().shape({
  bank: yup.string().required("El banco es obligatorio"),
  amount: yup.string().required("El monto es obligatorio"),
  phone: yup
    .string()
    .matches(
      /^(0414|0424|0416|0426|0412|0422)\d{7}$/,
      "El teléfono debe comenzar con 0414, 0424, 0416, 0426, 0412 o 0422 y tener 11 dígitos numéricos",
    )
    .required("El teléfono es obligatorio"),
  dni: yup
    .string()
    .matches(/^\d{6,}$/, "El DNI debe tener al menos 6 dígitos")
    .required("El DNI es obligatorio"),
  dniType: yup
    .string()
    .oneOf(["V", "E", "P", "J", "G"], "El tipo de DNI es inválido")
    .required("El tipo de DNI es obligatorio"),
  orderId: yup.string().required("El ID de la orden es obligatorio"),
  orderName: yup.string().required("El nombre de la orden es obligatorio"),
  casheaId: yup.string().default(""),
});

export const validateDirectDebitSchema = yup.object().shape({
  bank: yup.string().required("El banco es obligatorio"),
  amount: yup.string().required("El monto es obligatorio"),
  phone: yup
    .string()
    .matches(
      /^(0414|0424|0416|0426|0412|0422)\d{7}$/,
      "El teléfono debe comenzar con 0414, 0424, 0416, 0426, 0412 o 0422 y tener 11 dígitos numéricos",
    )
    .required("El teléfono es obligatorio"),
  dni: yup
    .string()
    .matches(/^\d{6,}$/, "El DNI debe tener al menos 6 dígitos")
    .required("El DNI es obligatorio"),
  dniType: yup
    .string()
    .oneOf(["V", "E", "P", "J", "G"], "El tipo de DNI es inválido")
    .required("El tipo de DNI es obligatorio"),
  name: yup.string().required("El nombre es obligatorio"),
  otp: yup
    .string()
    .matches(/^\d{8}$/, "El OTP debe tener 6 dígitos")
    .required("El OTP es obligatorio"),
  concept: yup.string().required("El concepto es obligatorio"),
  orderId: yup.string().required("El ID de la orden es obligatorio"),
  orderName: yup.string().required("El nombre de la orden es obligatorio"),
  casheaId: yup.string().default(""),
  customerId: yup.string().default(""),
});

export const validateMobilePaymentSchema = yup.object().shape({
  bank: yup.string().required("El banco es obligatorio"),
  phone: yup
    .string()
    .matches(
      /^(0414|0424|0416|0426|0412|0422)\d{7}$/,
      "El teléfono debe comenzar con 0414, 0424, 0416, 0426, 0412 o 0422 y tener 11 dígitos numéricos",
    )
    .required("El teléfono es obligatorio"),
  reference: yup
    .string()
    .matches(/^\d{4}$/, "La referencia debe tener 4 dígitos")
    .required("La referencia es obligatoria"),
  date: yup
    .date()
    .default(() => new Date())
    .required("La fecha es obligatoria"),
  dni: yup
    .string()
    .matches(/^\d{6,}$/, "El DNI debe tener al menos 6 dígitos")
    .required("El DNI es obligatorio"),
  dniType: yup.string().required("El tipo de DNI es obligatorio"),
  orderId: yup.number().required("El ID de la orden es obligatorio"),
  orderName: yup.string().required("El nombre de la orden es obligatorio"),
  casheaId: yup.string().default(""),
  customerId: yup.string().default(""),
});

export const mobilePaymentReturnSchema = yup.object().shape({
  bank: yup.string().required("El banco es obligatorio"),
  phone: yup
    .string()
    .matches(
      /^(0414|0424|0416|0426|0412|0422)\d{7}$/,
      "El teléfono debe comenzar con 0414, 0424, 0416, 0426, 0412 o 0422 y tener 11 dígitos numéricos",
    )
    .required("El teléfono es obligatorio"),
  dni: yup
    .string()
    .matches(/^\d{6,}$/, "El DNI debe tener al menos 6 dígitos")
    .required("El DNI es obligatorio"),
  dniType: yup
    .string()
    .oneOf(["V", "E", "P", "J", "G"], "El tipo de DNI es inválido")
    .required("El tipo de DNI es obligatorio"),
});

export const updateCustomerParentIDSchema = yup.object().shape({
  dni: yup
    .string()
    .matches(/^\d{6,}$/, "El DNI debe tener al menos 6 dígitos")
    .required("El DNI es obligatorio"),
  dniType: yup
    .string()
    .oneOf(["V", "E", "P", "J", "G"], "El tipo de DNI es inválido")
    .required("El tipo de DNI es obligatorio"),
  customerId: yup.string().required("El ID del cliente es obligatorio"),
});

export const directDebitAccountSchema = yup.object().shape({
  termsAndConditions: yup
    .boolean()
    .oneOf([true], "Debes aceptar los términos y condiciones")
    .required("Debes aceptar los términos y condiciones"),
  account: yup
    .string()
    .matches(/^\d{20}$/, "La cuenta debe tener 20 dígitos")
    .required("La cuenta es obligatoria"),
  dniType: yup
    .string()
    .oneOf(["V", "E", "P", "J", "G"], "El tipo de DNI es inválido")
    .required("El tipo de DNI es obligatorio"),
  dni: yup
    .string()
    .matches(/^\d{6,}$/, "El DNI debe tener al menos 6 dígitos")
    .required("El DNI es obligatorio"),
});

export const directDebitAccountWithOTPSchema = yup.object().shape({
  otp: yup
    .string()
    .matches(/^\d{6}$/, "El OTP debe tener 6 dígitos")
    .required("El OTP es obligatorio"),
});
