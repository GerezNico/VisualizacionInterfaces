// Manejar envío del formulario principal de búsqueda
document.getElementById('mainSearchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const searchTerm = document.getElementById('mainSearchInput').value.trim();
    const searchFilter = document.getElementById('mainSearchFilter').value;
    
    if (searchTerm) {
        let url = `./pages/buscador.html?q=${encodeURIComponent(searchTerm)}`;
        if (searchFilter !== 'Modalidad') {
            url += `&filter=${encodeURIComponent(searchFilter)}`;
        }
        window.location.href = url;
    }
});

// Manejar envío desde navbar
const navSearchForm = document.querySelector('nav .d-flex[role="search"]');
if (navSearchForm) {
    navSearchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchTerm = navSearchForm.querySelector('input[type="search"]').value.trim();
        if (searchTerm) {
            window.location.href = `./pages/buscador.html?q=${encodeURIComponent(searchTerm)}`;
        }
    });
}
