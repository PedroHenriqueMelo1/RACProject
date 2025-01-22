describe('Insert SQL Endpoint Tests', () => {
    it('Insert User', async () => {
        const PostRequision = await fetch('http://localhost:3333/endpoint/db/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                
            })
           

        })
    })
})