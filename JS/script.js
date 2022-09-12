
// productos del sitio web

let carritoVacio = [];

const contenedorLibros = document.getElementById('producto-contenedor');

libros.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = `<div class="card" style="width: 18rem;">
                            <img src="${producto.img}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${producto.nombre}</h5>
                                <p class="card-text">Año de publicacion:  ${producto.anio}</p>
                                <p class="card-text">Precio:$ ${producto.precio}</p>
								<p class="card-text">Autor:${producto.autor}</p>
                                <button class="btn btn-primary" id=boton${producto.id}>Comprar</button>
                            </div>
                        </div>`

    contenedorLibros.appendChild(div);


    const boton = document.getElementById(`boton${producto.id}`);

    //sweet alert para agregar un producto al carrito

    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id);
        Swal.fire({
            position: 'top-start',
            icon: 'success',
            title: producto.nombre,
            text: 'se agrego al carrito correctamente ',
            showConfirmButton: false,
            iconColor: '#219c3f', 
            timer: 1500
          });
    })
});

//LocalStorage

function borrarDatos() {
    localStorage.clear();
};

const Carro = JSON.parse(localStorage.getItem('carritoVacio')) || [];

//vaciar carrito

const vaciarCarrito = (libroId) => {

    const item1 = carritoVacio.find((libro) => libro.id === libroId)

    const indice = carritoVacio.indexOf(item1)

    carritoVacio.splice(indice, 1)

    actualizarCarro()
    
    borrarDatos()


};

// boton vaciar carrito

const limpiarCarrito = document.getElementById('vaciarCarro');

limpiarCarrito.addEventListener('click', () => {
    
    Swal.fire({
        title: 'Está seguro de vaciar el carrito?',
        icon: 'warning',
        iconColor: '#f3da0b', 
        showCancelButton: true,
        confirmButtonColor: '#219c3f',
        cancelButtonColor: '#cc0000',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Tu Carrito fué vaciado con éxito',
          )
          carritoVacio.length = 0
        actualizarCarro()
        borrarDatos()
        }
      })
});


const CarroContenedor = document.getElementById('carrito-contenedor');

const contadorCarrito = document.getElementById('contador-carrito');

const actualizarCarro = () => {

    CarroContenedor.innerHTML = ""

    carritoVacio.forEach((libro) => {
        const div = document.createElement('div')
        div.className = ('productoDelCarrito')
        div.innerHTML = `
        <p>${libro.nombre}</p>
        <p>Precio:${libro.precio}</p> 
        <p id="cantidad${libro.id}">Cantidad:${libro.cantidad}</p>
        <button onclick="vaciarCarrito(${libro.id})" class="btn btn-outline-warning boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        CarroContenedor.appendChild(div)

        localStorage.setItem('carritoVacio', JSON.stringify(carritoVacio))

    })

    contadorCarrito.innerText = carritoVacio.length


    precioTotal.innerText = carritoVacio.reduce((acc, libro) => acc + libro.cantidad * libro.precio, 0)
};

const agregarAlCarrito = (libroId) => {

    const listacarro = carritoVacio.some(libro => libro.id === libroId)

    if (listacarro) {
        const libro = carritoVacio.map(libro => {
            if (libro.id === libroId) {
                libro.cantidad++
            }
        })
    } else {

        let item = libros.find((libro) => libro.id === libroId)
        carritoVacio.push(item)
    }
    actualizarCarro()
};

// boton para terminar el pedido

const terminarPedido = document.getElementById('terminarPedido');

terminarPedido.addEventListener('click', () => {
    Swal.fire({
        title: '¿Quiere relizar su pedido?',
        icon: 'warning',
        iconColor: '#f3da0b', 
        showCancelButton: true,
        confirmButtonColor: '#219c3f',
        cancelButtonColor: '#cc0000',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Su compra se realizo con exito',
          )
          carritoVacio.length = 0
        actualizarCarro()
        borrarDatos()
        }
      })
});

 

// Fetch de los proximos libros

const proxLibros = document.getElementById('proxLibros');

function crearHTML(productos) {

    proxLibros.innerHTML = ""

    productos.forEach((producto) => {
        const div = document.createElement('div')
        div.classList.add('proximosLibros')
        div.innerHTML = `<div class="card" style="width: 18rem;">
							<img src="${producto.img}" class="card-img-top" alt="...">
							<div class="card-body">
								<h5 class="card-title">${producto.nombre}</h5>
								<p class="card-text">Año de publicacion:  ${producto.anio}</p>
								<p class="card-text">Precio:$ ${producto.precio}</p>
								<p class="card-text">Autor:${producto.autor}</p>
							</div>
						</div>`
    
    proxLibros.appendChild(div)

    })
};


document.addEventListener('DOMContentLoaded', () => {
    fetchData()
});



const fetchData = async () => {
            
    try {
        const res = await fetch('./js/proximosLibros.json')
        const data = await res.json()
        
        crearHTML(data)
        }
     catch (error) {
        console.log(error);
    }
};

