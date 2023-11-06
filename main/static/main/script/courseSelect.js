function openFormPopUp() {
    document.getElementById("formPopup").style.display = "block";
   
}

function closeFormPopup(){
    document.getElementById("formPopup").style.display = "none";
}    

document.addEventListener('click', function (event) {
    const formPopup = document.getElementById("formPopup");
    if (event.target===formPopup){
        closeFormPopup();
    }
});
document.getElementById("openFormButton").addEventListener("click", openFormPopUp);
document.getElementById("closeFormButton").addEventListener("click", closeFormPopup);
