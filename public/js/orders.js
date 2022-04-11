
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
})()

fetch ("/api/ordenes/" + localStorage.getItem('email') + "/usuario", {
    method: 'GET',
    headers: {
      'authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
  })
    .then(resp => resp.json())
    .then(ordenes => {
        let html =''
        ordenes.forEach(orden => {
            let htmlSegment = 
                `<div class="card">
                    <div class="container">
                        <br><p><b>Orden Id: ${orden.id}</b></p>
                        e-mail:<br><input type="text" id="email-${orden.id}" value="${orden.email}" disabled> 
                        <br>Estado: <br><input type="text" id="estado-${orden.id}" value="${orden.state}" disabled>
                        <br>Fecha: <br><input type="text" id="fyh-${orden.id}" value="${orden.date}" disabled>
                        <br>Monto Total: <br><input type="text" id="Monto-${orden.id}" value="${orden.totalAmount}" disabled>
                        <br>
                    </div>
                    <br>
                    <div class="container">   
                        <button class="btn btn-info" onclick="getOrden('${orden.id}')">Ver</button>
                        <button class="btn btn-info" onclick="confirmOrder('${orden.id}')">Confirma compra</button>
                    </div>
                    <br>
                </div>`
            html += htmlSegment
        })
        document.getElementById("vistaOrdenes").innerHTML = html
    })

function getOrden(id){
    fetch('/api/ordenes/' + id, {
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

function getAllOrders(){
    fetch('/api/ordenes/all', {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
    })
        .then(res => res.json())
        .then(ordenes => {
            let html =''
            ordenes.forEach(orden => {
                let htmlSegment = 
                    `<div class="card">
                        <div class="container">
                            <br><p><b>Orden Id: ${orden.id}</b></p>
                            e-mail:<br><input type="text" id="email-${orden.id}" value="${orden.email}" disabled> 
                            <br>Estado: <br><input type="text" id="estado-${orden.id}" value="${orden.state}" disabled>
                            <br>Fecha: <br><input type="text" id="fyh-${orden.id}" value="${orden.date}" disabled>
                            <br>Monto Total: <br><input type="text" id="Monto-${orden.id}" value="${orden.totalAmount}" disabled>
                            <br>
                        </div>
                        <div class="container">   
                            <button class="btn btn-info" onclick="getOrden('${orden.id}')">Ver</button>
                            <button class="btn btn-info" onclick="confirmOrden('${orden.id}')">Confirma compra</button>
                        </div>
                        <br>
                    </div>`
                html += htmlSegment
            })
            document.getElementById("vistaOrdenes").innerHTML = html
        })
    }

function confirmOrder(id){
    fetch("/api/ordenes/" + localStorage.getItem('email') + "/usuario/" + id,  {
        method: 'POST',
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

    