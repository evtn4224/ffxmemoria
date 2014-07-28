/*
    Desenvolvedor: Everton Figueiredo - Evtn4224
    Github: https://github.com/evtn4224/ffxmemoria
    E-mail: everton4224@gmail.com
*/
// INICIA O JOGO AO CLICAR NA IMAGEM DO FIREFOX
function telaJogo()
{
	document.querySelector('#quadros').className = 'current';
	document.querySelector('[data-position="current"]').className = 'left';
	inicializeDB();
    	iniciaJogo();
}
// ---------------------------------------------------------------------------
// RETORNARÁ A TELA DE APRESENTAÇÃO DO JOGO
document.querySelector('#btn-lists-back').addEventListener('click', function()
{
    	telaInicial();
});
function telaInicial()
{
	document.querySelector('#quadros').className = 'right';
	document.querySelector('[data-position="current"]').className = 'current';
    	paraContador();
}
// ---------------------------------------------------------------------------
// ABRE A TELA DE LISTA DE RESULTADO
function listaPontos()
{
    	document.querySelector('#lists').className = 'current';
	document.querySelector('[data-position="current"]').className = 'left';
}
document.querySelector('#btn-pontos').addEventListener('click', function()
{
    	document.querySelector('#lists').className = 'right';
	document.querySelector('[data-position="current"]').className = 'current';
    	telaInicial();
});
// ---------------------------------------------------------------------------
// LIMPA OS DADOS GRAVADOS NO BANCO
document.querySelector('#limparDado').addEventListener('click', function () 
{
	if (confirm('Deseja realmente apagar todos os dados?'))
	{
        	limpaDados();
	}
});
// BOTÕES DA TELA DE ÍNICIO
// ÍNICIO
document.querySelector('#inicio').addEventListener('click', function () 
{
    	telaJogo();
});
// SOM
document.querySelector('#pontos').addEventListener('click', function () 
{
	listaPontos();
	lerPontos();
});
// SAIR
document.querySelector('#sair').addEventListener('click', function () 
{
	fecharApp();
});
// PAUSA O SOM E A MÚSICA
var btnon = document.getElementById("somon");
var btnoff = document.getElementById("somoff");
document.querySelector('#somon').addEventListener('click', function () 
{
	btnoff.style.display = "block";
	btnon.style.display = "none";
	wow.pause();
	fail.pause();
});
document.querySelector('#somoff').addEventListener('click', function () 
{
	btnon.style.display = "block";
	btnoff.style.display = "none";
	wow.play();
	fail.play();
});
