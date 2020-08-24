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
console.log('funciona');
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

function Generar(){
    let data = [];
    let parametros;
    let peticion = new XMLHttpRequest();

    peticion.open('POST', 'MostrarInvoices.php');

    parametros = 'parametro';
    
    peticion.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    peticion.send(parametros);
    peticion.onload=function(){
               let datos = JSON.parse(peticion.responseText);
        
               for (let index = 0; index < datos.length; index++) {
                   data.push([`${datos[index].Num_Invoice}`,`${datos[index].Num_Customer}`,`${datos[index].Invoice_Date}`,
                   `${datos[index].Traffic}`,`${datos[index].Description}`,`${datos[index].Created_By}`]);
                };
           let fecha = new Date();
    
           let pdf = new jsPDF();
           let columns = ["Num Invoice", "Num Customer", "Invoice Date","Trafic","Description","Created By"];
           pdf.text(20,20,"Invoices Report");
           pdf.autoTable(columns,data,
               { margin:{ top: 25  }}
             );
             pdf.save('Reporte del'+' '+fecha.getDate() + "/" + (fecha.getMonth() +1) + "/" + fecha.getFullYear()+'.pdf');
    }
}

function Excel(){
    let tabla = document.querySelector("#tables");

    let tableExport = new TableExport(tabla, {
        exportButtons: false, // No queremos botones
        filename: "Invoices Report", //Nombre del archivo de Excel
        sheetname: "Invoices Report", //Título de la hoja
    });
    let datos = tableExport.getExportData();
    let preferenciasDocumento = datos.tables.xlsx;
    tableExport.export2file(preferenciasDocumento.data, preferenciasDocumento.mimeType, preferenciasDocumento.filename, preferenciasDocumento.fileExtension, preferenciasDocumento.merges, preferenciasDocumento.RTL, preferenciasDocumento.sheetname);
}


CargarElementos();
MostrarDatos(false,'ddd');