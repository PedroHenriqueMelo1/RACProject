const { ListenServer } = require('../server/index');

test('Server Listener', async () => {
    await expect(ListenServer()).resolves.toEqual({
        Stts: true,
        message: 'Servidor iniciado.',
    });
});
