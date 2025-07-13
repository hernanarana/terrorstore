 
const DateTime = luxon.DateTime;

//  DOM
const productosContainer = document.getElementById('productos-container');
const carritoLista       = document.getElementById('carrito-lista');
const carritoCount       = document.getElementById('carrito-count');
const totalCarrito       = document.getElementById('total-carrito');
const vaciarCarritoBtn   = document.getElementById('vaciar-carrito');
const finalizarCompraBtn = document.getElementById('finalizar-compra');
const carritoLateral     = document.getElementById('carrito-lateral');
const btnCarritoToggle   = document.getElementById('btn-carrito-toggle');
const btnMenu            = document.getElementById('btn-menu');
const menuLateral        = document.getElementById('menu-lateral');
const cerrarMenuBtn      = document.getElementById('cerrar-menu');
const cerrarCarritoBtn   = document.getElementById('cerrar-carrito');
const formulario         = document.getElementById('formulario');

// Productos
const productos = [
  { id: 1,  nombre: 'Figura Freddy Krueger',         descripcion: 'Figura coleccionable de alta calidad de Freddy Krueger.', precio: 2500, imagen: './img/muñeco de fredi.jpg' },
  { id: 2,  nombre: 'Póster Halloween',               descripcion: 'Póster oficial de la película Halloween en tamaño A2.', precio: 1200, imagen: './img/poster halloween.webp' },
  { id: 3,  nombre: 'Blu-ray Pesadilla en Elm Street', descripcion: 'Edición especial en Blu-ray de Pesadilla en Elm Street.', precio: 3500, imagen: './img/fredi dvd.jpg' },
  { id: 4,  nombre: 'Camiseta Chucky',                descripcion: 'Camiseta oficial con estampado de Chucky.', precio: 1800, imagen: './img/remera chuky.jpg' },
  { id: 5,  nombre: 'Máscara Jason Voorhees',         descripcion: 'Máscara icónica de Jason Voorhees para coleccionistas.', precio: 3200, imagen: './img/mascara.jpg' },
  { id: 6,  nombre: 'Libro de cuentos de terror',      descripcion: 'Antología con las mejores historias de terror clásicas.', precio: 1500, imagen: './img/cuentos de terror.webp' },
  { id: 7,  nombre: 'Funko Pop Pennywise',            descripcion: 'Figura Funko Pop de Pennywise.', precio: 2200, imagen: './img/funko nu[evo.jpeg' },
  { id: 8,  nombre: 'Set de velas temáticas',          descripcion: 'Velas decorativas con aroma oscuro.', precio: 900, imagen: './img/velas.jpg' },
  { id: 9,  nombre: 'DVD El Exorcista',               descripcion: 'Película clásica El Exorcista en DVD.', precio: 1300, imagen: './img/exorcista dvd.jpg' },
  { id: 10, nombre: 'Buzo Hellraiser',              descripcion: 'Buzo con diseño Hellraiser.', precio: 2700, imagen: './img/hellraiser-sweatshirtwfdlq.jpg' },
  { id: 11, nombre: 'Póster It',                      descripcion: 'Póster oficial de la película It.', precio: 1100, imagen: './img/poster de it.jpg' },
  { id: 12, nombre: 'Llaveros terror',                descripcion: 'Pack de 5 llaveros de personajes.', precio: 800,  imagen: './img/llaveros.webp' },
  { id: 13, nombre: 'Disfraz La monja',               descripcion: 'Disfraz todos los talles. Perfecta para tus noches de terror.', precio: 3800, imagen: './img/disfraz de la monja.jpg' },
  { id: 14, nombre: 'Colección Stephen King',         descripcion: 'Colección completa de los libros del maestro del terror.', precio:22000, imagen:'./img/libros king.webp' },
  { id: 15, nombre: 'Annabelle',                      descripcion: 'La muñeca réplica de la película.', precio: 1900, imagen: './img/muñeca anabelle.jpg' }
];


let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Mostrar productos
function mostrarProductos() {
  productosContainer.innerHTML = '';
  productos.forEach(prod => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}" class="product-image" />
      <div class="product-info">
        <h3 class="product-name">${prod.nombre}</h3>
        <p class="product-description">${prod.descripcion}</p>
        <p class="product-price">$${prod.precio}</p>
        <button class="product-button" data-id="${prod.id}">Agregar al carrito</button>
      </div>
    `;
    productosContainer.appendChild(card);
  });
}

// Actualizar carrito
function actualizarCarrito() {
  carritoLista.innerHTML = '';
  if (!carrito.length) {
    carritoLista.innerHTML = '<p>El carrito está vacío.</p>';
    totalCarrito.textContent = 'Total: $0';
    carritoCount.textContent = '0';
    return;
  }
  carrito.forEach(item => {
    const li = document.createElement('li');
    li.className = 'carrito-item';
    li.innerHTML = `
      <div class="carrito-item-info">
        <strong>${item.nombre}</strong> - Cantidad: ${item.cantidad} - Subtotal: $${item.precio * item.cantidad}
      </div>
      <button class="btn btn-danger btn-quitar" data-id="${item.id}">❌</button>
    `;
    carritoLista.appendChild(li);
  });
  const total = carrito.reduce((sum, i) => sum + i.precio * i.cantidad, 0);
  totalCarrito.textContent = `Total: $${total}`;
  carritoCount.textContent = carrito.reduce((sum, i) => sum + i.cantidad, 0);
}

// Guardar carrito
function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Agregar al carrito
function agregarAlCarrito(id) {
  const prod = productos.find(p => p.id === id);
  const item = carrito.find(i => i.id === id);
  if (item) item.cantidad = Math.min(item.cantidad + 1, 10);
  else carrito.push({ ...prod, cantidad: 1 });
  guardarCarrito();
  actualizarCarrito();
}

// Quitar del carrito
function quitarDelCarrito(id) {
  carrito = carrito.filter(i => i.id !== id);
  guardarCarrito();
  actualizarCarrito();
}

// Confetti de sangre
function mostrarConfetti() {
  const container = document.createElement('div');
  Object.assign(container.style, {
    position: 'fixed', top: 0, left: 0,
    width: '100%', height: '100%',
    pointerEvents: 'none', zIndex: 9999
  });
  document.body.appendChild(container);
  for (let i = 0; i < 50; i++) {
    const drop = document.createElement('div');
    Object.assign(drop.style, {
      position: 'absolute',
      width: '4px',
      height: `${Math.floor(Math.random() * 60 + 20)}px`,
      backgroundColor: 'darkred',
      top: '-20px',
      left: `${Math.random() * window.innerWidth}px`,
      opacity: Math.random(),
      borderRadius: '2px',
      animation: 'drop-blood 2.5s ease-out forwards'
    });
    container.appendChild(drop);
  }
  setTimeout(() => container.remove(), 3000);
}

// Finalizar compra
function finalizarCompra() {
  if (!carrito.length) {
    return Swal.fire('Tu carrito está vacío.', '', 'info');
  }
  const total = carrito.reduce((sum, i) => sum + i.precio * i.cantidad, 0);
  const fecha = DateTime.now().setLocale('es').toLocaleString(DateTime.DATETIME_MED);
  Swal.fire({
    title: 'Confirmar compra',
    html: `<p>Total: <strong>$${total}</strong></p><p>Fecha: ${fecha}</p>`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, comprar',
    cancelButtonText: 'Cancelar'
  }).then(res => {
    if (res.isConfirmed) {
      carrito = [];
      guardarCarrito();
      actualizarCarrito();
      mostrarConfetti();
      Swal.fire('¡Gracias por tu compra!', '', 'success');
    }
  });
}

// Val formulario
formulario.addEventListener('submit', e => {
  e.preventDefault();
  const campos = ['nombre','email','direccion','telefono']
    .map(id => document.getElementById(id).value.trim());
  if (campos.some(v => !v)) {
    return Swal.fire('Completa todos los campos.', '', 'warning');
  }
  Swal.fire('Datos enviados.', '', 'success');
  formulario.reset();
});

//  menú y carrito
btnMenu.addEventListener('click',    () => menuLateral.classList.toggle('menu-visible'));
btnCarritoToggle.addEventListener('click', () => carritoLateral.classList.toggle('carrito-oculto'));
cerrarMenuBtn.addEventListener('click',   () => menuLateral.classList.remove('menu-visible'));
cerrarCarritoBtn.addEventListener('click',() => carritoLateral.classList.add('carrito-oculto'));

// Vaciar carrito
vaciarCarritoBtn.addEventListener('click', () => {
  carrito = [];
  guardarCarrito();
  actualizarCarrito();
});

// Eventos 
productosContainer.addEventListener('click', e => {
  if (e.target.matches('.product-button')) {
    agregarAlCarrito(+e.target.dataset.id);
  }
});
carritoLista.addEventListener('click', e => {
  if (e.target.matches('.btn-quitar')) {
    quitarDelCarrito(+e.target.dataset.id);
  }
});

//  finalizar compra
finalizarCompraBtn.addEventListener('click', finalizarCompra);

// Inicia al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  mostrarProductos();
  actualizarCarrito();
});
