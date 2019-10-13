
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

class Task {
  constructor(description, deadline, order) {
    this.description = description;
    this._deadline = deadline;
    this.id = uuidv4();
  }
  get deadline() {   }
  set deadline(value) {   }
}

let items = [];
function addItem(description=document.getElementById("descriptionInput").value) {
  let item= new Task(description)
  items.push(item);
  renderItemOnPage(item);
}

function renderItemOnPage(item) {
  let container = document.getElementById("todoList");
  let newItemDiv = document.createElement("div");
  newItemDiv.classList += "item";
  newItemDiv.setAttribute("id", item.id)
  newItemDiv.innerText = item.description;
  newItemDiv.setAttribute("draggable", "true");
  newItemDiv.setAttribute("ondragstart", "drag(event)");
  container.appendChild(newItemDiv);

}

window.onclick = function(event) {
  let modal = document.getElementsByClassName("modal")[0];
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function showModal() {
  document.getElementsByClassName("modal")[0].style.display = "block";
}


function drag(ev) {
  ev.dataTransfer.setData("item_id", ev.target.id);
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drop(event) {
  event.preventDefault();
  let item_id = event.dataTransfer.getData("item_id");
  let node = document.getElementById(item_id);
  node.parentElement.removeChild(node);
  removeFromArray(item_id)
}

function removeFromArray(item_id) {
  let index = items.findIndex(x => x.id === item_id);
  if (index > -1) {
    items.splice(index, 1);
  }
}
