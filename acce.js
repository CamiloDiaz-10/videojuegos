// Selección de elementos
const productos = document.querySelectorAll('.producto');
const carrito = document.getElementById('productos-en-carrito');
const totalDisplay = document.getElementById('total');
const botonComprar = document.getElementById('comprar');

// Inicializamos el carrito
let carritoCompras = [];

// Función para actualizar el carrito
function actualizarCarrito() {
    // Limpiamos el carrito actual
    carrito.innerHTML = '';

    // Recorremos los productos del carrito
    let total = 0;
    carritoCompras.forEach((producto, index) => {
        const itemCarrito = document.createElement('li');
        itemCarrito.innerHTML = `
            ${producto.nombre} - $${producto.precio}
            <button class="eliminar-producto" onclick="eliminarDelCarrito(${index})">
                <span class="eliminar-icono">×</span>
            </button>
        `;
        carrito.appendChild(itemCarrito);
        total += producto.precio;
    });

    // Actualizamos el total
    totalDisplay.textContent = total.toFixed(2);
}

// Función para eliminar producto del carrito
function eliminarDelCarrito(index) {
    // Eliminar el producto del array
    carritoCompras.splice(index, 1);
    // Actualizar la visualización del carrito
    actualizarCarrito();
}

// Función para agregar productos al carrito
function agregarAlCarrito(event) {
    const productoElement = event.target.closest('.producto');
    const id = productoElement.getAttribute('data-id');
    const nombre = productoElement.getAttribute('data-nombre');
    const precio = parseFloat(productoElement.getAttribute('data-precio'));

    // Añadimos el producto al carrito
    carritoCompras.push({ id, nombre, precio });

    // Actualizamos el carrito
    actualizarCarrito();
}

// Función para realizar la compra
function realizarCompra() {
    if (carritoCompras.length === 0) {
        alert("El carrito está vacío.");
    } else {
        alert("¡Compra realizada con éxito!");
        carritoCompras = [];  // Limpiar el carrito después de la compra
        actualizarCarrito();
    }
}

// Agregar el evento 'click' a cada botón de "Agregar al Carrito"
productos.forEach(producto => {
    const boton = producto.querySelector('.add-to-cart');
    boton.addEventListener('click', agregarAlCarrito);
});

// Evento para realizar la compra
botonComprar.addEventListener('click', realizarCompra);

// Añadir estilos dinámicamente
const estilos = document.createElement('style');
estilos.textContent = `
    .eliminar-producto {
        background-color: #ff4444;
        color: white;
        border: none;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        cursor: pointer;
        margin-left: 10px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.3s;
    }

    .eliminar-producto:hover {
        background-color: #cc0000;
    }

    .eliminar-icono {
        font-size: 18px;
        line-height: 1;
    }

    #productos-en-carrito li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px;
        margin: 5px 0;
        background-color: #f8f9fa;
        border-radius: 4px;
    }
`;
document.head.appendChild(estilos);