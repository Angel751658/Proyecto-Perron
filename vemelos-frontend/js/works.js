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
            <div class="col-md-4 mb-3">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">${o.titulo}</h5>
                  <p class="card-text">${o.genero || ''}</p>
                  <a href="details.html?id=${o._id}" class="btn btn-outline-primary">Ver detalles</a>
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
          <h3>${obra.titulo}</h3>
          <p><strong>Autor:</strong> ${obra.autor || 'N/A'}</p>
          <p><strong>Género:</strong> ${obra.genero || 'N/A'}</p>
          <p><strong>Descripción:</strong> ${obra.descripcion || 'Sin descripción'}</p>
          <a href="${obra.compraLink || '#'}" class="btn btn-success" target="_blank">Comprar</a>`;
        });
}
