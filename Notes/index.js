const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes");
}
showNotes();

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);

}

//createBtn.addEventListener("click", () => {
//     let inputBox = document.createElement("p");
//     let img = document.createElement("img");
//     inputBox.className = "input-box";
//     inputBox.setAttribute("contenteditable", "true");
//     img.src = "bin.jpg";
//     notesContainer.appendChild(inputBox).appendChild(img);
// })

createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");

    const currentDate = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    const dateTimeString = currentDate.toLocaleString('en-US', options);

    let dateTimeSpan = document.createElement("span");
    dateTimeSpan.innerText = dateTimeString;
    dateTimeSpan.className = "date-time";

    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "bin.jpg";

    notesContainer.appendChild(inputBox).appendChild(dateTimeSpan);
    notesContainer.lastChild.appendChild(document.createElement("br"));
    notesContainer.lastChild.appendChild(img);
})

notesContainer.addEventListener("click", function(e) {
    if(e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    }
    else if(e.target.tagName === "P") {
        notes = document.querySelectorAll(".input-box");
        notes.forEach(nt => {
            nt.onkeyup = function() {
                updateStorage();
            }
        })
    }
})

document.addEventListener("keydown", event => {
    if(event.key === "Enter"){
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
})