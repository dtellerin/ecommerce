(async () => {
  const respuesta = await fetch('/api/sesion/auth', {
        method: 'GET',
        headers: {
          'authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
     })
      if (respuesta.status != 200) {
        return location.href = '/api/sesion/login'
      }
}) ()


const socket = io.connect();
const dt = new Date(); 
const email = localStorage.getItem('email')

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

// function getChatByUser() {
//   location.href = `/api/chat/${localStorage.getItem('email')}`
//  }

function getChatByUser() {
  socket.emit('chatByUser', email)
}

function allMessages() {
  socket.emit('allMessages')
}

socket.on('mensajes', mensajes => {
  render(mensajes)
})

socket.on('msgsUser', mensajes => {
  render(mensajes)
})








