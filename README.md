# TerrorStore 🩸

Simulador de e-commerce temático de terror, hecho en JavaScript puro como proyecto final del curso de JavaScript. Recorrés un catálogo de productos de miedo, armás el carrito y cerrás la compra con una animación de "lluvia de sangre".

> Demo: _[link pendiente de publicación]_

## Qué hace

- **Catálogo dinámico**: los productos se cargan con `fetch` desde `productos.json` y las tarjetas se generan desde JavaScript.
- **Carrito** con botones para sumar y restar unidades, y el total actualizado al momento.
- **Checkout** con formulario validado y resumen final de la compra.
- **Fecha de compra en español** con Luxon.
- **Alertas y confirmaciones** con SweetAlert2.
- **Ambientación**: tipografía Creepster, parpadeos y animación final.

## Tecnologías

| Área | Herramientas |
| --- | --- |
| Base | HTML, CSS y JavaScript (sin frameworks) |
| Librerías | SweetAlert2, Luxon |
| Datos | JSON local con `fetch` |

## Cómo correrlo

No necesita instalación. Como los productos se cargan con `fetch`, abrilo con un servidor local, por ejemplo con la extensión **Live Server** de VS Code, o con:

```bash
npx serve .
```

---

Desarrollado por **Hernán Arana** · [LuSan PRO](#) — SAP HANA · Data Science · Web · Marketing digital
