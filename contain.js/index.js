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
