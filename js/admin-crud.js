document.addEventListener('DOMContentLoaded', () => {
    renderAdminProducts();

    const btnAdd = document.getElementById('btn-add-product');
    if (btnAdd) {
        btnAdd.addEventListener('click', () => {
            openModal();
        });
    }

    const btnSidebarAdd = document.getElementById('btn-sidebar-add-product');
    if (btnSidebarAdd) {
        btnSidebarAdd.addEventListener('click', () => {
            openModal();
        });
    }
});

function renderAdminProducts() {
    const tbody = document.getElementById('admin-product-list');
    if (!tbody) return;

    tbody.innerHTML = '';

    products.forEach((product, index) => {
        const id = `#FL-${(index + 1).toString().padStart(3, '0')}`;
        
        let tagClass = 'tag-gray';
        let tagName = product.cat || 'UNKNOWN';
        if (product.cat === 'ROSE') tagClass = 'tag-pink';
        else if (product.cat === 'TULIP') tagClass = 'tag-yellow';
        else if (product.cat === 'ORCHID') tagClass = 'tag-green';
        else if (product.cat === 'ALL') tagClass = 'tag-brown';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${id}</td>
            <td class="product-cell">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='image/avatar.png'">
                <div>
                    <strong>${product.name}</strong>
                    <span style="display:inline-block; max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${product.desc}</span>
                </div>
            </td>
            <td><span class="tag ${tagClass}">${tagName}</span></td>
            <td><strong>${product.price}</strong></td>
            <td>
                <span class="stock-num">42</span>
                <div class="stock-bar"><div class="fill green" style="width: 80%"></div></div>
            </td>
            <td class="actions-cell">
                <button class="icon-btn" onclick="openModal(${index})"><img src="image/icon-edit.png" alt="Sửa" class="action-icon" onerror="this.src='image/icon-edit.png'"></button>
                <button class="icon-btn" onclick="deleteProduct(${index})"><img src="image/icon-delete.png" alt="Xóa" class="action-icon" onerror="this.src='image/trash.png'"></button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function openModal(index = null) {
    const modal = document.getElementById('product-modal');
    const title = document.getElementById('modal-title');
    
    if (index !== null) {
        title.innerText = 'Sửa Sản Phẩm';
        const p = products[index];
        document.getElementById('modal-product-index').value = index;
        document.getElementById('modal-name').value = p.name;
        document.getElementById('modal-desc').value = p.desc;
        document.getElementById('modal-price').value = p.price;
        document.getElementById('modal-cat').value = p.cat || 'ALL';
        document.getElementById('modal-image').value = p.image;
    } else {
        title.innerText = 'Thêm Sản Phẩm';
        document.getElementById('modal-product-index').value = '';
        document.getElementById('modal-name').value = '';
        document.getElementById('modal-desc').value = '';
        document.getElementById('modal-price').value = '';
        document.getElementById('modal-cat').value = 'ALL';
        document.getElementById('modal-image').value = '';
    }

    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('product-modal').style.display = 'none';
}

function saveProduct() {
    const index = document.getElementById('modal-product-index').value;
    const name = document.getElementById('modal-name').value;
    const desc = document.getElementById('modal-desc').value;
    const price = document.getElementById('modal-price').value;
    const cat = document.getElementById('modal-cat').value;
    const image = document.getElementById('modal-image').value;

    if (!name || !price) {
        alert("Vui lòng nhập tên và giá sản phẩm!");
        return;
    }

    const newProduct = { name, desc, price, cat, image };

    if (index === '') {
        products.push(newProduct);
    } else {
        products[index] = newProduct;
    }

    localStorage.setItem('shopProducts', JSON.stringify(products));
    renderAdminProducts();
    closeModal();
}

function deleteProduct(index) {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
        products.splice(index, 1);
        localStorage.setItem('shopProducts', JSON.stringify(products));
        renderAdminProducts();
    }
}
