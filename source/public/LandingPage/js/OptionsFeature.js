import *  as elements from './elements.js'

export function AddEventListeners() {

    elements.MapButtons.sustentabilidade.addEventListener('click', (evt) => {
        const option = evt.target.id
        ChangeHTMLFromOption(option)
  })

    
  elements.MapButtons.alffa.addEventListener('click', (evt) => {
        const option = evt.target.id
        ChangeHTMLFromOption(option)
  })

  elements.MapButtons.aplicativo.addEventListener('click', (evt) => {
    const option = evt.target.id
    ChangeHTMLFromOption(option)
})

elements.MapButtons.gestao.addEventListener('click', (evt) => {
    const option = evt.target.id
    ChangeHTMLFromOption(option)
})

elements.MapButtons.operacao.addEventListener('click', (evt) => {
    const option = evt.target.id
    ChangeHTMLFromOption(option)
})
elements.MapButtons.reparo.addEventListener('click', (evt) => {
    const option = evt.target.id
    ChangeHTMLFromOption(option)
})

}

export function ChangeHTMLFromOption(option) {
    console.log(option)


   if(option == null) {
    throw new Error('Elemento vazio.')
   }


   try {
     const ContentForHTML =  GetContentFromOption(option)
     elements.MapButtons.tituloabout.textContent = ContentForHTML.Title
     elements.MapButtons.imgdiv.src = ContentForHTML.img
     elements.MapButtons.paragrafabout.innerHTML = ContentForHTML.context
   }

   catch(err) {
    console.log(err)
   }


}

 function GetContentFromOption(option) {

    const aplicativocontext = `<ul>
    <li><p>A <strong>Multiplicar</strong> foca em <strong>eficiência e transparência</strong>, oferecendo serviços de excelência.</p></li>
    <li><p>Atuamos nos segmentos <strong>Allfa</strong> e <strong>Reparo</strong>, com soluções especializadas.</p></li>
    <li><p>Com <strong>planejamento estratégico</strong>, garantimos qualidade, organização e prazos cumpridos.</p></li>
    <li><p>Investimos em <strong>capacitação contínua</strong> para nossa equipe.</p></li>
    <li><p>Monitoramos <strong>indicadores de desempenho</strong> para otimizar processos.</p></li>
    <li><p>Operamos em conformidade com as <strong>normas e regulamentações</strong>.</p></li>
    <li><p>Oferecemos <strong>atendimento personalizado</strong> para soluções sob medida.</p></li>
</ul>
`

const reparocontext =  `<ul>
<li>
    <p>O <strong>Reparo</strong> é um aplicativo especializado em serviços rápidos de reparo mecânico e manutenção de veículos.</p>
</li>
<li>
    <p>Oferecemos reparos expressos, com orçamentos claros e sem surpresas, para garantir que seu veículo esteja sempre em bom estado.</p>
</li>
<li>
    <p>Trabalhamos com uma equipe de profissionais qualificados para resolver desde pequenos consertos até manutenções mais complexas.</p>
</li>
<li>
    <p>O processo de reparo é sempre feito sob orçamento, para que você saiba exatamente quanto pagará antes de autorizar qualquer serviço.</p>
</li>
<li>
    <p>Utilizamos a tecnologia do <strong>aplicativo</strong> para facilitar a solicitação e acompanhamento do status do seu reparo em tempo real.</p>
</li>
<li>
    <p>Com o <strong>Reparo</strong>, você tem a garantia de um serviço ágil, eficiente e com a melhor relação custo-benefício.</p>
</li>
</ul>`
    
const gestaocontext = `<ul>
        <li>
            <p>Nossa gestão é estruturada para garantir <strong>eficiência e transparência</strong> em todas as operações.</p>
        </li>
        <li>
            <p>Contamos com um <strong>planejamento operacional</strong> detalhado, assegurando qualidade e cumprimento de prazos.</p>
        </li>
        <li>
            <p>Investimos em <strong>treinamento contínuo</strong> para capacitar nossa equipe e manter os mais altos padrões de serviço.</p>
        </li>
        <li>
            <p>Utilizamos <strong>indicadores de desempenho</strong> para monitorar a produtividade, qualidade e segurança dos processos.</p>
        </li>
        <li>
            <p>Seguimos todas as <strong>normas e regulamentações</strong> do setor, garantindo conformidade e mitigação de riscos.</p>
        </li>
        <li>
            <p>Nosso atendimento é <strong>personalizado</strong>, garantindo que cada cliente tenha suas necessidades atendidas com excelência.</p>
        </li>
    </ul>`

const operacaocontext = `<ul>
        <li>
            <p>Nossos profissionais são contratados em regime <strong>CLT</strong> *. </p>
        </li>
        <li>
            <p>O uso de <strong>EPIs</strong> é obrigatório.</p>
        </li>
        <li>
            <p>Operações contém Laudos de Segurança: ASO, PGR, PCMSO, Assinatura do regimento de EP</p>
        </li>
        <li>
            <p>A maior parte dos serviços que realizamos são para empresas que querem ter a prestação in loco.</p>
        </li>
        <li>
            <p>Além de toda a segurança, nossa operação regularizada garante responsabilidade solidária com todos os funcionários devidamente registrados e assegurados de seus direitos e deveres (tendo em vista que a maioria de empresas de lavagem contratadas terceirizadas não registram os funcionarios, atuando de maneira ilegal).</p>
        </li>

        <li>
            <p>* Em caso de serviços esporádicos, PJ com contrato transparente.</p>
        </li>
     </ul>`

const sustentabilidade =  `<ul>
<li><p>A <strong>Multiplicar</strong> foca em <strong>eficiência e transparência</strong>, oferecendo serviços de excelência.</p></li>
<li><p>Atuamos nos segmentos <strong>Allfa</strong> e <strong>Reparo</strong>, com soluções especializadas.</p></li>
<li><p>Com <strong>planejamento estratégico</strong>, garantimos qualidade, organização e prazos cumpridos.</p></li>
<li><p>Investimos em <strong>capacitação contínua</strong> para nossa equipe.</p></li>
<li><p>Monitoramos <strong>indicadores de desempenho</strong> para otimizar processos.</p></li>
<li><p>Operamos em conformidade com as <strong>normas e regulamentações</strong>.</p></li>
<li><p>Oferecemos <strong>atendimento personalizado</strong> para soluções sob medida.</p></li>
</ul>
`
const alffa =  `<ul>
<li>
    <p>A <strong>ALFFA</strong> é especializada em lavagem estética de veículos de locadoras e serviços premium de higienização.</p>
</li>
<li>
    <p>Nossa equipe é altamente treinada e trabalha com técnicas avançadas para garantir o melhor acabamento e preservação dos veículos.</p>
</li>
<li>
    <p>Oferecemos desde lavagens convencionais até serviços especiais como vitrificação, descontaminação de pintura e higienização interna profunda.</p>
</li>
<li>
    <p>Utilizamos um <strong>aplicativo próprio</strong> para facilitar o acompanhamento dos serviços em tempo real.</p>
</li>
<li>
    <p>Além da qualidade, seguimos rigorosos padrões de segurança e respeito ao meio ambiente em todas as operações.</p>
</li>
</ul>`

    
 const OptionMapContent = {
    operacao: {Title: '2. OPERAÇÃO', img: '/LandingPage/media/AboutImgs/operacao.jpg', context: operacaocontext},
    gestao: {Title: '3. GESTÃO', img: '/LandingPage/media/AboutImgs/gestao.jpg', context: gestaocontext},
    aplicativo: {Title: '4. APLICATIVO', img: '', context: aplicativocontext},
    reparo: {Title: '5. REPARO', img: '/LandingPage/media/AboutImgs/reparô.jpg', context: reparocontext},
    alffa: {Title: '6. ALFFA', img: '/LandingPage/media/AboutImgs/Alffa.jpg', context: alffa},
    sustentabilidade: {Title: '1. SUSTENTÁVEL', img: '/LandingPage/media/AboutImgs/sustentavel.jpg', context: sustentabilidade  } 

 }

 const ContentValues = OptionMapContent[option]

 if(ContentValues == null) {
    throw new Error('Não foi possível encontrar nenhum elemento')
 }

 return ContentValues
}