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

    function TrateQuery(Res)  {
        console.log(Res)

        if(Res.error !== false) {
            alert(`Erro na requisição, tente novamente.`)
            return
        }
      if(Res.reason !== 'UserFound') {

     
     return   alert('Usuário não encontrado!')
      } 
  
       
      
    } 

    TrateQuery(AnasilysQuery)
    

}

export default ButtonEngine;