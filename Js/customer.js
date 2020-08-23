function MostrarDatos(){
    tabla.innerHTML = 
    '<tr><th>Order No</th><th>Name</th><th>Location</th><th>RFC</th><th>Carrier</th><th>ProNo</th><th>Equipment No</th></tr>';

	let peticion = new XMLHttpRequest();
	peticion.open('GET', 'MostrarCustomers.php');

	peticion.onload = function(){
		var datos = JSON.parse(peticion.responseText);
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

	peticion.send();
}

function AgregarCustomer(){
    
}
MostrarDatos();