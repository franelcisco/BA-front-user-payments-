import provincial from "@/assets/guides/0108.pdf?url";

// ── Loading animation ────────────────────────────────────────────────────────

export interface LoadingPhase {
  title: string;
  sub: string;
  tip: string;
  showCheck?: boolean;
  showPrice?: boolean;
}

/** Step 2 — primera solicitud de domiciliación */
export const DOMICILIATION_PHASES: LoadingPhase[] = [
  {
    title: "Enviando solicitud a tu banco...",
    sub: "Conectando tu cuenta con Bone Appetit",
    tip: "Tu banco recibirá una solicitud de domiciliación que deberás aprobar en el siguiente paso.",
  },
  {
    title: "Registrando tu cuenta...",
    sub: "Compartiendo tus datos de forma segura 🔒",
    tip: "Estamos vinculando tu cuenta bancaria de forma segura para configurar el débito automático.",
  },
  {
    title: "Esperando respuesta del banco...",
    sub: "Esto puede tomar unos segundos",
    tip: "Tu banco está verificando los datos de tu cuenta para crear la domiciliación.",
  },
  {
    title: "Casi listo...",
    sub: "Un momento más 🫶🏻",
    tip: "Ya estamos recibiendo confirmación del banco.",
  },
];
export const DOMICILIATION_TIMINGS = [2500, 5500, 8500, 10500];

/** Segundo intento — tras aprobación bancaria, ahora se ejecuta el cobro */
export const RETRY_DOMICILIATION_PHASES: LoadingPhase[] = [
  {
    title: "Conectando con tu banco...",
    sub: "Iniciando el cobro en tu cuenta",
    tip: "Tu domiciliación ya está activa. Ahora vamos a realizar el primer cobro de tu pedido.",
  },
  {
    title: "Haciendo solicitud de cobro a tu cuenta registrada",
    sub: "Compartiendo tus datos de forma segura 🔒",
    tip: "Estamos enviando la instrucción de débito a tu banco para cobrar el monto de tu orden.",
  },
  {
    title: "Esperando respuesta del banco...",
    sub: "Esto puede tomar unos segundos",
    tip: "Tu banco está procesando el débito en tu cuenta domiciliada.",
  },
  {
    title: "Casi listo...",
    sub: "Un momento más 🫶🏻",
    tip: "Estamos confirmando que el cobro fue exitoso.",
  },
];

/** Reintentar cobro en una orden recurrente */
export const RETRY_PHASES: LoadingPhase[] = [
  {
    title: "Procesando tu cobro",
    sub: "Conectando con tu banco...",
    tip: "Estamos enviando la solicitud de cobro a tu banco.",
  },
  {
    title: "Cobrando en tu banco",
    sub: "Esto puede tomar unos segundos...",
    tip: "El banco está verificando tu saldo y procesando el débito.",
  },
  {
    title: "Confirmando pago",
    sub: "Ya casi 🫶🏻",
    tip: "Estamos esperando la confirmación de tu banco.",
  },
  {
    title: "¡Cobro procesado!",
    sub: "Tu orden ha sido pagada ✅",
    tip: "Todo listo — tu comida va en camino.",
    showCheck: true,
  },
];
export const RETRY_TIMINGS = [2000, 4000, 6000, 7500];
import banesco from "@/assets/guides/0134.pdf?url";
import venezolano from "@/assets/guides/0104.pdf?url";
import tesoro from "@/assets/guides/0163.pdf?url";

export const directDebitAccountBankList = [
  { code: "0102", name: "Banco de Venezuela" },
  { code: "0104", name: "Banco Venezolano de Crédito" },
  // { code: "0105", name: "Banco Mercantil" },
  // { code: "0108", name: "Banco Provincial" },
  { code: "0114", name: "Banco del Caribe" },
  { code: "0115", name: "Banco Exterior" },
  { code: "0128", name: "Banco Caroní" },
  { code: "0134", name: "Banesco" },
  { code: "0137", name: "Banco Sofitasa" },
  { code: "0138", name: "Banco Plaza" },
  { code: "0146", name: "Banco de la Gente Emprendedora" },
  { code: "0151", name: "Banco Fondo Común" },
  { code: "0156", name: "100% Banco" },
  { code: "0157", name: "Delsur" },
  { code: "0163", name: "Banco del Tesoro" },
  { code: "0166", name: "Banco Agrícola de Venezuela" },
  { code: "0168", name: "Bancrecer" },
  // { code: "0169", name: "R4, Banco Microfinanciero" },
  { code: "0171", name: "Banco Activo" },
  { code: "0172", name: "Bancamiga" },
  { code: "0173", name: "Banco Internacional de Desarrollo" },
  { code: "0174", name: "Banplus" },
  { code: "0175", name: "Banco Digital de los Trabajadores" },
  {
    code: "0177",
    name: "Banco de la Fuerza Armada Nacional Bolivariana (BANFANB)",
  },
  { code: "0178", name: "N58 Banco Digital" },
  { code: "0191", name: "Banco Nacional de Crédito (BNC)" },
];

export const BANK_STEPS: Record<string, BankTutorial> = {
  "0102": {
    name: "Banco de Venezuela",
    steps: [
      {
        n: 1,
        title: "Entra a BDV en Línea",
        description:
          'En el menú superior, selecciona "Pagos" → "Domiciliaciones".',
      },
      {
        n: 2,
        title: "Abre el contrato",
        description:
          'En "Gestión Pagos Domiciliados BDV" ubica la afiliación de BONEVE GROUP con estatus Inactivo y haz clic en el ícono del ojo (Ver más) en la columna Acciones.',
      },
      {
        n: 3,
        title: "Confirma la afiliación",
        description:
          'Revisa los datos (Razón social, RIF, Cuenta contrato), elige el método de autenticación ("Código por SMS" o "Código por BDVApp") y presiona "Confirmar".',
      },
      {
        n: 4,
        title: "Ingresa el código",
        description:
          "Ingresa el código de seguridad recibido por SMS o generado en la BDVApp. Al finalizar verás el comprobante de afiliación con estatus Activo.",
      },
    ],
  },
  "0191": {
    name: "Banco Nacional de Crédito (BNC)",
    steps: [
      {
        n: 1,
        title: "Entra a BNC en Línea",
        description:
          'En el menú superior, selecciona "Pagos" → "Operaciones Inmediatas" → "Domiciliaciones".',
      },
      {
        n: 2,
        title: "Habilita el contrato",
        description:
          'En el listado de Débito Inmediato, ubica la domiciliación a nombre de BONEVE GROUP, haz clic en "Acción" y selecciona "Habilitar".',
      },
      {
        n: 3,
        title: "Confirma la operación",
        description:
          'En la ventana "BNCNET - Confirmación", presiona "Sí" para autorizar la habilitación.',
      },
      {
        n: 4,
        title: "Ingresa el Token BNC",
        description:
          'Abre la App BNC, ve a "Operaciones Directas BNC" → "Token BNC", copia el código generado e ingrésalo en el campo "Código de Seguridad". Luego presiona "Continuar".',
      },
    ],
  },
  "0172": {
    name: "Bancamiga",
    steps: [
      {
        n: 1,
        title: "Entra a online.bancamiga",
        description:
          'En el menú superior, selecciona "Cash Management" → "Domiciliacion".',
      },
      {
        n: 2,
        title: "Selecciona tu imagen de operacione especiales",
        description: "Selecciona tu imagen de operaciones especiales ",
      },
      {
        n: 3,
        title: "Ingresa tu clave Dinamica enviada via SMS",
        description: "Ingresa tu clave Dinamica enviada via SMS ",
      },
      {
        n: 4,
        title: "Selecciona lista de afiliaciones de pagos",
        description:
          "Verás las solicitudes con estatus Inactiva. Haz clic en el número de contrato que corresponde a Boneve Group ",
      },
      {
        n: 5,
        title: "Acepta",
        description:
          "desliza hacia la derecha y busca la seccion de acciones, pulsa el checklist que aparece, confirma la activacion del contrato.",
      },
    ],
  },
  "0134": {
    name: "BanescOnline",
    guiedeUrl: banesco,
    steps: [
      {
        n: 1,
        title: "Entra al portal Banesco Online",
        description:
          'En el menú principal, ubicado al lado izquierdo de la pantalla, selecciona "Cobro a Otros Bancos" y luego haz clic en "Afiliación Domiciliación".',
      },
      {
        n: 2,
        title: "Revisa tus solicitudes",
        description:
          'Se mostrarán todas las solicitudes de domiciliación recibidas, que inicialmente aparecerán con el estatus "Inactiva".',
      },
      {
        n: 3,
        title: "Selecciona tu domiciliación",
        description:
          "Haz clic sobre el número de contrato del servicio que deseas activar.",
      },
      {
        n: 4,
        title: "Confirma la domiciliación",
        description:
          'Verás los detalles de la solicitud. Haz clic en "Aceptar" y confirma nuevamente en la ventana de confirmación que aparece.',
      },
      {
        n: 5,
        title: "Genera tu clave de operaciones especiales",
        description:
          'El sistema te pedirá una clave de operaciones especiales. Haz clic en "Aceptar" para recibirla por mensaje de texto.',
      },
      {
        n: 6,
        title: "Introduce la clave recibida",
        description:
          'Ingresa la clave de operaciones especiales que llegó a tu teléfono y presiona "Aceptar".',
      },
    ],
  },
  "0108": {
    name: "Banco Provincial",
    guiedeUrl: provincial,
    steps: [
      {
        n: 1,
        title: "Entra al portal del Banco Provincial",
        description:
          'Dirígete al menú lateral en la parte inferior derecha de la página y selecciona "Gestionar débito inmediato".',
      },
      {
        n: 2,
        title: 'Haz clic en "Afiliar"',
        description:
          'Dentro de la sección "Afiliación interbancaria", selecciona el botón "Afiliar".',
      },
      {
        n: 3,
        title: "Activa tu domiciliación",
        description:
          'Se abrirá la información de la domiciliación. En el campo "Estatus", selecciona "Activa" y haz clic en "Confirmar".',
      },
      {
        n: 4,
        title: "Confirma tu identidad",
        description:
          'El sistema te pedirá ingresar tu clave especial. Escríbela y presiona "Confirmar".',
      },
      {
        n: 5,
        title: "Valida el proceso",
        description:
          'Recibirás una clave digital por SMS o correo electrónico. Ingrésala en el campo indicado y presiona "Confirmar".',
      },
    ],
  },
  "0104": {
    name: "Venezolano de Crédito",
    guiedeUrl: venezolano,
    steps: [
      {
        n: 1,
        title: "Entra al portal del Venezolano de Crédito",
        description:
          'Una vez dentro, dirígete al menú principal y despliega la opción "Cobros".',
      },
      {
        n: 2,
        title: 'Selecciona "Autorización previa"',
        description:
          'Dentro del menú de Cobros, haz clic en "Autorización previa".',
      },
      {
        n: 3,
        title: 'Haz clic en "Consultar Autorizados"',
        description:
          "Dentro de ese apartado, selecciona el módulo Consultar Autorizados.",
      },
      {
        n: 4,
        title: "Confirma tu acceso",
        description:
          "El sistema te pedirá ingresar tu contraseña de acceso para continuar.",
      },
      {
        n: 5,
        title: "Ubica y activa tu domiciliación",
        description:
          'Verás una lista con las solicitudes disponibles. Busca la de Bone Appetit y haz clic en el ícono con forma de "X" (equis) para activarla.',
      },
    ],
  },
  "0163": {
    name: "Banco del Tesoro",
    guiedeUrl: tesoro,
    steps: [
      {
        n: 1,
        title: "Entra al portal del Banco del Tesoro",
        description:
          'En el menú principal, ubicado al lado izquierdo de la pantalla, despliega "Débito Inmediato" y selecciona "Domiciliación".',
      },
      {
        n: 2,
        title: 'Dirígete al módulo "Afiliaciones"',
        description:
          'Verás una lista con todas tus domiciliaciones y su estatus. Ubica la que deseas activar y haz clic en "Autorizar".',
      },
      {
        n: 3,
        title: "Autoriza la solicitud",
        description:
          'Confirma la acción haciendo clic en "Autorizar" en la ventana de confirmación que aparece.',
      },
    ],
  },
};

export interface BankTutorial {
  name: string;
  guiedeUrl?: string;
  steps: { n: number; title: string; description: string }[];
  note?: string;
}

export const DEFAULT_BANK_STEPS: BankTutorial = {
  name: "tu banco",
  steps: [
    {
      n: 1,
      title: "Abre tu banca en línea",
      description: "Ingresa a la web o app de tu banco.",
    },
    {
      n: 2,
      title: "Busca Débito Inmediato o Domiciliación",
      description: "Puede estar en Pagos, Transferencias o un menú similar.",
    },
    {
      n: 3,
      title: "Busca la solicitud de Bone Appetit",
      description: "Verás una solicitud pendiente con el RIF J-404579427.",
    },
    {
      n: 4,
      title: "Aprueba la solicitud",
      description: "Haz clic en Autorizar o Aceptar y confirma la operación.",
    },
  ],
};
