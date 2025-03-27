import ElementsDicionary from './Elements.js';

const ButtonEngine = async () => {
  const username = ElementsDicionary.Name.value;
  const password = ElementsDicionary.Password.value;

  let hasError = false;

  ElementsDicionary.Name.style.borderColor = '';
  ElementsDicionary.Password.style.borderColor = '';

  if (!username) {
    ElementsDicionary.Name.style.borderColor = 'red';
    alert('Por favor, insira o nome de usuário.');
    hasError = true;
  }

  if (!password) {
    ElementsDicionary.Password.style.borderColor = 'red';
    alert('Por favor, insira a senha.');
    hasError = true;
  }

  if (hasError) {
    return;
  }

    const QueryUser = await fetch(`/endpoint/db/user?Email=${ElementsDicionary.Name.value}&Password=${ElementsDicionary.Password.value}`)

    const AnasilysQuery = await QueryUser.json()

    function TrateQuery(Response)  {

      const InObj =  Response.Response



      if(InObj.error !== false) {
      return  alert(`Erro na requisição!`)
      }

       
      if(InObj.reason !== 'UserFound')  

        {
          return alert(`Registro não encontrado, tente novamente!`)
        }

  

        window.localStorage.setItem('auth', InObj.jwt)

        
       window.location.href = '/Alffa/Unidade';

       
    } 

    TrateQuery(AnasilysQuery)
    

}

export default ButtonEngine;
     