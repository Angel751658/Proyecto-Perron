const form = document.getElementById('createForm');
const id = new URLSearchParams(location.search).get('id');

if (form) {
    // Si estamos en modo edición (edit.html?id=...)
    if (id) {
        // Cargar datos existentes
        fetch(`http://localhost:5000/api/works/${id}`)
            .then(res => res.json())
            .then(work => {
                document.getElementById('titulo').value = work.titulo || '';
                document.getElementById('autor').value = work.autor || '';
                document.getElementById('genero').value = work.genero || '';
                document.getElementById('descripcion').value = work.descripcion || '';
                document.getElementById('imagenUrl').value = work.imagenUrl || '';
                document.getElementById('compraLink').value = work.compraLink || '';
                document.getElementById('isbn').value = work.isbn || '';
                document.getElementById('idioma').value = work.idioma || '';
                document.getElementById('numeroPaginas').value = work.numeroPaginas || '';
                document.getElementById('coleccion').value = work.coleccion || '';
                document.getElementById('numeroColeccion').value = work.numeroColeccion || '';
            });

        // Listener para actualizar
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = getFormData();
            const res = await fetch(`http://localhost:5000/api/works/${id}`, {
                method: 'PUT',
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

    } else {
        // Listener para crear
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = getFormData();
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
    }
}

// Función para obtener solo los campos que están llenos
function getFormData() {
    const data = {};
    const campos = [
        'titulo', 'autor', 'genero', 'descripcion', 'imagenUrl',
        'compraLink', 'isbn', 'idioma', 'numeroPaginas', 'coleccion', 'numeroColeccion'
    ];
    for (const campo of campos) {
        const el = document.getElementById(campo);
        if (el && el.value !== '') {
            data[campo] = campo.includes('Paginas') || campo.includes('Coleccion')
                ? parseInt(el.value) : el.value;
        }
    }
    return data;
}


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

    //     // Mostrar usuarios con botón para eliminar
    //     fetch('http://localhost:5000/api/users', {
    //         headers: { 'x-user-email': email }
    //     })
    //         .then(res => res.json())
    //         .then(users => {
    //             const userSection = document.createElement('div');
    //             userSection.className = 'mt-5';
    //             userSection.innerHTML = '<h3>Usuarios Registrados</h3><ul class="list-group mt-3"></ul>';
    //             document.body.appendChild(userSection);

    //             const ul = userSection.querySelector('ul');
    //             users.forEach(u => {
    //                 const li = document.createElement('li');
    //                 li.className = 'list-group-item d-flex justify-content-between align-items-center';
    //                 li.innerHTML = `<span>${u.user} (${u.email})</span>
    //                                 <button class="btn btn-sm btn-danger" onclick="eliminarUsuario('${u._id}')">Eliminar</button>`;
    //                 ul.appendChild(li);
    //             });

    //         });
    // }

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

    function hacerAdmin(id) {
        if (!confirm('¿Asignar privilegios de administrador a este usuario?')) return;

        fetch(`http://localhost:5000/api/users/${id}/admin`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-user-email': localStorage.getItem('userEmail')
            }
        })
            .then(res => res.json())
            .then(data => {
                alert(data.msg || data.error);
                location.reload();
            });
    }

    function quitarAdmin(id) {
        if (!confirm('¿Quitar privilegios de administrador a este usuario?')) return;

        fetch(`http://localhost:5000/api/users/${id}/revoke`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-user-email': localStorage.getItem('userEmail')
            }
        })
            .then(res => res.json())
            .then(data => {
                alert(data.msg || data.error);
                location.reload();
            });
    }


    // Mostrar usuarios con botón "Eliminar" y "Hacer Admin" o "Quitar Admin"
    fetch('http://localhost:5000/api/users', {
        headers: { 'x-user-email': localStorage.getItem('userEmail') }
    })
        .then(res => res.json())
        .then(users => {
            const currentUserEmail = localStorage.getItem('userEmail');

            const userSection = document.createElement('div');
            userSection.className = 'mt-5';
            userSection.innerHTML = '<h3>Usuarios Registrados</h3><ul class="list-group mt-3"></ul>';
            document.body.appendChild(userSection);

            const ul = userSection.querySelector('ul');
            users.forEach(u => {
                // No mostrar al usuario actual
                if (u.email === currentUserEmail) return;

                const li = document.createElement('li');
                li.className = 'list-group-item d-flex justify-content-between align-items-center';

                const span = document.createElement('span');
                span.textContent = `${u.user} (${u.email})`;

                const btnPanel = document.createElement('div');

                // Solo permitir eliminar si NO es admin
                if (!u.isAdmin) {
                    const btnEliminar = document.createElement('button');
                    btnEliminar.textContent = 'Eliminar';
                    btnEliminar.className = 'btn btn-sm btn-danger me-2';
                    btnEliminar.addEventListener('click', () => eliminarUsuario(u._id));
                    btnPanel.appendChild(btnEliminar);
                }

                const btnAdmin = document.createElement('button');
                btnAdmin.className = 'btn btn-sm btn-secondary';
                if (u.isAdmin) {
                    btnAdmin.textContent = 'Quitar Admin';
                    btnAdmin.addEventListener('click', () => quitarAdmin(u._id));
                } else {
                    btnAdmin.textContent = 'Hacer Admin';
                    btnAdmin.addEventListener('click', () => hacerAdmin(u._id));
                }
                btnPanel.appendChild(btnAdmin);

                li.appendChild(span);
                li.appendChild(btnPanel);
                ul.appendChild(li);
            });
        });

}
