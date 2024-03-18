var botao1 = document.getElementById('botao1'); 
var botao2 = document.getElementById('botao2'); 
var botao3 = document.getElementById('botao3');
var botao4 = document.getElementById('botao4');
var botao_voltar = document.getElementById('item-footer-voltar'); 
var botao_continuar = document.getElementById('item-footer-continuar');  

var conteudo1 = document.getElementById('conteudo1'); 
var conteudo2 = document.getElementById('conteudo2'); 
var conteudo3 = document.getElementById('conteudo3');
var conteudo4 = document.getElementById('conteudo4');
var conteudo_container = document.getElementById('conteudo-container');

var pagina = 1;
            
botao1.addEventListener('click',fica_1,false);
botao2.addEventListener('click',fica_2,false);
botao3.addEventListener('click',fica_3,false);
botao4.addEventListener('click',fica_4,false);

var gabarito;
var lista = [];
var ul_lista = document.getElementById('ul_lista');
var respostas = ["[ 'E', 'd', 'u' ]", "[ 'Edu' ]" ,'Edu',"[ 'E', 'd', 'u', 'a'  ]",'Nenhuma das respostas anteriores'];

window.onload = initPage;

function initPage(){
    fica_1();

  }

function fica_1() {
    pagina = 1;
    conteudo2.remove();
    conteudo3.remove();
    conteudo4.remove();
    botao3.classList.add("nao-clicado");
    botao3.classList.remove("clicado");
    botao2.classList.add("nao-clicado");
    botao2.classList.remove("clicado");
    botao4.classList.add("nao-clicado");
    botao4.classList.remove("clicado");
    botao1.classList.add("clicado");
    botao1.classList.remove("nao-clicado");
    conteudo_container.appendChild(conteudo1);
  }

function fica_2() {
    pagina = 2;
    conteudo1.remove();
    conteudo3.remove();
    conteudo4.remove();
    conteudo2.classList.add("aparecer");
    botao1.classList.add("nao-clicado");
    botao1.classList.remove("clicado");
    botao3.classList.add("nao-clicado");
    botao3.classList.remove("clicado");
    botao4.classList.add("nao-clicado");
    botao4.classList.remove("clicado");
    botao2.classList.add("clicado");
    botao2.classList.remove("nao-clicado");
    conteudo_container.appendChild(conteudo2);

  }
  function fica_3() {
    pagina = 3;
    conteudo1.remove();
    conteudo2.remove();
    conteudo4.remove();
    conteudo3.classList.add("aparecer");
    botao1.classList.add("nao-clicado");
    botao1.classList.remove("clicado");
    botao2.classList.add("nao-clicado");
    botao2.classList.remove("clicado");
    botao4.classList.add("nao-clicado");
    botao4.classList.remove("clicado");
    botao3.classList.add("clicado");
    botao3.classList.remove("nao-clicado");
    conteudo_container.appendChild(conteudo3);

  }

  function fica_4() {
    pagina = 4;
    conteudo1.remove();
    conteudo2.remove();
    conteudo3.remove();
    conteudo4.classList.add("aparecer");
    botao1.classList.add("nao-clicado");
    botao1.classList.remove("clicado");
    botao2.classList.add("nao-clicado");
    botao2.classList.remove("clicado");
    botao3.classList.add("nao-clicado");
    botao3.classList.remove("clicado");
    botao4.classList.add("clicado");
    botao4.classList.remove("nao-clicado");
    conteudo_container.appendChild(conteudo4);

    gabarito = embaralharLista(respostas);
    apagar_li(ul_lista); 
    inserir_li(gabarito);

  }

  botao_voltar.addEventListener('click',voltar,false);
  botao_continuar.addEventListener('click',continuar,false);

  function voltar(){
    switch (pagina){
      case 1:        
        break;
      case 2:
        fica_1();
        break;
      case 3:
        fica_2();
        break; 
      case 4:
        fica_3();
          break;   
  }
} 

function continuar(){
  switch (pagina){
    case 1:
      fica_2();      
      break;
    case 2:
      fica_3();
      break;
    case 3:
        fica_4();
        break;
    case 4:      
      break;    
}
} 

function inserir_li(gabarito){
  for(var i=0;i<gabarito.length;i++){
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(gabarito[i]));
    
    li.addEventListener('click',verificar_resposta,false);

    ul_lista.appendChild(li); 
    
}

}

function verificar_resposta(){
  if(this.innerHTML=="[ 'E', 'd', 'u' ]"){
    this.classList.add("resposta_certa");
  }else{
    this.classList.add("resposta_errada");
    sleep(800).then(() => {
      fica_4();
    })
    
  }
}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function apagar_li(ul){
  if (ul){
    while (ul.firstChild){
      ul.removeChild(ul.firstChild);
}}
}

function lista_li(){
  //varre os elementos da lista de resposta e insere os elementos no array
  for(var i = 1; i < 6; i++){
    var li = document.querySelector("li #n"+i);
    lista.push(li);
  }
  return lista;
}

function embaralharLista(listaVelha){
    var novaLista = [];
    while(novaLista.length < listaVelha.length){
      var i = Math.floor(Math.random() * listaVelha.length);
      if(novaLista.indexOf(listaVelha[i]) < 0){
        novaLista.push(listaVelha[i]);
      }
    }
   
  return novaLista;
}