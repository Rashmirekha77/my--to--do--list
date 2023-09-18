let all = document.getElementById('all')
let active = document.getElementById('active')
let completed = document.getElementById('completed')
let deleted = document.getElementById('deleted')
let defaultBtn = document.getElementById('default')


function defaultTasks(){
    localStorage.clear()
    location.reload()
}

function allTasks(){
    showTasks()
}

function deletedTasks(){
    var string = localStorage.getItem('Deleted')
    let retArr = JSON.parse(string)
    listContainer.innerHTML=""
    if(!(retArr === null)){
        for(let i=0;i<retArr.length;i++){
            let li = document.createElement('li')
            li.innerHTML=retArr[i]
            listContainer.appendChild(li) 
          }
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
    if(listContainer.innerHTML === ""){
        var li = document.createElement('li')
        li.innerHTML = `<span>You not have deleted any task till now....</span>`
        li.style.paddingLeft="15px"
        listContainer.appendChild(li)
    }
}

function completedTasks(){
    var string = localStorage.getItem('Completed')
    let retArr = JSON.parse(string)
    listContainer.innerHTML=""
    if(!(retArr === null)){
        for(let i=0;i<retArr.length;i++){
            let li = document.createElement('li')
            li.innerHTML=retArr[i]
            listContainer.appendChild(li) 
          }
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
    if(listContainer.innerHTML === ""){
        var li = document.createElement('li')
        li.innerHTML = `<span>You not have completed any task till now....</span>`
        li.style.paddingLeft="15px"
        listContainer.appendChild(li)
    }
}

function activeTasks(){
    listContainer.innerHTML = localStorage.getItem("Active");
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
    var span = document.getElementsByTagName('span')
    for(let j=0;j<span.length;j++){
        if(span[j].classList.contains('checked')){
            span[j].parentElement.remove()
        }
    }
    for(let j=0;j<span.length;j++){
        if(span[j].classList.contains('checked')){
            span[j].parentElement.remove()
        }
    }
    if(!(listContainer.children.length)){
        var li = document.createElement('li')
        li.innerHTML = `<span>Congratulations - there is no active task...</span>`
        li.style.paddingLeft="15px"
        listContainer.appendChild(li)
    }
}