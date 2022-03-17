
const socket = io();
const dt = new Date(); 

function fyh(inputDate) {
    const dd = new Date(Number(inputDate)*1000)
    const fechayhora = (`${
        dd.getDate().toString().padStart(2, '0')}/${
        (dd.getMonth()+1).toString().padStart(2, '0')}/${
        dd.getFullYear().toString().padStart(4, '0')} ${
        dd.getHours().toString().padStart(2, '0')}:${
        dd.getMinutes().toString().padStart(2, '0')}:${
        dd.getSeconds().toString().padStart(2, '0')}`
        ) 
    return fechayhora }
       
const addProducto = document.getElementById('addProducto')
addProducto.addEventListener('submit', e => {
    e.preventDefault()

    const producto = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbail: document.getElementById('thumbnail').value
    }
    socket.emit('update', producto);
    addProducto.reset()
})

socket.on('productos', manejoProductos);

async function manejoProductos(productos) {
    const vistaEJS = await fetch('../../views/productos.ejs')
    const textoPlantilla = await vistaEJS.text()
    const compilaPlantilla = ejs.compile(textoPlantilla)
    const html = compilaPlantilla({ productos })
    document.getElementById('productos').innerHTML = html
}

function addMessage(e) {
    const timestamp = Math.floor(Date.now()/1000)
        const mensaje = {
            author : { 
                id: document.getElementById('username').value,
                nombre: document.getElementById('nombre').value,
                apellido: document.getElementById('apellido').value,
                edad: document.getElementById('edad').value,
                alias: document.getElementById('apodo').value,
                avatar: document.getElementById('avatar').value,
            },
        ts: timestamp.toString(),
        text: document.getElementById('texto').value
        }
    socket.emit('nuevoMensaje', mensaje);
    return false;
}

function makeHTML(mensajes) {
     return mensajes.map((elem, index) => {
        return (`<div>
            <strong>${elem.author.id}</strong> 
            [${fyh(elem.ts)}]:
            <em>${elem.text}</em> 
            <img src=${elem.author.avatar}></img>
            </div>`)
    }).join(" ")
}

function render(mensajes) {
    const html = makeHTML(mensajes)
    document.getElementById('mensajes').innerHTML = html;
}

socket.on('mensajes', mensajes => {
    render(mensajes)
})

