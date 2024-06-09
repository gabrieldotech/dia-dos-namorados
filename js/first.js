document.addEventListener('DOMContentLoaded', function () {
    // Seleciona o conteúdo do carrossel e os itens do carrossel
    const carouselContent = document.querySelector('.carousel-content');
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    let index = 0;

    // Adiciona evento de clique para avançar para o próximo item do carrossel
    document.querySelector('.carousel-next').addEventListener('click', function () {
        index = (index + 1) % totalItems;
        updateCarousel();
    });

    // Adiciona evento de clique para voltar para o item anterior do carrossel
    document.querySelector('.carousel-prev').addEventListener('click', function () {
        index = (index - 1 + totalItems) % totalItems;
        updateCarousel();
    });

    // Atualiza a posição do carrossel
    function updateCarousel() {
        const translateX = -index * 100;
        carouselContent.style.transform = `translateX(${translateX}%)`;
        
    }

        // Evento de mouse sobre o cartão para mostrar detalhes em dispositivos maiores
        card.addEventListener('mouseover', function () {
            if (window.innerWidth > 768) {
                this.classList.add('hover-effect');
            }
        });

        // Evento de mouse fora do cartão para remover os detalhes em dispositivos maiores
        card.addEventListener('mouseout', function () {
            if (window.innerWidth > 768) {
                this.classList.remove('hover-effect');
            }
        });
    });
