// Variable global para saber qué laboratorio está activo
let currentLabFile = null;

// Elementos del DOM que usaremos varias veces
const contentDiv = document.getElementById('content-area');
const modal = document.getElementById('start-lab-modal');
const labForm = document.getElementById('lab-form');

function loadLabContent(labFile) {
    // Usa fetch para obtener el archivo Markdown
    fetch(labFile)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo encontrar el archivo del laboratorio.');
            }
            return response.text();
        })
        .then(markdown => {
            // Convierte el Markdown a HTML usando la librería 'marked'
            const htmlContent = marked.parse(markdown);

            // El botón llama a openStartLabModal y pasa el nombre del archivo
            const startButton = `<button class="start-lab-button" onclick="openStartLabModal('${labFile}')">Start Lab</button>`;

            // Inserta el contenido y el botón en el div principal
            contentDiv.innerHTML = startButton + htmlContent;
        })
        .catch(error => {
            console.error('Error al cargar el laboratorio:', error);
            contentDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
        });
}

// Función para abrir el modal
function openStartLabModal(labFile) {
    // Guardamos el archivo del lab que se está iniciando
    currentLabFile = labFile; 
    console.log(`Modal abierto para el laboratorio: ${currentLabFile}`);
    // Mostramos el modal quitando la clase 'hidden'
    modal.classList.remove('hidden');
}

// Función para cerrar el modal
function closeStartLabModal() {
    // Ocultamos el modal añadiendo la clase 'hidden'
    modal.classList.add('hidden');
    // Limpiamos el formulario para la proxima vez
    labForm.reset(); 
}

// Se ejecuta cuando el usuario envía el formulario
labForm.addEventListener('submit', function(event) {
    // Previene que la página se recargue, que es el comportamiento por defecto de un form
    event.preventDefault(); 
    
    // Recolectamos los datos del formulario
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const correo = document.getElementById('correo').value;
    
    // Creamos un objeto con todos los datos, incluyendo el lab activo
    const studentData = {
        nombre: nombre,
        apellidos: apellidos,
        correo: correo,
        laboratorio: currentLabFile // ¡Aquí está la variable que querías!
    };
    
    // Aquí es donde tu instructor conectará la llamada a la API
    console.log("Datos listos para enviar a la API:");
    console.log(studentData);
    alert(`Registro para ${studentData.laboratorio} exitoso!\nDatos: ${JSON.stringify(studentData)}`);
    
    // Cerramos el modal después de enviar los datos
    closeStartLabModal();
});