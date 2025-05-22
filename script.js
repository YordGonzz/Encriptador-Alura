// script.js: Handles encryption, decryption, and UI interactions for the Encriptador project.

// Cache DOM Element Selections for efficient access
const textoEncriptarDesencriptar = document.querySelector(".texto-encriptar-desencriptar");
const textoResultado = document.querySelector(".texto-resultado");
const btnCopy = document.querySelector(".btn-copy");
const imagenYTexto = document.querySelector(".imagen-texto");
const datoImportante = document.querySelector(".dato-importante"); // Element for validation message
const btnEncriptar = document.querySelector(".btn-encriptar");
const btnDesencriptar = document.querySelector(".btn-desencriptar");

/**
 * Encripta el texto ingresado por el usuario.
 * Valida que el texto no contenga mayúsculas ni acentos.
 * Muestra el texto encriptado y oculta la imagen/mensaje placeholder.
 * Actualiza la UI para mostrar el botón de copiar.
 */
function encriptarTexto() {
    datoImportante.style.display = "none"; // Reset validation message visibility
    const texto = textoEncriptarDesencriptar.value;

    // Regex para validar mayúsculas y caracteres acentuados.
    if (/[A-ZÀ-ÖØ-öø-ÿ]/.test(texto)) {
        datoImportante.style.display = "block"; // Muestra mensaje de error si la validación falla
        return; // Detiene la ejecución si el texto es inválido
    }

    // Muestra el área de resultado y oculta la imagen placeholder
    textoResultado.style.display = "block";
    textoResultado.value = texto.replace(/e/g, "enter")
        .replace(/i/g, "imes")
        .replace(/a/g, "ai")
        .replace(/o/g, "ober")
        .replace(/u/g, "ufat");

    btnCopy.textContent = "Copiar"; // Resetea el texto del botón copiar
    btnCopy.style.visibility = "visible"; // Hace visible el botón copiar
    imagenYTexto.style.display = "none"; // Oculta la imagen y el texto placeholder
}

/**
 * Desencripta el texto ingresado por el usuario.
 * Muestra el texto desencriptado y actualiza la UI.
 */
function desencriptarTexto() {
    const texto = textoEncriptarDesencriptar.value;

    // Asegura que el área de resultado sea visible y el placeholder oculto
    textoResultado.style.display = "block";
    imagenYTexto.style.display = "none";
    btnCopy.style.visibility = "visible";

    // Lógica de reemplazo para desencriptar
    textoResultado.value = texto.replace(/enter/g, "e")
        .replace(/imes/g, "i")
        .replace(/ai/g, "a")
        .replace(/ober/g, "o")
        .replace(/ufat/g, "u");
}

/**
 * Copia el contenido del textarea de resultado al portapapeles.
 * @param {Event} ev - El evento de clic que dispara la función.
 * Maneja la UX del botón de copiar (cambia texto a "Copiado", "¡Error al copiar!")
 * e incluye un fallback para navegadores que no soportan navigator.clipboard.
 */
function copiarAlPortapapeles(ev) {
    const contenidoACopiar = textoResultado.value;
    const botonActual = ev.target; // El botón que fue presionado

    if (!navigator.clipboard) {
        // Mecanismo de fallback para navegadores sin soporte de navigator.clipboard
        try {
            textoResultado.select(); // Selecciona el texto en el textarea
            document.execCommand('copy'); // Intenta copiar usando el método deprecated
            textoResultado.blur(); // Quita el foco del textarea
            botonActual.textContent = "Copiado (Fallback)";
        } catch (err) {
            console.error("Fallback: Error al copiar con execCommand: ", err);
            botonActual.textContent = "¡Error al copiar!";
        }
        setTimeout(() => {
            botonActual.textContent = "Copiar";
        }, 3000); // Revierte el texto del botón después de 3 segundos
        return;
    }

    // Uso de la API Clipboard (método preferido)
    navigator.clipboard.writeText(contenidoACopiar).then(() => {
        botonActual.textContent = "Copiado";
        setTimeout(() => {
            botonActual.textContent = "Copiar";
        }, 3000); // Revierte el texto del botón después de 3 segundos
    }).catch(err => {
        console.error("Error al copiar al portapapeles: ", err);
        botonActual.textContent = "¡Error al copiar!";
        setTimeout(() => {
            botonActual.textContent = "Copiar";
        }, 3000); // Revierte el texto del botón después de 3 segundos
    });
}

// Asignación de event listeners a los botones
btnEncriptar.addEventListener('click', encriptarTexto);
btnDesencriptar.addEventListener('click', desencriptarTexto);
btnCopy.addEventListener('click', copiarAlPortapapeles);
