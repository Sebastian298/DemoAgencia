function MostrarDatos(){
    tabla.innerHTML = 
    '<tr><th>Order</th><th>Num Invoice</th><th>Num Customer</th><th>Invoice Date</th><th>Traffic</th><th>Description</th><th>Created By</th></tr>';

	let peticion = new XMLHttpRequest();
	peticion.open('GET', 'MostrarInvoices.php');

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

	peticion.send();
}

function CargarElementos(){
    let datos;
    let peticion = new XMLHttpRequest();
    peticion.open('GET', 'MostrarCustomers.php');
    peticion.onload = function(){
	    datos = JSON.parse(peticion.responseText);
        
        for(var i = 0; i < datos.length; i++){
		  num_customer.innerHTML +=  ` 
          <option>${datos[i].Id}</option>
          `
        }         
        
    }
    peticion.send();
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
           MostrarDatos();
		}
	}
}
CargarElementos();
MostrarDatos();