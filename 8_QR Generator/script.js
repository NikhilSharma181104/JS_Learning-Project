const api_url = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=";

let imageBox = document.getElementById("imgBox");
let qrImage = document.getElementById("qrImg");
let qrText = document.getElementById("input");

function generateQR(){
    if(qrText.value.length > 0){
        qrImage.src = api_url + qrText.value;
        imageBox.classList.add("show-img");
    }
    else{
        qrText.classList.add("error");
        setTimeout(() => {
            qrText.classList.remove("error");
        }, 1000);
        imageBox.style.display = "none";
    }
}
