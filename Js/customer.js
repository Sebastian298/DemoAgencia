
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
    tabla.innerHTML = 
    '<tr><th>Order</th><th>Name</th><th>Location</th><th>RFC</th><th>Carrier</th><th>ProNo</th><th>Equipment</th></tr>';

    let like;
    let parametros;
    let peticion = new XMLHttpRequest();

    peticion.open('POST', 'MostrarCustomers.php');

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
		if(datos.error){
			error_box.classList.add('active');
		} else {
		for(var i = 0; i < datos.length; i++){
		  tabla.innerHTML +=  ` 
          <tr>
          <th>${datos[i].Id}</th>
          <td>${datos[i].Name}</td>
          <td>${datos[i].Location}</td>
          <td>${datos[i].RFC}</td>
          <td>${datos[i].Carrier}</td>
          <td>${datos[i].Pro_No}</td>
          <td>${datos[i].Equipment_No}</td>
          </tr>
          `
		 }
		}
		
    }
    
}

function AgregarCustomer(){
    let Name = document.getElementById('name').value,
        Location = document.getElementById('Location').value,
        RFC = document.getElementById('RFC').value,
        Carrier = document.getElementById('Carrier').value,
        Pro_No = document.getElementById('ProNo').value,
        Equipment = document.getElementById('Equipment').value;

    let peticion = new XMLHttpRequest();
    peticion.open('POST','AgregarCustomer.php');
    let parametros = 'Name='+ Name + '&Location='+ Location +'&RFC='+ RFC+'&Carrier='+Carrier + '&Pro_No=' + Pro_No + '&Equipment='+Equipment;
    
    peticion.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    peticion.send(parametros);

    peticion.onreadystatechange = ()=>{
	    if(peticion.readyState == 4 && peticion.status == 200){
		   document.getElementById('name').value='';
		   document.getElementById('Location').value='';
		   document.getElementById('RFC').value='';
           document.getElementById('Carrier').value='';
           document.getElementById('ProNo').value='';
           document.getElementById('Equipment').value='';
           MostrarDatos(false,'dsds');
		}
	}


}

function Generar(){
    let data = [];
    let parametros;
    let peticion = new XMLHttpRequest();

    peticion.open('POST', 'MostrarCustomers.php');

    parametros = 'parametro';
    
    peticion.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    peticion.send(parametros);
    peticion.onload=function(){
               let datos = JSON.parse(peticion.responseText);
        
               for (let index = 0; index < datos.length; index++) {
                   data.push([`${datos[index].Id}`,`${datos[index].Name}`,`${datos[index].Location}`
                   ,`${datos[index].RFC}`,`${datos[index].Carrier}`,`${datos[index].Pro_No}`,`${datos[index].Equipment_No}`]);
           };
           let fecha = new Date();
    
           let pdf = new jsPDF();
           let columns = ["Id", "Name", "Location","RFC","Carrier","Pro_No","Equipment_No"];
           pdf.text(20,20,"Customers Report");
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
        filename: "Customers Report", //Nombre del archivo de Excel
        sheetname: "Customers Report", //Título de la hoja
    });
    let datos = tableExport.getExportData();
    let preferenciasDocumento = datos.tables.xlsx;
    tableExport.export2file(preferenciasDocumento.data, preferenciasDocumento.mimeType, preferenciasDocumento.filename, preferenciasDocumento.fileExtension, preferenciasDocumento.merges, preferenciasDocumento.RTL, preferenciasDocumento.sheetname);
}
MostrarDatos(false,'sss');