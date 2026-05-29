const products = [
    {
        name: "Garden Morning Glow Pink",
        desc: "06 Hoa Hồng Kem Dâu,Hoa Dã Quỳ (Theo Mùa), Hoa Violet Xanh Lam, Hoa Cẩm Chướng Hồng, Cỏ Xanh",
        price: "720.000 VNĐ",
        image: "image/gardenmorningglowpink.png"
    },
    {
        name: "Sophia Bunny",
        desc: " Hoa hồng cánh sen, Lá phụ điệp,cỏ xanh",
        price: "665.000 VNĐ",
        image: "image/sophiabunny.png"
    },
    {
        name: "Sweet Muse",
        desc: "Hoa Hồng Kem,Hoa Hồng Tỷ Muội,Hoa Rosy Tím,Hoa Đồng Tiền,Hoa Cẩm Chướng Hồng,Cỏ đồng tiền,Lá + Phụ kiện ",
        price: "780.000 VNĐ",
        image: "image/sweetmuse.png"
    },
    {
        name: "Sophia Secret Garden",
        desc: " Sophie, Cẩm Chướng Hồng, Hoa Cúc Tana, Cỏ",
        price: "1.650.000 VNĐ",
        image: "image/sophiasecretgarden.png"

    },
    {
        name: "Muse Tulip Rose Pink",
        desc: "Hoa Tulip Hà Lan Trắng: 03 Bông,Hoa Phi Yến Nhập: 02 Bông,Hoa Hồng Kem: 20 Bông ",
        price: "780.000 VNĐ",
        image: "image/musetuliprosepink.png"
    },
    {
        name: "Pink Tulip Vintage",
        desc: "10 Bông Hoa Tulip Hà Lan Hồng (Pink Tulip),02 Cành Cỏ Suối ",
        price: "1.250.000 VNĐ",
        image: "image/pinktulipvintage.png"
    },
    {
        name: "Pure White Daisy Tulip",
        desc: " 10 Bông Hoa Tulip Trắng (Hà Lan), 02 Cành Cỏ Suối",
        price: "1.350.000 VNĐ",
        image: "image/purewhitedaisytulip.png"
    },
    {
        name: "Sophia Mix White Style",
        desc: "Cúc gỗ, Hoa Lam Tinh, Hoa Phi Yên Trắng, Lá",
        price: "1.980.000 VNĐ",
        image: "image/sophiamixwhitestyle.png"
    },
    {
        name: "Daisy White Only U",
        desc: "Sophie, Tulip Trắng",
        price: "1.280.000 VNĐ",
        image: "image/daisywhiteonlyu.png"
    },
];

let currentPage = 1;
const itemsPerPage = 8;

function displayProducts(page) {
    const grid = document.getElementById("product-grid");
    grid.innerHTML = ""; 

   
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    
    const productsToShow = products.slice(startIndex, endIndex);

    
    productsToShow.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" onerror="this.src='image/avatar.png'">
            <h3>${product.name}</h3>
            <p class="desc">${product.desc}</p>
            <p class="price">${product.price}</p>
            <button class="btn-add-cart">ADD TO CART</button>
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
    displayProducts(currentPage); 
    setupPagination(); 
});