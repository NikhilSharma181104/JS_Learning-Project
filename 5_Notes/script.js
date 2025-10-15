const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".inputBox");

function showNotes(){
    notesContainer.innerHTML = localStorage.getItem("notes");
}
showNotes();

function updateStorage(){
    localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener("click", () => {
    let notesBox = document.createElement("p");
    let img = document.createElement("img");
    img.src = "images/delete.png";
    notesBox.className = "inputBox";
    notesBox.setAttribute("contenteditable", "true");
    notesBox.appendChild(img);
    notesContainer.appendChild(notesBox);
    updateStorage();
})

notesContainer.addEventListener("click", (e) => {
    if(e.target.tagName === "IMG"){
        e.target.parentElement.remove();
        updateStorage();
    }
    else if(e.target.tagName === "P"){
        notes = document.querySelectorAll(".inputBox");
        notes.forEach(nt => {
            nt.onkeyup = function(){
                updateStorage();
            }
        })
    }
})

document.addEventListener("keydown", event =>{
    if(event.key === "Enter"){
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
})

document.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
    }
});