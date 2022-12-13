function validarForm(){

    var expRegNome=/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    var expRegEmail=/^\w+@(\w+\.)+\w{2,4}$/; 
  
  
       var nome = document.getElementById("nome");
       var email = document.getElementById("email");
       var comentarios = document.getElementById("comentarios");

       //Campo nombre
       if(!nome.value)
       {
        alert("O campo nome e obligatorio");
        nome.focus();
        return false;
       }
       
       if (!expRegNome.exec(nome.value))
       {
          alert("O campo nome e incorreto")
          nome.focus();
          return false;
       }
       //campo email
       if(!email.value)
       {
        alert("O campo correo e obligatorio");
        email.focus();
        return false;
       }
       if(!expRegEmail.exec(email.value))
       {
         alert("O campo correo nao ten o formato correto.")
         email.focus();
         return false;
       }
       //campo comentarios
       if(!comentarios.value)
       {
        alert("O campo comentarios e obligatorio");
        comentarios.focus();
        return false;
       }
       return true;
    }
    // asociacion del boton enviar con el formulario en html//
    window.onload = function() { 
      var formulario = document.getElementById("form");
      formulario.onsubmit = validarForm;
    }


    /*envio de formulario*/
    //const $form = document.getElementById('form')
    //const $buttonMailto = document.getElementById('aprob')

    //$form.addEventListener('submit', handleSubmit)

    /*function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(this)
    $buttonMailto.setAttribute('href', `mailto:larosaisaac2@gmail.com?subject=nombre' ${form.get('name')}  correo ${form.get('email')}&body=${form.get('message')}`)
  $buttonMailto.click()
}*/


/* o Crud, cadastro de clientes*/
const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}


const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))

// CRUD - crear delete
const deleteClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
}

const updateClient = (index, client) => {
    const dbClient = readClient()
    dbClient[index] = client
    setLocalStorage(dbClient)
}

const readClient = () => getLocalStorage()

const createClient = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push (client)
    setLocalStorage(dbClient)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

//Interação com o layout

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
    document.getElementById('nome').dataset.index = 'new'
    document.querySelector(".modal-header>h2").textContent  = 'Novo Cliente'
}

const saveClient = () => {
    if (isValidFields()) {
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value
        }
        const index = document.getElementById('nome').dataset.index
        if (index == 'new') {
            createClient(client)
            updateTable()
            closeModal()
        } else {
            updateClient(index, client)
            updateTable()
            closeModal()
        }
    }
}

const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}" >Excluir</button>
        </td>
    `
    document.querySelector('#tableClient>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbClient = readClient()
    clearTable()
    dbClient.forEach(createRow)
}

const fillFields = (client) => {
    document.getElementById('nome').value = client.nome
    document.getElementById('email').value = client.email
    document.getElementById('celular').value = client.celular
    document.getElementById('cidade').value = client.cidade
    document.getElementById('nome').dataset.index = client.index
}

const editClient = (index) => {
    const client = readClient()[index]
    client.index = index
    fillFields(client)
    document.querySelector(".modal-header>h2").textContent  = `Editando ${client.nome}`
    openModal()
}

const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editClient(index)
        } else {
            const client = readClient()[index]
            const response = confirm(`Deseja realmente excluir o cliente ${client.nome}`)
            if (response) {
                deleteClient(index)
                updateTable()
            }
        }
    }
}

updateTable()

// Eventos
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveClient)

document.querySelector('#tableClient>tbody')
    .addEventListener('click', editDelete)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)

 
    
