function encriptarTexto() {
    const texto = document.querySelector(".texto-encriptar-desencriptar").value;

    if (/[A-Z]/.test(texto)) {
        document.querySelector(".dato-importante").style.display = "block";
        return;
    }

    const resultado = document.querySelector(".texto-resultado");
    const btnCopy = document.querySelector(".btn-copy");
    const imagenYTexto = document.querySelector(".imagen-texto");

    resultado.style.display = "block";
    resultado.value = texto.replace(/e/g, "enter")
        .replace(/i/g, "imes")
        .replace(/a/g, "ai")
        .replace(/o/g, "ober")
        .replace(/u/g, "ufat");

    btnCopy.textContent = "Copiar";
    btnCopy.style.visibility = "visible"; 
    imagenYTexto.style.display = "none";
}

function desencriptarTexto() {
    const texto = document.querySelector(".texto-encriptar-desencriptar").value;

    const resultado = document.querySelector(".texto-resultado");
    resultado.value = texto.replace(/enter/g, "e")
        .replace(/imes/g, "i")
        .replace(/ai/g, "a")
        .replace(/ober/g, "o")
        .replace(/ufat/g, "u");
}

function copiarAlPortapapeles(ev) {
    if (!navigator.clipboard) {
        alert("¡Tu navegador no soporta copiar al Portapapeles, intentelo manualmente!");
        return; // Exit if clipboard API not supported
    }

    const codigoACopiar = document.querySelector(".texto-resultado");
    const contenidoACopiar = codigoACopiar.value;
    navigator.clipboard.writeText(contenidoACopiar).then(function () {
        ev.target.textContent = "Copiado";
        ev.target.classList.add("btn-copied");

        setTimeout(function() {
            ev.target.classList.remove("btn-copied");
            ev.target.textContent = "Copiar";
        }, 2500); // Revert after 2.5 seconds
    }).catch(function(err) {
        console.error("Error al copiar al portapapeles: ", err);
        // Optionally, provide user feedback about the copy failure
    });
}

document.querySelector(".btn-encriptar").addEventListener('click', encriptarTexto);
document.querySelector(".btn-desencriptar").addEventListener('click', desencriptarTexto);
document.querySelector(".btn-copy").addEventListener('click', copiarAlPortapapeles);
