export const API_HOST =
  import.meta.env.VITE_API_HOST ||
  "http://localhost:8080https://boneappetit-api-341937476244.us-central1.run.app";

export const endpoints = {
  store: {
    findOrderByName: {
      endpoint: "/orders/confirmation",
    },
    findOrderById: {
      endpoint: "/orders",
    },
    updateCustomerParentID: {
      endpoint: "/customers/parent",
    },
    findCasheaById: {
      endpoint: "/orders/cashea",
    },
  },
  payments: {
    getBCVTasa: {
      endpoint: "/payments/bcv-tasa",
    },
    generateOTP: {
      endpoint: "/payments/generate-otp",
    },
    ValidateDirectDebit: {
      endpoint: "/payments/validate-direct-debit",
    },
    validateCash: {
      endpoint: "/payments/validate-cash",
    },
    validateMobilePayment: {
      endpoint: "/payments/validate-mobile-payment",
    },
    validateMobilePaymentManual: {
      endpoint: "/payments/validate-mobile-payment-manual",
    },
    validateZelle: {
      endpoint: "/payments/validate-zelle",
    },
    directDebitAccount: {
      endpoint: "/payments/direct-debit-account",
    },
    directDebitAccountWithOTP: {
      endpoint: "/payments/direct-debit-account/otp",
    },

  },
};
