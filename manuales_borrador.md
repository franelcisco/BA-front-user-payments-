

# Manual de Usuario (Borrador para Personal de la Empresa)

## Introducción
La plataforma BoneAppetit Pagos está diseñada para que los clientes de la empresa puedan realizar el pago de sus órdenes de manera sencilla y segura. Con el objetivo de que puedan comprender el funcionamiento del sistema, sus casos de uso y así brindar soporte efectivo a los usuarios finales, además de entender los posibles escenarios y problemas que pueden presentarse durante el proceso de pago.

## Funcionalidades Principales
- **Validación de pagos:** Consultar y verificar el estado de pago de una orden ingresando el número correspondiente.
- **Selección de método de pago:** Elegir entre Débito Directo, Pago Móvil, Zelle o Efectivo, según la preferencia del cliente.
- **Carga de comprobantes:** Recibir y almacenar imágenes de comprobantes de pago.
- **Actualización de datos:** Modificar la identificación de representante (Parent ID) cuando la orden lo requiera.
- **Visualización de estado:** Verificar si la orden está pagada, pendiente o en proceso, facilitando el seguimiento.

## Procedimiento de Uso
1. **Buscar la orden:** Ingrese el número de orden en la pantalla principal y presione buscar, o genere un enlace con el parámetro `orderId=<Shopify order ID>` para acceso directo.
2. **Seleccionar método de pago:** El sistema mostrará los métodos disponibles. Seleccione el que corresponda según la información del cliente.
3. **Completar el formulario:** Ingrese los datos requeridos para el método seleccionado. Si corresponde, adjunte la imagen del comprobante.
4. **Enviar y validar:** Presione el botón de enviar. El sistema procesará la validación y mostrará el resultado.
5. **Verificar estado:** Confirme si el pago fue aprobado, está pendiente o requiere acciones adicionales.

## Métodos de Pago y Casos de Uso

A continuación se describen los métodos de pago disponibles en la plataforma, junto con su funcionamiento y posibles incidencias:

### 1. Débito Directo
El pago se valida mediante integración con el banco R4 vía API. Al finalizar, la orden se marca como pagada en Shopify y se registra el intento en la base de datos, sea exitoso o no. Este proceso puede tardar varios minutos.

**Problemas frecuentes:**
- **Pendiente por verificación:** Si el banco excede el tiempo de espera, el usuario verá un mensaje de pendiente y se activará un proceso en segundo plano para validar el pago.
- **Errores controlados:** Si ocurre un error controlado, se registra en la base de datos junto con la información del intento. Consulte la documentación de R4 para detalles.
- **Errores no controlados:** Puede deberse a una falla con el API del banco. Revise el historial de transacciones en el banco, ya que en estos casos no se guarda el intento en la base de datos.

### 2. Pago Móvil
Existen dos formas de validación:
- **Manual:** Se verifica en la base de datos que exista el pago usando teléfono, referencia (últimos 4 dígitos), banco y fecha.
- **Automática:** Se verifica si el pago existe solo usando el teléfono registrado por el usuario.

**Problemas frecuentes:**
- **Pago no encontrado:** El usuario debe responder un formulario que lo llevará a dos opciones: cargar un comprobante para verificación manual o verificar los datos ingresados.

### 3. Zelle
El usuario debe cargar el comprobante de pago para su posterior verificación manual.

### 4. Efectivo
El usuario debe ingresar el monto con el que realizará el pago en efectivo. Si el monto es mayor al valor de la orden, podrá decidir si deja la diferencia como propina o solicita el vuelto, en cuyo caso deberá llenar un formulario de reembolso. La carga de imagen de los billetes es opcional.

### 5. Problemas generales
- **Errores de validación:** Si ocurre un error interno, el usuario verá un mensaje de error y podrá elegir otro método de pago.

---