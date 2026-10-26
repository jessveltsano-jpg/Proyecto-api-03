const API_URL = 'https://fakestoreapi.com/products';
const LIMITE_DESCRIPCION = 100;

// querySelector() permite seleccionar un elemento del HTML usando un selector CSS.
const contenedorDatos = document.querySelector('#contenedor-datos');

document.addEventListener('DOMContentLoaded', () => {
  cargarProductos();
});

function cargarProductos() {
  mostrarCargando();

  // fetch() realiza una peticion HTTP a la API para obtener datos reales.
  fetch(API_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error('No se pudo obtener la informacion de productos.');
      }

      // response.json() convierte la respuesta de la API en datos JavaScript.
      return response.json();
    })
    .then((productos) => {
      mostrarProductos(productos);
    })
    // catch() captura errores de red o problemas durante la peticion.
    .catch((error) => {
      mostrarError(error.message);
    });
}

function mostrarCargando() {
  limpiarContenedor();

  const columna = document.createElement('div');
  columna.classList.add('col-12');

  const cajaCarga = document.createElement('div');
  cajaCarga.classList.add('loading-box', 'd-flex', 'flex-column', 'align-items-center', 'justify-content-center', 'text-center', 'p-4');

  const spinner = document.createElement('div');
  spinner.classList.add('spinner-border', 'text-primary', 'mb-3');
  spinner.setAttribute('role', 'status');
  spinner.setAttribute('aria-label', 'Cargando productos');

  const mensaje = document.createElement('p');
  mensaje.classList.add('fw-semibold', 'mb-0');
  mensaje.textContent = 'Cargando productos...';

  cajaCarga.append(spinner, mensaje);

  // appendChild() agrega un elemento hijo dentro de otro elemento padre.
  columna.appendChild(cajaCarga);
  contenedorDatos.appendChild(columna);
}

function mostrarProductos(productos) {
  limpiarContenedor();

  // forEach() recorre cada objeto del array de productos recibido desde la API.
  productos.forEach((producto) => {
    const columna = crearColumnaProducto();
    const tarjeta = crearTarjetaProducto(producto);

    columna.appendChild(tarjeta);
    contenedorDatos.appendChild(columna);
  });
}

function crearColumnaProducto() {
  // createElement() crea un nuevo elemento HTML desde JavaScript.
  const columna = document.createElement('div');
  columna.classList.add('col-12', 'col-md-6', 'col-lg-4');

  return columna;
}

function crearTarjetaProducto(producto) {
  const tarjeta = document.createElement('article');
  tarjeta.classList.add('card', 'product-card');

  const contenedorImagen = document.createElement('div');
  contenedorImagen.classList.add('product-image-wrapper');

  const imagen = document.createElement('img');
  imagen.classList.add('product-image');
  imagen.setAttribute('src', producto.image);
  imagen.setAttribute('alt', producto.title);
  imagen.setAttribute('loading', 'lazy');

  const cuerpo = document.createElement('div');
  cuerpo.classList.add('card-body', 'd-flex', 'flex-column');

  const categoria = document.createElement('span');
  categoria.classList.add('category-badge', 'badge', 'rounded-pill', 'mb-3', 'text-capitalize');
  categoria.textContent = producto.category;

  const titulo = document.createElement('h3');
  titulo.classList.add('product-title', 'card-title', 'fw-bold', 'mb-3');
  titulo.textContent = producto.title;

  const precio = document.createElement('p');
  precio.classList.add('product-price', 'fw-bold', 'mb-2');
  precio.textContent = `$${producto.price.toFixed(2)}`;

  const calificacion = document.createElement('p');
  calificacion.classList.add('text-secondary', 'small', 'mb-2');
  calificacion.textContent = `Calificacion: ${producto.rating.rate} / 5`;

  const opiniones = document.createElement('p');
  opiniones.classList.add('text-secondary', 'small', 'mb-3');
  opiniones.textContent = `Opiniones: ${producto.rating.count}`;

  const descripcion = document.createElement('p');
  descripcion.classList.add('product-description', 'card-text', 'text-secondary', 'mb-4');
  descripcion.textContent = acortarTexto(producto.description, LIMITE_DESCRIPCION);

  const boton = document.createElement('button');
  boton.classList.add('btn', 'btn-primary', 'btn-product', 'mt-auto');
  boton.setAttribute('type', 'button');
  boton.setAttribute('aria-label', `Ver producto ${producto.title}`);
  boton.textContent = 'Ver producto';

  contenedorImagen.appendChild(imagen);
  cuerpo.append(categoria, titulo, precio, calificacion, opiniones, descripcion, boton);
  tarjeta.append(contenedorImagen, cuerpo);

  return tarjeta;
}

function acortarTexto(texto, limite) {
  if (texto.length <= limite) {
    return texto;
  }

  return `${texto.substring(0, limite).trim()}...`;
}

function mostrarError(mensajeError) {
  limpiarContenedor();

  const columna = document.createElement('div');
  columna.classList.add('col-12');

  const alerta = document.createElement('div');
  alerta.classList.add('error-box', 'alert', 'alert-danger', 'd-flex', 'flex-column', 'justify-content-center', 'text-center', 'p-4');
  alerta.setAttribute('role', 'alert');

  const titulo = document.createElement('h2');
  titulo.classList.add('h4', 'fw-bold', 'mb-2');
  titulo.textContent = 'No pudimos cargar los productos';

  const descripcion = document.createElement('p');
  descripcion.classList.add('mb-0');
  descripcion.textContent = `${mensajeError} Intenta nuevamente mas tarde.`;

  alerta.append(titulo, descripcion);
  columna.appendChild(alerta);
  contenedorDatos.appendChild(columna);
}

function limpiarContenedor() {
  contenedorDatos.textContent = '';
}
