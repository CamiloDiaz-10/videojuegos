// Inicializar EmailJS
(function() {
    emailjs.init("7cHLuUap7zT8-bavD"); // Tu public key actual
})();

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Mostrar indicador de carga
    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    // Crear el objeto de parámetros con el formato correcto
    const templateParams = {
        from_name: document.getElementById('nombre').value,
        reply_to: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        direccion: document.getElementById('direccion').value,
        subject: document.getElementById('asunto').value,
        message: document.getElementById('mensaje').value
    };

    // Enviar el correo usando los IDs correctos
    emailjs.send("service_mg3a64p", "template_fmcb7u9", templateParams)
        .then(function(response) {
            console.log("¡Correo enviado!", response.status, response.text);
            alert("¡Mensaje enviado con éxito!");
            document.getElementById('contactForm').reset();
        })
        .catch(function(error) {
            console.log("Error al enviar:", error);
            alert("Error al enviar el mensaje. Por favor, intenta nuevamente.");
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Enviar';
        });
});