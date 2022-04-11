(async () => {
try {
 const respuesta = await fetch('/api/sesion/auth', {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
   })
   if (respuesta.status == 200) {
      return location.href = '/api/sesion/main'
    }
      return location.href = '/api/sesion/login'

  } catch (error) {
     return location.href = '/api/sesion/login'
  }
})()

