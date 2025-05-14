// Crear nueva obra con todos los campos
document.getElementById('createForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log("Creando obra...");
    const data = {
        titulo: document.getElementById('titulo').value,
        autor: document.getElementById('autor').value,
        genero: document.getElementById('genero').value,
        descripcion: document.getElementById('descripcion').value,
        imagenUrl: document.getElementById('imagenUrl').value,
        compraLink: document.getElementById('compraLink').value,
        isbn: document.getElementById('isbn').value,
        idioma: document.getElementById('idioma').value,
        numeroPaginas: parseInt(document.getElementById('numeroPaginas').value),
        coleccion: document.getElementById('coleccion').value,
        numeroColeccion: parseInt(document.getElementById('numeroColeccion').value)
    };

    console.log("Enviando datos:", data);
document.getElementById('createForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  console.log("🟢 Formulario de obra enviado");

  const data = {
    titulo: document.getElementById('titulo')?.value,
    autor: document.getElementById('autor')?.value,
    genero: document.getElementById('genero')?.value,
    descripcion: document.getElementById('descripcion')?.value,
    imagenUrl: document.getElementById('imagenUrl')?.value,
    compraLink: document.getElementById('compraLink')?.value,
    isbn: document.getElementById('isbn')?.value,
    idioma: document.getElementById('idioma')?.value,
    numeroPaginas: parseInt(document.getElementById('numeroPaginas')?.value),
    coleccion: document.getElementById('coleccion')?.value,
    numeroColeccion: parseInt(document.getElementById('numeroColeccion')?.value)
  };

  console.log("🟡 Datos a enviar:", data);

  const res = await fetch('http://localhost:5000/api/works', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-user-email': localStorage.getItem('userEmail')
    },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  console.log("🔵 Respuesta del servidor:", result);

  alert(result.msg || result.error);
  if (res.ok) location.href = 'admin.html';
});


    const res = await fetch('http://localhost:5000/api/works', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-user-email': localStorage.getItem('userEmail')
        },
        body: JSON.stringify(data)
    });

    const result = await res.json();
    alert(result.msg || result.error);
    if (res.ok) location.href = 'admin.html';
});

//console.log("Respuesta:", result);

// Eliminar obra
function eliminarObra(id) {
    if (!confirm('¿Eliminar esta obra?')) return;

    fetch(`http://localhost:5000/api/works/${id}`, {
        method: 'DELETE',
        headers: {
            'x-user-email': localStorage.getItem('userEmail')
        }
    })
        .then(res => res.json())
        .then(data => {
            alert(data.msg || data.error);
            location.reload();
        });
}

// Mostrar obras + usuarios
if (location.pathname.includes('admin.html')) {
    const email = localStorage.getItem('userEmail');
    if (!email) {
        alert('No autenticado');
        window.location.href = 'login.html';
    }


    // Mostrar obras
    fetch('http://localhost:5000/api/works')
        .then(res => res.json())
        .then(obras => {
            const cont = document.getElementById('admin-works');
            obras.forEach(o => {
                cont.innerHTML += `
          <div class="col-md-4 mb-3">
            <div class="card">
              <div class="card-body">
                <h5>${o.titulo}</h5>
                <a href="edit.html?id=${o._id}" class="btn btn-sm btn-outline-warning me-2">Editar</a>
                <button class="btn btn-sm btn-outline-danger" onclick="eliminarObra('${o._id}')">Eliminar</button>
              </div>
            </div>
          </div>`;
            });
        });

    // Mostrar usuarios con botón para eliminar
    fetch('http://localhost:5000/api/users', {
        headers: { 'x-user-email': email }
    })
        .then(res => res.json())
        .then(users => {
            const userSection = document.createElement('div');
            userSection.className = 'mt-5';
            userSection.innerHTML = '<h3>Usuarios Registrados</h3><ul class="list-group mt-3"></ul>';
            document.body.appendChild(userSection);

            const ul = userSection.querySelector('ul');
            users.forEach(u => {
                const li = document.createElement('li');
                li.className = 'list-group-item d-flex justify-content-between align-items-center';
                li.innerHTML = `
          <span>${u.user} (${u.email})</span>
          <button class="btn btn-sm btn-danger" onclick="eliminarUsuario('${u._id}')">Eliminar</button>`;
                ul.appendChild(li);
            });
        });
}

// Eliminar usuario
function eliminarUsuario(id) {
    if (!confirm('¿Eliminar este usuario?')) return;

    fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'DELETE',
        headers: {
            'x-user-email': localStorage.getItem('userEmail')
        }
    })
        .then(res => res.json())
        .then(data => {
            alert(data.msg || data.error);
            location.reload();
        });
}
