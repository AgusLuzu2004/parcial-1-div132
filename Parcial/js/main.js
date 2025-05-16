/*  
    Instrucciones del Parcial

    - Responde los puntos en orden.
    - Se valorará:
        * Código limpio
        * Comentarios claros
        * Separación en bloques funcionales
        * Buen uso de funciones/modularización

    IMPORTANTE:
    - El trabajo debe desarrollarse utilizando buenas prácticas de programación en JavaScript.
*/

/*  
    Punto 1 _________________________

    Este parcial consiste en crear el frontend de una tienda de frutas.
    Para ello ya se dispone del HTML y deberás programar el JavaScript necesario.

    1. Almacena tus datos personales (nombre, apellido, DNI) en un objeto y:
        - Imprime tu nombre y apellido en la etiqueta del <nav> (donde corresponda).
        - Imprímelo también en la consola.
*/

const persona = {
    nombre: "Agustín",
    apellido: "Luzuriaga",
    dni: "45580696"
};

//Mostramos nombre completo en consola
console.log(`${persona.nombre} ${persona.apellido}`);

//Insertamos el nombre en la etiqueta del <nav> con id = "usuario"
const navUsuario = document.getElementById("usuario");
if (navUsuario) {
    navUsuario.textContent = `${persona.nombre} ${persona.apellido}`;
}

/*  
    Punto 2 _________________________

    Simula la carga de datos desde un archivo `db.json`. Este debe tener objetos con esta estructura:
    {
        "id": 1,
        "nombre": "arandano",
        "precio": 5000,
        "img": "img/arandano.jpg"
    }
*/

fetch("db.json").then(response => response.json()).then(data => {
    console.log("Frutas cargadas: ", data);
}).catch(error => {
    console.error("Error al cargar db.json: ", error);
});

/*  
    Punto 3 _________________________

    Imprime los productos en pantalla al cargar la página.
    Agrega esta funcionalidad dentro de la función `init()`.

    El HTML que debes agregar por cada producto es el siguiente:

        <div class="product-card">
            <img src="ruta" alt="nombre">
            <h3>Nombre del producto</h3>
            <p>$Precio</p>
            <button class="add-to-cart">Agregar a carrito</button>
        </div>
*/

//Listado completo de productos
const productos = [
    {
        "id": 1,
        "nombre": "anana",
        "precio": 4500,
        "img": "img/anana.jpg"
    },
    {
        "id": 2,
        "nombre": "arandano",
        "precio": 1000,
        "img": "img/arandano.jpg"
    },
    {
        "id": 3,
        "nombre": "banana",
        "precio": 3000,
        "img": "img/banana.jpg"
    },
    {
        "id": 4,
        "nombre": "frambuesa",
        "precio": 1500,
        "img": "img/frambuesa.png"
    },
    {
        "id": 5,
        "nombre": "frutilla",
        "precio": 2000,
        "img": "img/frutilla.jpg"
    },
    {
        "id": 6,
        "nombre": "kiwi",
        "precio": 2500,
        "img": "img/kiwi.jpg"
    },
    {
        "id": 7,
        "nombre": "mandarina",
        "precio": 3000,
        "img": "img/mandarina.jpg"
    },
    {
        "id": 8,
        "nombre": "manzana",
        "precio": 3500,
        "img": "img/manzana.jpg"
    },
    {
        "id": 9,
        "nombre": "naranja",
        "precio": 3500,
        "img": "img/naranja.jpg"
    },
    {
        "id": 10,
        "nombre": "pera",
        "precio": 3000,
        "img": "img/pera.jpg"
    },
    {
        "id": 11,
        "nombre": "pomelo amarillo",
        "precio": 4000,
        "img": "img/pomelo-amarillo.jpg"
    },
    {
        "id": 12,
        "nombre": "pomelo rojo",
        "precio": 4000,
        "img": "img/pomelo-rojo.jpg"
    },
    {
        "id": 13,
        "nombre": "sandia",
        "precio": 5000,
        "img": "img/sandia.jpg"
    }
];

function mostrarProductos(lista) {
    const contenedor = document.querySelector(".product-grid");
    contenedor.innerHTML = "";

    lista.forEach(producto => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
        <img src="${producto.img}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio}</p>
        <button class="add-to-cart">Agregar a carrito</button>`;
        //Asociamos evento de agregar al carrito
        const boton = card.querySelector(".add-to-cart");
        boton.addEventListener("click", () => agregarAlCarrito(producto));
        contenedor.appendChild(card);
    });
}

/*  
    Punto 4 _________________________

    Crea la función `filtro()` para filtrar los productos por nombre.
    - Asocia esta función al evento `keyup` de un campo `<input>`.
    - Cada vez que se escriba una letra, deben mostrarse solo los productos que coincidan con el texto ingresado.
*/

function filtro() {
    const input = document.querySelector(".search-bar");
    const texto = input.value.toLowerCase();
    //Filtramos los productos que incluyan el texto ingresado
    const productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(texto));
    //Mostramos los productos filtrados
    mostrarProductos(productosFiltrados);
}

/*  
    Punto 5 _________________________

    Agrega la funcionalidad de carrito:
    - Crea un array `carrito` que almacene los productos seleccionados.
    - Al presionar “Agregar a carrito”, el producto debe aparecer en el listado con id `cart-items`.

    El HTML del carrito debe tener el siguiente formato:

        <li class="item-block">
            <p class="item-name">nombreproducto - $precioproducto</p>
            <button class="delete-button">Eliminar</button>
        </li>
*/

const carrito = []

function agregarAlCarrito(producto) {
    carrito.push(producto);
    mostrarCarrito();
    guardarCarrito(); //Guardamos el carrito en localStorage
}

function mostrarCarrito() {
    const contenedorCarrito = document.getElementById("cart-items");
    contenedorCarrito.innerHTML = "";
    carrito.forEach((producto, index) => {
        const item = document.createElement("li");
        item.className = "item-block";
        item.innerHTML = `
        <p class="item-name">${producto.nombre} - $${producto.precio}</p>
        <button class="delete-button">Eliminar</button>`;
        //Asignamos funcionalidad de eliminación
        const botonEliminar = item.querySelector(".delete-button");
        botonEliminar.addEventListener("click", () => eliminardelCarrito(index));
        contenedorCarrito.appendChild(item);
    });
    //Actualizamos contador de ítems en el carrito
    const contador = document.getElementById("cart-count");
    contador.textContent = carrito.length;
    //Calculamos y mostramos el total
    const total = carrito.reduce((acc, prod) => acc + prod.precio, 0);
    const totalElemento = document.getElementById("total-price");
    totalElemento.textContent = `Total: $${total}`;
}

function eliminardelCarrito(indice) {
    carrito.splice(indice, 1); //Eliminamos el producto por índice
    mostrarCarrito(); //Actualizamos el listado
    guardarCarrito(); //Guardamos los cambios
}

/*  
    Punto 6 _________________________

    Guarda los productos del carrito en `localStorage`.
    - Asegúrate de que al recargar la página el carrito se recupere automáticamente desde `localStorage`.
*/

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función inicializadora
function init() {
    // Aquí deben invocarse todas las funciones necesarias para que la aplicación comience a funcionar
    console.log("Inicializando tienda de frutas...");
    //Recuperamos el carrito si ya existía
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        const datos = JSON.parse(carritoGuardado);
        carrito.push(...datos);
        mostrarCarrito();
    }
    //Mostramos todos los productos disponibles
    mostrarProductos(productos);
    //Asociamos el filtro al campo de búsqueda
    const inputBuscador = document.querySelector(".search-bar");
    inputBuscador.addEventListener("keyup", filtro);
}

//Ejecutamos init cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", init);
