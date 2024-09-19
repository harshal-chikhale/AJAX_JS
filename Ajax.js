// Function to load products via AJAX
function loadProducts(query = '') {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'data.txt', true); // Loading product data from data.txt
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var products = JSON.parse(xhr.responseText); // Parse JSON data
        var filteredProducts = products.filter(function(product) {
          return product.name.toLowerCase().includes(query.toLowerCase());
        });
        console.log(filteredProducts); // Debugging to check matched products
        displayProducts(filteredProducts); // Display the filtered products
      }
    };
    xhr.send();
  }
  
  // Function to display products on the webpage
  function displayProducts(products) {
    var productList = document.getElementById('productList');
    productList.innerHTML = ''; // Clear the existing product list
  
    if (products.length === 0) {
      productList.innerHTML = '<div class="no-results">No products found</div>';
      return;
    }
  
    products.forEach(function(product) {
      var productDiv = document.createElement('div');
      productDiv.classList.add('product');
    
      productDiv.innerHTML = `
        <img src="${product.image}"    alt="${product.name}">
        <h3>${product.name}</h3>   
        <span class="category">Category: Electronics</span>
        <p>${product.description}</p>
        <p><strong>${product.price}</strong></p>
      `;
    
      productList.appendChild(productDiv);
    });
  }
  
  // Live search functionality
  document.getElementById('searchInput').addEventListener('input', function() {
    var query = this.value.trim(); // Get the query and trim any unnecessary whitespace
    loadProducts(query);
  });
  
  // Load all products when the page loads
  window.onload = function() {
    loadProducts();
  };
  