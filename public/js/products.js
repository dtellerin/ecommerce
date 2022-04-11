//Verifica que el token sea válido para mostrar la vista de productos
(async () => {
  const respuesta = await fetch('/api/sesion/auth', {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  //Si no es válido redirecciona a login
  if (respuesta.status != 200) {
      return location.href = '/api/sesion/login'
  }
})()


fetch ('/api/productos/productos', {
    method: 'GET',
    headers: {
      'authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
  })
    .then(resp => resp.json())
    .then(productos => {
        let html =''
        productos.forEach(producto => {
            let htmlSegment = 
                `<div class="row">
                  <div class="col-sm-3  ">
                    <div 
                    <img class="card-img-top bg-light border-info mb-3" >
                      <br>
                      <img src="${producto.thumbnail}" width ="50" height ="50">
                      <div class="container">
                          <h5 class="card-title"> ${producto.title}</h5>
                          <b>Producto Id: ${producto.id}</b>
                          <br>Descripcion:<br><input type="text" id="descripcion-${producto.id}" value="${producto.description}"> 
                          <br>Categoria:<br><input type="text" id="categoria-${producto.id}" value="${producto.category}"> 
                          <br>Precio:<br><input type="text" id="precio-${producto.id}" value="${producto.price}">
                          <br>Stock:<br><input type="text" id="stock-${producto.id}" value="${producto.stock}">
                          <br>Codigo:<br><input type="text" id="codigo-${producto.id}" value="${producto.code}">
                          <br>URL Foto:<p><input type="text" id="foto-${producto.id}" value="${producto.thumbnail}"></p>
                          <button class="btn btn-danger" onclick="deleteProducto('${producto.id}')">Eliminar</button>
                          <button class="btn btn-info" onclick="getProducto('${producto.id}')">Ver</button>
                          <button class="btn btn-success" onclick="updateProducto('${producto.id}')">Update</button>
                      </div>
                    </div>
                  </div>
                </div>`
            html += htmlSegment
        })
        document.getElementById("vistaProductos").innerHTML = html
    })
 
function deleteProducto(id){
  fetch('/api/productos/' + id, {
      method: 'DELETE',
      headers: {
        'authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
  })
      .then(res => res.text()) // or res.json()
      .then(res => {
          alert(res)
          location.reload();
          return false;
      })
}

function getProducto(id){
  fetch('/api/productos/' + id, {
      method: 'GET',
      headers: {
          'authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
  })
      .then(res => res.text()) // or res.json()
      .then(res => {
          alert(res)
          location.reload();
          return false;
      })
}

function addProducto(){
  fetch('/api/productos', {
      method: 'POST',
      headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
      body: JSON.stringify({
          title: document.getElementById('nombre').value,
          description: document.getElementById('descripcion').value,
          category: document.getElementById('categoria').value,
          code: document.getElementById('codigo').value,
          thumbnail: document.getElementById('foto').value,
          price: document.getElementById('precio').value,
          stock: document.getElementById('stock').value
      })
  })
      .then(res => res.text()) // or res.json()
          .then(res => {
              alert(res)
              location.reload()
              return false
          })
      .catch(error => {
          console.log(error)
          alert("addProducto")
          location.reload()
          return false
      })
}

function updateProducto(id){
  fetch('/api/productos/' + id, {
      method: 'PUT',
      headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
      body: JSON.stringify({
          //title: document.getElementById('nombre-'+id).value,
          description: document.getElementById('descripcion-'+id).value,
          category: document.getElementById('categoria-'+id).value,
          code: document.getElementById('codigo-'+id).value,
          thumbnail: document.getElementById('foto-'+id).value,
          price: document.getElementById('precio-'+id).value,
          stock: document.getElementById('stock-'+id).value
      })
  })
      .then(res => res.text()) // or res.json()
      .then(res => {
          alert(res)
          location.reload();
          return false;
      })
}