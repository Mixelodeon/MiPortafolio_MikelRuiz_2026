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
        // Capturamos los inputs del formulario
        const userName = document.getElementById('user-name');
        const userEmail = document.getElementById('user-email');
        const userPhone = document.getElementById('user-phone');
        const userSubject = document.getElementById('user-subject');
        const userMessage = document.getElementById('user-message');
        // Definimos las reglas de validación Regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        // Funciones auxiliares para mostrar/limpiar errores
        const limpiarError = (inputElement) => {
            // Quitamos la clase 'input-invalid' del elemento
            inputElement.classList.remove('input-invalid');
            // Buscamos el elemento con la clase 'error-message' dentro del elemento padre
            const errorSpan = inputElement.parentElement.querySelector('.error-message');
            // Si se encuentra el elemento, quitamos la clase 'active' y vaciamos el texto
            if (errorSpan) {
                errorSpan.innerText = '';
                errorSpan.classList.remove('active');
            }
        };
        // Definimos la función para mostrar errores, que recibe de parámetro el elemento y el mensaje de error
        const mostrarError = (inputElement, errorMessage) => {
            // Añadimos la clase 'input-invalid' al elemento
            inputElement.classList.add('input-invalid');
            // Buscamos el elemento con la clase 'error-message' dentro del elemento padre
            const errorSpan = inputElement.parentElement.querySelector('.error-message');
            // Si se encuentra el elemento, añadimos la clase 'active' y mostramos el mensaje de error
            if (errorSpan) {
                // Añadimos el mensaje de error al elemento
                errorSpan.innerText = errorMessage;
                // Añadimos la clase 'active' al elemento
                errorSpan.classList.add('active');
            }
        };

        // Funciones de validación: Se utilizan las funciones flecha (arrow functions) para validar cada campo del formulario
        // Función para validar el nombre, debe tener al menos 3 caracteres
        const validarNombre = () => {
            if (userName.value.trim().length < 3) {
                mostrarError(userName, 'El nombre debe tener al menos 3 caracteres');
                return false;
            }
            limpiarError(userName);
            return true;
        };
        // Función para validar el correo electrónico, debe tener un formato válido
        const validarCorreo = () => {
            // Usamos la expresión regular para validar el correo electrónico en la condición
            if (!emailRegex.test(userEmail.value)) {
                mostrarError(userEmail, 'Introduce un correo electrónico valido');
                return false;
            }
            limpiarError(userEmail);
            return true;
        };
        // Función para validar el teléfono, debe tener un formato válido
        const validarTelefono = () => {
            if (userPhone.value.trim() !== "" && !phoneRegex.test(userPhone.value)) {
                mostrarError(userPhone, 'El formato del teléfono no es válido');
                return false;
            }
            limpiarError(userPhone);
            return true;
        };
        // Función para validar el asunto, debe tener al menos 4 caracteres
        const validarAsunto = () => {
            if (userSubject.value.trim().length < 4) {
                mostrarError(userSubject, 'El asunto debe tener al menos 4 caracteres');
                return false;
            }
            limpiarError(userSubject);
            return true;
        };
        // Función para validar el mensaje, debe tener al menos 10 caracteres
        const validarMensaje = () => {
            if (userMessage.value.trim().length < 10) {
                mostrarError(userMessage, 'El mensaje debe tener al menos 10 caracteres');
                return false;
            }
            limpiarError(userMessage);
            return true;
        };

        // Asignación de eventos BLUR (validación en tiempo real) para cada campo del formulario
        userName.addEventListener('blur', validarNombre);
        userEmail.addEventListener('blur', validarCorreo);
        userPhone.addEventListener('blur', validarTelefono);
        userSubject.addEventListener('blur', validarAsunto);
        userMessage.addEventListener('blur', validarMensaje);

        // Evento para el envío del formulario
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Booleano para comprobar si el formulario es válido para ser enviado
            let esValido = true;
            // Ejecutamos todas las validaciones
            if (!validarNombre()) esValido = false;
            if (!validarCorreo()) esValido = false;
            if (!validarTelefono()) esValido = false;
            if (!validarAsunto()) esValido = false;
            if (!validarMensaje()) esValido = false;
            // Si el formulario es válido, enviamos el email
            if (esValido) {
                // Si todo está correcto, enviamos el email
                submitBtn.value = 'Enviando...';
                // Usamos EmailJS para enviar el formulario, pasamos como parámetros el ID del servicio, el ID de la plantilla y el ID del formulario
                // Estos parametros los obtenemos de la pagina de EmailJS
                emailjs.sendForm('service_5g379aa', 'template_f8rklwp', '#contact-form')
                    .then(() => {
                        submitBtn.value = 'Enviar';
                        // Creamos alert personalizados con SweetAlert
                        Swal.fire({
                            icon: 'success',
                            title: '¡Mensaje Enviado correctamente!',
                            text: 'Gracias por contactarme, te responderé lo antes posible :)',
                            background: '#1e293b',
                            color: '#e2e8f0',
                            confirmButtonColor: '#38bdf8',
                            timer: 7000,
                            timerProgressBar: true,
                        });
                        contactForm.reset();
                    })
                    .catch((err) => {
                        submitBtn.value = 'Enviar';
                        Swal.fire({
                            icon: 'error',
                            title: '¡Error al enviar el mensaje!',
                            text: 'Algo salió mal, inténtalo de nuevo por favor :(',
                            background: '#1e293b',
                            color: '#e2e8f0',
                            confirmButtonColor: '#38bdf8',
                        });
                        console.error('Error al enviar email:', err);
                    });
            }
        });
    }
});