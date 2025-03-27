const express = require('express');
const App = express();
const MessageSystem = require('../../../../Controller/ControllReturn');
const { GetOperations } = require('../../../../Controller/SQLDatabaseCRUD');

App.get('', async (req, response) => {
    try {
        const { TableOrRow, table } = req.query;

        if (!table || !TableOrRow) {
            return MessageSystem.SendResponseToClient({ error: true, reason: 'Bad Request, Missing Params', status: 400 }, response);
        }

        // Validação básica para evitar SQL Injection
        if (!/^[a-zA-Z0-9_]+$/.test(table)) {
            return MessageSystem.SendResponseToClient({ error: true, reason: 'Invalid table name', status: 400 }, response);
        }

        const GetUtils = new GetOperations();

        if (GetUtils.VanishQueryParamsBeforeQuery(TableOrRow) instanceof MessageSystem) {
            return MessageSystem.SendResponseToClient({ error: true, reason: 'Bad Request, Invalid Params', status: 400 }, response);
        }

        // Se for para retornar a tabela inteira
        if (TableOrRow == 1) {
            const QueryTable = await GetUtils.getTable(table).catch((err) => {
                console.error('Error on getTable:', err);
                return new MessageSystem({ error: true, reason: 'Internal Server Error', status: 500 }, response);
            });
            return MessageSystem.SendResponseToClient(QueryTable, response);
        }

        // Se for para retornar um único registro (exemplo básico)
        const QueryRow = await GetUtils.getRow(table, TableOrRow).catch((err) => {
            console.error('Error on getRow:', err);
            return new MessageSystem({ error: true, reason: 'Internal Server Error', status: 500 }, response);
        });

        return MessageSystem.SendResponseToClient(QueryRow, response);
    } catch (error) {
        console.error('Unexpected Error:', error);
        return MessageSystem.SendResponseToClient({ error: true, reason: 'Unexpected Error', status: 500 }, response);
    }
});

module.exports = App;
