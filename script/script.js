import Alvo from "./alvo.js";

let musica = new Audio("game.mp3");

// LETRAS DISPONIVEIS
const letras = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

//ARRAY PARA ARMAZENAR OS ALVOS CRIADOS
let arrayLetra = [];
let arrayAlvos = [];

// CONFIGURAÇÕES
const menu = document.getElementById("menu");
const btnFacil = document.getElementById("btnFacil");
const btnMedio = document.getElementById("btnMedio");
const btnDificil = document.getElementById("btnDificil");
const btnInfinito = document.getElementById("btnInfinito");
const container = document.getElementById("container");
const txtTime = document.getElementById("time");
const popup = document.getElementById("dialog");
const txtscore = document.getElementById("score");
const btnReset = document.getElementById("btnReset");
const containerVida = document.getElementById("containerVida");
let larguraContainer = container.offsetWidth; //offsetWidth = pega o valor da largura atual da caixa
let alturaContainer = container.offsetHeight; // offsetHeight = pega o valor da altura atual da caixa

// PONTUAÇÂO, JOGO e vida e mais
let score = 0;
let game = true;
let velo = 0;
let veloDesaparecer = 0;
let vida = 0;
let sumir = 0;

// FUNÇÂO PAR DESNEHAR AS VIDAS
const desenharVidas =(vida)=>{
  document.getElementById('ptsVida').innerHTML = vida;
  containerVida.style.display = "flex";
}

const iniciar = () => {
  desenharVidas(vida);
  //VERIFICAR A CADA SEGUNDO
  let timer = setInterval((evt) => {
    if (vida > 0){
      criarAlvos();
      atualizar();
    } else {
      popup.style.display = "flex";
      txtscore.innerHTML = `Pontuação: ${score}`;
      clearInterval(timer);
    }
  }, velo);
};

//Função para criar todos os alvos
const criarAlvos = () => {
  const alvo = new Alvo(
    container,
    letras,
    larguraContainer,
    alturaContainer,
    veloDesaparecer,
    arrayLetra,
    arrayAlvos,
  );

  //VERIFICA SE A LETRA JÁ EXSITE NO ARRAY
  let index = arrayLetra.indexOf(alvo.letra);
  if (index == -1) {
    arrayAlvos.push(alvo);
    arrayLetra.push(alvo.letra);
    alvo.temporizador(true);
    alvo.desenhar();
    atualizar();
  }
};

//AO CLICAR EM UMA TECLA
window.addEventListener("keydown", (evt) => {
  var key = evt.keyCode;
  let letra = String.fromCharCode(key);
  let index = arrayLetra.indexOf(letra);
  if (index != -1) {
    document.getElementById(arrayAlvos[index].id).setAttribute("class","alvoAcerto");
    score += arrayAlvos[index].valor;
    setTimeout(()=>{
      arrayAlvos[index].delTemporizador();
      arrayAlvos[index].remover();
    },100);

  }else{
    vida--;
    desenharVidas(vida);
  }
});

const atualizar = () => {
  arrayAlvos.map((alvo,index)=>{
    arrayLetra = alvo.atArrayLetra();
    arrayAlvos = arrayAlvos[index].atArrayAlvos();
  });
}

//Configurar dificuldade do game
btnFacil.addEventListener("click", (evt) => {
  vida = 15;
  velo = 1000;
  veloDesaparecer = 3000;
  menu.style.display = "none";
  iniciar();
});

btnMedio.addEventListener("click", (evt) => {
  vida = 10;
  velo = 700;
  veloDesaparecer = 1500;
  menu.style.display = "none";
  iniciar();
});

btnDificil.addEventListener("click", (evt) => {
  vida = 5;
  velo = 500;
  veloDesaparecer = 1000;
  menu.style.display = "none";
  iniciar();
});


btnReset.addEventListener("click",()=>{
  popup.style.display = "none";
  menu.style.display = "flex";
  score = 0;
  arrayAlvos = [];
  arrayLetra = [];
  txtscore.innerHTML = `Score: ${score}`;
});
