// Registro
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = document.getElementById('user').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, email, password })
    });

    const data = await res.json();
    alert(data.msg || data.error);
    if (res.ok) window.location.href = 'login.html';
});

// Login
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    

    const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    alert(data.msg || data.error);
    if (res.ok) {
        localStorage.setItem('userEmail', data.usuario.email);
        window.location.href = 'index.html';
    }
});

// Verificar si el usuario es admin y mostrar botones especiales
window.addEventListener('DOMContentLoaded', () => {
    const email = localStorage.getItem('userEmail');
    const adminOptions = document.getElementById('admin-options');
    if (!email || !adminOptions) return;

    fetch('http://localhost:5000/api/users', {
        headers: { 'x-user-email': email }
    })
        .then(res => res.json())
        .then(users => {
            const user = users.find(u => u.email === email);
            if (user?.isAdmin) {
                adminOptions.innerHTML = `
            <a href="admin.html" class="btn btn-outline-danger me-2">Panel Admin</a>
            <a href="create.html" class="btn btn-outline-warning">Nueva Obra</a>
          `;
            }
        });
});




