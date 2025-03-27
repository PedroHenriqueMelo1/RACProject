async function LoadUsersTable() {
    try {
        const Requisition = await fetch('http://localhost:3333/endpoint/db/unidades?TableOrRow=1&table=users', {
            method: 'GET',
        });

        if (!Requisition.ok) {
            throw new Error(`Erro na requisição: ${Requisition.status}`);
        }

        const JSONRequest = await Requisition.json();
        const Data = JSONRequest['Response'].data;

        const tableBody = document.querySelector(".FuncionariosBoard .Desc table");

        Data.forEach((item) => {
            const row = `
                <tr data-email="${item.email}">
                    <td>${item.nome_completo}</td>
                    <td>${item.telefone || '-'}</td>
                    <td>${item.email || '-'}</td>
                    <td>${item.cargo || '-'}</td>
                    <td>${item.situacao || 'Ativo'}</td>
                    <td>
                        <button class="action-btn">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                        <div class="options-menu">
                            <button class="edit-btn">Editar</button>
                            <button class="delete-btn" data-email="${item.email}">Excluir</button>
                        </div>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });

        // Adiciona os eventos de clique para o menu de opções
        addOptionsMenuEventListeners();

    } catch (error) {
        console.error('Erro ao carregar a tabela de usuários:', error);
    }
}

async function LoadUnidadesTable() {
    try {
        const Requisition = await fetch('http://localhost:3333/endpoint/db/unidades?TableOrRow=1&table=unidades', {
            method: 'GET',
        });

        if (!Requisition.ok) {
            throw new Error(`Erro na requisição: ${Requisition.status}`);
        }

        const JSONRequest = await Requisition.json();
        const Data = JSONRequest['Response'].data;

        const tableBody = document.querySelector(".FuncUnidade .Desc table");

        Data.forEach((item) => {
            const row = `
                <tr data-email="${item.email}">
                    <td>${item.nome}</td>
                    <td>${item.telefone || '-'}</td>
                    <td>${item.email || '-'}</td>
                    <td>${item.endereco || '-'}</td>
                    <td>
                        <button class="action-btn">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                        <div class="options-menu">
                            <button class="edit-btn">Editar</button>
                            <button class="delete-btn" data-email="${item.email}">Excluir</button>
                        </div>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });

        // Adiciona os eventos de clique para o menu de opções
        addOptionsMenuEventListeners();

    } catch (error) {
        console.error('Erro ao carregar a tabela de unidades:', error);
    }
}

// Função para adicionar os ouvintes de evento nos botões de ação
function addOptionsMenuEventListeners() {
    document.querySelectorAll('.action-btn').forEach(button => {
        button.addEventListener('click', toggleOptionsMenu);
    });

    // Adiciona eventos de clique para os botões de editar e excluir
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', editItem);
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', deleteItem);
    });

    // Fechar o menu se clicar fora
    window.addEventListener('click', function(event) {
        if (!event.target.closest('.action-btn')) {
            const allMenus = document.querySelectorAll('.options-menu');
            allMenus.forEach(menu => {
                menu.style.display = 'none';
            });
        }
    });
}

function toggleOptionsMenu(event) {
    const optionsMenu = event.target.closest('td').querySelector('.options-menu');
    const allMenus = document.querySelectorAll('.options-menu');
    allMenus.forEach(menu => {
        if (menu !== optionsMenu) {
            menu.style.display = 'none';
        }
    });
    optionsMenu.style.display = optionsMenu.style.display === 'block' ? 'none' : 'block';
}

// Função para excluir um item
async function deleteItem(event) {
    const button = event.target.closest('button');
    const email = button.dataset.email;  // Pega o email do atributo data-email do botão

    const response = await fetch(`http://localhost:3333/endpoint/db/excluir/${email}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const row = button.closest('tr');
        row.remove();  // Remove a linha da tabela após excluir
        alert('Item excluído com sucesso!');
    } else {
        alert('Erro ao excluir o item.');
    }
}

LoadUsersTable();
LoadUnidadesTable();
