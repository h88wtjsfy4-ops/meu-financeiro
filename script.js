//======================================================
// MEU FINANCEIRO
// Script Principal
//======================================================

//======================================================
// ELEMENTOS
//======================================================

const saldoAtual = document.getElementById("saldoAtual");

const saldoRestante = document.getElementById("saldoRestante");

const totalEntradas = document.getElementById("totalEntradas");

const totalSaidas = document.getElementById("totalSaidas");

const historico = document.getElementById("historico");

const contadorMovimentos = document.getElementById("contadorMovimentos");

const toast = document.getElementById("toast");

const toastMensagem = document.getElementById("toastMensagem");

const modalEntrada = document.getElementById("modalEntrada");

const modalSaida = document.getElementById("modalSaida");

const modalReset = document.getElementById("modalReset");

const btnEntrada = document.getElementById("btnEntrada");

const btnSaida = document.getElementById("btnSaida");

const btnReset = document.getElementById("btnReset");

const salvarEntrada = document.getElementById("salvarEntrada");

const salvarSaida = document.getElementById("salvarSaida");

const cancelarReset = document.getElementById("cancelarReset");

const confirmarReset = document.getElementById("confirmarReset");

//======================================================
// CATEGORIAS
//======================================================

const categorias = {

    Mercado:0,
    Padaria:0,
    iFood:0,
    Uber:0,
    Investimentos:0,
    Parcelamentos:0,
    Assinaturas:0,
    Lazer:0

};

//======================================================
// DADOS PRINCIPAIS
//======================================================

let saldo = 0;

let entradas = 0;

let saidas = 0;

let movimentos = [];

let grafico = null;

//======================================================
// LOCAL STORAGE
//======================================================

function salvarDados(){

    localStorage.setItem(

        "meuFinanceiro",

        JSON.stringify({

            saldo,

            entradas,

            saidas,

            categorias,

            movimentos

        })

    );

}

function carregarDados(){

    const dados = JSON.parse(

        localStorage.getItem("meuFinanceiro")

    );

    if(!dados){

        return;

    }

    saldo = dados.saldo;

    entradas = dados.entradas;

    saidas = dados.saidas;

    movimentos = dados.movimentos;

    Object.assign(

        categorias,

        dados.categorias

    );

}

//======================================================
// FORMATAÇÃO
//======================================================

function dinheiro(valor){

    return valor.toLocaleString(

        "pt-BR",

        {

            style:"currency",

            currency:"BRL"

        }

    );

}

//======================================================
// TOAST
//======================================================

function mostrarToast(texto){

    toastMensagem.textContent = texto;

    toast.classList.add("mostrar");

    setTimeout(()=>{

        toast.classList.remove("mostrar");

    },2500);

}
//======================================================
// CHART.JS
//======================================================

function criarGrafico() {

    const ctx = document
        .getElementById("graficoPizza")
        .getContext("2d");

    grafico = new Chart(ctx, {

        type: "pie",

        data: {

            labels: [

                "Saldo",
                "Mercado",
                "Padaria",
                "iFood",
                "Uber",
                "Investimentos",
                "Parcelamentos",
                "Assinaturas",
                "Lazer"

            ],

            datasets: [{

                data: [

                    saldo,
                    categorias.Mercado,
                    categorias.Padaria,
                    categorias.iFood,
                    categorias.Uber,
                    categorias.Investimentos,
                    categorias.Parcelamentos,
                    categorias.Assinaturas,
                    categorias.Lazer

                ],

                backgroundColor: [

                    "#48d597",
                    "#4f8df7",
                    "#f7b731",
                    "#ff5252",
                    "#00b8d9",
                    "#8e44ad",
                    "#8d6e63",
                    "#ec6cff",
                    "#ff9800"

                ],

                borderWidth:2,

                borderColor:"#1d212b"

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            plugins:{

                legend:{

                    position:"bottom",

                    labels:{

                        color:"white",

                        padding:18,

                        font:{

                            family:"Poppins",

                            size:13

                        }

                    }

                }

            }

        }

    });

}

//======================================================
// ATUALIZAR GRÁFICO
//======================================================

function atualizarGrafico(){

    if(!grafico){

        return;

    }

    grafico.data.datasets[0].data=[

        saldo,

        categorias.Mercado,

        categorias.Padaria,

        categorias.iFood,

        categorias.Uber,

        categorias.Investimentos,

        categorias.Parcelamentos,

        categorias.Assinaturas,

        categorias.Lazer

    ];

    grafico.update();

}

//======================================================
// ATUALIZAR TELA
//======================================================

function atualizarTela(){

    saldoAtual.textContent=dinheiro(saldo);

    saldoRestante.textContent=dinheiro(saldo);

    totalEntradas.textContent=dinheiro(entradas);

    totalSaidas.textContent=dinheiro(saidas);

    document.getElementById("mercado").textContent=
    dinheiro(categorias.Mercado);

    document.getElementById("padaria").textContent=
    dinheiro(categorias.Padaria);

    document.getElementById("ifood").textContent=
    dinheiro(categorias.iFood);

    document.getElementById("uber").textContent=
    dinheiro(categorias.Uber);

    document.getElementById("investimentos").textContent=
    dinheiro(categorias.Investimentos);

    document.getElementById("parcelamentos").textContent=
    dinheiro(categorias.Parcelamentos);

    document.getElementById("assinaturas").textContent=
    dinheiro(categorias.Assinaturas);

    document.getElementById("lazer").textContent=
    dinheiro(categorias.Lazer);

    contadorMovimentos.textContent=
    movimentos.length+" registros";

    atualizarGrafico();

    salvarDados();

}

//======================================================
// DATA E HORA
//======================================================

function dataHoraAtual(){

    const agora=new Date();

    return agora.toLocaleString(

        "pt-BR",

        {

            day:"2-digit",

            month:"2-digit",

            year:"numeric",

            hour:"2-digit",

            minute:"2-digit"

        }

    );

}

//======================================================
// ABRIR E FECHAR MODAIS
//======================================================

function abrirModal(modal){

    modal.classList.remove("oculto");

}

function fecharModal(modal){

    modal.classList.add("oculto");

}
//======================================================
// BOTÕES PRINCIPAIS
//======================================================

btnEntrada.addEventListener("click",()=>{

    abrirModal(modalEntrada);

});

btnSaida.addEventListener("click",()=>{

    abrirModal(modalSaida);

});

//======================================================
// FECHAR MODAIS
//======================================================

document.querySelectorAll(".cancelar").forEach(botao=>{

    botao.addEventListener("click",()=>{

        fecharModal(modalEntrada);

        fecharModal(modalSaida);

        fecharModal(modalReset);

    });

});

//======================================================
// SELEÇÃO DE CATEGORIA
//======================================================

const categoriaSelecionada=document.getElementById("categoriaSelecionada");

document.querySelectorAll(".categoria-btn").forEach(botao=>{

    botao.addEventListener("click",()=>{

        document
        .querySelectorAll(".categoria-btn")
        .forEach(item=>item.classList.remove("ativa"));

        botao.classList.add("ativa");

        categoriaSelecionada.value=
        botao.dataset.categoria;

    });

});

//======================================================
// NOVA ENTRADA
//======================================================

salvarEntrada.addEventListener("click",()=>{

    const descricao=document
    .getElementById("descricaoEntrada")
    .value
    .trim();

    const valor=parseFloat(

        document
        .getElementById("valorEntrada")
        .value

    );

    if(

        descricao===""

        ||

        isNaN(valor)

        ||

        valor<=0

    ){

        mostrarToast("Preencha os campos.");

        return;

    }

    saldo+=valor;

    entradas+=valor;

    movimentos.unshift({

        tipo:"entrada",

        descricao,

        valor,

        data:dataHoraAtual()

    });

    document
    .getElementById("descricaoEntrada")
    .value="";

    document
    .getElementById("valorEntrada")
    .value="";

    fecharModal(modalEntrada);

    atualizarHistorico();

    atualizarTela();

    mostrarToast("Entrada adicionada.");

});

//======================================================
// NOVA SAÍDA
//======================================================

salvarSaida.addEventListener("click",()=>{

    const categoria=
    categoriaSelecionada.value;

    const valor=parseFloat(

        document
        .getElementById("valorSaida")
        .value

    );

    if(

        categoria===""

        ||

        isNaN(valor)

        ||

        valor<=0

    ){

        mostrarToast("Preencha os campos.");

        return;

    }

    saldo-=valor;

    saidas+=valor;

    categorias[categoria]+=valor;

    movimentos.unshift({

        tipo:"saida",

        categoria,

        valor,

        data:dataHoraAtual()

    });

    document
    .getElementById("valorSaida")
    .value="";

    categoriaSelecionada.value="";

    document
    .querySelectorAll(".categoria-btn")
    .forEach(item=>item.classList.remove("ativa"));

    fecharModal(modalSaida);

    atualizarHistorico();

    atualizarTela();

    mostrarToast("Saída registrada.");

});
//======================================================
// HISTÓRICO
//======================================================

function atualizarHistorico(){

    historico.innerHTML="";

    movimentos.forEach((movimento,index)=>{

        const item=document.createElement("div");

        item.className="movimento";

        let titulo="";
        let valorClasse="";

        if(movimento.tipo==="entrada"){

            titulo="🟢 "+movimento.descricao;

            valorClasse="valor-entrada";

        }else{

            titulo="🔴 "+movimento.categoria;

            valorClasse="valor-saida";

        }

        item.innerHTML=`

            <div class="movimento-esquerda">

                <span class="movimento-titulo">
                    ${titulo}
                </span>

                <span class="movimento-data">
                    ${movimento.data}
                </span>

            </div>

            <div class="movimento-direita">

                <strong class="${valorClasse}">
                    ${movimento.tipo==="entrada" ? "+" : "-"} ${dinheiro(movimento.valor)}
                </strong>

                <button
                    class="excluir"
                    data-index="${index}">
                    🗑 Excluir
                </button>

            </div>

        `;

        historico.appendChild(item);

    });

    adicionarEventosExcluir();

}

//======================================================
// EXCLUIR MOVIMENTAÇÃO
//======================================================

function adicionarEventosExcluir(){

    document.querySelectorAll(".excluir").forEach(botao=>{

        botao.addEventListener("click",()=>{

            const indice=parseInt(botao.dataset.index);

            excluirMovimento(indice);

        });

    });

}

function excluirMovimento(indice){

    const movimento=movimentos[indice];

    if(!movimento){

        return;

    }

    if(movimento.tipo==="entrada"){

        saldo-=movimento.valor;

        entradas-=movimento.valor;

    }else{

        saldo+=movimento.valor;

        saidas-=movimento.valor;

        categorias[movimento.categoria]-=movimento.valor;

    }

    movimentos.splice(indice,1);

    atualizarHistorico();

    atualizarTela();

    mostrarToast("Movimentação excluída.");

}

//======================================================
// LIMPAR CAMPOS
//======================================================

function limparCampos(){

    document.getElementById("descricaoEntrada").value="";

    document.getElementById("valorEntrada").value="";

    document.getElementById("valorSaida").value="";

    categoriaSelecionada.value="";

    document
        .querySelectorAll(".categoria-btn")
        .forEach(botao=>botao.classList.remove("ativa"));

}
//======================================================
// RESET DO MÊS
//======================================================

btnReset.addEventListener("click",()=>{

    abrirModal(modalReset);

});

cancelarReset.addEventListener("click",()=>{

    fecharModal(modalReset);

});

confirmarReset.addEventListener("click",()=>{

    saldo=0;

    entradas=0;

    saidas=0;

    movimentos=[];

    categorias.Mercado=0;
    categorias.Padaria=0;
    categorias.iFood=0;
    categorias.Uber=0;
    categorias.Investimentos=0;
    categorias.Parcelamentos=0;
    categorias.Assinaturas=0;
    categorias.Lazer=0;

    limparCampos();

    atualizarHistorico();

    atualizarTela();

    fecharModal(modalReset);

    mostrarToast("Mês reiniciado.");

});

//======================================================
// FECHAR MODAL CLICANDO FORA
//======================================================

window.addEventListener("click",(e)=>{

    if(e.target===modalEntrada){

        fecharModal(modalEntrada);

    }

    if(e.target===modalSaida){

        fecharModal(modalSaida);

    }

    if(e.target===modalReset){

        fecharModal(modalReset);

    }

});

//======================================================
// TECLA ESC
//======================================================

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        fecharModal(modalEntrada);

        fecharModal(modalSaida);

        fecharModal(modalReset);

    }

});

//======================================================
// INICIALIZAÇÃO
//======================================================

function iniciar(){

    carregarDados();

    criarGrafico();

    atualizarHistorico();

    atualizarTela();

}

iniciar();