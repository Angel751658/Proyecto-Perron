// Mostrar obras para el admin
if (location.pathname.includes('admin.html')) {
    const email = localStorage.getItem('userEmail');
    if (!email) return alert('No autenticado');

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
}

// Crear nueva obra
document.getElementById('createForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        titulo: document.getElementById('titulo').value,
        autor: document.getElementById('autor').value,
        genero: document.getElementById('genero').value,
        descripcion: document.getElementById('descripcion').value,
        compraLink: document.getElementById('compraLink').value
    };

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

// Cargar obra para editar
if (location.pathname.includes('edit.html')) {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    const form = document.getElementById('editForm');

    fetch(`http://localhost:5000/api/works/${id}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById('obraId').value = data._id;
            document.getElementById('titulo').value = data.titulo;
            document.getElementById('autor').value = data.autor;
            document.getElementById('genero').value = data.genero;
            document.getElementById('descripcion').value = data.descripcion;
            document.getElementById('compraLink').value = data.compraLink;
        });

    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('obraId').value;
        const updatedData = {
            titulo: document.getElementById('titulo').value,
            autor: document.getElementById('autor').value,
            genero: document.getElementById('genero').value,
            descripcion: document.getElementById('descripcion').value,
            compraLink: document.getElementById('compraLink').value
        };

        const res = await fetch(`http://localhost:5000/api/works/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-user-email': localStorage.getItem('userEmail')
            },
            body: JSON.stringify(updatedData)
        });

        const result = await res.json();
        alert(result.msg || result.error);
        if (res.ok) location.href = 'admin.html';
    });
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
