const formLogin = document.getElementById("formLogin");

formLogin.addEventListener('submit', async e => {

  e.preventDefault()

  const datos = {
    email: formLogin[0].value,
    password: formLogin[1].value,
  }
  
  const respuesta = await fetch('/api/sesion/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  })
  
  const content = await respuesta.json()
  const { access_token } = content
  
  if (access_token) {
    localStorage.setItem("access_token", access_token)
    localStorage.setItem("email", datos.email)
    location.href = '/api/sesion/main'
  } else {
    location.href = '/api/sesion/login-error'
  }
})
