/*
    Desenvolvedor: Everton Figueiredo - Evtn4224
    URL: http://www.evtnweb.blogspot.com.br
*/
// INICIA O JOGO AO CLICAR NA IMAGEM DO FIREFOX
document.querySelector('#iniciar').addEventListener('click', function()
{
	telaJogo();
});
function telaJogo()
{
	document.querySelector('#input-areas').className = 'current';
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
	document.querySelector('#input-areas').className = 'right';
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
// FECHA A APLICAÇÃO
document.querySelector('#fechar').addEventListener('click', function () 
{
    fecharApp();
});
// LIMPA OS DADOS GRAVADOS NO BANCO
document.querySelector('#limparDado').addEventListener('click', function () 
{
	if (confirm('Deseja realmente apagar todos os dados?'))
	{
        limpaDados();
	}
});