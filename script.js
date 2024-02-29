const inputToDo = document.getElementById("inputToDo");
const addContentInput = document.querySelector('.add');
const toDoListContainer = document.querySelector('.container-todolist');
const item = document.querySelector('.todo-item');
//--------------------------------------------------------------
const lastOptions = document.querySelector('.last-options');
//--------------------------------------------------------------
const btnDelete = document.querySelector('.clearAll');

let toDoes = [];


//Recuperar del local storage
addEventListeners();

function addEventListeners() {
    document.addEventListener('DOMContentLoaded', () => {
        toDoes = JSON.parse(localStorage.getItem('toDoes')) || [];
        createToDo();
    });
    //Eliminar mediante evento
    toDoListContainer.addEventListener('click', deleteToDo);
}

//Eliminar mediante ID
 function deleteToDo(e) {
     if (e.target.className == 'cross') {
         const deleteID = parseInt(e.target.getAttribute('id'));
         toDoes = toDoes.filter(toDo => toDo.id !== deleteID)
        createToDo(); //LLamar crear para actualizar local storage y actualice los toDoes.
     }
}

//Borrar todo
// function deleteAll() {
//     toDoes = [];
//     createToDo();
// }



//------------------------------------------------------------------------
// Obtener contenido del input y cambio de estado de btn add
addContentInput.addEventListener("click", addToDoes);
addContentInput.addEventListener("click", changeStateAdd);

function addToDoes(){

        const toDo = inputToDo.value;
        if(toDo === ''){
            showError('El contenido esta vacio.')
            return;
        }

        const toDoObj = {
            toDo,
            id: Date.now()
        }

        //Copiar el array y concatenar obj
        toDoes = [...toDoes, toDoObj];
        
        createToDo();

        inputToDo.value = '';
}

 //----------------------------------------------------------------------------
 function createToDo() {

    clearHtml();

    if (toDoes.length > 0) {
        toDoes.forEach(toDo => {
            const todoItem = document.createElement('div');
            todoItem.classList.add("todo-item");
            todoItem.innerHTML = `
            <div class="flex-interior-item">
                 <span  class="circle"></span>
                 <p class="todo">${toDo.toDo}</p>
            </div>
            <button id="${toDo.id}" class="cross">X</button>
            `;

            toDoListContainer.appendChild(todoItem);
            lastOptions.before(todoItem);
        });

        
       
    }

    sincronizationStorage();
}

function sincronizationStorage() {
    localStorage.setItem('toDoes',JSON.stringify(toDoes));
}


 //ERROR-----------------------------------------------------------------------------------
function showError(error) {
    const messageError = document.createElement('p');
    messageError.textContent = error;
    messageError.classList.add('error')

    toDoListContainer.appendChild(messageError);
    lastOptions.before(messageError);


    setTimeout(() => {
        messageError.remove();
    }, 1000);
    
}

//CHANGE STATE BTN ADD---------------------------------------------------------------------------
function changeStateAdd(){
    
    let addCheck = document.createElement("div");
    let addIcon = document.createElement("img");
    addIcon.src= "./img/images/plus.svg";
    addIcon.classList.add("plus");
   
    addCheck.classList.add("padding-add");
    //Agrega hijo para el fondo
    addContentInput.appendChild(addCheck);
    //Agrega hijo para el icono
    addCheck.appendChild(addIcon)
   

    //elimina despues de un segundo
     setTimeout(function() {
         addContentInput.removeChild(addCheck);
     }, 260);
}


//CLEAR---------------------------  
function clearHtml() {
    toDoListContainer.innerHTML = '';
}