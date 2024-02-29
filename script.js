const inputToDo = document.getElementById("inputToDo");
const addContentInput = document.querySelector('.add');
const toDoListContainer = document.querySelector('.container-todolist');
//--------------------------------------------------------------
const lastOptions = document.querySelector('.last-options');

let toDoes = [];


// Obtener contenido del input y cambio de estado de btn add
addContentInput.addEventListener("click", addToDoes);
addContentInput.addEventListener("click", changeStateAdd);

function addToDoes(e){
            
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
}

 //----------------------------------------------------------------------------
 function createToDo() {

    if (toDoes.lenght > 0) {
        toDoes.forEach(toDo => {
            const todoItem = document.createElement('div');
            todoItem.classList.add("todo-item");
            todoItem.innerHTML = `
            <div class="flex-interior-item">
                 <div class="circle"></div>
                 <p id="${toDo.id}" class="todo">${toDo}</p>
            </div>
            <button class="cross">X</button>
            `;

            toDoListContainer.appendChild(todoItem);
            lastOptions.before(todoItem);
        });

        
       
    }
//     //limpiar
   

//     contentInput.forEach(todo => {

//         let todoItem = document.createElement('div');
//         todoItem.classList.add("todo-item");

//         todoItem.innerHTML = `
        
//         <div class="flex-interior-item">
//                 <div class="circle"></div>
//                 <p class="todo">${todo}</p>
//         </div>
//         <button class="cross">X</button>
        
//         `

//         toDoListContainer.appendChild(todoItem);

//         

//         lastOptions.before(todoItem);
//     });

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

