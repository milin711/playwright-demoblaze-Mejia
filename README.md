# Pruebas automatizadas de Demoblaze con Playwright

Proyecto del laboratorio de pruebas automatizadas. Página bajo prueba: https://www.demoblaze.com

**Autor:** Andres Camilo Mejia

## Tecnologías

Playwright, TypeScript, Node.js, dotenv.

## Cómo ejecutar

```bash
npm install
npx playwright install chromium
cp .env.example .env     # completa DEMO_USER y DEMO_PASSWORD
npx playwright test
npx playwright show-report
```

## Historias de usuario

### HU-01 Inicio de sesión

Como cliente quiero iniciar sesión para acceder a mi cuenta.

```gherkin
# language: es
Característica: Inicio de sesión

  Escenario: Login exitoso
    Dado que estoy en el formulario de inicio de sesión
    Cuando ingreso mis credenciales válidas
    Entonces veo el mensaje de bienvenida con mi usuario

  Escenario: Login con contraseña incorrecta
    Dado que estoy en el formulario de inicio de sesión
    Cuando ingreso mi usuario y una contraseña incorrecta
    Entonces veo la alerta "Wrong password."

  Escenario: Login con usuario inexistente
    Dado que estoy en el formulario de inicio de sesión
    Cuando ingreso un usuario inexistente y cualquier contraseña
    Entonces veo la alerta "User does not exist."
```

### HU-02 Agregar producto al carrito

Como cliente quiero agregar un producto al carrito para comprarlo.

```gherkin
# language: es
Característica: Agregar producto al carrito

  Escenario: Agregar el Samsung galaxy s6
    Dado que estoy en la página del Samsung galaxy s6
    Cuando agrego el producto al carrito
    Entonces veo la alerta "Product added"

  Escenario: Ver el producto en el carrito
    Dado que agregué el Samsung galaxy s6 al carrito
    Cuando abro el carrito
    Entonces veo el producto y el total de 360
```

### HU-03 Finalizar compra

Como cliente quiero finalizar la compra de los productos de mi carrito.

```gherkin
# language: es
Característica: Finalizar compra

  Escenario: Compra completa
    Dado que tengo el Samsung galaxy s6 en el carrito
    Cuando completo los datos de compra y confirmo
    Entonces veo la confirmación "Thank you for your purchase!"
    Y veo el monto "Amount: 360 USD"

  Escenario: Compra sin datos obligatorios
    Dado que tengo abierto el formulario de compra
    Cuando confirmo sin completar los datos obligatorios
    Entonces veo la alerta "Please fill out Name and Creditcard."

  Escenario: La fecha de la compra es la de hoy
    Dado que tengo abierto el formulario de compra
    Cuando completo los datos obligatorios y confirmo
    Entonces la fecha de compra coincide con la fecha de hoy
```

## Casos de prueba

| ID | HU | Nombre | Resultado esperado | Estado |
| --- | --- | --- | --- | --- |
| CP-01 | HU-01 | Login exitoso | "Welcome \<usuario>" visible | Pasa |
| CP-02 | HU-01 | Contraseña incorrecta | Alerta "Wrong password." | Pasa |
| CP-03 | HU-01 | Usuario inexistente | Alerta "User does not exist." | Pasa |
| CP-04 | HU-02 | Agregar Samsung galaxy s6 | Alerta "Product added" | Pasa |
| CP-05 | HU-02 | Producto en el carrito | Fila y total 360 | Pasa |
| CP-06 | HU-03 | Compra completa | "Thank you for your purchase!" | Pasa |
| CP-07 | HU-03 | Compra sin datos | Alerta "Please fill out Name and Creditcard." | Pasa |
| CP-08 | HU-03 | Fecha de la compra | Fecha de hoy | Defecto conocido |

## Defectos encontrados

**DEF-01:** la confirmación de compra muestra el mes anterior al actual
(por ejemplo, `17/10/2026` cuando la fecha real era 17/11/2026).
Probable causa: el mes se cuenta desde 0 y no se le suma 1.

## Evidencias

Capturas en la carpeta [`evidencias/`](./evidencias).

## Decisiones

- Las credenciales van en `.env` (ignorado por Git), nunca en el código.
- Las alertas del navegador se manejan con `waitForEvent('dialog')`.
- Se usan locators por rol e id, y `beforeEach` para las precondiciones.
