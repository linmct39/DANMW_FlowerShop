function getCartItems() {
    return JSON.parse(localStorage.getItem('cartItems')) || [];
}

function saveCartItems(items) {
    localStorage.setItem('cartItems', JSON.stringify(items));
}

function updateCartBadge() {
    const items = getCartItems();
    const count = items.reduce((total, item) => total + parseInt(item.quantity || 0), 0);
    
    const headerCount = document.getElementById('header-cart-count');
    if (headerCount) {
        headerCount.innerText = count;
        headerCount.style.display = count > 0 ? 'inline-block' : 'none';
    }
    
    const productCount = document.getElementById('product-cart-count');
    if (productCount) {
        productCount.innerText = count;
        productCount.style.display = count > 0 ? 'inline-block' : 'none';
    }
    
    updateActiveNav();
}

function updateActiveNav() {
    const navLinks = document.querySelectorAll('.main-nav .nav-link');
    if (navLinks.length === 0) return;
    
    let currentPath = window.location.pathname.split('/').pop();
    if (!currentPath || currentPath === '') {
        currentPath = 'home.html'; 
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    const section = urlParams.get('section');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkPage = link.getAttribute('data-page');
        const linkSection = link.getAttribute('data-section');
        
        if (linkPage === currentPath) {
            if (section) {
                if (linkSection === section) {
                    link.classList.add('active');
                }
            } else {
                if (!linkSection) {
                    link.classList.add('active');
                }
            }
        }
    });
}


function addToCart(productData) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert("Vui lòng đăng nhập để có thể mua hàng!");
        window.location.href = "login.html";
        return;
    }
    if (currentUser.role === 'admin') {
        alert("Tài khoản quản trị không thể mua hàng!");
        return;
    }

    const items = getCartItems();
    const existingIndex = items.findIndex(item => item.name === productData.name);
    
    if (existingIndex > -1) {
        items[existingIndex].quantity += parseInt(productData.quantity);
    } else {
        items.push({
            id: Date.now() + Math.floor(Math.random()*1000),
            name: productData.name,
            category: productData.category || "Hoa tươi",
            unitPrice: parseInt(productData.price),
            quantity: parseInt(productData.quantity),
            image: productData.image
        });
    }
    saveCartItems(items);
    updateCartBadge();
    alert(`Đã thêm [${productData.name}] vào giỏ hàng!`);
}

document.addEventListener('DOMContentLoaded', updateCartBadge);
