let cartCount = 0;
let cartItems = [];
const TAX_RATE = 0.05;

document.getElementById("addToCart").addEventListener("click", function () {
  const quantity = parseInt(document.getElementById("quantity").value);
  const size = document.querySelector('input[name="size"]:checked').value;
  const price = parseFloat(
    document.querySelector('input[name="size"]:checked').dataset.price
  );

  if (!quantity || !size || !price) {
    alert("Empty product cannot be added.");
    return;
  }

  cartCount += quantity;
  const existingItemIndex = cartItems.findIndex((item) => item.size === size);
  if (existingItemIndex > -1) {
    cartItems[existingItemIndex].quantity += quantity;
  } else {
    cartItems.push({ size, quantity, price });
  }
  updateCart();
  updateOrderSummary();
});

document.getElementById("increaseQty").addEventListener("click", function () {
  const qtyInput = document.getElementById("quantity");
  qtyInput.value = parseInt(qtyInput.value) + 1;
});

document.getElementById("decreaseQty").addEventListener("click", function () {
  const qtyInput = document.getElementById("quantity");
  if (parseInt(qtyInput.value) > 1) {
    qtyInput.value = parseInt(qtyInput.value) - 1;
  }
});

document.getElementById("cartBtn").addEventListener("click", openCartModal);
document.getElementById("closeModal").addEventListener("click", closeCartModal);
document
  .getElementById("checkoutBtn")
  .addEventListener("click", processCheckout);

function updateCart() {
  document.getElementById("cartBtn").innerText = `🛒 ${cartCount}`;
}

function openCartModal() {
  document.getElementById("cartModal").style.display = "block";
  let cartHTML = "";
  let subtotal = 0;
  cartItems.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    cartHTML += `<tr>
            <td>Gas (${item.size})</td>
            <td>
                <button onclick="decreaseCartItem(${index})">-</button>
                ${item.quantity}
                <button onclick="increaseCartItem(${index})">+</button>
            </td>
            <td>$ ${itemTotal.toFixed(2)}</td>
            <td><button onclick="removeCartItem(${index})">🗑️</button></td>
        </tr>`;
  });
  document.getElementById("cartItems").innerHTML = cartHTML;
  updateOrderSummary();
}

function closeCartModal() {
  document.getElementById("cartModal").style.display = "none";
}

function updateOrderSummary() {
  let subtotal = 0;
  cartItems.forEach((item) => {
    subtotal += item.price * item.quantity;
  });
  const taxes = subtotal * TAX_RATE;
  const total = subtotal + taxes;

  document.getElementById("subtotal").innerText = subtotal.toFixed(2);
  document.getElementById("taxes").innerText = taxes.toFixed(2);
  document.getElementById("total").innerText = total.toFixed(2);
}

function increaseCartItem(index) {
  cartItems[index].quantity += 1;
  cartCount += 1;
  updateCart();
  openCartModal();
}

function decreaseCartItem(index) {
  if (cartItems[index].quantity > 1) {
    cartItems[index].quantity -= 1;
    cartCount -= 1;
    updateCart();
    openCartModal();
  }
}

function removeCartItem(index) {
  cartCount -= cartItems[index].quantity;
  cartItems.splice(index, 1);
  updateCart();
  openCartModal();
}

window.onclick = function (event) {
  const modal = document.getElementById("cartModal");
  if (event.target === modal) {
    closeCartModal();
  }
};

function processCheckout() {
  const totalAmount = parseFloat(document.getElementById("total").innerText);
  if (totalAmount > 0) {
    // Redirect to a payment gateway (Stripe, PayPal, etc.)
    const paymentMethods = document.createElement("div");
    paymentMethods.innerHTML = `
            <h3>Select Payment Method</h3>
            <button onclick="processPayment('PayPal')">Pay with PayPal</button>
            <button onclick="processPayment('Stripe')">Pay with Stripe</button>
            <button onclick="processPayment('MasterCard')">Pay with MasterCard</button>
        `;
    document.querySelector(".order-summary").appendChild(paymentMethods);
  } else {
    alert("Your cart is empty.");
  }
}

function processPayment(method) {
  alert(`Processing payment through ${method}`);
  // Payment processing logic here (e.g., integration with PayPal or Stripe API)
}
