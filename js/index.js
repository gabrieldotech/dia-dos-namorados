document.addEventListener('DOMContentLoaded', () => {
    // Elemento de digitação automática
    const autoTypeElement = document.querySelector(".auto-type");
    // Cor de fundo anterior
    let previousBackgroundColor = '';
    // Cor de texto anterior
    let previousTextColor = '';
    // Conjunto de cores usadas
    let usedColors = new Set(); 

    // Gera uma cor aleatória para o amor
    function generateRandomLoveColor() {
        // Matiz
        const hues = [0, 330, 340, 320, 310]; 
        let hue, saturation, lightness, color;
        // Loop até encontrar uma cor não utilizada
        do {
            hue = hues[Math.floor(Math.random() * hues.length)];
            saturation = Math.floor(Math.random() * 21) + 100; 
            lightness = Math.floor(Math.random() * 40) + 40;
            color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        } while (usedColors.has(color)); 
        usedColors.add(color); 
        return color;
    }

    // Gera a cor de texto de contraste com base na cor de fundo
    function generateContrastTextColor(bgColor) {
        const brightnessThreshold = 120; 
        const brightnessBg = brightness(bgColor);
        
        let textColor;
        // Loop até encontrar uma cor de texto com contraste adequado
        do {
            textColor = generateRandomLoveColor();
        } while (brightness(textColor) > brightnessThreshold === brightnessBg > brightnessThreshold);

        return textColor;
    }

    // Muda as cores da página
    function changeColors() {
        let backgroundColor;
        let textColor;

        // Loop até que as cores sejam diferentes das anteriores
        do {
            backgroundColor = generateRandomLoveColor();
            textColor = generateContrastTextColor(backgroundColor);
        } while (backgroundColor === previousBackgroundColor || textColor === previousTextColor);

        // Atualiza as cores da página
        previousBackgroundColor = backgroundColor;
        previousTextColor = textColor;

        document.body.style.backgroundColor = backgroundColor;

        const autoTypeSpan = document.querySelector('.auto-type');
        autoTypeSpan.style.color = textColor;

        const cursor = document.querySelector('.typed-cursor');
        cursor.style.color = textColor;

        const btnAlert = document.getElementById('btn-alert');
        btnAlert.style.backgroundColor = textColor;
    }

    // Inicializa a biblioteca de digitação automática se o elemento existir
    if (autoTypeElement) {
        let typed = new Typed(".auto-type", {
            strings: [
                "valiosa",
                "incomparável",
                "tão linda",
                "o meu refúgio",
                "rara",
                "incrível",
                "apaixonante",
                "...",
                "a Vitória.",
            ],
            typeSpeed: 35,
            backSpeed: 35,
            loop: true,
            preStringTyped: function() {
                changeColors();
            },
        });
    }

    // Obtém o botão de alerta
    const btnAlert = document.getElementById('btn-alert');

    // Adiciona um ouvinte de evento de clique ao botão de alerta
    if (btnAlert) {
        let animationState = ''; 
        btnAlert.addEventListener('click', function() {
            btnAlert.classList.remove('animate__heartBeat');
            animationState = getComputedStyle(btnAlert).animationPlayState;
            btnAlert.style.animationPlayState = 'paused';

            // Exibe um alerta de confirmação com um carregamento
            Swal.fire({
                title: 'Vida',
                html: 'Cada momento ao seu lado é um presente. E para retribuir, codei um aqui pra você.<br><br> <b>Feliz dia dos namorados!</b>',
                imageWidth: 400,
                imageHeight: 200,
                confirmButtonText: 'Clique aqui',
                confirmButtonColor: '#d81b60',
                showLoaderOnConfirm: true,
                preConfirm: () => {
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                        }, 1000);
                    });
                }
            }).then((result) => {
                // Quando o alerta for confirmado, exibe um novo alerta e redireciona após um tempo
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Um momento...',
                        icon: 'info',
                        iconColor: '#d81b60',
                        allowOutsideClick: false,
                        showConfirmButton: false,
                        willOpen: () => {
                            Swal.showLoading();
                        }
                    });
                    setTimeout(() => {
                        document.body.classList.add('fade-out');
                        setTimeout(() => {
                            window.location.href = 'first.html';
                        }, 1000);
                    }, 2000);
                }
            }).finally(() => {
                btnAlert.style.animationPlayState = animationState;
            });
        });
    }
});

// Calcula a luminosidade da cor
function brightness(color) {
    const rgb = hslToRgb(color);
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
}

// Converte o formato HSL para RGB
function hslToRgb(hsl) {
    const [hue, saturation, lightness] = hsl.match(/\d+/g).map(Number);
    const s = saturation / 100;
    const l = lightness / 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((hue / 60) % 2 - 1));
    const m = l - c / 2;
    let r, g, b;

    if (0 <= hue && hue < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= hue && hue < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= hue && hue < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= hue && hue < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= hue && hue < 300) {
        r = x; g = 0; b = c;
    } else {
        r = c; g = 0; b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return { r, g, b };
}
