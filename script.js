var a;
var b; 
var a2;
var discrepancia;
var errora;
var errorb;
var lista = []
var cuerpo=document.getElementById("tBody");
var cuerpo2=document.getElementById("tBody2");
var formulaa = document.getElementById("formula"); 
function verificar()
{	
	let radioButTrat;
	radioButTrat = document.getElementById("nolineal");
		if (radioButTrat.checked == true)
		{ 
			return true;
		}
		else
		{
			return false;	
		}
}
function registrarDatos(){

   	var x = document.getElementById("numero1").value;
	var y = document.getElementById("numero2").value;
		if(x==='' || y==='')
		{
			alert("Campos vacios");
		}
		else
		{	
			document.getElementById("numero1").value = ""; 
			document.getElementById("numero2").value = "";
 	
 				if (verificar() == true) 
				{  
					if(x>0 && y>0)
						{	
							var oper = {x: Math.log(x), y: Math.log(y), xy: Math.log(x)*Math.log(y),
							x2: Math.pow(Math.log(x),2),y2: Math.pow(Math.log(y),2)};
						}
					else
					{
						if(x<=0 && y<=0)
						{
							var oper = {x: Math.log(Math.abs(x))*-1, y:Math.log(Math.abs(y))*-1, 
							xy: Math.log(Math.abs(x))*-1*Math.log(Math.abs(y))*-1, 
							x2: Math.pow(Math.log(Math.abs(x))*-1,2),y2: Math.pow(Math.log(Math.abs(y))*-1,2)};		
						}
						else
						{
							if(x<1)
							{
								var oper = {x: Math.log(Math.abs(x))*-1, y: Math.log(y), 
								xy: Math.log(Math.abs(x))*-1*Math.log(y),
								 x2: Math.pow(Math.log(Math.abs(x))*-1,2),y2: Math.pow(Math.log(y),2)};	
					 
							}
							else
							{
								var oper = {x: Math.log(x), y: Math.log(Math.abs(y))*-1, 
								xy: Math.log(x)*Math.log(Math.abs(y))*-1,
					 			x2: Math.pow(Math.log(x),2),y2: Math.pow(Math.log(Math.abs(y))*-1,2)};
							}
						}
					}		
				}
				else{
			
					var oper = {x: x, y: y, xy: x*y, x2: Math.pow(x,2),y2: Math.pow(y,2)};
				}
			lista.push(oper);
			escribirTabla(oper);
		}

}
		
function escribirTabla(oper){
	let fila= `<tr>
		<td class='numero'>${lista.length}</td>
		<td class='numero'>${oper.x}</td>
		<td class='numero'>${oper.y}</td>
		<td class='numero'>${oper.x2}</td>
		<td class='numero'>${oper.y2}</td>
		<td class='numero'>${oper.xy}</td>
	</tr>`
	cuerpo.innerHTML+=fila;
}

function sumatorias(oper) {
	var sumax =0;
	var sumay=0;
	var sumaxy=0;
	var sumax2=0;
	var sumay2=0;	
	for (let aux of lista)
	{
		sumax+= parseFloat(aux.x);
		sumay+= parseFloat(aux.y);
		sumaxy+= aux.xy;
		sumax2+= aux.x2;
		sumay2+= aux.y2;
	} 
		
	if (lista.length>2) {	
		let n = lista.length;
		 let aux = (n*sumax2) - Math.pow(sumax,2);
		if (verificar() == true ) 
		{
			a = ((sumay*sumax2)-(sumaxy*sumax))/(aux);
			a2 = Math.pow(Math.E,a);
		}
		else
		{
			a = ((sumay*sumax2)-(sumaxy*sumax))/(aux);
		}
		
		b = ((n*sumaxy)-(sumax*sumay))/(aux);
		discrepancia = sumay2 - 2*a *sumay - 2*b*sumaxy + n* Math.pow(a, 2)
		+ 2*a*b*sumax+Math.pow(b,2)*sumax2;
		let aux1;
		aux1 = discrepancia/(n-2);
		
		let o = (aux1*sumax2)/aux;
		let p = (aux1*n)/aux;
		errora= Math.sqrt(o);
		errorb = Math.sqrt(p);
		lleanarA_b();
		let fila = `<tr> 
		<td class='numero'>${"N: "+ lista.length}</td>
		<td class='numero'>${sumax} </td>
		<td class='numero'>${sumay} </td>
		<td class='numero'>${sumax2} </td>
		<td class='numero'>${sumay2} </td>
		<td class='numero'>${sumaxy} </td>
		</tr>`
		cuerpo.innerHTML+=fila;
		formula();
	}
	 else {
		alert("Faltan datos");
	}

}	


function lleanarA_b(){
	if (verificar() == true ) 
		{
		let fila = `<tr> 
		<td class='numero'> ${a} </td>  
		<td class='numero'> ${b} </td>
		<td class='numero'> ${discrepancia} </td>
		<td class='numero'> ${errora} </td>
		<td class='numero'> ${errorb} </td>
		</tr>
		<tr>

		<td class='numero' colspan='2'> ${"a: "+a2} </td> 
		</tr>`
		cuerpo2.innerHTML+=fila;
		}
	else{
		let fila = `<tr> 
		<td class='numero'> ${a} </td> 
		<td class='numero'> ${b} </td>
		<td class='numero'> ${discrepancia} </td>
		<td class='numero'> ${errora} </td>
		<td class='numero'> ${errorb} </td>
		</tr>`
		cuerpo2.innerHTML+=fila;
	}
	
	
}
function formula(){
	
	let fila;
	if (verificar() == true) 
	{
	 
	 fila = `<p class='formula'>
	${"Formula: "+"y= "+ a2+"*X^("+b+")"} </p>`
	
	}
	else
	{
	
	fila = `<p class='formula'>
	${"Formula: "+"y= "+ a+"+"+b+"*X" } </p>`
	
	}	
	formulaa.innerHTML+=fila;
	
}


	


function getX(lista){
	let listaX = []
	for(let item of lista)
	{
		listaX.push(item.x);
	}
	return listaX
}

function getY(lista){
	let listaY = []
	if (verificar() == true ) 
	{
	
	let guardar = 0;
		for (let item of lista) {
		guardar = a *(Math.pow(item.x,b));
		listaY.push(guardar);
		}
	}
	else
	{
	let guardar = 0;
		for (let item of lista) {
		guardar = a + (b*item.x);
		listaY.push(guardar);
		}
	}	
	return listaY
}
function getY1(lista){
	let listaY1 = []
	for(let item of lista)
	{
		listaY1.push(item.y);
	}
		
	return listaY1
}
function borrarFila(oper) {
	lista.pop();
	let tabla = document.getElementById('tBody');
	let aux = lista.length;	
	let hijo =  tabla.children[aux];
	hijo.outerHTML='';
}

function borrarTabla(fila) {

	location.reload();
}