// Cargar favoritos del usuario en favorites.html
if (location.pathname.includes('favorites.html')) {
  const email = localStorage.getItem('userEmail');
  if (!email) {
    alert('Debes iniciar sesión');
    location.href = 'login.html';
  }

  fetch('http://localhost:5000/api/users/me', {
    headers: {
      'x-user-email': email
    }
  })
    .then(res => res.json())
    .then(user => {
      if (!user || !user.email) {
        console.error("No se pudo obtener el usuario:", user);
        alert("No autorizado");
        return;
      }

      data = 0;
      const usuario = data; 
      if (!usuario.favoritos || usuario.favoritos.length === 0) {
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
                    <button class="btn btn-outline-danger ms-2" onclick="quitarFavorito('${obra._id}')">Quitar</button>
                  </div>
                </div>
              </div>`;
          });
      });
    })
    .catch(err => {
      console.error("Error cargando favoritos:", err);
      alert("Error al cargar favoritos.");
    });
}

// Función para quitar de favoritos
function quitarFavorito(obraId) {
  const email = localStorage.getItem('userEmail');
  if (!email) return;

  fetch('http://localhost:5000/api/users/favorites/remove', {
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
      location.reload();
    });
}
