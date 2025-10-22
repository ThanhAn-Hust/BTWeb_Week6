document.addEventListener('DOMContentLoaded', function () {

    console.log("JavaScript đã tải thành công!");

    /* Xử lý Ẩn/Hiện Form Thêm Sản Phẩm */
    
    // Lấy các phần tử (element)
    const toggleBtn = document.getElementById('toggleFormBtn');
    const formSection = document.getElementById('add-product-section');
    const errorMsg = document.getElementById('errorMsg');
    const addForm = document.getElementById('addProductForm');
    const productList = document.getElementById('danh-sach-phim');
    // Gắn sự kiện 'click' cho nút
    if (toggleBtn && formSection) {
        toggleBtn.addEventListener('click', function () {
            
            // Dùng classList.toggle() để thêm/xóa class 'hidden'
            formSection.classList.toggle('hidden');

            // Thay đổi nội dung của nút
            if (formSection.classList.contains('hidden')) {
                toggleBtn.textContent = 'Thêm sản phẩm'; // Đặt lại văn bản
            } else {
                toggleBtn.textContent = 'Đóng Form'; // Đổi văn bản khi form mở
            }
        });
    }

    const cancelBtn = document.getElementById('cancelBtn');
    if(cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            formSection.classList.add('hidden');
            toggleBtn.textContent = 'Them sp';
            errorMsg.textContent = '';
            addForm.reset();
        })
    }

    // Lấy các phần tử trong danh sách
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    // Lấy danh sách các thẻ <article class="phim">
    const allProducts = document.querySelectorAll('.phim'); 

    function filterProducts() {
        // Lấy giá trị từ ô tìm kiếm, chuyển về chữ thường
        const searchTerm = searchInput.value.toLowerCase();

        // Duyệt qua từng sản phẩm (thông qua các thẻ article từ bài 1)
        allProducts.forEach(function (product) {
            
            // Lấy phần tử chứa tên phim bên trong thẻ <article> là product-name
            const productNameElement = product.querySelector('.product-name');
            
            if (productNameElement) {
                const productName = productNameElement.textContent.toLowerCase();

                // kiem tra co san pham hay khong
                if (productName.includes(searchTerm)) {
                    product.style.display = 'block'; 
                } else {
                    product.style.display = 'none';
                }
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keyup', filterProducts);
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', filterProducts);
    }

    // xu ly submit form
    
    if (addForm) {
        addForm.addEventListener('submit', function(event) {
            // Ngăn trang tải lại
            event.preventDefault(); 
            
            const name = document.getElementById('newName').value.trim();
            const price = document.getElementById('newPrice').value.trim();
            const desc = document.getElementById('newDesc').value.trim();
            let imageUrl = document.getElementById('newImageURL').value.trim();

            // Kiểm tra dữ liệu
            const priceNum = parseFloat(price);

            if (name === '' || price === '') {
                errorMsg.textContent = 'Lỗi: Tên phim và Giá không được để trống.';
                return; 
            }

            if (isNaN(priceNum) || priceNum <= 0) {
                errorMsg.textContent = 'Lỗi: Giá phải là một số lớn hơn 0.';
                return; 
            }
            
            if (imageUrl === '') {
                imageUrl = `https://via.placeholder.com/150x220?text=${name.replace(' ', '+')}`;
            }

            errorMsg.textContent = ''; 

            // Tạo HTML ele mới cho sp mới thêm vào
            const newProduct = document.createElement('article');
            newProduct.className = 'phim'; // Gán class cho giống các phim khác, sau này thao tác

            // Dùng innerHTML để tạo nội dung
            newProduct.innerHTML = `
                <img src="${imageUrl}" alt="Áp phích phim ${name}">
                <h3 class="product-name">${name}</h3>
                <p class="product-desc">${desc || 'Chưa có mô tả.'}</p> 
                <p><strong>Giá:</strong> ${priceNum.toLocaleString()} VNĐ (Mua)</p>
            `;

            // Prepend phim mới vào đầu dsach
            productList.prepend(newProduct);
            
            // Reset và Ẩn form sau khi nhập và submit
            addForm.reset(); 
            formSection.classList.add('hidden'); // Ẩn form
            toggleBtn.textContent = 'Thêm sản phẩm'; // Đặt lại text nút

            // Thông báo thành công cho phấn khởi
            alert('Thêm phim "' + name + '" thành công!');
        });
    }

}); 