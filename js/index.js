const addRowInput = document.querySelector(".take_note");
const rows = document.querySelector(".notes__list");
const search = document.querySelector(".header__searchbar");
const pin = document.querySelector(".notes__pin");
let objectOfRows = {};
let objectColors = {};
function getRandomColor(){
    const colors = ["#E8AEB7", "#B8E1FF", "#A9FFF7", "#94FBAB", "#82ABA1", "#DBF4A7", "#DFC2F2"];
    let randomColors = Math.floor(Math.random() * colors.length);
    return colors[randomColors];
}
function insertHTML(value, color){
    rows.insertAdjacentHTML(
        `afterbegin`,
        `
        <div class="notes__list__item" style="background-color: ${color}">
        <div class="notes__list__item__title">Hello world!</div>
        <div class="notes__list__item__body">${value}</div>
    </div>   `
      );
}
function insertRow(value){
    objectOfRows = JSON.parse(localStorage.getItem("textRows"));
    objectColors = JSON.parse(localStorage.getItem("usedColors"));
    let usedColor = getRandomColor();
    if (Object.keys(objectOfRows).length === 0) {
        objectOfRows[`0`] = addRowInput.value;
        objectColors[`0`] = usedColor;
        console.log("creating value and usedColor if storage is 0", addRowInput.value, usedColor);
    } else {
        objectOfRows[`${Object.keys(objectOfRows).length}`] = addRowInput.value;
        objectColors[`${Object.keys(objectColors).length}`] = usedColor;
    }
    insertHTML(value, usedColor);
    addRowInput.value = "";
    localStorage.setItem("usedColors", JSON.stringify(objectColors));
    localStorage.setItem("textRows", JSON.stringify(objectOfRows));
}
if (localStorage.getItem("textRows") && localStorage.getItem("usedColors")) {
  let storageRows = JSON.parse(localStorage.getItem("textRows"));
  let storageColors = JSON.parse(localStorage.getItem("usedColors"));
  for (let i = 0; i < Object.keys(storageRows).length; i++) {
    insertHTML(storageRows[i], storageColors[i]);
  }
}
addRowInput.addEventListener("keyup", (event) => {
  if (event.code === "Enter") {
    if (addRowInput.value !== "" && addRowInput.value.length > 0) {
      if (localStorage.getItem("textRows") === null) {
        localStorage.setItem("textRows", JSON.stringify({}));
        localStorage.setItem("usedColors", JSON.stringify({}));
        insertRow(addRowInput.value);
      } else {
        insertRow(addRowInput.value);
      }
    }
  }
});
