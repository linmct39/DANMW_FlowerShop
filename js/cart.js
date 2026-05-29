let cartData = JSON.parse(localStorage.getItem('cartItems')) || [];


function formatMoney(amount) {
    return amount.toLocaleString('vi-VN') + 'đ';
}

// Hàm render toàn bộ giỏ hàng
function renderCart() {
    const container = document.getElementById('cart-items-container');
    container.innerHTML = '';

    let subtotal = 0;
    let totalItems = 0;

    cartData.forEach((item, index) => {
        const itemTotal = item.unitPrice * item.quantity;
        subtotal += itemTotal;
        totalItems += item.quantity;

        const cartItemHTML = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='image/avatar.png'">
                
                <div class="item-info">
                    <h3>${item.name}</h3>
                    <span class="item-category">${item.category}</span>
                    <div class="item-unit-price">${formatMoney(item.unitPrice)}</div>
                </div>

                <div class="qty-control">
                    <button class="qty-btn" onclick="updateQty(${index}, -1)">-</button>
                    <input type="text" class="qty-input" value="${item.quantity}" readonly>
                    <button class="qty-btn" onclick="updateQty(${index}, 1)">+</button>
                </div>

                <div class="item-total-price">
                    ${formatMoney(itemTotal)}
                </div>

                <button class="btn-remove" onclick="removeItem(${index})" title="Xóa sản phẩm">
                    <img src="image/trash.png" alt="Xóa" class="trash-icon" onerror="this.style.display='none'">
                </button>
            </div>
        `;
        container.innerHTML += cartItemHTML;
    });

    // Cập nhật phần Tóm tắt bên phải
    document.getElementById('subtotal-price').innerText = formatMoney(subtotal);
    document.getElementById('total-price').innerText = formatMoney(subtotal);
    document.getElementById('cart-count-text').innerText = `${totalItems} sản phẩm trong túi đồ của bạn`;
}

// Hàm tăng giảm số lượng
function updateQty(index, change) {
    let newQty = cartData[index].quantity + change;
    if (newQty >= 1) { // Đảm bảo số lượng không rớt xuống 0
        cartData[index].quantity = newQty;
        localStorage.setItem('cartItems', JSON.stringify(cartData));
        if (typeof updateCartBadge === 'function') updateCartBadge();
        renderCart(); // Render lại giao diện để tính tiền
    }
}

// Hàm xóa sản phẩm
function removeItem(index) {
    if (confirm("Bạn muốn xóa sản phẩm này khỏi giỏ hàng?")) {
        cartData.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartData));
        if (typeof updateCartBadge === 'function') updateCartBadge();
        renderCart();
    }
}

// Khởi chạy khi tải trang
document.addEventListener('DOMContentLoaded', renderCart);

function goToCheckout() {
    if (cartData.length === 0) {
        alert("Giỏ hàng của bạn đang trống! Hãy chọn vài món đồ nhé.");
        return;
    }
    window.location.href = "checkout.html";
}