// Obtener parámetro de búsqueda desde URL
const params = new URLSearchParams(window.location.search);
const searchQuery = params.get('q') || '';

if (searchQuery) {
    document.getElementById('searchInput').value = searchQuery;
    document.getElementById('searchTerm').textContent = searchQuery;
}

// Manejar envío de formulario de búsqueda
document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const query = document.getElementById('searchInput').value.trim();
    if (query) {
        window.location.href = `./buscador.html?q=${encodeURIComponent(query)}`;
    }
});

// Manejar envío desde navbar
document.getElementById('navSearchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const query = document.getElementById('navSearchInput').value.trim();
    if (query) {
        window.location.href = `./buscador.html?q=${encodeURIComponent(query)}`;
    }
});

// Simulación de filtros (en producción, filtrarían los resultados reales)
document.querySelectorAll('.form-check-input').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        console.log('Filtro aplicado:', this.value);
        // Aquí iría la lógica para filtrar resultados
    });
});

// Botón limpiar filtros
document.querySelector('.btn-outline-secondary').addEventListener('click', function() {
    document.querySelectorAll('.form-check-input').forEach(checkbox => {
        checkbox.checked = false;
    });
    document.getElementById('mod3').checked = true;
    console.log('Filtros limpiados');
});
