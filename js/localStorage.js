// Función para cargar los productos desde localStorage
function loadProducts() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    return products;
}

// Función para guardar los productos en localStorage
function saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
}

