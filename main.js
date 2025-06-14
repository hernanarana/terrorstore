// Productos disponibles
const productos = [
 {
 id: 1,
 nombre: 'Figura Freddy Krueger',
  descripcion: 'Figura coleccionable de alta calidad de Freddy Krueger.',
 precio: 2500,
 imagen: './img/fredi dvd.jpg', //
 },
 {
 id: 2,
 nombre: 'Póster Halloween',
 descripcion: 'Póster oficial de la película Halloween en tamaño A2.',
 precio: 1200,
 imagen: './img/poster halloween.webp', // 
 },
 {
 id: 3,
 nombre: 'Blu-ray Pesadilla en Elm Street',
 descripcion: 'Edición especial en Blu-ray de Pesadilla en Elm Street.',
 precio: 3500,
 imagen: './img/pesadilla en elm street.jpg', // 
 },
 {
 id: 4,
 nombre: 'Camiseta Chucky',
 descripcion: 'Camiseta oficial con estampado de Chucky.',
 precio: 1800,
 imagen: './img/remera chuky.jpg', // 
 },
 {
 id: 5,
 nombre: 'Máscara Jason Voorhees',
 descripcion: 'Máscara icónica de Jason Voorhees para coleccionistas.',
 precio: 3200,
 imagen: './img/mascara.jpg', // 
 },
 {
 id: 6,
 nombre: 'Libro de cuentos de terror',
 descripcion: 'Antología con las mejores historias de terror clásicas.',
 precio: 1500,
 imagen: './img/cuentos de terror.webp', // 
 },
 {
 id: 7,
 nombre: 'Funko Pop Pennywise',
 descripcion: 'Figura Funko Pop de Pennywise, el payaso bailarín.',
 precio: 2200,
 imagen: './img/funko-pop-it-payaso-bailarin-p....webp', // 
 },
 {
 id: 8,
  nombre: 'Set de velas temáticas',
 descripcion: 'Velas decorativas con aroma oscuro y diseño terrorífico.',
 precio: 900,
 imagen: './img/velas.jpg', // 
 },
 {
 id: 9,
 nombre: 'DVD El Exorcista',
 descripcion: 'Película clásica El Exorcista en edición DVD.',
 precio: 1300,
 imagen: './img/exorcista dvd.jpg', // 
 },
 {
  id: 10,
 nombre: 'Sudadera Hellraiser',
 descripcion: 'Sudadera con capucha y diseño de Hellraiser.',
 precio: 2700,
 imagen: './img/hellraiser-sweatshirtwfdlg.jpg', // 
 },
 {
 id: 11,
 nombre: 'Póster It',
 descripcion: 'Póster oficial de la película It, tamaño A3.',
 precio: 1100,
 imagen: './img/poster de it.jpg', // 
 },
 {
 id: 12,
 nombre: 'Llaveros terror',
 descripcion: 'Pack de 5 llaveros de personajes terroríficos.',
 precio: 800,
 imagen: './img/llaveros.webp', // 
 },
];

// Variables DOM
const productosContainer = document.getElementById('productos-container');
const carritoLista = document.getElementById('carrito-lista');
const carritoCount = document.getElementById('carrito-count');
const totalCarrito = document.getElementById('total-carrito');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const finalizarCompraBtn = document.getElementById('finalizar-compra');
const carritoLateral = document.getElementById('carrito-lateral');
const btnCarritoToggle = document.getElementById('btn-carrito-toggle');
const btnMenu = document.getElementById('btn-menu');
const menuLateral = document.getElementById('menu-lateral');

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Mostrar productos en pantalla
function mostrarProductos() {
 productosContainer.innerHTML = '';
 productos.forEach((producto) => {
 const card = document.createElement('article');
 card.classList.add('product-card');
 card.setAttribute('tabindex', '0');
 card.setAttribute('aria-label', `${producto.nombre}: ${producto.descripcion}, precio $${producto.precio}`);

 card.innerHTML = `
 <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image" />
 <div class="product-info">
 <h3 class="product-name">${producto.nombre}</h3>
 <p class="product-description">${producto.descripcion}</p>
 <p class="product-price">$${producto.precio}</p>
 <button class="product-button" aria-label="Agregar ${producto.nombre} al carrito" data-id="${producto.id}">Agregar al carrito</button>
 </div>
 `;

 productosContainer.appendChild(card);
 });
}

// Actualizar carrito (lista, contador y total)
function actualizarCarrito() {
 carritoLista.innerHTML = '';

 if (carrito.length === 0) {
 carritoLista.innerHTML = '<p>El carrito está vacío.</p>';
 totalCarrito.textContent = 'Total: $0';
 carritoCount.textContent = '0';
 return;
 }

 carrito.forEach((item) => {
 const li = document.createElement('li');
 li.classList.add('carrito-item');

 li.innerHTML = `
 <img src="${item.imagen}" alt="${item.nombre}" class="carrito-thumb" />
 <div class="carrito-item-info">
 <strong>${item.nombre}</strong>
 <p>Cantidad: ${item.cantidad}</p>
 <p>Subtotal: $${item.precio * item.cantidad}</p>
 </div>
 <button aria-label="Quitar ${item.nombre} del carrito" class="btn btn-danger btn-quitar" data-id="${item.id}">❌</button>
 `;

 carritoLista.appendChild(li);
 });

 const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
 totalCarrito.textContent = `Total: $${total}`;

 const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);
 carritoCount.textContent = cantidadTotal;
}

// Agregar producto al carrito
function agregarAlCarrito(id) {
 const producto = productos.find((p) => p.id === id);
 if (!producto) return;

 const itemEnCarrito = carrito.find((item) => item.id === id);

 if (itemEnCarrito) {
 if (itemEnCarrito.cantidad >= 10) {
 Swal.fire({
 toast: true,
 position: 'top-end',
 icon: 'warning',
 title: `Has alcanzado el máximo de 10 unidades de ${producto.nombre}.`,
 showConfirmButton: false,
 timer: 2000,
 timerProgressBar: true,
 });
 return;
 }
 itemEnCarrito.cantidad++;
 Swal.fire({
 toast: true,
 position: 'top-end',
 icon: 'info',
 title: `${producto.nombre} ya está en el carrito. Se aumentó la cantidad.`,
 showConfirmButton: false,
 timer: 2000,
 timerProgressBar: true,
 });
 } else {
 carrito.push({...producto, cantidad: 1});
 Swal.fire({
 toast: true,
 position: 'top-end',
 icon: 'success',
 title: `${producto.nombre} agregado al carrito.`,
 showConfirmButton: false,
 timer: 2000,
 timerProgressBar: true,
 });
 }

 guardarCarrito();
 actualizarCarrito();
}

// Quitar producto del carrito
function quitarDelCarrito(id) {
 carrito = carrito.filter((item) => item.id !== id);
 guardarCarrito();
 actualizarCarrito();

 Swal.fire({
 toast: true,
 position: 'top-end',
 icon: 'warning',
 title: 'Producto eliminado del carrito.',
 showConfirmButton: false,
 timer: 1500,
 timerProgressBar: true,
 });
}

// Guardar carrito en localStorage
function guardarCarrito() {
 localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Vaciar carrito
vaciarCarritoBtn.addEventListener('click', () => {
 if (carrito.length === 0) {
 Swal.fire({
 icon: 'info',
 title: 'El carrito ya está vacío.',
 timer: 1500,
 showConfirmButton: false,
 });
 return;
 }

 Swal.fire({
 title: '¿Seguro quieres vaciar el carrito?',
 icon: 'warning',
 showCancelButton: true,
 confirmButtonText: 'Sí, vaciar',
 cancelButtonText: 'Cancelar',
 }).then((result) => {
 if (result.isConfirmed) {
 carrito = [];
 guardarCarrito();
 actualizarCarrito();
 Swal.fire({
 icon: 'success',
 title: 'Carrito vaciado.',
 timer: 1500,
 showConfirmButton: false,
 });
 }
 });
});

// Finalizar compra
finalizarCompraBtn.addEventListener('click', () => {
 if (carrito.length === 0) {
 Swal.fire({
 icon: 'info',
 title: 'Tu carrito está vacío.',
 timer: 1500,
 showConfirmButton: false,
 });
 return;
 }

 const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

 Swal.fire({
 title: 'Confirmar compra',
 html: `<p>Total a pagar: <strong>$${total}</strong></p><p>¿Deseas finalizar tu compra?</p>`,
 icon: 'question',
 showCancelButton: true,
 confirmButtonText: 'Sí, comprar',
 cancelButtonText: 'Cancelar',
 }).then((result) => {
 if (result.isConfirmed) {
 carrito = [];
 guardarCarrito();
 actualizarCarrito();
Swal.fire({
 icon: 'success',
 title: '¡Compra realizada con éxito! Gracias por elegirnos.',
 timer: 2500,
 showConfirmButton: false,
 });
 }
 });
});

// Mostrar u ocultar carrito lateral con accesibilidad
btnCarritoToggle.addEventListener('click', () => {
 const isHidden = carritoLateral.classList.toggle('carrito-oculto');
 btnCarritoToggle.setAttribute('aria-expanded', !isHidden);
 carritoLateral.setAttribute('aria-hidden', isHidden);
});

//  agregar producto
productosContainer.addEventListener('click', (e) => {
 if (e.target.classList.contains('product-button')) {
 const id = parseInt(e.target.getAttribute('data-id'));
 agregarAlCarrito(id);
 }
});

//  quitar producto
carritoLista.addEventListener('click', (e) => {
 if (e.target.classList.contains('btn-quitar')) {
 const id = parseInt(e.target.getAttribute('data-id'));
 quitarDelCarrito(id);
 }
});

// Toggle menú lateral (con el botón de hamburguesa)
btnMenu.addEventListener('click', () => {
 menuLateral.classList.toggle('menu-visible');
btnMenu.setAttribute('aria-expanded', menuLateral.classList.contains('menu-visible'));
menuLateral.setAttribute('aria-hidden', !menuLateral.classList.contains('menu-visible'));
});

// Inicializar
mostrarProductos();
actualizarCarrito();