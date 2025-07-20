// main.js

// 1. IMPORTS / CONSTANTES
const DateTime = luxon.DateTime;

// 2. Variables globales
let productos = [];
let carrito   = JSON.parse(localStorage.getItem('carrito')) || [];

// 3. Inicialización de la app
window.addEventListener('DOMContentLoaded', async () => {
  // Referencias al DOM
  const btnMenu           = document.getElementById('btn-menu');
  const cerrarMenuBtn     = document.getElementById('cerrar-menu');
  const menu              = document.getElementById('menu-lateral');
  const btnCartToggle     = document.getElementById('btn-carrito-toggle');
  const cart              = document.getElementById('carrito-lateral');
  const cerrarCartBtn     = document.getElementById('cerrar-carrito');
  const vaciarBtn         = document.getElementById('vaciar-carrito');
  const confirmarBtn      = document.getElementById('confirmar-compra');
  const checkoutView      = document.getElementById('checkout-view');
  const checkoutForm      = document.getElementById('checkout-form');
  const cancelarBtn       = document.getElementById('cancelar-checkout');
  const productosContainer = document.getElementById('productos-container');

  // Oculta el formulario de checkout al iniciar
  checkoutView.style.display = 'none';

  // Carga de productos desde JSON
  try {
    const res = await fetch('./productos.json');
    productos = await res.json();
  } catch (e) {
    console.error('Error al cargar productos.json:', e);
  }

  // Render inicial
  renderizarProductos();
  actualizarCarrito();

  // Eventos del menú
  btnMenu.addEventListener('click',    () => menu.classList.toggle('menu-visible'));
  cerrarMenuBtn.addEventListener('click', () => menu.classList.remove('menu-visible'));

  // Eventos del carrito lateral
  btnCartToggle.addEventListener('click',    () => cart.classList.toggle('carrito-oculto'));
  cerrarCartBtn.addEventListener('click',    () => cart.classList.add('carrito-oculto'));

  // Agregar producto al carrito (sin abrirlo automáticamente)
  productosContainer.addEventListener('click', e => {
    if (!e.target.matches('.product-button')) return;
    agregarAlCarrito(+e.target.dataset.id);
  });

  // Botones dentro del carrito
  document.getElementById('carrito-lista').addEventListener('click', e => {
    const id = +e.target.dataset.id;
    if (e.target.matches('.btn-increase')) updateCantidad(id, +1);
    if (e.target.matches('.btn-decrease')) updateCantidad(id, -1);
    if (e.target.matches('.btn-quitar'))   quitarDelCarrito(id);
    guardarCarrito();
    actualizarCarrito();
  });

  // Vaciar carrito
  vaciarBtn.addEventListener('click', () => {
    carrito = [];
    guardarCarrito();
    actualizarCarrito();
  });

  // Mostrar formulario de checkout
  confirmarBtn.addEventListener('click', () => {
    if (!carrito.length) {
      return Swal.fire('Carrito vacío', 'Agrega productos antes', 'info');
    }
    cart.classList.add('carrito-oculto');
    checkoutView.style.display = 'flex';
    checkoutView.scrollIntoView({ behavior: 'smooth' });
  });

  // Cancelar checkout -> volver al carrito
  cancelarBtn.addEventListener('click', () => {
    checkoutView.style.display = 'none';
    cart.classList.remove('carrito-oculto');
  });

  // Procesar el formulario de checkout
  checkoutForm.addEventListener('submit', e => {
    e.preventDefault();
    checkoutForm.querySelectorAll('.error').forEach(el => el.style.display = 'none');

    const name  = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const dir   = document.getElementById('direccion').value.trim();
    const tel   = document.getElementById('telefono').value.trim();
    const card  = document.getElementById('tarjeta').value.trim();

    // Validaciones regex
    const nameRe  = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    const emailRe = /^[\w.-]+@[\w.-]+\.\w{2,}$/;
    const phoneRe = /^\d{7,15}$/;
    const cardRe  = /^\d{16}$/;

    if (!nameRe.test(name))     return document.getElementById('err-nombre').style.display = 'block';
    if (!emailRe.test(email))   return document.getElementById('err-email').style.display = 'block';
    if (!dir)                   return document.getElementById('err-direccion').style.display = 'block';
    if (!phoneRe.test(tel))     return document.getElementById('err-telefono').style.display = 'block';
    if (!cardRe.test(card))     return document.getElementById('err-tarjeta').style.display = 'block';

    // Confirmación final
    const total = carrito.reduce((sum, i) => sum + i.precio * i.cantidad, 0);
    const fecha = DateTime.now().setLocale('es').toLocaleString(DateTime.DATETIME_MED);

    Swal.fire({
      title: 'Compra confirmada',
      html: `<p>Gracias <b>${name}</b>.</p><p>Total: <b>$${total}</b></p><p>Fecha: ${fecha}</p>`,
      icon: 'success'
    }).then(() => {
      mostrarConfetti();
      carrito = [];
      guardarCarrito();
      actualizarCarrito();
      checkoutForm.reset();
      checkoutView.style.display = 'none';
    });
  });
});

// === Funciones auxiliares ===

function renderizarProductos() {
  const container = document.getElementById('productos-container');
  container.innerHTML = '';
  productos.forEach(p => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}" class="product-image">
      <div class="product-info">
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <p class="product-price">$${p.precio}</p>
        <button class="product-button" data-id="${p.id}">Agregar al carrito</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function actualizarCarrito() {
  const lista     = document.getElementById('carrito-lista');
  const totalElem = document.getElementById('total-carrito');
  const countElem = document.getElementById('carrito-count');
  lista.innerHTML = '';
  if (!carrito.length) {
    lista.innerHTML = '<p>El carrito está vacío.</p>';
    totalElem.textContent = 'Total: $0';
    countElem.textContent = '0';
    return;
  }
  carrito.forEach(item => {
    const li = document.createElement('li');
    li.className = 'carrito-item';
    li.innerHTML = `
      <div class="item-row">
        <strong>${item.nombre}</strong>
        <div class="quantity-controls">
          <button class="btn-decrease" data-id="${item.id}">–</button>
          <span>${item.cantidad}</span>
          <button class="btn-increase" data-id="${item.id}">+</button>
        </div>
        <span class="subtotal">$${item.precio * item.cantidad}</span>
      </div>
      <button class="btn-quitar" data-id="${item.id}">❌</button>
    `;
    lista.appendChild(li);
  });
  const total = carrito.reduce((sum, i) => sum + i.precio * i.cantidad, 0);
  totalElem.textContent = `Total: $${total}`;
  countElem.textContent = carrito.reduce((sum, i) => sum + i.cantidad, 0);
}

function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function agregarAlCarrito(id) {
  const prod   = productos.find(p => p.id === id);
  const existe = carrito.find(i => i.id === id);
  if (existe) existe.cantidad = Math.min(existe.cantidad + 1, 10);
  else carrito.push({ ...prod, cantidad: 1 });
  guardarCarrito();
  actualizarCarrito();
}

function quitarDelCarrito(id) {
  carrito = carrito.filter(i => i.id !== id);
  guardarCarrito();
  actualizarCarrito();
}

function updateCantidad(id, delta) {
  carrito = carrito.map(i =>
    i.id === id
      ? { ...i, cantidad: Math.max(1, Math.min(i.cantidad + delta, 10)) }
      : i
  );
}

function mostrarConfetti() {
  const container = document.createElement('div');
  Object.assign(container.style, { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9999 });
  document.body.appendChild(container);
  for (let i = 0; i < 50; i++) {
    const drop = document.createElement('div');
    Object.assign(drop.style, { position: 'absolute', width: '4px', height: `${Math.random() * 60 + 20}px`, backgroundColor: 'darkred', top: '-20px', left: `${Math.random() * window.innerWidth}px`, opacity: Math.random(), borderRadius: '2px', animation: 'drop-blood 2.5s forwards' });
    container.appendChild(drop);
  }
  setTimeout(() => container.remove(), 3000);
}
