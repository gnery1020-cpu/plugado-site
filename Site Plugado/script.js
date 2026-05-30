// ========================== PRODUTOS ==========================
const products = {

    camisas: [

        {
            id: 1,
            name: 'Camisa Oversized Preta',
            price: 'R$ 149,99',
            description: 'Camisa oversized preta premium.',
            material: '100% Algodão Premium',

            images: [
                'imagens/oversized-preta.png',
                'imagens/oversized-preta.png',
                'imagens/oversized-preta-3.png',
                'imagens/oversized-preta-4.png'
            ]
        },

        {
            id: 2,
            name: 'Camisa Oversized Branca',
            price: 'R$ 149,99',
            description: 'Camisa oversized branca premium.',
            material: '100% Algodão Premium',

            images: [
                'imagens/oversized-branca.png',
                'imagens/oversized-branca2.png',
                'imagens/oversized-branca-3.png',
                'imagens/oversized-branca-4.png'
            ]
        },

        {
            id: 3,
            name: 'Camisa Boxy Preta',
            price: 'R$ 139,99',
            description: 'Camisa boxy preta premium.',
            material: '95% Algodão, 5% Elastano',

            images: [
                'imagens/boxy-preta-1.png',
                'imagens/boxy-preta-2.png',
                'imagens/boxy-preta-3.png',
                'imagens/boxy-preta-4.png'
            ]
        },

        {
            id: 4,
            name: 'Camisa Boxy Branca',
            price: 'R$ 139,99',
            description: 'Camisa boxy branca premium.',
            material: '95% Algodão, 5% Elastano',

            images: [
                'imagens/boxy-branca-1.png',
                'imagens/boxy-branca-2.png',
                'imagens/boxy-branca-3.png',
                'imagens/boxy-branca-4.png'
            ]
        }

    ],

    lazytown: [

        {
            id: 5,
            name: 'LazyTown Oversized Preta',
            price: 'R$ 159,99',
            description: 'Coleção LazyTown oversized preta.',
            material: '100% Algodão Premium',

            images: [
                'imagens/lazytown-oversized-preta-1.png',
                'imagens/lazytown-oversized-preta-2.png',
                'imagens/lazytown-oversized-preta-3.png',
                'imagens/lazytown-oversized-preta-4.png'
            ]
        },

        {
            id: 6,
            name: 'LazyTown Oversized Branca',
            price: 'R$ 159,99',
            description: 'Coleção LazyTown oversized branca.',
            material: '100% Algodão Premium',

            images: [
                'imagens/lazytown-oversized-branca-1.png',
                'imagens/lazytown-oversized-branca-2.png',
                'imagens/lazytown-oversized-branca-3.png',
                'imagens/lazytown-oversized-branca-4.png'
            ]
        }

    ],

    moletons: [

        {
            id: 7,
            name: 'Moletom Oversized Preto',
            price: 'R$ 179,99',
            description: 'Moletom oversized preto premium.',
            material: '80% Algodão, 20% Poliéster',

            images: [
                'imagens/moletom-preto-1.png',
                'imagens/moletom-preto-2.png',
                'imagens/moletom-preto-3.png',
                'imagens/moletom-preto-4.png'
            ]
        },

        {
            id: 8,
            name: 'Moletom Oversized Branco',
            price: 'R$ 179,99',
            description: 'Moletom oversized branco premium.',
            material: '80% Algodão, 20% Poliéster',

            images: [
                'imagens/moletom-branco-1.png',
                'imagens/moletom-branco-2.png',
                'imagens/moletom-branco-3.png',
                'imagens/moletom-branco-4.png'
            ]
        }

    ]

};

// ========================== VARIÁVEIS ==========================
let currentProduct = null;
let selectedSize = null;
let currentImageIndex = 0;

// ========================== INICIAR ==========================
document.addEventListener('DOMContentLoaded', () => {

    renderProducts();
    setupEvents();

});

// ========================== RENDER ==========================
function renderProducts() {

    renderCategory('camisas');
    renderCategory('lazytown');
    renderCategory('moletons');

}

function renderCategory(category) {

    const grid = document.getElementById(`${category}Grid`);

    if (!grid) return;

    grid.innerHTML = '';

    products[category].forEach(product => {

        grid.innerHTML += `

            <div class="product-card">

                <div 
                    class="product-image"
                    onmouseenter="hoverImage(this, '${product.images[1]}')"
                    onmouseleave="leaveImage(this, '${product.images[0]}')"
                >

                    <img 
                        src="${product.images[0]}" 
                        alt="${product.name}"
                        onclick="openProductModal(${product.id})"
                    >

                </div>

                <div class="product-info">

                    <h3 class="product-name">
                        ${product.name}
                    </h3>

                    <p class="product-price">
                        ${product.price}
                    </p>

                    <button 
                        class="product-button"
                        onclick="openProductModal(${product.id})"
                    >

                        VER MAIS

                    </button>

                </div>

            </div>

        `;

    });

}

// ========================== HOVER CARD ==========================
function hoverImage(element, image) {

    const img = element.querySelector('img');

    img.src = image;

}

function leaveImage(element, image) {

    const img = element.querySelector('img');

    img.src = image;

}

// ========================== MODAL ==========================
function openProductModal(productId) {

    const allProducts = [

        ...products.camisas,
        ...products.lazytown,
        ...products.moletons

    ];

    currentProduct = allProducts.find(
        product => product.id === productId
    );

    if (!currentProduct) return;

    currentImageIndex = 0;

    // RESET TAMANHO
    document.querySelectorAll('.size-btn').forEach(btn => {

        btn.classList.remove('active');

    });

    selectedSize = null;

    // TEXTOS
    document.getElementById('modalTitle').textContent =
        currentProduct.name;

    document.getElementById('modalPrice').textContent =
        currentProduct.price;

    document.getElementById('modalDescription').textContent =
        currentProduct.description;

    document.getElementById('modalMaterial').textContent =
        currentProduct.material;

    // FOTO PRINCIPAL
    updateMainImage();

    // GALERIA
    renderGallery();

    // ABRIR
    document
        .getElementById('productModal')
        .classList.add('active');

}

// ========================== TROCAR IMAGEM ==========================
function updateMainImage() {

    const mainImage =
        document.getElementById('mainProductImage');

    mainImage.src =
        currentProduct.images[currentImageIndex];

}

function changeMainImage(index) {

    currentImageIndex = index;

    updateMainImage();

    document.querySelectorAll('.gallery-thumb')
        .forEach((thumb, i) => {

            thumb.classList.toggle(
                'active-thumb',
                i === index
            );

        });

}

// ========================== SETAS ==========================
function nextImage() {

    currentImageIndex++;

    if (currentImageIndex >= currentProduct.images.length) {

        currentImageIndex = 0;

    }

    updateMainImage();
    updateThumbs();

}

function prevImage() {

    currentImageIndex--;

    if (currentImageIndex < 0) {

        currentImageIndex =
            currentProduct.images.length - 1;

    }

    updateMainImage();
    updateThumbs();

}

function updateThumbs() {

    document.querySelectorAll('.gallery-thumb')
        .forEach((thumb, i) => {

            thumb.classList.toggle(
                'active-thumb',
                i === currentImageIndex
            );

        });

}

// ========================== GALERIA ==========================
function renderGallery() {

    const gallery =
        document.getElementById('imageGallery');

    gallery.innerHTML = '';

    currentProduct.images.forEach((image, index) => {

        gallery.innerHTML += `

            <div 
                class="gallery-thumb ${index === 0 ? 'active-thumb' : ''}"
                onclick="changeMainImage(${index})"
            >

                <img
                    src="${image}"
                    alt=""
                >

            </div>

        `;

    });

}

// ========================== FECHAR ==========================
function closeProductModal() {

    document
        .getElementById('productModal')
        .classList.remove('active');

}

// ========================== EVENTOS ==========================
function setupEvents() {

    // FECHAR
    document
        .getElementById('modalClose')
        .addEventListener('click', closeProductModal);

    document
        .getElementById('modalOverlay')
        .addEventListener('click', closeProductModal);

    // ESC
    document.addEventListener('keydown', e => {

        if (e.key === 'Escape') {

            closeProductModal();

        }

    });

    // SETAS TECLADO
    document.addEventListener('keydown', e => {

        const modal =
            document.getElementById('productModal');

        if (!modal.classList.contains('active')) return;

        if (e.key === 'ArrowRight') {

            nextImage();

        }

        if (e.key === 'ArrowLeft') {

            prevImage();

        }

    });

    // TAMANHO
    document.querySelectorAll('.size-btn')
        .forEach(btn => {

            btn.addEventListener('click', () => {

                document.querySelectorAll('.size-btn')
                    .forEach(button => {

                        button.classList.remove('active');

                    });

                btn.classList.add('active');

                selectedSize = btn.dataset.size;

            });

        });

    // MENU MOBILE
    const hamburger =
        document.getElementById('hamburger');

    const navMenu =
        document.getElementById('navMenu');

    hamburger.addEventListener('click', () => {

        hamburger.classList.toggle('active');

        navMenu.classList.toggle('active');

    });

    // FECHAR MENU
    document.querySelectorAll('.nav-link')
        .forEach(link => {

            link.addEventListener('click', () => {

                hamburger.classList.remove('active');

                navMenu.classList.remove('active');

            });

        });

    // COMPRAR
    document
        .getElementById('buyBtn')
        .addEventListener('click', () => {

            if (!selectedSize) {

                alert('Selecione um tamanho');

                return;

            }

            alert(
                `Compra iniciada:\n${currentProduct.name}\nTamanho: ${selectedSize}`
            );

        });

    // CARRINHO
    document
        .getElementById('cartBtn')
        .addEventListener('click', () => {

            if (!selectedSize) {

                alert('Selecione um tamanho');

                return;

            }

            alert(
                `${currentProduct.name} (${selectedSize}) adicionado ao carrinho`
            );

        });

}

// ========================== CONSOLE ==========================
console.log('PLUGADO carregado com sucesso');