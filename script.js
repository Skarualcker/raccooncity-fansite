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
    
    // 2. CONFIGURAR FORMULÁRIO DE CONTATO (NOVA VERSÃO - SUBSTITUA DAQUI)
    function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const step1 = document.getElementById('contact-step-1');
    const step2 = document.getElementById('contact-step-2');
    
    if (!contactForm) return;
    
    // LINK DO DOWNLOAD
    const DOWNLOAD_URL = "https://drive.google.com/file/d/1C4R4p_a31Hh23iFTQu1nJHHoGi-HKsWy/view";
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Coletar dados
        const userName = document.getElementById('user_name').value;
        const userEmail = document.getElementById('user_email').value;
        const userMessage = document.getElementById('message').value;
        
        if (!userName || !userEmail || !userMessage) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        
        // Botão de enviar
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Mostrar "enviando"
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> ENVIANDO...';
        submitBtn.disabled = true;
        
        // Dados para EmailJS
        const templateParams = {
            name: userName,
            email: userEmail,
            message: userMessage,
            date: new Date().toLocaleString('pt-BR'),
            download_request: "SIM - Solicitou download"
        };
        
        console.log('📤 Enviando mensagem + download:', templateParams);
        
        // ENVIAR VIA EMAILJS
        if (typeof emailjs !== 'undefined') {
            emailjs.init("1JKERJLs6yLjO62a4");
            
            emailjs.send(
                'service_re6hevq',
                'template_ifzyysf',
                templateParams
            )
            .then(function(response) {
                console.log('✅ Email enviado com sucesso!');
                
                // SALVAR NO LOCALSTORAGE (para lembrar)
                saveUserData(userName, userEmail);
                
                // MOSTRAR ETAPA 2 (DOWNLOAD)
                showDownloadStep(userName, userEmail);
                
            }).catch(function(error) {
                console.error('❌ Erro no EmailJS:', error);
                
                // Mesmo se falhar o email, mostrar download
                saveUserData(userName, userEmail);
                showDownloadStep(userName, userEmail);
                
                alert('⚠️ Mensagem pode não ter sido enviada, mas você já pode baixar o jogo!');
            });
            
        } else {
            // Se EmailJS não carregar
            saveUserData(userName, userEmail);
            showDownloadStep(userName, userEmail);
        }
        
        // Restaurar botão (só por segurança)
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 3000);
    });
    
    // FUNÇÃO PARA MOSTRAR ETAPA DE DOWNLOAD
    function showDownloadStep(name, email) {
        // Esconder etapa 1
        step1.classList.add('hidden');
        
        // Mostrar etapa 2
        step2.classList.remove('hidden');
        
        // Preencher dados do usuário
        document.getElementById('user-greeting').textContent = name;
        document.getElementById('user-email-display').textContent = email;
        
        // Configurar botão de copiar link
        document.getElementById('copy-link-btn').addEventListener('click', function() {
            navigator.clipboard.writeText(DOWNLOAD_URL)
                .then(() => {
                    const original = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-check mr-2"></i> LINK COPIADO!';
                    setTimeout(() => {
                        this.innerHTML = original;
                    }, 2000);
                })
                .catch(err => {
                    console.error('Erro ao copiar:', err);
                    alert('Não foi possível copiar. O link é: ' + DOWNLOAD_URL);
                });
        });
        
        // Botão para voltar ao formulário
        document.getElementById('back-to-form').addEventListener('click', function() {
            step2.classList.add('hidden');
            step1.classList.remove('hidden');
            contactForm.reset();
        });
        
        // Rolar suavemente para a seção
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        
        console.log('✅ Download liberado para:', name);
    }
    
    // SALVAR DADOS NO LOCALSTORAGE
    function saveUserData(name, email) {
        localStorage.setItem('raccoon_user_name', name);
        localStorage.setItem('raccoon_user_email', email);
        localStorage.setItem('raccoon_download_access', 'granted');
        localStorage.setItem('raccoon_last_access', new Date().toISOString());
    }
    
    // VERIFICAR SE JÁ TEM ACESSO (ao carregar a página)
    function checkExistingAccess() {
        if (localStorage.getItem('raccoon_download_access') === 'granted') {
            const name = localStorage.getItem('raccoon_user_name') || 'Jogador';
            const email = localStorage.getItem('raccoon_user_email') || '';
            
            // Já tem acesso, mostrar direto a etapa 2
            step1.classList.add('hidden');
            step2.classList.remove('hidden');
            
            document.getElementById('user-greeting').textContent = name;
            document.getElementById('user-email-display').textContent = email;
            
            // Mudar mensagem para quem já tem acesso
            document.querySelector('#contact-step-2 h3').textContent = 'BEM-VINDO DE VOLTA!';
            document.querySelector('#contact-step-2 p.text-xl').textContent = 
                `Que bom te ver novamente, ${name}!`;
            document.querySelector('#contact-step-2 p.text-gray-400').textContent = 
                'Você já tem acesso ao download do jogo:';
                
            console.log('👋 Usuário retornando:', name);
        }
    }
    
    // Executar verificação ao carregar
    checkExistingAccess();
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