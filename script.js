// script.js

// Pastikan file data.js sudah diimpor sebelum file ini di HTML
// <script src="data.js"></script>
// <script src="script.js"></script>

document.addEventListener('DOMContentLoaded', () => {

    // --- Bagian Utama untuk Menghasilkan Konten Dinamis ---

    // Fungsi untuk menampilkan produk
    function renderProducts(productsToDisplay) {
        const productList = document.querySelector('.product-list');
        productList.innerHTML = ''; // Kosongkan konten sebelumnya

        productsToDisplay.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.setAttribute('data-aos', 'fade-up');
            productItem.setAttribute('data-category', product.category);
            
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="price">${product.price}</p>
                    <p class="description">${product.description}</p>
                    <a href="${product.waLink}" class="btn-buy" target="_blank">Beli Sekarang</a>
                </div>
            `;
            productList.appendChild(productItem);
        });
        
        // Setelah produk dirender, tambahkan event listener untuk modal
        attachBuyButtonListeners();
    }

    // Fungsi untuk menampilkan resep
// Fungsi untuk menampilkan varian rasa / kategori camilan
    function renderRecipes() {
        const recipeList = document.querySelector('.recipe-list');
        recipes.forEach((recipe, index) => {
            const recipeItem = document.createElement('div');
            recipeItem.className = 'recipe-item';
            recipeItem.setAttribute('data-aos', 'fade-up');
            recipeItem.setAttribute('data-aos-delay', index * 100);
            
            recipeItem.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.name}" loading="lazy">
                <h3>${recipe.name}</h3>
                <p>${recipe.description}</p>
                <a href="${recipe.link}" class="btn-recipe" target="_blank">Pilih Varian</a>
            `;
            recipeList.appendChild(recipeItem);
        });
    }

    // Fungsi untuk menampilkan testimoni
    function renderTestimonials() {
        const testimonialList = document.querySelector('.testimonial-list');
        testimonials.forEach((testimonial, index) => {
            const testimonialItem = document.createElement('div');
            testimonialItem.className = 'testimonial-item';
            testimonialItem.setAttribute('data-aos', 'zoom-in');
            testimonialItem.setAttribute('data-aos-delay', index * 200); // Tambahkan delay untuk efek
            
            testimonialItem.innerHTML = `
                <img src="${testimonial.image}" alt="Foto Pelanggan">
                <p>"${testimonial.text}"</p>
                <h4>- ${testimonial.name}</h4>
            `;
            testimonialList.appendChild(testimonialItem);
        });
    }

    // Panggil fungsi render saat halaman dimuat
    renderProducts(products);
    renderRecipes();
    renderTestimonials();

    // --- Logika Filter Produk yang Diperbarui ---

    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.getAttribute('data-category');
            let filteredProducts;
            if (category === 'all') {
                filteredProducts = products;
            } else {
                filteredProducts = products.filter(p => p.category === category);
            }
            // Panggil renderProducts dengan data yang sudah difilter
            renderProducts(filteredProducts);
            // Re-inisialisasi AOS setelah konten baru dimuat
            AOS.refresh();
        });
    });

    // --- Logika Modal dan WhatsApp yang Disempurnakan ---

    const customModal = document.getElementById('custom-modal');
    const continueBtn = document.getElementById('continue-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const closeBtn = document.querySelector('.close-btn');

    let currentWaLink = '';

    // Fungsi untuk melampirkan event listener ke tombol 'Beli Sekarang'
    // Fungsi ini dipanggil setiap kali produk baru dirender
    function attachBuyButtonListeners() {
        const buyButtons = document.querySelectorAll('.btn-buy');
        buyButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                currentWaLink = button.getAttribute('href');
                customModal.style.display = 'flex';
            });
        });
    }
    
    // Panggil fungsi ini sekali di awal untuk tombol yang pertama kali dirender
    // (Sebenarnya sudah dipanggil di renderProducts())

    continueBtn.addEventListener('click', () => {
        customModal.style.display = 'none';
        window.open(currentWaLink, '_blank'); // Menggunakan window.open untuk tab baru
    });

    const hideModal = () => {
        customModal.style.display = 'none';
    };

    cancelBtn.addEventListener('click', hideModal);
    closeBtn.addEventListener('click', hideModal);
    window.addEventListener('click', (event) => {
        if (event.target === customModal) {
            hideModal();
        }
    });

    // --- Logika Scroll to Top & Dark Mode (biarkan sama) ---

    const scrollToTopBtn = document.getElementById('scroll-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    const toggleDarkModeBtn = document.getElementById('toggle-dark-mode');
    if (toggleDarkModeBtn) {
        toggleDarkModeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
        });
    }

    // Refresh AOS setelah semua konten dimuat
    AOS.refresh();
});