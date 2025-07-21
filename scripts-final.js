document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DO FORMULÁRIO DE CONTATO (JÁ EXISTENTE) ---
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio padrão do formulário
            const emailInput = contactForm.querySelector('input[type="email"]');

            if (emailInput.value && emailInput.checkValidity()) {
                // Exibe mensagem de sucesso na página
                formMessage.textContent = 'Obrigado pelo seu interesse! Entraremos em contato em breve.';
                formMessage.className = 'form-message success';

                emailInput.value = ''; // Limpa o campo

                // Faz a mensagem desaparecer após 5 segundos
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);

            }
        });
    }

    // --- CARROSSEL DE FEEDBACKS MELHORADO ---
    const carousel = document.querySelector('.feedback-carousel');
    const slides = Array.from(document.querySelectorAll('.feedback-card'));
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');
    const dotsContainer = document.querySelector('.carousel-dots');

    if (carousel && slides.length > 0) {
        let currentIndex = 0;
        let autoSlideInterval;

        // --- Cria os indicadores (pontos) ---
        slides.forEach((slide, index) => {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active'); // Ativa o primeiro ponto
            dot.addEventListener('click', () => {
                moveToSlide(index);
            });
            dotsContainer.appendChild(dot);
        });

        const dots = Array.from(document.querySelectorAll('.dot'));

        // --- Função para mover para um slide específico ---
        const moveToSlide = (slideIndex) => {
            // Move o carrossel
            carousel.style.transform = 'translateX(-' + slideIndex * 100 + '%)';

            // Atualiza o indicador ativo
            dots.forEach(dot => dot.classList.remove('active'));
            dots[slideIndex].classList.add('active');

            // Atualiza o índice atual
            currentIndex = slideIndex;

            // Reinicia o intervalo do carrossel automático
            resetAutoSlide();
        };

        // --- Funções dos botões "Próximo" e "Anterior" ---
        nextButton.addEventListener('click', () => {
            const nextIndex = (currentIndex + 1) % slides.length;
            moveToSlide(nextIndex);
        });

        prevButton.addEventListener('click', () => {
            const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
            moveToSlide(prevIndex);
        });

        // --- Carrossel Automático ---
        const startAutoSlide = () => {
            autoSlideInterval = setInterval(() => {
                const nextIndex = (currentIndex + 1) % slides.length;
                moveToSlide(nextIndex);
            }, 5000); // Muda a cada 5 segundos
        };

        const resetAutoSlide = () => {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        };

        // Inicia o carrossel automático
        startAutoSlide();
    }
});