function addProduct() {
  const name = document.getElementById("productName").value;
  const price = document.getElementById("productPrice").value;
  const size = document.getElementById("productSize").value;

  if (!name || !price || !size) {
    alert("Empty product cannot be added.");
    return;
  }

  // Adding product to the product options
  const productOptions = document.getElementById("productOptions");
  const newOption = document.createElement("label");
  newOption.innerHTML = `<input type="radio" name="size" value="${size}" data-price="${price}"> ${size} - $${price}`;
  productOptions.appendChild(newOption);
  productOptions.appendChild(document.createElement("br"));

  // Add to the existing products list in the admin panel
  addProductToAdminList(name, size, price);

  // Clear the form fields
  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productSize").value = "";

  alert(`Product Added: ${name}, Size: ${size}, Price: $${price}`);
}

function addProductToAdminList(name, size, price) {
  const existingProducts = document.getElementById("existingProducts");
  const productDiv = document.createElement("div");
  productDiv.className = "product-item";
  productDiv.innerHTML = `
                  <span>${name} (${size}) - $${price}</span>
                  <button onclick="editProduct(this, '${name}', '${size}', '${price}')">Edit</button>
                  <button onclick="removeProduct(this, '${size}')">Remove</button>
              `;
  existingProducts.appendChild(productDiv);
}

function editProduct(button, name, size, price) {
  // Populate the form with the current product details for editing
  document.getElementById("productName").value = name;
  document.getElementById("productPrice").value = price;
  document.getElementById("productSize").value = size;

  // Remove the existing product from the list and options so it can be re-added
  removeProduct(button, size);
}

function removeProduct(button, size) {
  // Remove from product options
  const productOptions = document.getElementById("productOptions");
  const optionToRemove = Array.from(productOptions.children).find(
    (option) => option.querySelector("input")?.value === size
  );
  if (optionToRemove) {
    productOptions.removeChild(optionToRemove.nextElementSibling); // Remove the <br> element
    productOptions.removeChild(optionToRemove);
  }

  // Remove from admin list
  const productDiv = button.parentElement;
  productDiv.parentElement.removeChild(productDiv);
}

// Placeholder for resolving payments
function resolvePayment(paymentId) {
  alert(`Payment ${paymentId} resolved.`);
  // Payment resolving logic here
}
