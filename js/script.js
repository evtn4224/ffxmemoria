/*
    Desenvolvedor: Everton Figueiredo - Evtn4224
    Github: https://github.com/evtn4224/ffxmemoria
    E-mail: everton4224@gmail.com
*/
// ===============================================
// RECEBE AS IMAGENS
var ffox = "imagens/ffox.png";
var ffoxos = "imagens/ffoxos.png";
var html5 = "imagens/html5.png";
var b2g = "imagens/b2g.png";
var dinohead = "imagens/dinohead.png";
var ffoxmobile1 = "imagens/ffoxmobile1.png";
var ffosmobile2 = "imagens/ffosmobile2.png";
var fox = "imagens/fox.png";
var fox2 = "imagens/fox2.png";
var maretplace = "imagens/marketplace.png";
var mdn = "imagens/mdn.png";
var redpanda = "imagens/redpanda.png";
// ===============================================

// ADICIONA AS IMAGENS AO ARRAY E OBTÉM UMA POSIÇÃO CADA
var array_img = [ffox,ffox,
				ffoxos,ffoxos,
				html5,html5,
				b2g,b2g,
				dinohead,dinohead,
				ffoxmobile1,ffoxmobile1,
				ffosmobile2,ffosmobile2,
				fox,fox,
				fox2,fox2,
				maretplace,maretplace,
				mdn,mdn,
				redpanda,redpanda];
// DEFINE AS VARIÁVEIS PARA O JOGO
var valor_memoria = [];
var id_memoria = [];
var telas_flipped = 0;
var wow = new Audio("audio/notifier_spring.ogg");
wow.volume = 0.2;
var fail = new Audio("audio/notifier_ring.ogg");
fail.volume = 0.2;
var ring = new Audio("audio/ring.ogg");
var contaErros = 0;
var contaTempo = 1;
var st = null;
var val1 = "";
var val2 = "";
var divTempo = document.getElementById('dvtempo');
var tempoContado = '';
var acertou = document.getElementById('acertou');
var vetId = [];
var img = document.createElement('img');
var telaApres = document.getElementById('telapres');
var habilSom = true;
// ===============================================

// TELA DE APRESENTAÇÃO
function telaApresentação()
{
	telaApres.style.display = "none";
	document.querySelector('#index').className = 'current';
	document.querySelector('[data-position="current"]').className = 'left';
}
setTimeout(telaApresentação, 5000);
// ===============================================

// FUNÇÃO QUE ADICIONA POSIÇÕES ALEATÓRIA PARA AS IMAGENS DO VETOR
Array.prototype.memory_tela_shuffle = function()
{
	var i = this.length, j, temp;
	while(--i > 0)
	{
		j = Math.floor(Math.random() * (i+1));
		temp = this[j];
		this[j] = this[i];
		this[i] = temp;
	}
}
// ===============================================

// HABILITA O SOM
function fhabilSom(hab)
{
    habilSom = hab;
    //console.log("habilSom: "+habilSom);
}
// ===============================================

// INICIA O JOGO
function iniciaJogo()
{
	contaErros = 0;
	contaTempo = 1;
	telas_flipped = 0;
	var telas = '';
	
    	// RECEBE AS IMAGENS DO VETOR ALEATORIAMENTE
	array_img.memory_tela_shuffle();
	
    	// ADICIONA O ID DIV E A AS IMAGENS
	for(var i = 0; i < array_img.length; i++)
	{
        // ADICIONA O ID, CHAMA A FUNÇÃO AO CLICAR E PASSA A IMAGEM E A POSIÇÃO POR PARÂMETRO
		telas += '<div id="tela_'+i+'" onclick="toqueNaImagem(this,\''+array_img[i]+'\','+i+')"></div>';
	}
	
    	// ADICIONA TODAS AS DIVS COM IMAGENS NA DIV placar
	document.getElementById('placar').innerHTML = telas;
    
    	// CHAMA A FUNÇÃO PARA CONTAR O TEMPOS DO JOGO
	divTempo.style.display = "block";
    	contador();
}
// ===============================================

// CONVERTE O TEMPO EM MILESSEGUNDO EM HORA : MINUTO : SEGUNDOS
function converteTempo(sec)
{
	var tempos = new Array(3600, 60, 1);
	var tempo = '';
	var tmp;
	
	for(var i = 0; i < tempos.length; i++)
	{
		tmp = Math.floor(sec / tempos[i]);
		if(tmp < 1)
		{
			tmp = '00';
		}
		else if(tmp < 10)
		{
			tmp = '0'+tmp;
		}
		tempo += tmp;
		if(i < 2)
		{
			tempo += ":";
		}
		sec = sec % tempos[i];
	}
	tempoContado = tempo;
}
// ===============================================

// IRÁ RETORNAR O TEMPO EM TEMPO REAL
function tempoAtual()
{
    return tempoContado;
}
// ===============================================

// CONTA O TEMPO DO JOGO A CADA 1 MILISSEGUNDO
function contador()
{
	contaTempo++;
	st = setTimeout("contador()", 1000);
	//console.log("contaTempo: "+contaTempo);
	converteTempo(contaTempo);
	divTempo.innerHTML = "Tempo: "+tempoAtual();
}
// ===============================================

// PARA O CONTADOR
function paraContador()
{
	return clearTimeout(st);
}
// ===============================================

// ABRE UM ALERTA DE CONFIRMAÇÃO PARA FECHA A APLICAÇÃO OU NÃO
function fecharApp()
{
	if (confirm('Fecha a aplicação?'))
	{
		window.close();
	}
	else
	{
		iniciaJogo();
	}
}
// ===============================================

// FUNÇÃO DO CLIQUE NA IMAGEM
function toqueNaImagem(tela, val, id)
{
	//console.log("tela: "+tela+" - val: "+val+" - id: "+id);
    
    	// VERIFICA SE A TELA ESTÁ VAZIA E O TAMANHO DO VALOR DA MEMÓRIA É MENOR QUE 2
	if(tela.innerHTML == "" && valor_memoria.length < 2)
	{
		//tela.style.background = '#FFF';
		//tela.innerHTML = val;
		tela.style.transform = "rotateY(180deg)";         // ROTACIONA A IMAGEM EM 180º
        	tela.style.background = "url("+val+") center center no-repeat "; // ADICONA A IMAGEM AO CLIQUE
        
        	// ADICIONA A PRIMEIRA IMAGEM CLICADA NA DIV
		if(valor_memoria.length == 0)
		{
			valor_memoria.push(val);     // ADICIONA O VALOR DA MEMÓRIA
			id_memoria.push(tela.id);    // ADICIONA A POSIÇÃO DA IMAGEM
			
			// TROCA A POSIÇÃO DA IMAGEM NA MATRIZ
			val1 = id;
			val2 = val1;
			val1 = "";
			//console.log("val2: "+val2);
            
            		vetId[0] = tela.id; // RECEBE O PRIMEIRO ID CLICADO E ARMAZENDA NO VETOR
            
		}
		else if(valor_memoria.length == 1)    // ADICIONA A SEGUNDA IMAGEM CLICADA NA DIV
		{
            		// ADICIONA NOVAMENTE O VALOR DA SEGUNDA IMAGEM
			valor_memoria.push(val);
			id_memoria.push(tela.id);
			val1 = id;
			
            		vetId[1] = tela.id; // RECEBE O SEGUNDO ID CLICADO E ARMAZENDA NO VETOR        
	            
			//console.log("vetId[0]: "+vetId[0]+" / vetId[1]: "+vetId[1]);
			
			//console.log("val1: "+val1+" - val2: "+val2);
				// VERIFICA SE O CONTEUDO SÃO IGUAIS E NÃO É O MESMO
			// Exp: valor_memoria[0]: imagens/redpanda.png -> IMAGEM
			// Exp: val1: 6 -> POSIÇÃO NO VETOR INICIADA POR ZERO
			if(valor_memoria[0] == valor_memoria[1] && val1 != val2)
			{
                		//console.log("valor_memoria[0]: "+valor_memoria[0]+" / valor_memoria[1]: "+valor_memoria[1]+" / val1: "+val1+" / val1: "+val2);
		                
		                if(habilSom == true) wow.play(); // EMITE O SOM DE ACERTO E CONTA OS ACERTOS
		                
		                // EXIBE A IMAGEM EM FADE E SOME EM SEGUIDA QUANDO ENCONTRADO AS FIGURAS
		                $('#acertou').fadeIn(1000);
		                acertou.style.display = "block";
		                img.setAttribute("src",val);
		                img.setAttribute("width","100%");
		                img.setAttribute("height","100%");
		                acertou.appendChild(img);
		                $('#acertou').fadeOut(1000);
		                
		                // REMOVE A CHAMADA DO EVENTO DO CLICK PARA NÃO SER CLICADO QUANDO ENCONTRADO AS FIGURAS IGUAIS
		                var tl1 = document.getElementById(vetId[0]);
		                tl1.removeAttribute('onclick');
		                var tl2 = document.getElementById(vetId[1]);
		                tl2.removeAttribute('onclick');
		                
		                // LIMPA OS VETORES COM OS IDS GUARDADOS
		                vetId = [];
		                
		                // REMOVE A IMAGEM COM O INTERVALO DE 1100 MILISSEGUNDOS
		                function fechaImg()
		                {    
		                    acertou.style.display = "none";
		                    acertou.removeChild(img);  
		                }
		                setTimeout(fechaImg, 1000);
		
		                // ZERA OS VALORES DAS POSIÇOES
				val1 = "";
				val2 = "";
						
		                // ADICIONA O ID DA IMAGEM
		                var tela_op1 = document.getElementById(id_memoria[0]);
				var tela_op2 = document.getElementById(id_memoria[1]);
		                
		                // DEIXA A IMAGEM COM TRANSPARÊNCIA DE 0.3
		                tela_op1.style.opacity = "0.3";
		                tela_op2.style.opacity = "0.3";
		                
		                telas_flipped += 2; // CONTA OS CLICLES ACERTADOS PARA COMPARAR COM O TAMANHO DO VETOR DE IMAGENS
						
		                //console.log("telas_flipped: "+telas_flipped);
		                
		                // LIMA OS VETORES DE LAVOR E ID
				valor_memoria = [];
				id_memoria = [];
				
        			 // VERIFICA OS ACERTOS É IGUAL AO TAMANHO DE IMAGENS DO VETOR PARA FINALIZAR O JOGO
				if(telas_flipped == array_img.length)
				{
                    			//console.log("acabou! => "+converteTempo(contaTempo));
					paraContador();
                    
                    
					divTempo.style.display = "none";                    // ESCONDE O DISPLAY DE TEMPO
					document.getElementById('placar').innerHTML = "";  // LIMPA A DIV COM AS IMAGENS
							
					addPontos(contaTempo, contaErros); // ADICIONA NA FUNÇÃO QUE CONTA O TEMPO E OS ERRORS
					
					listaPontos();
				}
			}
			else // SENÃO RETORNA A TELA INICIAL
			{
                		// POSICIONA AS IMAGENS ANTERIORES NUM INTERVALO DE 1 MILESSEGUNDO
				function flip2Back()
				{
                    			// RECEBE A DIV DAS IMAGENS COM O ID
					var tela_1 = document.getElementById(id_memoria[0]);
					var tela_2 = document.getElementById(id_memoria[1]);
					
					// ROTACIONA A IMAGEM INICIAL
					tela_1.style.transform = "rotateY(0)";
					tela_2.style.transform = "rotateY(0)";
					
					// ADICIONA AS IMAGENS INICIAIS
					tela_1.style.background = 'url(imagens/firefox.png) center center no-repeat';
					tela_1.innerHTML = "";
					tela_2.style.background = 'url(imagens/firefox.png) center center no-repeat';
					tela_2.innerHTML = "";
					
                			// ZERA OS VETORES
					valor_memoria = [];
					id_memoria = [];
				}
				setTimeout(flip2Back, 1000); // CHAMA A FUNÇÃO NUM INTERVALO DE 1 MILISSEGUNDO
				
                		// ZERA OS VALORES DAS POSIÇOES
				val1 = "";
				val2 = "";
				
				// TOCA UM SOM PARA CADA ERRO E CONTA
				if(habilSom == true) fail.play();
						
				if(contaErros == 0) contaErros = 1; // VERIFICA SE OCORREU O PRIMEIRO ERRO PARA COMEÇAR A CONTAR
				
				contaErros++; // INCREMENTA OS ERROS
			}
		}
	}
}
// ===============================================

// RETORNARÁ O VALOR MAIOR E MENOR LIDO
function lerValorMaMe(valMa, posValMa, valMe, posValMe)
{
    //console.log("valMa: "+valMa+" / "+" posValMa: "+posValMa+" / valMe: "+valMe+" / posValMe: "+posValMe);
    // ADICIONA A COR VERMELHA A FONTE COM MAIOR TEMPO
    // MAIOR
    document.getElementById('pos_'+posValMa).style.color = "#dd0000";
    document.getElementById('pos_'+posValMa).style.fontWeight = "bold";
    // MENOR
    document.getElementById('pos_'+posValMe).style.color = "#0088cc";
    document.getElementById('pos_'+posValMe).style.fontWeight = "bold";
}
// ===============================================
