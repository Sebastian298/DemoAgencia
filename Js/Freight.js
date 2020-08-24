function CargarElementos(){
    let datos;
    let peticion = new XMLHttpRequest();
    peticion.open('GET', 'MostrarInvoices.php');
    peticion.onload = function(){
	    datos = JSON.parse(peticion.responseText);
        
        for(var i = 0; i < datos.length; i++){
		  num_invoice.innerHTML +=  ` 
          <option>${datos[i].Num_Invoice}</option>
          `
          num_trafic.innerHTML +=  ` 
          <option>${datos[i].Traffic}</option>
          `
        }         
        
    }
    peticion.send();

    let data;
    let peticion2 = new XMLHttpRequest();
    peticion2.open('GET', 'MostrarCustomers.php');
    peticion2.onload = function(){
	    data = JSON.parse(peticion2.responseText);
        for(var i = 0; i < data.length; i++){
		  num_customer.innerHTML +=  ` 
          <option>${data[i].Id}</option>
          `
        }         
        
    }
    peticion2.send();
}

function MostrarDatos(){
    let peticion = new XMLHttpRequest();
	peticion.open('GET', 'MostrarFreight.php');

	peticion.onload = function(){
		let datos = JSON.parse(peticion.responseText);
		tabla.innerHTML='';
		for(var i = 0; i < datos.length; i++){
		  tabla.innerHTML +=  ` 
          <tr>
          <th>${datos[i].Num_Order}</th>
          <td>${datos[i].Num_Customer}</td>
          <td>${datos[i].Id_Invoice}</td>
          <td>${datos[i].Num_Traffic}</td>
          <td>${datos[i].Shipper}</td>
          <td>${datos[i].Pick_Date}</td>
          <td>${datos[i].Consigne}</td>
          <td>${datos[i].Delivery_Date}</td>
          <td>${datos[i].Request_Date}</td>
          <td>${datos[i].Created_By}</td>
          <td>${datos[i].Created_at}</td>
          </tr>
          `
		}
	}

	peticion.send();
}

function RegistrarFreight(){
    let numCustomer = parseInt(document.getElementById('num_customer').value,10),
        numInvoice = parseInt(document.getElementById('num_invoice').value,10),
        numTrafic = parseInt(document.getElementById('num_trafic').value,10),
        shipper = document.getElementById('shipper').value,
        pickDate = document.getElementById('date').value,
        consigne = document.getElementById('consigne').value,
        delivery = document.getElementById('delivery_date').value,
        request = document.getElementById('request_date').value,
        creator = 'Sebastian';

     let peticion = new XMLHttpRequest();
    peticion.open('POST','AgregarFreight.php');
    let parametros = 'numCustomer='+ numCustomer 
    + '&numInvoice='+ numInvoice +'&numTrafic='+ numTrafic
    +'&shipper='+shipper + '&pick=' + pickDate+'&consigne='+consigne+'&delivery='+delivery
    +'&request='+request+'&creator='+creator;
    
    peticion.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    peticion.send(parametros);
    
    peticion.onreadystatechange = ()=>{
	    if(peticion.readyState == 4 && peticion.status == 200){
		   document.getElementById('consigne').value='';
		   document.getElementById('shipper').value='';
           MostrarDatos();
		}
	}
}
CargarElementos();
MostrarDatos();