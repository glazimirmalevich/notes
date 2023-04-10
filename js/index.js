const noteText = document.querySelector(".take_note");
const rows = document.querySelector(".notes__list");
const search = document.querySelector(".header__searchbar");
const pin = document.querySelector(".notes__pin");
const addNote = document.querySelector(".notes__add");
const noteTitle = document.querySelector(".take_note_title");
const searchNote = document.querySelector(".search_note");
const selectTextareas = document.querySelectorAll("textarea");
let objectOfRows = {};
let objectOfColors = {};
let objectOfTitles = {};
let lastScrollHeight = 0;
let heightCounter = 1;
document.querySelector("button").addEventListener("click", ()=>{
  localStorage.clear();
  rows.innerHTML = '';
})
function expandArea(element){
  element.addEventListener("input", ()=>{
    if(lastScrollHeight !== element.scrollHeight){
      element.setAttribute("rows", heightCounter++);
    }
    lastScrollHeight = element.scrollHeight;
  });
}
expandArea(noteText);
expandArea(noteTitle);

function getRandomColor() {
  const colors = [
    "#E8AEB7",
    "#B8E1FF",
    "#A9FFF7",
    "#94FBAB",
    "#82ABA1",
    "#DBF4A7",
    "#DFC2F2",
  ];
  let randomColors = Math.floor(Math.random() * colors.length);
  return colors[randomColors];
}
function insertHTML(title, value, color) {
  rows.insertAdjacentHTML(
    `afterbegin`,
    `
        <div class="notes__list__item" style="background-color: ${color}">
        <div class="notes__list__item__title">${title}</div>
        <div class="notes__list__item__body">${value}</div>
    </div>   `
  );
}
function insertRow(title, value) {
  objectOfRows = JSON.parse(localStorage.getItem("textRows"));
  objectOfColors = JSON.parse(localStorage.getItem("colorRows"));
  objectOfTitles = JSON.parse(localStorage.getItem("titleRows"));
  let usedColor = getRandomColor();
  if (Object.keys(objectOfRows).length === 0) {
    objectOfRows[`0`] = noteText.value;
    objectOfColors[`0`] = usedColor;
    objectOfTitles[`0`] = noteTitle.value;
  } else {
    objectOfRows[`${Object.keys(objectOfRows).length}`] = noteText.value;
    objectOfColors[`${Object.keys(objectOfColors).length}`] = usedColor;
    objectOfTitles[`${Object.keys(objectOfTitles).length}`] = noteTitle.value;
  }
  insertHTML(title, value, usedColor);
  noteText.value = "";
  noteTitle.value = "";
  localStorage.setItem("colorRows", JSON.stringify(objectOfColors));
  localStorage.setItem("textRows", JSON.stringify(objectOfRows));
  localStorage.setItem("titleRows", JSON.stringify(objectOfTitles));
}
if (
  localStorage.getItem("textRows") &&
  localStorage.getItem("colorRows") &&
  localStorage.getItem("titleRows")
) {
  let storageRows = JSON.parse(localStorage.getItem("textRows"));
  let storageColors = JSON.parse(localStorage.getItem("colorRows"));
  let storageTitles = JSON.parse(localStorage.getItem("titleRows"));
  for (let i = 0; i < Object.keys(storageRows).length; i++) {
    insertHTML(storageTitles[i], storageRows[i], storageColors[i]);
  }
}
searchNote.addEventListener("input", (event) => {
    let storageRows = JSON.parse(localStorage.getItem("textRows"));
    let storageColors = JSON.parse(localStorage.getItem("colorRows"));
    let storageTitles = JSON.parse(localStorage.getItem("titleRows"));
    rows.innerHTML = "";
    if (event.target.value !== "" && event.target.value !== undefined) {
        for (let i = 0; i < Object.keys(storageTitles).length; i++) {
          if (storageTitles[i].includes(event.target.value) || storageRows[i].includes(event.target.value)) {
            rows.insertAdjacentHTML(
              `afterbegin`,
              `
                <div class="notes__list__item" style="background-color: ${storageColors[i]}">
                <div class="notes__list__item__title">${storageTitles[i]}</div>
                <div class="notes__list__item__body">${storageRows[i]}</div>
            </div>   `
            );
          } else {
            console.log("Not includes: ", storageTitles[i]);
          }
        }

    } else {
      for (let i = 0; i < Object.keys(storageTitles).length; i++) {
          rows.insertAdjacentHTML(
            `afterbegin`,
            `
              <div class="notes__list__item" style="background-color: ${storageColors[i]}">
              <div class="notes__list__item__title">${storageTitles[i]}</div>
              <div class="notes__list__item__body">${storageRows[i]}</div>
          </div>   `
          );
      }
    }
  //   rows.innerHTML =     `
  //   <div class="notes__list__item" style="background-color: orange">
  //   <div class="notes__list__item__title">${event.target.value}</div>
  //   <div class="notes__list__item__body">${event.target.value}</div>
  // </div>   `  ;
});
document.body.addEventListener("click", (event) => {
  if (addNote.contains(event.target)) {
    if (addNote.childNodes.length < 5) {
      noteTitle.classList.remove("take_note_title");
      noteTitle.classList.add("take_note_title_active");
    }
  } else {
    noteTitle.classList.remove("take_note_title_active");
    noteTitle.classList.add("take_note_title");
    if (
      noteText.value !== "" &&
      noteText.value.length > 0 &&
      noteTitle.value !== "" &&
      noteText.value.length > 0
    ) {
      if (localStorage.getItem("textRows") === null) {
        localStorage.setItem("textRows", JSON.stringify({}));
        localStorage.setItem("colorRows", JSON.stringify({}));
        localStorage.setItem("titleRows", JSON.stringify({}));
        insertRow(noteTitle.value, noteText.value);
      } else {
        insertRow(noteTitle.value, noteText.value);
      }
    }
    noteTitle.value = "";
    noteText.value = "";
    noteText.setAttribute("rows", 1);
    noteTitle.setAttribute("rows", 1);
    lastScrollHeight = 0;
    heightCounter = 1;
  }
});
addNote.addEventListener("keyup", (event) => {
  if (event.code === "Enter") {
    if (
      noteText.value !== "" &&
      noteText.value.length > 0 &&
      noteTitle.value !== "" &&
      noteText.value.length > 0
    ) {
      if (localStorage.getItem("textRows") === null) {
        localStorage.setItem("textRows", JSON.stringify({}));
        localStorage.setItem("colorRows", JSON.stringify({}));
        localStorage.setItem("titleRows", JSON.stringify({}));
        insertRow(noteTitle.value, noteText.value);
      } else {
        insertRow(noteTitle.value, noteText.value);
      }
      noteText.setAttribute("rows", 1);
      noteTitle.setAttribute("rows", 1);
      lastScrollHeight = 0;
      heightCounter = 1;
    }
  }
});
