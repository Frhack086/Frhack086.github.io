let area1 = document.querySelector("#mensaje");
let area2 = document.querySelector("#resultado");
let area3 = document.querySelector("#mensaje-vacio");

let key;

// El vector IV tiene que ser lo mismo
const iv = window.crypto.getRandomValues(new Uint8Array(12));

async function generateAesGcmKey() {
  return await window.crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );
}

// La llave se genera al inicio del archivo y despues no se vuelve a generar mas hasta que se recargue la pagina
(async () => {
  key = await generateAesGcmKey();
  console.log('CryptoKey:', key);
})();

window.addEventListener("input", () => {
  ajustarAlturaTextArea(area1);
});

window.addEventListener("resize", () => {
  ajustarAlturaTextArea(area1);
});

function ajustarAlturaTextArea(textArea) {
  textArea.style.height = "auto";
  textArea.style.height = `${textArea.scrollHeight}px`;
}

async function encriptar() {
    mensaje = document.getElementById("mensaje").value;
    let  mensajeEncriptado;

    mensaje ? (async () => {
      mensajeEncriptado = mensaje;

      console.log(mensajeEncriptado);
      const enc = new TextEncoder();
      const encryptedMessage = await encryptMessage( enc.encode(mensajeEncriptado));
      console.log('Encrypted message:', encryptedMessage);
      
      document.getElementById("resultado").innerHTML = encryptedMessage;
      document.getElementById("mensaje").value = "";
      muestraAreas("flex","none");
      ajustarAlturaTextArea(area1);
      ajustarAlturaTextArea(area2);

    }) () : (() => {
      notifica("No existe ningun mensaje");

    })();
    return mensajeEncriptado;

}

async function desencriptar() {
    mensaje = document.getElementById("mensaje").value;
    let mensajeDesencriptado;

    mensaje ? (async () => { 

      mensajeDesencriptado = mensaje;
      
      console.info(mensajeDesencriptado);
      const encryptedData = base64StringToArrayBuffer(mensajeDesencriptado);
      const decryptedMessage = await decryptMessage(encryptedData);

      document.getElementById("resultado").innerHTML =  decryptedMessage;
      document.getElementById("mensaje").value = "";
      muestraAreas("flex","none");
      ajustarAlturaTextArea(area1);
      ajustarAlturaTextArea(area2);

    }) () : (() => {
      notifica("No existe ningun mensaje");

    })();
        return mensajeDesencriptado;
}

function copiar() {
    const mensaje = document.getElementById("resultado").textContent;
    navigator.clipboard.writeText(mensaje)
    .then(() => {
      document.getElementById("resultado").textContent = "";
      notifica("Se copio el texto");
      ajustarAlturaTextArea(area2);
      muestraAreas("none","flex");        
    })
    .catch(err => {
      console.error('No se pudo copiar el resultado al portapapeles: ', err);
    });
}

function muestraAreas(dArea2, dArea3){
  let copiar =document.getElementById("copiar");

  area2.style.display=dArea2;
  area3.style.display=dArea3;
  if(dArea3 == "none") {
    copiar.style.display="block";
  } else {
    copiar.style.display="none";
  }
}

function notifica(mensaje) {
  const contenedorNotificacion = document.getElementById("contenedor-notificacion");
  const notificacion = document.getElementById("notificacion");
  notificacion.innerHTML = mensaje;
    if(contenedorNotificacion.style.display == "block") {
    }else{
      contenedorNotificacion.style.display = "block";
      contenedorNotificacion.style.animation = "slide-down 0.5s ease-in-out forwards";
      setTimeout(function() {
        contenedorNotificacion.style.animation = "fade-out 0.5s ease-in-out forwards";
    
        setTimeout(function() {
          contenedorNotificacion.style.display = "none";
        }, 500);
      }, 1500);
    }
  }

  async function encryptMessage(encodedMessage) {
    // iv will be needed for decryption
    return arrayBufferToBase64String(await window.crypto.subtle.encrypt(
      { name: "AES-GCM", iv: iv },
      key,
      encodedMessage
    ));
  }

  async function decryptMessage(encryptedText) {
    return arrayBufferToString(await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: iv
      },
      key,
      encryptedText
    ));
  }

  function arrayBufferToBase64String(arrayBuffer) {
    const byteArray = new Uint8Array(arrayBuffer);
    let byteString = '';
    for (let i = 0; i < byteArray.byteLength; i++) {
      byteString += String.fromCharCode(byteArray[i]);
    }
    return btoa(byteString);
  }


  function base64StringToArrayBuffer(base64String) {
    const byteString = atob(base64String);
    const byteArray = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      byteArray[i] = byteString.charCodeAt(i);
    }
    return byteArray.buffer;
  }
  
  function arrayBufferToString(arrayBuffer) {
    const dec = new TextDecoder();
    return dec.decode(arrayBuffer);
  }
  