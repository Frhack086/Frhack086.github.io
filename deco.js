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
		resultado.innerText  = textoCifrado;
		//muñeco.src="./img/encriptado.jpg";
	} else {
		//muñeco.src ="./img/muñeco.png";
		alert("debes ingresar algun texto");
	}
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
		resultado.innerText  = textoCifrado;
		//muñeco.src="./img/encriptado.jpg";
	} else {
		//muñeco.src ="./img/muñeco.png";
		alert("debes ingresar algun texto");
	}
}