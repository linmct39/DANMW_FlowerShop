let checkoutData = JSON.parse(localStorage.getItem('cartItems')) || [];

function formatMoney(amount) {
    return amount.toLocaleString('vi-VN') + 'đ';
}

function renderCheckoutItems() {
    const container = document.getElementById('checkout-items');
    if (!container) return;
    
    if (checkoutData.length === 0) {
        alert("Không có sản phẩm nào để thanh toán!");
        window.location.href = "cart.html";
        return;
    }

    container.innerHTML = '';
    let subtotal = 0;

    checkoutData.forEach(item => {
        const itemTotal = item.unitPrice * item.quantity;
        subtotal += itemTotal;

        container.innerHTML += `
            <div class="item">
                <img src="${item.image}" alt="${item.name}" class="item-img" onerror="this.src='image/avatar.png'">
                <div class="item-details">
                    <div class="item-title-price">
                        <strong>${item.name}</strong>
                        <span>${formatMoney(itemTotal)}</span>
                    </div>
                    <p class="item-note">Phân loại: ${item.category || 'Mặc định'}</p>
                    <p class="item-qty">Qty: ${item.quantity}</p>
                </div>
            </div>
        `;
    });

    document.getElementById('checkout-subtotal').innerText = formatMoney(subtotal);
    document.getElementById('checkout-total').innerText = formatMoney(subtotal);
}

function handleCheckout(event) {
    event.preventDefault();
    
    // Giả lập quá trình đặt hàng thành công
    console.log("Order processed!");
    
    // Xóa giỏ hàng
    localStorage.removeItem('cartItems');
    
    // Chuyển sang trang Cảm ơn
    window.location.href = "thankyou.html";
}

document.addEventListener('DOMContentLoaded', renderCheckoutItems);
