// Esperamos que cargue todo el HTML con este evento
window.addEventListener('DOMContentLoaded', () => {

    console.log("Script cargado correctamente");
    console.log("EmailJS cargado:", typeof emailjs !== 'undefined');

    // Control del menú hamburguesa
    // Seleccionamos el icono del menú (Visible en versión movil, las tres rayitas del menú desplegable)
    let menuIcon = document.querySelector('#menu-icon');
    // Selecciona la lista de enlaces de navegación superioir (Índice)
    let navbar = document.querySelector('.nav-links');

    // Evento onclick, cuando se haga click en el icono del menú, se abrirá en menú desplegable de navegación (Versión móvil)
    menuIcon.onclick = () => {
        // Cambia el icono de "hamburguesa" a una "X" o viceversa
        menuIcon.classList.toggle('bx-x');
        // Muestra u oculta el menú desplegable
        navbar.classList.toggle('active');
    };

    // Selecciona todas las etiquetas <section> del HTML
    let sections = document.querySelectorAll('section');
    // Selecciona todos los enlaces <a> que estén dentro de la etiqueta del nav del header
    let navLinks = document.querySelectorAll('header nav a');
    // Esta función se ejecutará cuando el usuario haga scroll (Tanto hacia arriba como hacia abajo)
    window.onscroll = () => {
        // Recorre todas las secciones del HTML
        sections.forEach(sec => {
            // Obtenemos la posición vertical de la sección, cuantos píxeles ha bajado el usuario
            let top = window.scrollY;
            // Obtenemos la posición de la sección menos un margen de 150 píxeles
            let offset = sec.offsetTop - 150;
            // Obtenemos la altura total de la sección actual
            let height = sec.offsetHeight;
            // Obtenemos el atributo id de la sección actual
            let id = sec.getAttribute('id');
            // Si la posición actual está dentro de los límites de la sección actual, se da esta condición
            if (top >= offset && top < offset + height) {
                // Recorremos todos los enlaces del menú
                navLinks.forEach(links => {
                    // Quitamos la clase 'active' de todos los enlaces del menú
                    links.classList.remove('active');
                    // Ponemos solo al enlace que apunta al ID de la sección actual
                    document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
                });
            };
        });

        // Almacenamos en una variable el header del HTML
        let header = document.querySelector('header');
        // Si el usuario se desplaza más de 100 píxeles, se añade la clase 'sticky' al header, y si no se quita
        // Esto nos permite que el menú se quede fijo arriba con un fondo o sombra
        header.classList.toggle('sticky', window.scrollY > 100);
        // Limpieza: Su el menú móvil estaba abierto y el usuario se desplaza, lo cerramos automaticamente
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    };

    // Animaciones con ScrollReveal: Configuramos la librería que realiza las animaciones
    ScrollReveal({
        // Las animaciones se repiten cada vez que el usuario sube o baja
        reset: true,
        // Distancia que recorrera el elemento al aparecer
        distance: '80px',
        // Duración de la animación en milisegundos (2 segundos)
        duration: 2000,
        // Retardo antes de empezar la animación en milisegundos (0.2 segundos)
        delay: 200
    });

    // Define qué elementos aparecen y desde qué dirección 
    ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
    ScrollReveal().reveal('.home-img, .projects-container, .project-box, .contact form', { origin: 'bottom' });
    ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
    ScrollReveal().reveal('.home-content p, .about-text', { origin: 'right' });

    // Efectos de escritura con Typed.js:
    // Inicializa la librería en el elemento con la clase 'typing-text'
    const typed = new Typed('.typing-text', {
        // Array de cadenas de texto que se mostrarán en el elemento
        strings: ['Mikel Ruiz', 'Web Designer', 'Programador'],
        // Velocidad al escribir (MS por letra)
        typeSpeed: 100,
        // Velocidad al borrar (MS por letra)
        backSpeed: 100,
        // Retardo antes de borrar (En MS = 1 segundo)
        backDelay: 1000,
        // Repetir el efecto, nunca se detendrá
        loop: true
    });

    // Apartado de Formulario de Contacto
    // Capturamos el formulario y el botón de envío
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    // Verficamos que el formulario y el botón de envío existen
    if (contactForm && submitBtn) {
        // Evento de escucha del formulario, se ejecutará cuando se envíe el formulario
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Capturamos los inputs del formulario
            const userName = document.getElementById('user-name');
            const userEmail = document.getElementById('user-email');
            const userPhone = document.getElementById('user-phone');
            const userSubject = document.getElementById('user-subject');
            const userMessage = document.getElementById('user-message');
            // Validación de los inputs
            if (userName.value === '' || userEmail.value === '' || userPhone.value === '' || userSubject.value === '' || userMessage.value === '') {
                // SweetAlert, avisos mas esteticos y sin detención de código
                Swal.fire({
                    icon: 'warning',
                    title: 'Campos Vacios',
                    text: 'Por favor, es necesario completar todos los campos del formulario',
                    background: '#1e293b',
                    color: '#e2e8f0',
                    confirmButtonColor: '#38bdf8',
                });
            } else {
                // Utilizamos EmailJS para enviar el formulario al correo
                // Cambiamos el texto del botón para indicar que se está enviando el formulario
                submitBtn.value = 'Enviando...';
                // Enviamos el formulario
                // Parametros: service_id, template_id, contact_form
                emailjs.sendForm('service_5g379aa', 'template_f8rklwp', '#contact-form')
                    .then(() => {
                        // Devolvemos el texto original del botón
                        submitBtn.value = 'Enviar';
                        // Usamos SweetAlert para indicar el exito del envio
                        Swal.fire({
                            icon: 'success',
                            title: '¡Mensaje Enviado correctamente!',
                            text: 'Gracias por contactarme, te responderé lo antes posible :)',
                            background: '#1e293b',
                            color: '#e2e8f0',
                            confirmButtonColor: '#38bdf8',
                            timer: 7000, // Cierra automaticamente el aviso en 4 segundos
                            timerProgressBar: true, // Muestra una barra de progreso
                        });
                        // Limpiamos el formulario
                        contactForm.reset();
                    })
                    .catch((e) => {
                        // Devolvemos el texto original del botón
                        submitBtn.value = 'Enviar';
                        // SweetAlert para indicar el error
                        Swal.fire({
                            icon: 'error',
                            title: '¡Error al enviar el mensaje!',
                            text: 'Algo salio mal, intentalo de nuevo porfavor :(',
                            background: '#1e293b',
                            color: '#e2e8f0',
                            confirmButtonColor: '#38bdf8',
                        });
                        console.log(e);
                    });
            }
        });
    }
});