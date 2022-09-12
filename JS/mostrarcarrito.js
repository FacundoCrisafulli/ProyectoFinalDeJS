const mostrarCarrito = document.querySelector('.formaDelcarrito');
const abrirElCarrito = document.getElementById('open');
const cerrarElCarrito = document.getElementById('cerrar');
const modelarElCarrito = document.querySelector('.modelar-el-carrito')

abrirElCarrito.addEventListener('click', ()=> {
    mostrarCarrito.classList.toggle('carrito-activo');
})

cerrarElCarrito.addEventListener('click', ()=> {
    mostrarCarrito.classList.remove('carrito-activo');
})

mostrarCarrito.addEventListener('click', ()=> {
    cerrarElCarrito.click()
})

modelarElCarrito.addEventListener('click', (e) => {
    e.stopPropagation()
})