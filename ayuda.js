// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Hacer las preguntas expandibles/colapsables
    const preguntas = document.querySelectorAll('.pregunta');
    
    preguntas.forEach(pregunta => {
        const titulo = pregunta.querySelector('h3');
        const respuesta = pregunta.querySelector('p');
        
        // Ocultar inicialmente las respuestas
        respuesta.style.display = 'none';
        
        // Añadir flecha indicadora
        titulo.innerHTML += ' <span class="flecha">▼</span>';
        
        // Añadir clase para el cursor
        titulo.style.cursor = 'pointer';
        
        // Añadir evento click
        titulo.addEventListener('click', () => {
            // Toggle de la respuesta
            if (respuesta.style.display === 'none') {
                respuesta.style.display = 'block';
                respuesta.style.animation = 'fadeIn 0.5s';
                titulo.querySelector('.flecha').style.transform = 'rotate(180deg)';
            } else {
                respuesta.style.display = 'none';
                titulo.querySelector('.flecha').style.transform = 'rotate(0deg)';
            }
        });
    });

    // Función para copiar información de contacto al portapapeles
    const contactoItems = document.querySelectorAll('.contacto li');
    
    contactoItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.setAttribute('title', 'Haz clic para copiar');
        
        item.addEventListener('click', function() {
            const texto = this.textContent;
            navigator.clipboard.writeText(texto).then(() => {
                // Mostrar mensaje de confirmación
                mostrarMensaje('¡Copiado al portapapeles!');
            });
        });
    });

    // Función para mostrar mensajes temporales
    function mostrarMensaje(texto) {
        const mensaje = document.createElement('div');
        mensaje.className = 'mensaje-flotante';
        mensaje.textContent = texto;
        
        // Estilos para el mensaje
        mensaje.style.position = 'fixed';
        mensaje.style.bottom = '20px';
        mensaje.style.right = '20px';
        mensaje.style.backgroundColor = '#2c3e50';
        mensaje.style.color = 'white';
        mensaje.style.padding = '10px 20px';
        mensaje.style.borderRadius = '5px';
        mensaje.style.animation = 'fadeIn 0.3s';
        
        document.body.appendChild(mensaje);
        
        // Eliminar el mensaje después de 2 segundos
        setTimeout(() => {
            mensaje.style.animation = 'fadeOut 0.3s';
            setTimeout(() => {
                mensaje.remove();
            }, 300);
        }, 2000);
    }
});

// Añadir estilos de animación al documento
const estilos = document.createElement('style');
estilos.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(10px); }
    }
    
    .flecha {
        display: inline-block;
        font-size: 0.8em;
        margin-left: 5px;
        transition: transform 0.3s;
    }
    
    .pregunta h3:hover {
        color: #34495e;
    }
`;
document.head.appendChild(estilos);