function encriptar() {

	let texto = document.getElementById("encrypt-text-area").value;

	let resultado = document.getElementById("resultado");

	let textoCifrado = texto
		.replace(/e/gi, "enter")
		.replace(/i/gi, "imes")
		.replace(/a/gi, "ai")
		.replace(/o/gi, "ober")
		.replace(/u/gi, "ufat");


	if (texto.length != 0) {
		//tituloMensaje.textContent = "texto encriptado con exito"
		if (validador(texto)) {
			return;
		}

		mostrarResultado();
		resultado.innerText = textoCifrado;
		//muñeco.src="./img/encriptado.jpg";
	} else {
		//muñeco.src ="./img/muñeco.png";
		alert("debes ingresar algun texto");
	}
}

function mostrarResultado() {
	let x = document.getElementById("resultado-mensaje");
	let y = document.getElementById("mensaje-por-defecto");
	if (x.style.display === "none") {
		x.style.display = "block";
		y.style.display = "none";
	} else {
		x.style.display = "none";
		y.style.display = "block";
	}
}

function copiarPortapapeles() {
	// Get the text field
	var copyText = document.getElementById("resultado");

	// Copy the text inside the text field
	navigator.clipboard.writeText(copyText.innerText);

	// Alert the copied text
	alert("Copied the text: " + copyText.innerText);

	mostrarResultado();
}

function validador(texto) {
	let validador = false;
	const caracteresEspciales = /[`!@#$%^&*´()_+\-=\[\]{};':"\\|,.<>\/?~]/;

	if (caracteresEspciales.test(texto)) {
		alert("Tiene caracteres especiales")
		validador = true;
	}

	const mayusculas = /[A-Z]/;
	if (mayusculas.test(texto)) {
		alert("Tiene mayusculas especiales")
		validador = true;
	}

	const acentos = /[à-ü]|[À-Ü]/;
	if (acentos.test(texto)) {
		alert("Tiene acentos")
		validador = true;
	}

	return validador;
}

function desencriptar() {

	let texto = document.getElementById("encrypt-text-area").value;

	let resultado = document.getElementById("resultado");

	let textoCifrado = texto
		.replace(/enter/gi, "e")
		.replace(/imes/gi, "i")
		.replace(/ai/gi, "a")
		.replace(/ober/gi, "o")
		.replace(/ufat/gi, "u");

	if (texto.length != 0) {
		//tituloMensaje.textContent = "texto encriptado con exito"

		if (validador(texto)) {
			return;
		}

		mostrarResultado();
		resultado.innerText = textoCifrado;
		//muñeco.src="./img/encriptado.jpg";
	} else {
		//muñeco.src ="./img/muñeco.png";
		alert("debes ingresar algun texto");
	}
}