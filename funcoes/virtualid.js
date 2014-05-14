
function aplicativo(app) {

document.getElementById('pop').style.display='block';

	document.getElementById("janela").innerHTML = '<IFRAME NAME="aplic" SRC="../aplicativos/'+app+'.htm" ALIGN="center" HEIGHT=300px WIDTH=500px SCROLLING="NO" FRAMEBORDER="0" allowtransparency="true"> </IFRAME>';


}


function apresentacao(apre) {

document.getElementById('pop').style.display='block';

	document.getElementById("janela").innerHTML = '<IFRAME NAME="aplic" SRC="../apresentacoes/'+apre+'.pdf" ALIGN="center" HEIGHT=300px WIDTH=500px SCROLLING="YES" FRAMEBORDER="0" allowtransparency="true"> </IFRAME>';


}


function decodifica() {

plataforma = navigator.userAgent;
teste_android = plataforma.search("Linux");
teste_iphone = plataforma.search("iPhone");

if(teste_android>-1){alert("Dispositivo Android detectado.");
	parent.aplic.location.href="zxing://scan/?ret="+escape('resultado_leitor.php?codigo={CODE}')+"&SCAN_FORMATS=UPC_A,EAN_13,QR_CODE,DATAMATRIX";
	} else {
		if(teste_iphone>-1){
			alert("Este sistema limita-se a leitura de QRCode em dispositivos Apple.");
			parent.aplic.location.href="zxing://scan/?ret="+escape('resultado_leitor.php?codigo={CODE}')+"&SCAN_FORMATS=UPC_A,EAN_13,QR_CODE,DATAMATRIX";
			} else {
			alert("Você não está utilizando um dispositivo móvel. Conecte um leitor de códigos 2D para prosseguir.");
			parent.aplic.location.href="../aplicativos/leitor.htm";
			}
		}

}


function gerador(botao) {

inicio = String.fromCharCode(29);
separador = String.fromCharCode(29);


conteudo = inicio+"01"+document.formulario.gtin.value+"10"+document.formulario.lote.value+separador+"21"+document.formulario.serial.value+separador+"17"+document.formulario.validade.value;

document.images[botao].src="http://datamatrix.kaywa.com/img.php?s=8&d="+conteudo;


}



function separa() {

n = document.formulario.ium.value;
separador = String.fromCharCode(29);
tamanho = n.length;
GTIN = "";
serial = "";
validade = "";
lote = "";

for (i=0;i<4;i++) {
	if (n.substring(0,1)==separador) {n = n.substring(1,n.length);}
	campo = n.substring(0,2);
	fim_de_campo = n.indexOf(separador);
	if(fim_de_campo<0){fim_de_campo = n.length;}
	switch(campo)
		{
		case "01":
		GTIN = n.substring(2,16);
		n = n.substring(16,n.length);
		break;
	case "21":
		serial = n.substring(2,fim_de_campo);
		n = n.substring(fim_de_campo,n.length);
		break;
	case "17":
		validade = n.substring(2,8);
		n = n.substring(8,n.length);
		break;
	case "10":
		lote = n.substring(2,fim_de_campo);
		n = n.substring(fim_de_campo,n.length);
		break;
	default:
		alert("Este não é um código válido!");i=10;
		break;
		}
}
document.getElementById("resultado").value = "GTIN: "+GTIN+"\n"+"Serial: "+serial+"\n"+"Lote: "+lote+"\n"+"Validade: "+validade;


}


function separa_celular(n) {

separador = String.fromCharCode(29);
tamanho = n.length;
GTIN = "";
serial = "";
validade = "";
lote = "";


for (i=0;i<4;i++) {
	if (n.substring(0,1)==separador) {n = n.substring(1,n.length);}
	campo = n.substring(0,2);
	fim_de_campo = n.indexOf(separador);
	if(fim_de_campo<0){fim_de_campo = n.length;}
	switch(campo)
		{
		case "01":
		GTIN = n.substring(2,16);
		n = n.substring(16,n.length);
		break;
	case "21":
		serial = n.substring(2,fim_de_campo);
		n = n.substring(fim_de_campo,n.length);
		break;
	case "17":
		validade = n.substring(2,8);
		n = n.substring(8,n.length);
		break;
	case "10":
		lote = n.substring(2,fim_de_campo);
		n = n.substring(fim_de_campo,n.length);
		break;
	default:
		alert("Este não é um código válido!");
		break;
		}
}
n = "GTIN: "+GTIN+"\n"+"Serial: "+serial+"\n"+"Lote: "+lote+"\n"+"Validade: "+validade;

alert(n);

}


function serializa() {

var now = new Date();
tempo = Date.parse(now)/1000;
tamanho_tempo = tempo.toString().length;
aleatorio = Math.random();
deslocamento = Math.pow(10,20-tamanho_tempo);
aleatorio = aleatorio.toFixed(20-tamanho_tempo);
aleat2 = Math.round(aleatorio*deslocamento);
tempo2 = tempo.toFixed(0);
serial = aleat2+tempo2;
return serial;
}


function gerador_ium() {

inicio = String.fromCharCode(29);
separador = String.fromCharCode(29);
conteudo = "";

for (i=0;i<document.formulario.serial.value;i++) {

	serial = serializa();
	conteudo = conteudo+inicio+"010"+document.formulario.gtin.value+"10"+document.formulario.lote.value+separador+"21"+serial+separador+"17"+document.formulario.validade.value+";\n";
}

fso  = new ActiveXObject("Scripting.FileSystemObject");

arquivo = "lista_IUM.txt";

saida = fso.OpenTextFile(arquivo, 2, true, 0); 

saida.WriteLine(conteudo);

saida.Close(); alert("Foi criado o arquivo LISTA_IUM na sua tela principal (Desktop) contendo "+document.formulario.serial.value+" códigos IUM prontos para impressão.");


}

function gerador_128() {

inicio = String.fromCharCode(29);
separador = String.fromCharCode(29);
conteudo = "";

serial = serializa();

conteudo = inicio+"00"+serial+separador+"01"+document.formulario.gtin.value+"10"+document.formulario.lote.value+separador+"17"+document.formulario.validade.value;
document.getElementById('codigo').src="http://www.abarcode.net/barcode.aspx?value="+conteudo;

document.getElementById('codigo2').src="http://www.bcgen.com/demo/IDAutomationStreamingDatabar.aspx?S=0&AI=1&D="+conteudo;
	
}