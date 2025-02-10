
describe('Onboarding Service Endpoints Test', () => {
    it('Create Token', async () => {
      const PostRequision = await  fetch('http://localhost:3333/endpoint/db/onboarding', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                "Validaty": '24',
                "EmitedDate": '21/01/2025'
            })
        })

       const Response  = await PostRequision.json()

            expect(Response).toHaveProperty('error', false)
    })

    it('Delete Token', async () => {
        const DeleteRequision = await fetch('http://localhost:3333/endpoint/db/onboarding', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                "Token": 'inIsMhbGZajDRgVd7IKCAwbpNgJLgPH6x2efEatEvmy3DBQRhsSllc7yrS4X5S4sDPVue8aNzk1zvjwQDsMlGVIIJK78kjqyexYVHvE38hXY9nwUP0nx9oXpsEMqCtakVDQNryG2bjJol4zLMMiZm9I7K0CuLXqzQfBcBT7L1igfnA5td8EgBiEfIDvUgSX7qNHD',
                
            })
        })

        const Response = await DeleteRequision.json()   

        expect(Response).toHaveProperty('error', false)
    })

    
      

})