function CargarElementos(){
    let datos;
    let peticion = new XMLHttpRequest();
    peticion.open('GET', 'ElementInvoices.php');
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
    peticion2.open('GET', 'ElementCustomer.php');
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
function MostrarDatos(bandera,valor){
    let like;
    let parametros;
    let peticion = new XMLHttpRequest();

    peticion.open('POST', 'MostrarFreight.php');

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
           MostrarDatos(false,'ss');
		}
	}
}

function Generar(){
    let data = [];
    let parametros;
    let peticion = new XMLHttpRequest();

    peticion.open('POST', 'MostrarFreight.php');

    parametros = 'parametro';
    
    peticion.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    peticion.send(parametros);
    peticion.onload=function(){
               let datos = JSON.parse(peticion.responseText);
        
               for (let index = 0; index < datos.length; index++) {
                   data.push([`${datos[index].Num_Order}`,`${datos[index].Num_Customer}`,`${datos[index].Id_Invoice}`
                   ,`${datos[index].Num_Traffic}`,`${datos[index].Shipper}`,`${datos[index].Pick_Date}`,`${datos[index].Consigne}`,
                   `${datos[index].Delivery_Date}`,`${datos[index].Request_Date}`,`${datos[index].Created_at}`]);
           };
           let fecha = new Date();
    
           let pdf = new jsPDF();
           let columns = ["Num Order", "Num Customer", "Id Invoice","Num Trafic","Shipper","Pick Date","Consigne","Delivery Date","Request Date","Created At"];
           pdf.text(20,20,"Freight Load Report");
           pdf.autoTable(columns,data,
               { margin:{ top: 30  }});
           pdf.save('Reporte del'+' '+fecha.getDate() + "/" + (fecha.getMonth() +1) + "/" + fecha.getFullYear()+'.pdf');
    }
}

function Excel(){
    let tabla = document.querySelector("#tables");

    let tableExport = new TableExport(tabla, {
        exportButtons: false, // No queremos botones
        filename: "Freight Load Report", //Nombre del archivo de Excel
        sheetname: "Freight Load Report", //Título de la hoja
    });
    let datos = tableExport.getExportData();
    let preferenciasDocumento = datos.tables.xlsx;
    tableExport.export2file(preferenciasDocumento.data, preferenciasDocumento.mimeType, preferenciasDocumento.filename, preferenciasDocumento.fileExtension, preferenciasDocumento.merges, preferenciasDocumento.RTL, preferenciasDocumento.sheetname);
}

CargarElementos();
MostrarDatos(false,'ss');