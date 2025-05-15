// Cargar resultados de búsqueda
if (location.pathname.includes('search.html')) {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    
    fetch('http://localhost:5000/api/works')
        .then(res => res.json())
        .then(obras => {
            const contenedor = document.getElementById('results');
            obras.filter(o => !q || o.titulo.toLowerCase().includes(q.toLowerCase()))
                .forEach(o => {
                    contenedor.innerHTML += `
                    <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div class="card h-100">
                            <img src="${o.imagenUrl}" class="card-img-top" alt="${o.titulo}" style="height: 300px; object-fit: cover;">
                            <div class="card-body">
                                <h5 class="card-title">${o.titulo}</h5>
                                <p class="card-text">${o.descripcion?.substring(0, 100) || 'Sin descripción'}...</p>
                                <ul class="list-unstyled small">
                                    <li><strong>Autor(es):</strong> ${o.autor || 'N/A'}</li>
                                    <li><strong>Idioma:</strong> ${o.idioma || 'N/A'}</li>
                                    <li><strong>Páginas:</strong> ${o.numeroPaginas || 'N/A'}</li>
                                    <li><strong>ISBN:</strong> ${o.isbn || 'N/A'}</li>
                                    <li><strong>Colección:</strong> ${o.coleccion || 'N/A'} #${o.numeroColeccion || ''}</li>
                                </ul>
                                <a href="details.html?id=${o._id}" class="btn btn-outline-primary mt-2">Ver detalles</a>
                            </div>
                        </div>
                    </div>`;
                });
        });
}

// Mostrar detalles
if (location.pathname.includes('details.html')) {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');

    fetch(`http://localhost:5000/api/works/${id}`)
        .then(res => res.json())
        .then(obra => {
            const cont = document.getElementById('work-details');
            cont.innerHTML = `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <img src="${obra.imagenUrl}" class="card-img-top" alt="${obra.titulo}" style="max-height: 400px; object-fit: cover;">
                <div class="card-body">
                <h3 class="card-title">${obra.titulo}</h3>
                <p class="card-text">${obra.descripcion}</p>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><strong>Autor(es):</strong> ${obra.autor}</li>
                    <li class="list-group-item"><strong>Idioma:</strong> ${obra.idioma}</li>
                    <li class="list-group-item"><strong>Género:</strong> ${obra.genero}</li>
                    <li class="list-group-item"><strong>Páginas:</strong> ${obra.numeroPaginas}</li>
                    <li class="list-group-item"><strong>ISBN:</strong> ${obra.isbn}</li>
                    <li class="list-group-item"><strong>Colección:</strong> ${obra.coleccion} #${obra.numeroColeccion}</li>
                </ul>
                <a href="${obra.compraLink}" target="_blank" class="btn btn-success mt-3">Comprar</a>
                </div>
            </div>
            `});
}

// Solo mostrar botón si no está ya en favoritos
if (email) {
    fetch('http://localhost:5000/api/users/me', {
        headers: { 'x-user-email': email }
    })
        .then(res => res.json())
        .then(user => {
            if (!user || !user.email) return;

            const id = new URLSearchParams(location.search).get('id');

            if (user.favoritos && !user.favoritos.includes(id)) {
                const favBtn = document.getElementById('favBtn');
                if (favBtn) favBtn.style.display = 'inline-block';
            }
        });
}

// Evento para añadir favorito
document.getElementById('favBtn')?.addEventListener('click', () => {
    const obraId = new URLSearchParams(location.search).get('id');
    const email = localStorage.getItem('userEmail');

    fetch('http://localhost:5000/api/users/favorites/add', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-user-email': email
        },
        body: JSON.stringify({ obraId })
    })
        .then(res => res.json())
        .then(data => {
            alert(data.msg || data.error);
            window.location.href = 'favorites.html';
        });
});









