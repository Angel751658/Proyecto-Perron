// Mostrar favoritos (simulado con email localStorage)
if (location.pathname.includes('favorites.html')) {
    const email = localStorage.getItem('userEmail');
    if (!email) {
        alert('Debes iniciar sesión');
        location.href = 'login.html';
    }

    fetch('http://localhost:5000/api/users')
        .then(res => res.json())
        .then(usuarios => {
            const usuario = usuarios.find(u => u.email === email);
            if (!usuario || !usuario.favoritos.length) {
                document.getElementById('favorites').innerHTML = '<p>No hay obras en favoritos.</p>';
                return;
            }

            usuario.favoritos.forEach(id => {
                fetch(`http://localhost:5000/api/works/${id}`)
                    .then(res => res.json())
                    .then(obra => {
                        const cont = document.getElementById('favorites');
                        cont.innerHTML += `
                <div class="col-md-4 mb-3">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">${obra.titulo}</h5>
                      <p class="card-text">${obra.genero || ''}</p>
                      <a href="details.html?id=${obra._id}" class="btn btn-outline-primary">Ver detalles</a>
                    </div>
                  </div>
                </div>`;
                    });
            });
        });
}
