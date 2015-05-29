$(document).ready(function() {
    registrar_eventos();
	recuperar_campos();
	$('#acerca_de').click(mostar_acerca);
	$('#acer-close').click(ocultar_acerca);
});

/*<variables>*/
var d=0,
ch=0,
cs=0,
co=0,
q=0,
s=0,
qs=0;
/*</variables>*/

/*<campos>*/
var txt_d,
txt_co,
txt_cs,
txt_ch,
txt_q,
txt_s,
txt_qs;
var cmps=[]; //array que contendra todos los campos
/*</campos>*/


/**Registro de eventos en los botones*/
function registrar_eventos(){
	$("#btn_calcular").bind("click", realizar_calculos);
	$("#btn_limpiar").bind("click",limpiar_campos);
}

/**Recupera la referencia de los campos y los
guarda en variables*/
function recuperar_campos(){
	txt_d=$("#d");
	txt_co=$("#co");
	txt_cs=$("#cs");
	txt_ch=$("#ch");
	txt_q=$("#q");
	txt_s=$("#s");
	txt_qs=$("#qs");
	$("#frm").find("input").each(function(index, element) {
		cmps.push($(element));
    });
}

/**Realiza una validacion basica de los datos
ingresados en los campos*/
function validar_campos(){
	var listo=true;
	for (var i=0; i<cmps.length; i++){
		if (Number(cmps[i].val())){
			cmps[i].removeClass("no-number");
		} else {
			cmps[i].addClass("no-number");
			listo=false;
		}
	}
	return listo
}

/**Vacia todos los campos*/
function limpiar_campos(){
	txt_d.val("");
	txt_co.val("");
	txt_cs.val("");
	txt_ch.val("");
	txt_q.val("");
	txt_s.val("");
	txt_qs.val("");
}

/**Realiza llamadas a las funciones encargadas de
calcular los resultados y muestra los resultados en 
los campos correspondientes*/
function realizar_calculos(){
	if(validar_campos()){
		d= parseFloat(txt_d.val());
		ch= parseFloat(txt_ch.val());
		cs= parseFloat(txt_cs.val());
		co= parseFloat(txt_co.val());
		
		var valor = calcular_q().toFixed(3); //tres decimales
		txt_q.val(valor.replace(".",",")); // coma en vez de punto
		
		valor = calcular_s().toFixed(3);
		txt_s.val(valor.replace(".",","));
		
		valor = calcular_qs().toFixed(3);
		txt_qs.val(valor.replace(".",","));
	} else {
		alert("Por favor llene los campos correctamente para continuar");
	}
}

/**Funcion encargada de realizar el calculo de Q* */
function calcular_q(){
	q = (Math.sqrt(((2*d*co)/(ch)))) * (Math.sqrt(((ch+cs)/cs)));
	return q;
}

/**Funcion encargada de realizar el calculo de S* */
function calcular_s(){
	s = (ch/(Math.sqrt((cs*(ch+cs))))) * (Math.sqrt(((2*d*co)/(ch))));
	return s;
}

/**Funcion encargada de realizar el calculo de (Q*-S*) */
function calcular_qs(){
	qs = q - s;
	return qs;
}
function mostar_acerca(){
	$("#calc-content, #resu-content, #ref-content").hide('slow');
	$("#acerca-content").show('slow');
}
function ocultar_acerca(){
	$("#acerca-content").hide('slow');
	$("#calc-content, #resu-content, #ref-content").show('slow');
}