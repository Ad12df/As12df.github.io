const productModal = document.getElementById('productModal');
const purchaseModal = document.getElementById('purchaseModal');
const closeButtons =

    document.querySelectorAll('.close-button');
const searchInput = document.getElementById('searchInput');
const categorySelect = document.getElementById('category');
const priceSelect = document.getElementById('price');
const productCards = document.querySelectorAll('.product-card');
const buyButton = document.querySelector('.buy-button');

function openModal(productCard) {
    const image = productCard.querySelector('.product-image').src;
    const name = productCard.querySelector('.product-name').textContent;
    const category = productCard.querySelector('.product-category').textContent;
    const price = productCard.querySelector('.product-price').textContent;
    const description = productCard.querySelector('.product-description').textContent;

    document.getElementById('modalImage').src = image;
    document.getElementById('modalImage').alt = name;
    document.getElementById('modalName').textContent = name;
    document.getElementById('modalCategory').textContent = category;
    document.getElementById('modalDescription').textContent = description;
    document.getElementById('modalPrice').textContent = price;

    productModal.style.display = 'flex';
    productModal.offsetHeight; // Trigger reflow
    productModal.classList.add('active');
}

function openPurchaseModal() {
    const productName = document.getElementById('modalName').textContent;
    const productPrice = document.getElementById('modalPrice').textContent;

    document.getElementById('summaryName').textContent = productName;
    document.getElementById('summaryPrice').textContent = productPrice;

    closeModal(productModal);
    purchaseModal.style.display = 'flex';
    purchaseModal.offsetHeight; // Trigger reflow
    purchaseModal.classList.add('active');
}

function closeModal(modal) {
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

closeButtons.forEach(button => {
    button.addEventListener('click', function () {
        const modal = button.closest('.modal');
        closeModal(modal);
    });
});

buyButton.addEventListener('click', openPurchaseModal);

const purchaseForm = document.getElementById('purchaseForm');
purchaseForm.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('¡Compra realizada con éxito!');
    closeModal(purchaseModal);
});

window.onclick = function (event) {
    if (event.target === productModal) {
        closeModal(productModal);
    }
    if (event.target === purchaseModal) {
        closeModal(purchaseModal);
    }
}

function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categorySelect.value.toLowerCase();
    const priceRange = priceSelect.value;

    productCards.forEach(card => {
        const name = card.querySelector('.product-name').textContent.toLowerCase();
        const productCategory = card.querySelector('.product-category').textContent.toLowerCase();
        const price = parseFloat(card.querySelector('.product-price').textContent.replace('$', '').replace(',', ''));

        const matchesSearch = name.includes(searchTerm);
        const matchesCategory = category === '' || productCategory === category;
        let matchesPrice = true;

        if (priceRange) {
            const [min, max] = priceRange.split('-').map(Number);
            matchesPrice = (max ? price >= min && price <= max : price >= min);
        }

        if (matchesSearch && matchesCategory && matchesPrice) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

searchInput.addEventListener('input', filterProducts);
categorySelect.addEventListener('change', filterProducts);
priceSelect.addEventListener('change', filterProducts);

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.filters').classList.add('animate-slide-down');
    document.querySelector('.products-grid').classList.add('animate-fade-in');
});