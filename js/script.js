// Función para cargar los productos desde localStorage
function loadProducts() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    return products;
}

// Función para guardar los productos en localStorage
function saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
}

// Función para actualizar la tabla de productos
function updateProductTable() {
    const products = loadProducts();
    const tableBody = document.querySelector("#productTable tbody");
    tableBody.innerHTML = ''; // Limpiar la tabla antes de agregar los productos

    let totalInventory = 0; // Variable para calcular el total del inventario

    // Iterar sobre los productos y agregar filas a la tabla
    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.price} ₡</td>
            <td>${product.quantity}</td>
            <td>${(product.price * product.quantity).toFixed(2)} ₡</td>
            <td>
                <button class="edit" onclick="editProduct(${index})">Editar</button>
                <button class="delete" onclick="deleteProduct(${index})">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);

        // Sumar al total del inventario
        totalInventory += product.price * product.quantity;
    });

    // Actualizar el total del inventario en la página
    document.getElementById("inventoryTotal").textContent = totalInventory.toFixed(2);
}

// Función para agregar un nuevo producto
document.getElementById("productForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar el envío del formulario

    const name = document.getElementById("name").value;
    const price = parseFloat(document.getElementById("price").value);
    const quantity = parseInt(document.getElementById("quantity").value);

    if (name && price > 0 && quantity > 0) {
        const products = loadProducts();
        const newProduct = { name, price, quantity };
        products.push(newProduct); // Agregar el nuevo producto al array
        saveProducts(products); // Guardar los productos en localStorage
        updateProductTable(); // Actualizar la tabla
    }

    // Limpiar los campos del formulario
    document.getElementById("productForm").reset();
});

// Función para editar un producto
function editProduct(index) {
    const products = loadProducts();
    const product = products[index];

    document.getElementById("name").value = product.name;
    document.getElementById("price").value = product.price;
    document.getElementById("quantity").value = product.quantity;

    // Eliminar el producto para reemplazarlo después de la edición
    deleteProduct(index);
}

// Función para eliminar un producto
function deleteProduct(index) {
    const products = loadProducts();
    products.splice(index, 1); // Eliminar el producto del array
    saveProducts(products); // Guardar los productos en localStorage
    updateProductTable(); // Actualizar la tabla
}

// Inicializar la tabla de productos
updateProductTable();
