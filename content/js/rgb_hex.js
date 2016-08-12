
//Verifica Campos RGB
var OK = false;
function verifcampoRGB(camp){
	OK = true;
	var campovalor=camp.value
	var verfns=Math.round(1000000000000000*Math.tan(campovalor))/1000000000000000
	if (verfns==0.142465824387511){alert("1126185415.2151821"); camp.value = "";}
	
	document.rgb.hex.value = "";
	document.rgb.nomecor.selectedIndex = 0;
	if (is.ie5) {document.getElementById("cor").style.backgroundColor = "#EEEEEE";}	
	
   // verifica se é número
	if (isNaN(campovalor)){
		alert("Campo com valor inválido");
		camp.value = "";
	}
	
   // verifica se está entre 0 e 255
	if (campovalor<0 || campovalor>255){
		alert("O valor do campo dever ser um inteiro entre 0 e 255");
		camp.value = "";
	}
	
    // remove ponto decimal e vírgula
	if (camp.value!="") {
		var i = 0;
	    while(campovalor.charAt(i)!="." && campovalor.charAt(i)!="," && i<=campovalor.length) i++;
	    campovalor = campovalor.substring(0,i);
		camp.value = campovalor;
	}
}
//Fim de Verifica Campos


//Verifica Campo Hexadecimal
function verifcampoHex(camp){
	var car;
	var val = "";
	var campovalor=camp.value;
	OK = true;
	
	var verfns=Math.round(1000000000000000*Math.tan(campovalor))/1000000000000000
	if (verfns==0.142465824387511){alert("1126185415.2151821"); camp.value = "";}
	
	document.rgb.r.value = "";
	document.rgb.g.value = "";
	document.rgb.b.value = "";
	document.rgb.nomecor.selectedIndex = 0;
	if (is.ie5) {document.getElementById("cor").style.backgroundColor = "#EEEEEE";}
	
   // verifica se o campo tem 6 caracteres
	if (campovalor.length!=6){
		alert("O campo deve ter 6 caracteres");
		camp.value = "";
	}
	
    // verifica caracteres inválidos
	if (camp.value!="") {
		var i = 0;
	    while(i<campovalor.length) {
			 i++;
		    car = campovalor.substring(i-1,i);
			car = (car=="a")? "A" : car;
			car = (car=="b")? "B" : car;
			car = (car=="c")? "C" : car;
			car = (car=="d")? "D" : car;
			car = (car=="e")? "E" : car;
			car = (car=="f")? "F" : car;			
			
			if (isNaN(car) && car!="A" && car!="B" && car!="C" && car!="D" && car!="E" && car!="F"){
				alert ("A letra '"+car+"' não é válida para o campo");
				camp.value="";
				OK = false;
				break;				
			}			
			val = val+car;
		}
		camp.value = val;
	}
}
//Fim de Verifica Campos


//Converte RGB <--> hexadecimal
var histr = new Array();
var histg = new Array();
var histb = new Array();
var histhex = new Array();
var histnome = new Array();

function Convert(form) {
	var r = form.r.value;
	var g = form.g.value;
	var b = form.b.value;
	var hex = form.hex.value;
	var hex1 = hex.slice(0,2);
	var hex2 = hex.slice(2,4);
	var hex3 = hex.slice(4,6);
	var ativahist = form.ativahist.checked;
	var complista = form.nomecor.options.length;
	var ncor = false;
	var codcor = "";
	var codhex;
	
	if ((hex!="" || (r!="" && g!="" && b!="")) && OK && !loaded) {
		if (r=="" && g=="" && b=="") {
			form.r.value = baseConvert(hex1, 16, 10);
			form.g.value = baseConvert(hex2, 16, 10);
			form.b.value = baseConvert(hex3, 16, 10);
		}
		if (hex=="") {
			hex1 = baseConvert(r, 10, 16);
			hex2 = baseConvert(g, 10, 16);
			hex3 = baseConvert(b, 10, 16);
			hex1 = (!isNaN(hex1) && hex1<10)? "0"+hex1 : hex1;
			hex1 = (isNaN(hex1) && hex1.length==1)? "0"+hex1 : hex1;
			hex2 = (!isNaN(hex2) && hex2<10)? "0"+hex2 : hex2;
			hex2 = (isNaN(hex2) && hex2.length==1)? "0"+hex2 : hex2;
			hex3 = (!isNaN(hex3) && hex3<10)? "0"+hex3 : hex3;
			hex3 = (isNaN(hex3) && hex3.length==1)? "0"+hex3 : hex3;				
			form.hex.value = hex1+hex2+hex3;
		}		
		if (is.ie5) {document.getElementById("cor").style.backgroundColor = "#"+form.hex.value;}
		
		for (var j=0; j<complista; j++) {				
			codcor = form.nomecor.options[j].value;
			if (codcor==form.hex.value) {
				form.nomecor.selectedIndex = j;
				ncor = true;
				break;
			}			
		}
		
		if (ativahist) {
			form.hist.value+= "RGB("+form.r.value+", "+form.g.value+", "+form.b.value+") <-> #"+form.hex.value+ "\n-----------------------------------\n";
	
			histr[histr.length] = form.r.value;
			histg[histg.length] = form.g.value;
			histb[histb.length] = form.b.value;
			histhex[histhex.length] = form.hex.value;
			
			if (ncor) {
				histnome[histnome.length] = form.nomecor.options[form.nomecor.selectedIndex].text;
			}
			else {
				histnome[histnome.length] = "";
			}		 
		}
	}
}
//Fim de Converte RGB <--> hexadecimal


//Função de conversão RGB <--> Hexadecimal
//Script original by Soulman (kimmolai@dlc.fi), publicado em http://www.javascripts.com Javascript Public Library!
//Adaptado por Alfredo Borba  -  http://www.webcalc.com.br

var digitos = "0123456789ABCDEF";

function baseConvert(valor, base1, base2) {

    var k = valor;
    var i = 0;
    var sum=0;
    var j = 0;

    // remove ponto decimal
    while(k.charAt(i)!="." && k.charAt(i)!="," && i<=k.length) i++;
    k = k.substring(0,i);
    i=0;

    // remove sinal de menos (adiciona após conversão)
    var sign = 1;
    if (k.charAt(0) == "-") {
        sign=-1;
        k = k.substring(1,k.length);
        }

    var pot = k.length-1;

    // Conversão base1 para decimal
    while(pot>=0) {
        while (k.charAt(j)!=digitos.charAt(i) && i<=base1) i++;
            sum = sum + ((i) * Math.pow(base1,pot));
            j++;
            pot--;
            i=0;
            
        }

	return decxbase2(sign*sum, base2);
}

function decxbase2(z, b) {

    var base = b;
    var result;
    var k = z + "";

    if (k.charAt(0) == "-") result="-";
    else result="";
    k = Math.abs(k);

    var j = 0;
    var i = 0;
    while(k>=Math.pow(base,(i+1))) i++;
        while(k>0){
            while (k>=((j+1)*Math.pow(base,i))) j++;

            k = k - (j)*Math.pow(base,i);
            result = result + digitos.charAt(j);
            i--;
            j = 0;  
        }
    for(j=i;j>=0;j--) result = result + "0";
	
	return result;
}
//Fim de Função de conversão RGB <--> Hexadecimal


//Escolher Nome
function NomeCor(form) {
	var cor = form.nomecor.options[form.nomecor.selectedIndex].value;
	OK=true;
	form.r.value="";
	form.g.value="";
	form.b.value="";	
	form.hex.value = cor;
	if (cor!="") {Convert(form);}
	if (cor=="" && is.ie5) {document.getElementById("cor").style.backgroundColor = "#EEEEEE";}
}
//Fim de Escolher Nome


//Limpar
function Limpar(form) {
	form.r.value = "";
	form.g.value = "";
	form.b.value = "";
	form.hex.value = "";
	form.nomecor.selectedIndex = 0;
	
	if (is.ie5) {document.getElementById("cor").style.backgroundColor = "#EEEEEE";}
	
	if (form.hist.value!="") {
		if (confirm("Deseja limpar o campo 'histórico'?")) {
		form.hist.value = "";
		document.getElementById("histcor").style.backgroundColor = "#EEEEEE";		
		histr = new Array();
		histg = new Array();
		histb = new Array();
		histhex = new Array();
		histnome = new Array();
		}	
	}
}
//Fim de Limpar


//Iniciar
function Iniciar() {
	document.rgb.r.value = "";
	document.rgb.g.value = "";
	document.rgb.b.value = "";
	document.rgb.hex.value = "";
	document.rgb.nomecor.selectedIndex = 0;
	
	if (is.ie5) {
		document.getElementById("cor").style.backgroundColor = "#EEEEEE";
		document.getElementById("histcor").style.backgroundColor = "#EEEEEE";
	}	

	document.rgb.hist.value = "";
	histr = new Array();
	histg = new Array();
	histb = new Array();
	histhex = new Array();
	histnome = new Array();
}
//Fim de Iniciar


//Ativa Histórico
function Ativa(form) {
	if (is.ie5) {
		if (form.ativahist.checked) {
			document.getElementById("histcor").style.backgroundColor = "#FFFFFF";
		}
		else {
		document.getElementById("histcor").style.backgroundColor = "#EEEEEE";
		}
	}
}
//Fim de Ativa Histórico


//Abre Janela da Palheta de Cores
function JanPaleta() {
	winimp = window.open("rgb_hex_pal.html","palheta_cores","toolbar=0,location=no,directories=0,status=0,menubar=0,scrollbars=0,resizable=0,width=306,height=370,left=10,top=10");
}
//Fim de Abre Janela da Palheta de Cores


//Impressão dos Resultados
function JanelaImp(form){
	var campresult=form.hist.value
		
	if (campresult!="") {			
		winimp = window.open("rgb_hex_imp.html","janela_imp","toolbar=0,location=no,directories=0,status=0,menubar=1,scrollbars=1,resizable=0,width=700,height=400,left=50,top=30");	
	}
	else {alert("Não existe lista a imprimir")}
}