function MostrarDatos(){
    tabla.innerHTML = 
    '<tr><th>Order</th><th>Name</th><th>Location</th><th>RFC</th><th>Carrier</th><th>ProNo</th><th>Equipment</th></tr>';

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
           MostrarDatos();
		}
	}


}
MostrarDatos();