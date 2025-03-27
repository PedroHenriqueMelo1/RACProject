// Espera o DOM carregar para rodar o código
window.onload = function() {
    // Configuração do gráfico 1
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line', // Tipo de gráfico: 'line', 'bar', etc.
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: 'rgba(0, 0, 0, 0)', // Remove fundo
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 2, // Aumenta a largura da borda
                fill: false, // Remove o preenchimento
                pointRadius: 0, // Remove os pontos
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false, // Remove a legenda
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: false, // Remove as linhas de grade horizontais
                    }
                },
                x: {
                    grid: {
                        display: false, // Remove as linhas de grade verticais
                    }
                }
            },
            elements: {
                line: {
                    tension: 0.4, // Suaviza a linha
                }
            },
            layout: {
                padding: {
                    left: 5,
                    right: 5,
                }
            }
        }
    });

    // Configuração do gráfico 2
    const ctx2 = document.getElementById('MyChart2').getContext('2d');
    const dasdos = new Chart(ctx2, {
        type: 'line', // Tipo de gráfico: 'line', 'bar', etc.
        data: {
            labels: ['12:00', '14:00', '15:00', '16:00', '17:00', '18:30'],
            datasets: [{
                label: 'Affa', // Deixe o label, se necessário
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: 'rgba(0, 0, 0, 0)', // Remove fundo
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 2, // Aumenta a largura da borda
                fill: false, // Remove o preenchimento
                pointRadius: 0, // Remove os pontos
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false // Remove a legenda
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: false, // Remove as linhas de grade horizontais
                    }
                },
                x: {
                    grid: {
                        display: false, // Remove as linhas de grade verticais
                    }
                }
            },
            elements: {
                line: {
                    tension: 0.4, // Suaviza a linha
                }
            },
            layout: {
                padding: {
                    left: 5,
                    right: 5,
                }
            }
        }
    });



    const UserData = localStorage.getItem('auth')

    async function Requests() {
        const RequestMail = await fetch(`/endpoint/ReturnUsersDetailByJwt?token=${UserData}`)

        const JSON = await RequestMail.json()

        console.log(JSON)
    }

    Requests()

   

    console.log(UserData)
}

