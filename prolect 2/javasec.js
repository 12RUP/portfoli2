// Функция для отображения определенной вкладки и скрытия остальных
function openTab(tabName) {
    const tabs = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "flex";
}



function opentab(tabName) {
    const tabs = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";
}


// Функция для добавления товара в корзину
function addToCart(productName, price) {
    const cartItems = document.getElementById("cartItems");
    if (cartItems) {
        const newItem = document.createElement("div");
        newItem.innerHTML = `<p>${productName} - ${price} <button class="remove-button" onclick="removeFromCart(this)">Удалить</button></p>`;
        newItem.classList.add("cart-item");
        cartItems.appendChild(newItem);
        updateTotal(price);
        updateCartItemCount(1);
    }
}

// Функция для удаления товара из корзины с анимацией
function removeFromCart(item) {
    const removedItem = item.parentElement;
    const price = parseFloat(removedItem.textContent.split(' - ')[1]);
    removedItem.classList.add("remove-animation");
    removedItem.addEventListener("animationend", function() {
        removedItem.remove();
        updateTotal(-price);
        updateCartItemCount(-1);
    });
}

// Функция для обновления общей суммы в корзине
function updateTotal(price) {
    const totalPrice = document.getElementById("totalPrice");
    const currentTotal = parseFloat(totalPrice.innerText.replace("Итого: $", ""));
    const newTotal = currentTotal + price;
    totalPrice.innerText = `Итого: $${newTotal.toFixed(2)}`;
}

// Функция для обновления количества товаров в корзине
function updateCartItemCount(change) {
    const cartItemCount = document.getElementById("cartItemCount");
    const currentCount = parseInt(cartItemCount.textContent);
    const newCount = currentCount + change;
    cartItemCount.textContent = newCount > 0 ? newCount : "0";
}

// Функция для очистки корзины
function clearCart() {
    const cartItems = document.getElementById("cartItems");
    if (cartItems) {
        cartItems.innerHTML = '';
        document.getElementById("cartItemCount").textContent = "0";
        document.getElementById("totalPrice").textContent = "Итого: $0.00";
    }
}

// Функция для оформления заказа
function buyAll() {
    const cartItems = document.getElementById("cartItems");
    if (cartItems.children.length === 0) {
        alert("Корзина пуста");
    } else {
        alert("Заказ выполнен успешно");
    }
}

// По умолчанию открыть вкладку "Главная"
document.getElementById("home").style.display = "block";
