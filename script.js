var diryJ, dirxJ, jog, velJ, pjx, pjy, velT, velA;
var tamTelaW, tamTelaH;
var jogo;
var contAliens, painelContAlien, tmpCriaAlien;
var frames;
var aliensTotal, vidaPlaneta, barraPlaneta;
var ie;
var telaMsg;

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

function criarAlien(){
    if(jogo){
        var y = 0;
        var x = Math.random(5, 6)*pjx;
        var alien=document.createElement("div");
        var att1=document.createAttribute("class");
        var att2=document.createAttribute("style");
        att1.value="alien";
        att2.value="top:"+y+"px;left:"+x+"px";
        alien.setAttributeNode(att1);
        alien.setAttributeNode(att2);
        document.body.appendChild(alien);
        contAliens--;
    }
}

function controlaAlien(){
    aliensTotal = document.getElementsByClassName('alien');
    var tam = aliensTotal.length;

    for(let i = 0; i<tam; i++){
        if(aliensTotal[i]){
            var pi = aliensTotal[i].offsetTop;
            pi += velA;

            aliensTotal[i].style.top = pi+"px";
            if(pi>tamTelaH){
                vidaPlaneta -= 10;
                aliensTotal[i].remove();
            }
        }
    }   
}

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
    var tiros = document.getElementsByClassName('tiroJog');
    var tam = tiros.length;
    for(let i = 0; i<tam; i++){
        if(tiros[i]){
            var pt = tiros[i].offsetTop;
            pt -= velT;
            tiros[i].style.top = pt+"px";

            colisaoTiro(tiros[i]);

            if(pt<0){
                tiros[i].remove();
            }
        }
    }
}

function colisaoTiro(tiro){
    var tam = aliensTotal.length;

    for(let i = 0; i < tam; i++){
        if(aliensTotal[i]){
            if(
                (
                    (tiro.offsetTop<=(aliensTotal[i].offsetTop+70))&&
                    ((tiro.offsetTop+6)>=(aliensTotal[i].offsetTop))
                )
                &&
                (
                    (tiro.offsetLeft<=(aliensTotal[i].offsetLeft+70))&&
                    ((tiro.offsetLeft+6)>=(aliensTotal[i].offsetLeft))

                )
            ){
                criaExplosao(aliensTotal[i].offsetLeft, aliensTotal[i].offsetTop);
                aliensTotal[i].remove();
                tiro.remove();
            }
        }
    }
}

function criaExplosao(x, y){
    if(document.getElementById("explosao"+(ie-1))){
        document.getElementById("explosao"+(ie-1)).remove();
    }

    var explosao = document.createElement('div');
    var img = document.createElement('img');

    var att1 = document.createAttribute('class');
    var att2 = document.createAttribute('style');
    var att3 = document.createAttribute('id');

    var att4 = document.createAttribute('src');

    att1.value="explosaoAr";
    att2.value="top:"+y+"px;left:"+x+"px";
    att3.value="explosao"+ie;

    att4.value="img/alien_explosion_min.gif";

    explosao.setAttributeNode(att1);
    explosao.setAttributeNode(att2);
    explosao.setAttributeNode(att3);

    img.setAttributeNode(att4);

    explosao.appendChild(img);

    document.body.appendChild(explosao);

    

    ie++;

}

function controlaJogador(){
    pjy += diryJ*velJ;
    pjx += dirxJ*velJ;

    //retorna a posição de um elemento especificado.
    jog.style.top = pjy + "px";
    jog.style.left = pjx + "px";
}

function gerenciaGame(){
    barraPlaneta.style.width = vidaPlaneta+"px";

    if(contAliens <= 0){
        jogo = false;
        clearInterval(tmpCriaAlien);
        telaMsg.style.backgroundImage = "url('./img/VITORIA.png')";
        telaMsg.style.display = "block";
    }

    if(vidaPlaneta <= 0){
        jogo = false;
        clearInterval(tmpCriaAlien);
        telaMsg.style.backgroundImage = "url('./img/DERROTA.png')";
        telaMsg.style.display = "block";
    }
}

function gameLoop() {
    //"If "jogo" for TRUE...
    if(jogo === true){
        //Funções de Controle
        controlaJogador();
        controleTiros();
        controlaAlien();
    }

    gerenciaGame();

    //Função que vai gerir o Loop do game, gerando a animação - OBSERVE A RECURSIVIDADE (gameLoop -> frames -> gameLoop)
    frames = requestAnimationFrame(gameLoop);
}

function reinicia(){
    aliensTotal = document.getElementsByClassName('alien');
    var tam = aliensTotal.length;

    for(let i = 0; i<tam; i++){
        if(aliensTotal[i]){
            aliensTotal[i].remove();
        }
    }

    telaMsg.style.display = "none";

    cancelAnimationFrame(frames);

    vidaPlaneta = 300;
    pjx = tamTelaW/2;
    pjy = tamTelaH/2;
    jog.style.top = pjy + "px";
    jog.style.left = pjx + "px";

    jogo = true;

    clearInterval(tmpCriaAlien)
    tmpCriaAlien = setInterval(criarAlien, 1700)

    gameLoop();
}

//Função que organiza a inicialização do jogo
function inicia() {
    jogo = false;
    //Inicialização da tela:
    //A propriedade innerHeight retorna a largura da área de conteúdo de uma janela
    tamTelaH = window.innerHeight;
    tamTelaW = window.innerWidth;

    //Inicialização Jogador:
    dirxJ = diryJ = 0;
    pjx = tamTelaW/2;
    pjy = tamTelaH/2;
    velJ = 5;
    velA = 1;
    velT = 6;
    jog = document.getElementById("nave");
    // retorna a posição de um elemento especificado.
    jog.style.top = pjy + "px";
    jog.style.left = pjx + "px";


    contAliens = 150;

    vidaPlaneta = 300;
    barraPlaneta = document.getElementById('barraPlaneta');
    barraPlaneta.style.width = vidaPlaneta+"px";

    ie = 0;

    telaMsg = document.getElementById('telaMsg');
    telaMsg.style.backgroundImage = "url('./img/INICIO.png')";
    telaMsg.style.display = "block";

    document.getElementById('btnJogar').addEventListener('click', reinicia)
    
}

//addEventListener() registra uma única espera de evento em um único alvo(no caso, window).
//alvo.addEventListener(tipo, escuta[, usarCaptura]);
window.addEventListener("load", inicia);

document.addEventListener("keydown", teclaDw);
document.addEventListener("keyup", teclaUp);   //galera usem para revisão