const formRegister = document.getElementById("formRegister");
formRegister.addEventListener('submit', async e => {

  e.preventDefault()
  
  const datos = {
    nombreApellido: formRegister[0].value,
    email: formRegister[1].value,
    telefono: formRegister[2].value,
    password: formRegister[3].value,
    confirmPassword: formRegister[4].value,
  }

  const respuesta = await fetch('/api/sesion/register', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });

  const content = await respuesta.json()
  console.log('register.content: ', content)
  const { email, access_token } = content

  if (access_token) {
    localStorage.setItem("access_token", access_token)
    localStorage.setItem("email", email)
    location.href = '/api/sesion/main'
  } else {
    location.href = '/api/sesion/register-error'
  }
})