const state = {
    currentImageIndex: 0,
    images: ['assets/images/gtg.png', 'assets/images/bella.png', 'assets/images/arose.png', 'assets/images/daisies.png', 'assets/images/gtg.png', 'assets/images/bella.png', 'assets/images/arose.png', 'assets/images/daisies.png'],
    selectedPurchase: 'single-subscription'
};

function updateGallery(index) {
    state.currentImageIndex = index;
    const mainImage = document.querySelector('.main-image');
    mainImage.src = state.images[index];
    document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

function initGallery() {
    const prev = document.querySelector('.gallery-arrow-prev');
    const next = document.querySelector('.gallery-arrow-next');
    
    if (prev) prev.onclick = () => updateGallery(state.currentImageIndex === 0 ? state.images.length - 1 : state.currentImageIndex - 1);
    if (next) next.onclick = () => updateGallery(state.currentImageIndex === state.images.length - 1 ? 0 : state.currentImageIndex + 1);
    
    document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
        thumb.onclick = () => updateGallery(i);
    });
}

function updateSubscription() {
    document.querySelectorAll('.subscription-card').forEach(card => {
        card.classList.toggle('active', card.dataset.subscription === state.selectedPurchase);
    });
}

function initSubscriptions() {
    document.querySelectorAll('input[name="purchase"]').forEach(radio => {
        radio.onchange = (e) => {
            state.selectedPurchase = e.target.value;
            updateSubscription();
        };
    });
}

function initMenu() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    
    if (hamburger && nav) {
        hamburger.onclick = () => {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        };
        
        document.querySelectorAll('.nav-list a').forEach(link => {
            link.onclick = () => {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
            };
        });
    }
}

function initAccordion() {
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.onclick = function() {
            const item = this.parentElement;
            const isActive = item.classList.contains('active');
            
            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.accordion-icon').textContent = '+';
            });
            
            if (!isActive) {
                item.classList.add('active');
                this.querySelector('.accordion-icon').textContent = '−';
            }
        };
    });
}

function initStats() {
    const section = document.querySelector('.statistics-section');
    if (!section) return;
    
    let animated = false;
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !animated) {
            animated = true;
            document.querySelectorAll('.stat-number').forEach(el => {
                const target = parseInt(el.dataset.target);
                let current = 0;
                const increment = target / 100;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        el.textContent = target;
                        clearInterval(timer);
                    } else {
                        el.textContent = Math.round(current);
                    }
                }, 20);
            });
        }
    });
    observer.observe(section);
}

document.addEventListener('DOMContentLoaded', () => {
    initGallery();
    initSubscriptions();
    initMenu();
    initAccordion();
    initStats();
});
