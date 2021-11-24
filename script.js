// const nave = document.getElementById('nave');

// const vel = 5;

// let posX, posY, dirX, dirY, frames;
// let game = true;

// const controls = {
//     Down(e){
//         let tecla = e.keyCode;

//         // Cima & Baixo
//         if(tecla == 38){
//             console.log('Cima')
//             dirY = -1;

//         } else if(tecla == 40){
//             console.log('Baixo')
//             dirY = 1;
//         }

//         // Esquerda & Direita
//         if(tecla == 37){
//             console.log('Esquerda');
//             dirX = -1;

//         } else if(tecla == 39){
//             console.log('Direita')
//             dirX = 1;
//         }
//     },

//     Up(e){
//         let tecla = e.keyCode;

//         if(tecla == 38 || tecla == 40){
//             dirY = 0;
//         }

//         if(tecla == 37 || tecla == 39){
//             dirX = 0;
//         }
//     }
// }

// function naveControl(){
//     posY += dirY * vel;
//     posX += dirX * vel;

//     nave.style.top = posY;
//     nave.style.left = posX;
// }

// function gameLoop(){
//     if(game){
//         naveControl();
//     }

//     frames = requestAnimationFrame(gameLoop)
// }

// function start(){
//     dirY = 0;
//     dirX = 0;

//     let tTelaAltura = window.innerHeight;
//     let tTelaLargura = window.innerWidth;

//     posY = tTelaAltura / 2;
//     posX = tTelaLargura / 2;

//     nave.style.top = posY;
//     nave.style.left = posX;

//     gameLoop();
// }

// window.addEventListener('load', start);
// document.addEventListener('keydown', controls.Down);
// document.addEventListener('keyup', controls.Up);

var diryJ, dirxJ, jog, velJ, pjx, pjy, velT;
var tamTelaW, tamTelaH;
var jogo;
var frames;



//Função que determina os eventos quando eu APERTO as teclas.
function teclaDw() {
    /*"event.keyCode; Obtém o valor Unicode da tecla do teclado pressionada:*/
    var tecla = event.keyCode;
    if (tecla == 38) {//Cima
        //Observar que o "eixo Y é invertido", no caso, para cima é negativo
        diryJ = -1;
    }
    else if (tecla == 40) {//Baixo
        diryJ = +1;
    }
    if (tecla == 37) {//Esquerda
        dirxJ = -1;
    }
    else if (tecla == 39) {//Direita
        dirxJ = +1;
    }
    if (tecla == 32) {//TIRO
        atira(pjx+17,pjy);
    }

}

//Função que determina os eventos quando eu SOLTO as teclas.
function teclaUp() {
    var tecla = event.keyCode;
    if ((tecla == 38) || (tecla == 40)) {//Cima ou Baixo
        diryJ = 0;
    }
    if ((tecla == 37) || (tecla == 39)) {//Esquerda ou Direita
        dirxJ = 0;
    }

}
////////

function atira(x,y){
 var t=document.createElement("div");
 var att1=document.createAttribute("class");
 var att2=document.createAttribute("style");
    att1.value="tiroJog";
    att2.value="top:"+y+"px;left:"+x+"px";
    t.setAttributeNode(att1);
    t.setAttributeNode(att2);
    document.body.appendChild(t);
}

function controleTiros(){
    const tiros = document.getElementsByClassName('tiroJog');
    var tam = tiros.length;
    for(let i = 0; i<tam; i++){
        if(tiros[i]){
            var pt = tiros[i].offsetTop;
            pt -= velT;
            tiros[i].style.top = pt+"px";

            if(pt<0){
                tiros[i].remove();
            }
        }
    }
}

function controlaJogador(){
    pjy += diryJ*velJ;
    pjx += dirxJ*velJ;

    //retorna a posição de um elemento especificado.
    jog.style.top = pjy + "px";
    jog.style.left = pjx + "px";
}
function gameLoop() {
    //"If "jogo" for TRUE...
    if(jogo === true){
        //Funções de Controle
        controlaJogador();
        controleTiros();
    }
    //Função que vai gerir o Loop do game, gerando a animação - OBSERVE A RECURSIVIDADE (gameLoop -> frames -> gameLoop)
    frames = requestAnimationFrame(gameLoop);
}

//Função que organiza a inicialização do jogo
function inicia() {
    jogo =true;
    //Inicialização da tela:
    //A propriedade innerHeight retorna a largura da área de conteúdo de uma janela
    tamTelaH = window.innerHeight;
    tamTelaW = window.innerWidth;

    //Inicialização Jogador:
    dirxJ = diryJ = 0;
    pjx = tamTelaW/2;
    pjy = tamTelaH/2;
    velJ = 5;
    velT = 6;
    jog = document.getElementById("nave");
    //retorna a posição de um elemento especificado.
    jog.style.top = pjy + "px";
    jog.style.left = pjx + "px";
    gameLoop();


}

//addEventListener() registra uma única espera de evento em um único alvo(no caso, window).
//alvo.addEventListener(tipo, escuta[, usarCaptura]);
window.addEventListener("load", inicia);

document.addEventListener("keydown", teclaDw);
document.addEventListener("keyup", teclaUp);   //galera usem para revisão