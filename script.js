// ========== EMAILJS VERIFICAÇÃO ==========
console.log('=== CARREGANDO SCRIPT ===');
if (typeof emailjs === 'undefined') {
    console.error('❌ EmailJS não carregado! Adicione o script no <head>');
} else {
    console.log('✅ EmailJS carregado!');
}

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== DOM CARREGADO ===');
    
    // 1. INICIALIZAR EMAILJS (se existir)
    if (typeof emailjs !== 'undefined') {
        emailjs.init("1JKERJLs6yLjO62a4");
        console.log('✅ EmailJS inicializado com Public Key');
    } else {
        console.warn('⚠️ EmailJS não disponível. Usando fallback para mailto.');
    }
    
    // 2. CONFIGURAR FORMULÁRIO DE CONTATO
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (!contactForm) {
            console.error('❌ Formulário #contactForm não encontrado!');
            return;
        }
        
        console.log('✅ Formulário encontrado:', contactForm);
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('📝 Formulário submetido');
            
            // Coletar dados
            const name = document.getElementById('user_name').value;
            const email = document.getElementById('user_email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('⚠️ Preencha todos os campos!');
                return;
            }
            
            const templateParams = {
                name: name,
                email: email,
                message: message,
                date: new Date().toLocaleString('pt-BR')
            };
            
            console.log('📤 Dados para envio:', templateParams);
            
            // Botão de enviar
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Mostrar "enviando"
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> ENVIANDO...';
            submitBtn.disabled = true;
            
            // FUNÇÃO FALLBACK (mailto)
            function useMailtoFallback() {
                const subject = `Contato Site Raccoon City: ${name}`;
                const body = `Nome: ${name}\nEmail: ${email}\nData: ${templateParams.date}\n\nMensagem:\n${message}`;
                
                console.log('🔄 Usando fallback mailto');
                window.location.href = `mailto:robson_livre_@hotmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                
                // Restaurar botão após delay
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 1000);
            }
            
            // TENTAR EMAILJS PRIMEIRO
            if (typeof emailjs !== 'undefined' && emailjs.send) {
                console.log('🚀 Tentando EmailJS...');
                
                emailjs.send(
                    'service_re6hevq',
                    'template_ifzyysf',
                    templateParams
                )
                .then(function(response) {
                    console.log('✅ EmailJS: Sucesso!', response);
                    
                    // Mensagem de sucesso
                    alert('✅ Mensagem enviada com sucesso! O Robin entrará em contato.');
                    
                    // Limpar formulário
                    contactForm.reset();
                    
                    // Botão de sucesso
                    submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i> ENVIADO!';
                    submitBtn.style.background = '#10b981';
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                    }, 2000);
                    
                }).catch(function(error) {
                    console.error('❌ EmailJS falhou:', error);
                    
                    // Perguntar se quer fallback
                    if (confirm('Sistema automático indisponível. Abrir email manualmente?')) {
                        useMailtoFallback();
                    } else {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }
                });
                
            } else {
                // EmailJS não disponível, usar fallback direto
                console.log('🔄 EmailJS não disponível, usando fallback...');
                useMailtoFallback();
            }
        });
    }
    
    // 3. SEU CÓDIGO EXISTENTE (com algumas correções)
    
    // Elementos de áudio
    const bgMusic = document.getElementById('bg-music');
    const toggleSoundBtn = document.getElementById('toggle-sound');
    let isPlaying = false;

    if (toggleSoundBtn && bgMusic) {
        toggleSoundBtn.addEventListener('click', function() {
            if (isPlaying) {
                bgMusic.pause();
                toggleSoundBtn.innerHTML = '<i class="fas fa-volume-up mr-2"></i>Ligar Som';
                toggleSoundBtn.classList.remove('bg-red-700');
                toggleSoundBtn.classList.add('bg-red-900/80');
            } else {
                bgMusic.play().then(() => {
                    toggleSoundBtn.innerHTML = '<i class="fas fa-volume-mute mr-2"></i>Desligar Som';
                    toggleSoundBtn.classList.remove('bg-red-900/80');
                    toggleSoundBtn.classList.add('bg-red-700');
                }).catch(err => {
                    console.log('Erro no áudio:', err);
                });
            }
            isPlaying = !isPlaying;
        });
    }

    // Efeito de digitação
    function initTypewriter() {
        const typewriter = document.querySelector('.typewriter');
        if (typewriter) {
            const text = typewriter.textContent;
            typewriter.textContent = '';
            typewriter.style.width = '0';
            
            setTimeout(() => {
                let i = 0;
                const typing = setInterval(() => {
                    if (i < text.length) {
                        typewriter.textContent += text.charAt(i);
                        i++;
                    } else {
                        clearInterval(typing);
                        typewriter.style.borderRight = 'none';
                    }
                }, 50);
            }, 500);
        }
    }

    // Efeitos galeria
    function initGalleryEffects() {
        const galleryItems = document.querySelectorAll('.gallery-item, .gallery-video');
        galleryItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.boxShadow = '0 0 15px rgba(255, 0, 0, 0.7)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = 'none';
            });
        });
    }

    // Smooth scroll
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Header scroll
    function initHeaderScroll() {
        const header = document.querySelector('header');
        if (header) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    header.classList.add('shadow-2xl');
                } else {
                    header.classList.remove('shadow-2xl');
                }
            });
        }
    }

    // Inicializar tudo
    function initAll() {
        initTypewriter();
        initGalleryEffects();
        initSmoothScroll();
        initHeaderScroll();
        initContactForm(); // ← FORMULÁRIO
        initBloodEffect(); // ← EFEITO SANGUE
        
        console.log('✅ Todos os sistemas inicializados');
    }

    initAll();

    // Auto-play vídeo
    const bgVideo = document.querySelector('.video-background video');
    if (bgVideo) {
        bgVideo.play().catch(e => {
            console.log('Vídeo auto-play bloqueado');
            bgVideo.muted = true;
            bgVideo.play();
        });
    }
});

// ========== LIGHTBOX ==========
(function() {
    if (!document.getElementById('simple-lightbox')) {
        const lightboxHTML = `
            <div id="simple-lightbox">
                <div class="lightbox-container">
                    <span class="close-lightbox">&times;</span>
                    <img id="lightbox-img" src="" alt="">
                    <div id="lightbox-text"></div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    }
    
    const lightbox = document.getElementById('simple-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxText = document.getElementById('lightbox-text');
    
    window.openLightbox = function(imgSrc, imgAlt) {
        lightboxImg.src = imgSrc;
        lightboxImg.alt = imgAlt;
        lightboxText.textContent = imgAlt;
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';
    };
    
    window.closeLightbox = function() {
        lightbox.classList.remove('show');
        document.body.style.overflow = 'auto';
    };
    
    function initLightbox() {
        document.querySelectorAll('.gallery-item').forEach(img => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', function() {
                openLightbox(this.src, this.alt);
            });
        });
    }
    
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('close-lightbox') || e.target === lightbox) {
            closeLightbox();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('show')) {
            closeLightbox();
        }
    });
    
    document.addEventListener('DOMContentLoaded', initLightbox);
})();

// ========== EFEITO SANGUE ==========
function initBloodEffect() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 10px rgba(255, 0, 0, 0.8)';
            this.style.color = '#ff0000';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.textShadow = '';
            this.style.color = '';
        });
    });
}

// ========== TESTES NO CONSOLE ==========
window.testEmailJS = function() {
    console.log('=== TESTE EMAILJS ===');
    
    if (typeof emailjs === 'undefined') {
        console.error('❌ EmailJS não carregado!');
        return;
    }
    
    emailjs.init("1JKERJLs6yLjO62a4");
    
    emailjs.send(
        'service_re6hevq',
        'template_ifzyysf',
        {
            name: "TESTE CONSOLE",
            email: "teste@console.com",
            message: "Testando do console!",
            date: new Date().toLocaleString('pt-BR')
        }
    ).then(r => {
        console.log('✅ Teste enviado!', r);
        alert('✅ Teste enviado! Verifique o email do Robin.');
    }).catch(e => {
        console.error('❌ Erro:', e);
        alert('❌ Erro: ' + e.text);
    });
};

// Log inicial
console.log('Script.js carregado com sucesso!');
console.log('Para testar EmailJS, digite no console: testEmailJS()');