const inputTask = document.getElementById('inputTask');
const listContainer = document.getElementById('list-container');
let addBtn = document.getElementById('addBtn');
let edit = false;
let editField;
let delArr = [];
var compArr = [];
var actArr = [];

// Dates........
date = new Date();
year = date.getFullYear();
month = date.getMonth()+1;
dt = date.getDate();
if (dt < 10) {
  dt = '0' + dt;
}
if (month < 10) {
  month = '0' + month;
}

let todayDefault = year+'-' + month + '-'+dt;
let dateInput = document.getElementById('date');
var todayInput = new Date();
const defaultData = listContainer.innerHTML;

function addTask(){
    if(inputTask.value === ''){
        alert('You must write something.....')
    }
    else if(edit){
        editField.innerText=inputTask.value;
        addBtn.innerText = "Add Task"
        addBtn.style.fontSize="14px"
        saveData()
        edit = false
        inputTask.style.color="black"
    }
    else{
        function setDate(){
            if(dateInput.value !== ""){
                inputTask.value = "("+dateInput.value+")"+" "+inputTask.value
            }
            else{
                inputTask.value = "("+todayDefault+")"+" "+inputTask.value
            }
        }
        setDate()
        let li=document.createElement("li")
        li.innerHTML = `<input type="checkbox" name="" class="checkBtn" title="Completed"><span>${inputTask.value}</span><i class="fa-solid fa-pen-to-square" title="Edit" style="color: #000000;"></i><i class="fa-solid fa-delete-left" title="Delete" style="color: #ff0000;"></i>`;
        listContainer.appendChild(li)
        saveData()
    }
    inputTask.value = ""
    dateInput.value=""
    saveActive()
}

listContainer.addEventListener('click',function(e){
    if(e.target.tagName === "INPUT"){
        e.target.nextSibling.classList.toggle("checked")
        saveData();
        saveActive()
        if(e.target.checked){
          saveCompleted(e.target.parentElement.innerHTML)
        }
    }
    else if(e.target.tagName === "I"){
       if(e.target.classList.contains('fa-delete-left')){
          saveDeleteData(e.target.parentElement.innerHTML)
          e.target.parentElement.remove();
          saveData()
          saveActive()
       }
       else{
          inputTask.value = e.target.previousSibling.innerText
          inputTask.style.color="gray"
          inputTask.focus()
          addBtn.style.fontSize="10px"
          addBtn.innerText ="Save changes"
          addBtn.setAttribute("title","Click to save changes")
          edit = true
          editField=e.target.previousSibling
       }
    }

},false)

function saveData(){
    localStorage.setItem("Data",listContainer.innerHTML);
}
function saveDeleteData(a){
    delArr.push(a)
    var string = JSON.stringify(delArr)
    localStorage.setItem("Deleted",string)
}
function saveCompleted(c){
    compArr.push(c)
    var string = JSON.stringify(compArr)
    localStorage.setItem("Completed",string)
}

function saveActive(){
    localStorage.setItem("Active",listContainer.innerHTML) 
}


function showTasks(){
    if(localStorage.getItem('Data') === null){
        listContainer.innerHTML = defaultData;
    }
    else{
        listContainer.innerHTML = localStorage.getItem('Data');
    }
    let checkBox = document.getElementsByClassName('fa-pen-to-square')
    let n=checkBox.length;
    for(let i=0;i<n;i++){
       if(checkBox[i].previousSibling.classList.contains('checked')){
         checkBox[i].previousSibling.previousSibling.checked=true
       } 
       else{
        checkBox[i].previousSibling.previousSibling.checked=false
       }
    }
    saveActive()
}
showTasks()