
const deleteAll = document.querySelector(".delete-all");
const themeToggle = document.querySelector(".theme-toggle");
const body = document.body

const addBox = document.querySelector(".add-box");
const popUpBox = document.querySelector(".popup-box");
const closeIcon = popUpBox.querySelector("header i");
const addBtn = popUpBox.querySelector("button");
const descTag = popUpBox.querySelector("textarea");
const titleTag = popUpBox.querySelector("input");
const popupTitle = popUpBox.querySelector("header p");

const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

let notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, updateId;

themeToggle.addEventListener("click",()=>{
    if(body.style.backgroundColor!="black"){
     body.style.backgroundColor = "black";
    }
    else{
        body.style.backgroundColor="#CDC1FF";
    }
});


deleteAll.addEventListener("click", () => {
    let confirmDel = confirm("Are you sure you want to delete all notes?");
    if (!confirmDel) return;

    localStorage.removeItem("notes"); // Remove from storage
    notes.length = 0; // Clear array
    showNotes(); // Refresh UI
});


addBox.addEventListener("click", () => {
    console.log("Add button clicked!");  // Debugging
    titleTag.focus();
    popUpBox.classList.add("show"); 
});


closeIcon.addEventListener("click", () => {
    isUpdate = false;
    titleTag.value = "";
    descTag.value = "";
    addBtn.innerText = "Add Note";
    popupTitle.innerText = "Add a new Note";
    popUpBox.classList.remove("show");
});

function showNotes() {
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note, index) => {
        let liTag = `<li class="note">
            <div class="details">
                <p>${note.title}</p>
                <span>${note.description}</span>
            </div>
            <div class="bottom-content">
                <span>${note.date}</span>
                <div class="settings">
                    <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                    <ul class="menu">
                    <li onclick="updateNote(${index},'${note.title}','${note.description}')"><i class="uil uil-pen"></i>Edit</li>
                    <li onclick="deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li>
                    </ul>
                </div>
            </div>
        </li>`;
        addBox.insertAdjacentHTML("afterend", liTag);
    });
}
showNotes();

function showMenu(elem) {
    elem.parentElement.classList.add("show");
    setTimeout(() => {
        const closeMenu = (e) => {
            if (!elem.parentElement.contains(e.target)) {
                elem.parentElement.classList.remove("show");
                document.removeEventListener("click", closeMenu);
            }
        };
        document.addEventListener("click", closeMenu);
    }, 100);
}

function deleteNote(noteId) {
    let confirmDel = confirm("Are you sure you want to delete this note?");
    if (!confirmDel) return;
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

function updateNote(noteId, title, desc) {
    isUpdate = true;
    updateId = noteId;
    addBox.click();
    titleTag.value = title;
    descTag.value = desc;
    addBtn.innerText = "Update Note";
    popupTitle.innerText = "Update a Note";
}

addBtn.addEventListener("click", e => {
    e.preventDefault();
    let noteTitle = titleTag.value,
        noteDesc = descTag.value;

    if (noteTitle || noteDesc) {
        let dateObj = new Date(),
            month = months[dateObj.getMonth()],
            date = dateObj.getDate(),
            year = dateObj.getFullYear();

        let noteInfo = {
            title: noteTitle,
            description: noteDesc,
            date: `${month} ${date}, ${year}`
        };

        if (!isUpdate) {
            notes.push(noteInfo);
        } else {
            notes[updateId] = noteInfo;
            isUpdate = false;
        }

        localStorage.setItem("notes", JSON.stringify(notes));
        showNotes();
        closeIcon.click();
    }
});











