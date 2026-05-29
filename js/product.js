let defaultProducts = [
    {
        name: "Garden Morning Glow Pink",
        desc: "06 Hoa Hồng Kem Dâu,Hoa Dã Quỳ (Theo Mùa), Hoa Violet Xanh Lam, Hoa Cẩm Chướng Hồng, Cỏ Xanh",
        price: "720.000 VNĐ",
        image: "image/gardenmorningglowpink.png",
        cat: "ROSE"
    },
    {
        name: "Sophia Bunny",
        desc: " Hoa hồng cánh sen, Lá phụ điệp,cỏ xanh",
        price: "665.000 VNĐ",
        image: "image/sophiabunny.png",
        cat: "ROSE"
    },
    {
        name: "Sweet Muse",
        desc: "Hoa Hồng Kem,Hoa Hồng Tỷ Muội,Hoa Rosy Tím,Hoa Đồng Tiền,Hoa Cẩm Chướng Hồng,Cỏ đồng tiền,Lá + Phụ kiện ",
        price: "780.000 VNĐ",
        image: "image/sweetmuse.png",
        cat: "ROSE"
    },
    {
        name: "Sophia Secret Garden",
        desc: " Sophie, Cẩm Chướng Hồng, Hoa Cúc Tana, Cỏ",
        price: "1.650.000 VNĐ",
        image: "image/sophiasecretgarden.png",
        cat: "ALL"
    },
    {
        name: "Muse Tulip Rose Pink",
        desc: "Hoa Tulip Hà Lan Trắng: 03 Bông,Hoa Phi Yến Nhập: 02 Bông,Hoa Hồng Kem: 20 Bông ",
        price: "780.000 VNĐ",
        image: "image/musetuliprosepink.png",
        cat: "TULIP"
    },
    {
        name: "Pink Tulip Vintage",
        desc: "10 Bông Hoa Tulip Hà Lan Hồng (Pink Tulip),02 Cành Cỏ Suối ",
        price: "1.250.000 VNĐ",
        image: "image/pinktulipvintage.png",
        cat: "TULIP"
    },
    {
        name: "Pure White Daisy Tulip",
        desc: " 10 Bông Hoa Tulip Trắng (Hà Lan), 02 Cành Cỏ Suối",
        price: "1.350.000 VNĐ",
        image: "image/purewhitedaisytulip.png",
        cat: "TULIP"
    },
    {
        name: "Sophia Mix White Style",
        desc: "Cúc gỗ, Hoa Lam Tinh, Hoa Phi Yên Trắng, Lá",
        price: "1.980.000 VNĐ",
        image: "image/sophiamixwhitestyle.png",
        cat: "ALL"
    },
    {
        name: "Daisy White Only U",
        desc: "Sophie, Tulip Trắng",
        price: "1.280.000 VNĐ",
        image: "image/daisywhiteonlyu.png",
        cat: "TULIP"
    },
];

let products = JSON.parse(localStorage.getItem('shopProducts'));
if (!products) {
    products = defaultProducts;
    localStorage.setItem('shopProducts', JSON.stringify(products));
}

let currentPage = 1;
const itemsPerPage = 8;

let searchQuery = '';
let currentCategory = 'ALL';

function displayProducts(page) {
    const grid = document.getElementById("product-grid");
    grid.innerHTML = ""; 

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = currentCategory === 'ALL' || p.cat === currentCategory;
        return matchesSearch && matchesCategory;
    });

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    const productsToShow = filteredProducts.slice(startIndex, endIndex);

    productsToShow.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" onerror="this.src='image/avatar.png'">
            <h3>${product.name}</h3>
            <p class="desc">${product.desc}</p>
            <p class="price">${product.price}</p>
            <button class="btn-add-cart" onclick="if(typeof addToCart === 'function') { addToCart({name: '${product.name}', price: parseInt('${product.price}'.replace(/\\D/g, '')), image: '${product.image}', quantity: 1, category: '${product.desc}'}); }">ADD TO CART</button>
        `;
        grid.appendChild(card);
    }); 
}
function setupPagination() {
    const pageButtons = document.querySelectorAll('.page-number');
    pageButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            pageButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentPage = parseInt(this.innerText);
            displayProducts(currentPage);
        });
    });
}
document.addEventListener('DOMContentLoaded', () => {
    // Also read global search from URL if present
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
        searchQuery = searchParam.trim();
        const searchInput = document.getElementById('dashboard-search-input');
        if (searchInput) searchInput.value = searchQuery;
    }

    displayProducts(currentPage); 
    setupPagination(); 

    const searchInput = document.getElementById('dashboard-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchQuery = this.value.trim();
            currentPage = 1;
            displayProducts(currentPage);
        });
    }

    const categoryLinks = document.querySelectorAll('#dashboard-category-filter a');
    if (categoryLinks.length > 0) {
        categoryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                categoryLinks.forEach(item => item.classList.remove('active'));
                this.classList.add('active');
                currentCategory = link.getAttribute('data-cat') || 'ALL';
                currentPage = 1;
                displayProducts(currentPage);
            });
        });
    }
});