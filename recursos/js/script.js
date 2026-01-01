document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    const icon = menuToggle.querySelector('i');

    const toggleMenu = () => {
        navLinks.classList.toggle('active');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    };

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) toggleMenu();
        });
    });

    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && e.target !== menuToggle) {
            toggleMenu();
        }
    });

    const revealOptions = { threshold: 0.15 };
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    const form = document.querySelector('form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const telefono = "59164846140";             

            const nombre = form.querySelector('input[placeholder="Nombre completo"]').value;
            const email = form.querySelector('input[placeholder="Correo electrónico"]').value;
            const mensaje = form.querySelector('textarea').value;
            const btn = form.querySelector('button');

            const textoWhastapp = `*NUEVA CONSULTA STPOS*%0A%0A` +
                                 `*Nombre:* ${nombre}%0A` +
                                 `*Email:* ${email}%0A` +
                                 `*Mensaje:* ${mensaje}`;

            const url = `https://api.whatsapp.com/send?phone=${telefono}&text=${textoWhastapp}`;

            const originalText = btn.innerText;
            btn.innerText = "Abriendo WhatsApp...";
            btn.style.opacity = "0.7";
            btn.disabled = true;

            setTimeout(() => {
                window.open(url, '_blank');
                
                form.reset();
                btn.innerText = originalText;
                btn.style.opacity = "1";
                btn.disabled = false;
            }, 800);
        });
    }
});