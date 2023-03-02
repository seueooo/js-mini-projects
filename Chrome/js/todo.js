const toDoForm = document.getElementById("todo-form");
const toDoList = document.getElementById("todo-list");
const toDoInput = document.querySelector("#todo-form input");
let toDos = [];

function saveToDos(){
    localStorage.setItem("todos",JSON.stringify(toDos));
}


function deleteToDo(event){
    const li = event.target.parentElement;
    toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id))
    //이 toDo는 toDos DB에 있는 요소 중 하나
    //선택된 li의 id와 다른 li만 남기기
    li.remove();
    saveToDos();
}   

function paintToDo(newTodo){
    const li = document.createElement("li");
    li.id = newTodo.id; //newTodo라는 object의 id, html의 li태그에 id 삽입
    const span = document.createElement("span");
    span.innerText= newTodo.text; //newTodo라는 object의 text
    const button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click",deleteToDo)
    li.appendChild(span);
    li.appendChild(button);

    toDoList.appendChild(li);
}


function handleToDosubmit(event) {
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value="";
    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
    }
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}




toDoForm.addEventListener("submit", handleToDosubmit);

const savedToDos = localStorage.getItem("todos");

if(savedToDos!==null){
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);

}