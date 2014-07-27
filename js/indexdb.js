/*
    Desenvolvedor: Everton Figueiredo - Evtn4224
    Github: https://github.com/evtn4224/ffxmemoria
    E-mail: everton4224@gmail.com
*/

// FONTE DO indexedDB: 
// http://rominirani.com/2013/08/15/firefox-os-tutorial-episode-7-storage-using-indexeddb/

var db;
var versaodb = 1;
var chek = false;

// INICIA O BANCO OU CRIA
function inicializeDB()
{
	// VERIFICA SE EXISTE SUPORTE PARA O TIPO DE BANCO indexedDB
    if(window.indexedDB)
    {
        //console.log("IndexedDB suport is there");
    }
    else
    {
        alert("Indexed DB is not suported.\nWhere are you trying to run this ? ");
    }
    
    // CRIA E ABRE O BANCO COM O NOME pontosdb e a versão 2
    var request = indexedDB.open('pontosdb', versaodb);
    
    // A VARIÁVEL db RECEBE AS PROPRIEDADES DO BANCO
    request.onsuccess = function(e)
	{
        db = e.target.result;
    };
    
    // SENÃO EXIBE UM LOG COM O ERRO NO CONSOLE DO NAVEGADOR
    request.onerror = function(e)
	{
        console.log("Erro ao criar banco: " + e);
    };
    
    // VERIFICA A ATUALIZAÇÃO DO BANCO
    request.onupgradeneeded = function(e)
	{
        db = e.target.result;
        
        // VERIFICA O NOME DO OBJETO DO BANCO
        if(db.objectStoreNames.contains("pontos"))
        {
            db.deleteObjectStore("pontos");
        }
        
        // CRIA O OBJETO E OS SEUS CAMPOS
        var objectStore = db.createObjectStore('pontos', { keyPath: 'id', autoIncrement: true });
        
        //console.log("Banco store criado!");
    };
}
// PEGA DATA DO SISTEMA E RETORNA
var getData = function()
{
    var data = new Date();
    var d = data.getDate();
    var m = data.getMonth();
    var y = data.getFullYear();

    return d+"."+m+"."+y;
}

// LÊ OS DADOS DO BANCO
function lerPontos()
{
	var valMenor = 1000, valCorrente = 0, valMaior = 0, cont = 0;
	var idValMa = '', idValMe = '';

    // LIMPA A LISTA
     $("#list-pontos").html("");
    
    // OBTÉM OS CAMPOS DO OBJETO
	var transaction = db.transaction(['pontos']);
	var store = transaction.objectStore('pontos');
        
	// ABRE O OBJETO PARA LER O CONTEÚDO
	store.openCursor().onsuccess = function(e)
	{
        // PONTEIRO QUE LÊ OS VALORES DO OBJETO
		var cursor = e.target.result;
		
        // SE O PONTEIRO ENCONTRAR VALORES, ADICIONA OS OBJETOS NA DIV
		if(cursor)
		{
            // PARA INICIAR O CONTADOR IGUAL A POSIÇÃO DO ARRAY
            if(chek == false)
            {
                chek = true;
                cont = 1;
            }
            // PEGA O VALOR DO OBJETO
			var value = cursor.value;

            // CONVERTE O TEMPO PARA VISUALIZAR EM MODO HORAS, MINUTO E SEGUNDOS
            converteTempo(value.tempo);
            
            // CRIA UM ELEMENTO li E ADICIONA OS VALORES DO OBJETO DENTRO
              var noteElement = $("<li id='pos_"+cont+"' data-role='collapsible' data-mini='true'/>").text("Tempo: "+tempoAtual()+" - Erros: "+value.erros); 
        
            // ADICIONA OS ELEMENTOS NA LISTA
            $("#list-pontos").append(noteElement);
            
            // RECEBE O MENOR E O MAIOR E SUAS POSIÇÕES GUARDADO NO VETOR PARA INFORMAR
            valCorrente = value.tempo;
            //console.log("valcorrente: "+valcorrente);
            if(valMenor > valCorrente){ valMenor = valCorrente; idValMe = cont; }
            if(valMaior < valCorrente){ valMaior = valCorrente; idValMa = cont; }
            
            cont++;
            // PASSA PARA O PRÓXIMO ELEMENTO
			cursor.continue();
            
            // RETORNARÁ OS ELEMENTOS COM VALORES
            return;
            
            //console.log("erros: "+value.erros);
        }
        
		// IDENTIFICA O MAIOR E O MENOR COM COR DA FONTE
        lerValorMaMe(valMaior, idValMa, valMenor, idValMe);
        //console.log("valMenor: "+valMenor+" pos: "+idValMe+" / valMaior: "+valMaior+" pos: "+idValMa);
        
        // ATUALIZA A LISTA
		$('li[data-role=collapsible]').collapsible({refresh:true});

	};
}

// ADICIONA O TEMPO E OS ERROS NO OBJETO DO BANCO
function addPontos(tmp, erros)
{
	//noteData = getData();
    
	//console.log("Tempo: "+tmp+" - Erros: "+erros);

    // RECEBE A PROPRIEDADE PARA ESCREVER NO OBJETO DO BANCO
	var transaction = db.transaction(['pontos'], 'readwrite');
	
	// CRIA UM VETOR E NOMEIA CADA CAMPO QUE RECEBE OS VALORES PASSADO POR PARÂMETRO
	var value = {};
	value.tempo = tmp;
	value.erros = erros;

	// RECEBE O CAMPO pontos E ADICIONA OS VALORES NELE
	var store = transaction.objectStore('pontos');
	var request = store.add(value);
	
	// RETORNA SE A INCLUSÃO FOI FEITA COM SUCESSO
	request.onsuccess = function(e)
	{
		//console.log("Notas salva com sucesso!");
	};
	// RETORNARÁ UM LOG DE ERRO SE HOUVER ALGÚM ERRO
	request.onerror = function(e)
	{
		console.log("Erro ao salvar notas!\nMotivo: " + e.value);
	};
    
    // FUNÇÃO QUE LÊ OS VALORES DA LISTA
    lerPontos();
}
// LIMPA O HISTORICO DE PONTOS
function limpaDados()
{
    var transaction = db.transaction(['pontos'], 'readwrite');
    var store = transaction.objectStore('pontos');
    var request = store.clear();
    
    // OK
    request.onsuccess = function(e)
    {
        alert("Hist&oacute;rico limpo com sucesso!");
    };
    // ERROR
    request.onerror = function(e)
    {
        console.log("Error ao limpar os dados gravados: "+e);
    };
    
    lerPontos();
}