function MostrarDatos(bandera,valor){
    tabla.innerHTML = 
    '<tr><th>Order</th><th>Num Invoice</th><th>Num Customer</th><th>Invoice Date</th><th>Traffic</th><th>Description</th><th>Created By</th></tr>';

	let like;
    let parametros;
    let peticion = new XMLHttpRequest();

    peticion.open('POST', 'MostrarInvoices.php');

    if(bandera == true){
        like = valor;
        parametros = 'parametro='+like;
    }else{
        parametros = 'parametro';
    }
    peticion.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    peticion.send(parametros);

	peticion.onload = function(){
		let datos = JSON.parse(peticion.responseText);
		tabla.innerHTML='';
		for(var i = 0; i < datos.length; i++){
		  tabla.innerHTML +=  ` 
          <tr>
          <th>${datos[i].Num_Invoice}</th>
          <td>${datos[i].Num_Customer}</td>
          <td>${datos[i].Invoice_Date}</td>
          <td>${datos[i].Traffic}</td>
          <td>${datos[i].Description}</td>
          <td>${datos[i].Created_By}</td>
          </tr>
          `
		}
	}

}

function onKeyDownHandler(event) {
    let codigo = event.which || event.keyCode;
    let value = document.getElementById('buscar').value;
    MostrarDatos(true,value);
    if (codigo == 8) {
        if (value.length < 1) {
            MostrarDatos(false,'sss');
        }else{
            MostrarDatos(true,value);
        }
    }
}

function CargarElementos(){

    let peticion = new XMLHttpRequest();

    peticion.open('GET','ElementCustomer.php');

    peticion.send();
    peticion.onload = function(){
	    datos = JSON.parse(peticion.responseText);
        for(var i = 0; i < datos.length; i++){
		  num_customer.innerHTML +=  ` 
          <option>${datos[i].Id}</option>
          `
        }         
        
    }
}

function RegistrarInvoice(){
    let numCustomer = parseInt(document.getElementById('num_customer').value,10),
        traffic = parseInt(document.getElementById('trafic').value,10),
        description = document.getElementById('description').value,
        invoiceDate = document.getElementById('date').value;
    
    let peticion = new XMLHttpRequest();
    peticion.open('POST','AgregarInvoice.php');
    let parametros = 'numCustomer='+ numCustomer + '&trafic='+ traffic +'&invoiceDate='+ invoiceDate+'&description='+description + '&created=' + 'Sebastian';
    
    peticion.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    peticion.send(parametros);
    
    peticion.onreadystatechange = ()=>{
	    if(peticion.readyState == 4 && peticion.status == 200){
		   document.getElementById('trafic').value='';
		   document.getElementById('description').value='';
           MostrarDatos(false,'ddd');
		}
	}
}
CargarElementos();
MostrarDatos(false,'ddd');