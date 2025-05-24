// Catálogo de productos
const catalogo = [
    { id: 1, nombre: "El Conjuro - Digital", tipo: "digital", precio: 1000 },
    { id: 2, nombre: "Annabelle - Digital", tipo: "digital", precio: 1500 },
    { id: 3, nombre: "El Exorcista", tipo: "fisico", precio: 3000 },
    { id: 4, nombre: "IT - Remeras", tipo: "merch", precio: 3500 },
    { id: 5, nombre: "Terrifier - Disfraz", tipo: "merch", precio: 10000 },
];

let carrito = [];
let seguirComprando = true;

alert("¡Bienvenidos a TerrorStore - Tienda Online!");

while (seguirComprando) {
    // Mostramos el catálogo
    let mensaje = "Catálogo:\n";
    catalogo.forEach(producto => {
        mensaje += `${producto.id} - ${producto.nombre} ($${producto.precio})\n`;
    });

    // Pedimos selección
    let opcion = prompt(mensaje + "\nIngresá el número del producto que querés comprar:");

    let productoSeleccionado = catalogo.find(p => p.id === parseInt(opcion));

    if (productoSeleccionado) {
        carrito.push(productoSeleccionado);
        alert(`Agregaste: ${productoSeleccionado.nombre} al carrito.`);
    } else {
        alert("Producto no válido. Intentalo de nuevo.");
    }

    seguirComprando = confirm("¿Querés seguir comprando?");
}

// Calcular total
let total = carrito.reduce((sum, producto) => sum + producto.precio, 0);

// Mostrar el resumen
let resumen = "Gracias por tu compra. Elegiste:\n";
carrito.forEach(p => {
    resumen += `- ${p.nombre} ($${p.precio})\n`;
});
resumen += `Total: $${total}`;

alert(resumen);
console.log(resumen);
