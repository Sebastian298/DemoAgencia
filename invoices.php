<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700|Roboto:300,400,500" rel="stylesheet">
    <link rel="stylesheet" href="css/estilos.css">
    <script src="https://kit.fontawesome.com/8b850b0e85.js" crossorigin="anonymous"></script>
    <title>Invoices</title>
</head>
<body>
<div class="container-fluid">
		<div class="row">
			<div class="barra-lateral col-12 col-sm-auto">
				<div class="logo">
					<h2>Lead One</h2>
				</div>
				<nav class="menu d-flex d-sm-block flex-wrap">
                    <a href="index.php"><i class="icon-doc-text"></i><span>Customers</span></a>
					<a href="invoices.php"><i class="icon-doc-text"></i><span>Invoices</span></a>
                    <a href="freight.php"><i class="icon-doc-text"></i><span>Freight Load</span></a>
                    <a href="#"><i class="icon-logout"></i><span>Salir</span></a>
				</nav>
			</div>
			<main class="main col">
				<div class="row">
					<div class="columna col-lg-7">
						<div class="widget nueva_entrada">
                            <h3 class="titulo">Invoices</h3>
                            <form>
                               <div class="form-row">
                                 <div class="form-group col-md-6">
                                   <label for="inputState">Num Customer</label>
                                   <select id="num_customer" class="form-control">
                                   </select>
                                 </div>
                               </div>
                               <div class="form-group">
                                   <label >Invoice Date</label>
                                   <input type="date" name="bday" max="3000-12-31" 
                                   min="1000-01-01" class="form-control" id="date">
                               </div>
                               <div class="form-row">
                                 <div class="form-group col-md-4">
                                   <label for="trafic">Traffic</label>
                                   <input type="text" class="form-control" id="trafic">
                                 </div>
                                 <div class="form-group col-md-8">
                                   <label for="description">Description</label>
                                   <input type="text" class="form-control" id="description">
                                 </div>
                               </div>
                            </form>
                            <button type="button" class="btn-outline-dark btn-lg btn-block" onclick="RegistrarInvoice()">Register</button>
                        </div>
                        <hr>
                        <button type="button" class="btn btn-outline-danger"><i class="fas fa-file-pdf">Exp PDF</i></button>
                        <button type="button" class="btn btn-outline-success"><i class="far fa-file-excel"></i>Exp Xlsx</i></button>
                        <hr>
                        <table class="table table-hover table-responsive">
                            <thead class="thead-dark">
                                <tr>
                                    <th>Num Invoice</th>
                                    <th>Num Customer</th>
                                    <th>Invoice Date</th>
                                    <th>Traffic</th>
                                    <th>Description</th>
                                    <th>Created by</th>
                                </tr>
                            </thead>
                            <tbody id="tabla"></tbody>
                        </table>
					</div>  
					<div class="columna col-lg-5">
						<div class="widget estadisticas">
							<h3 class="titulo">Statistics</h3>
							<div class="contenedor d-flex flex-wrap">
								<div class="caja">
									<h3>15,236</h3>
									<p>Visits</p>
								</div>
								<div class="caja">
									<h3>1,831</h3>
									<p>Records</p>
								</div>
								<div class="caja">
									<h3>$160,548</h3>
									<p>Earnings</p>
								</div>
							</div>
						</div>

						<div class="widget comentarios">
							<h3 class="titulo">Comments</h3>
							<div class="contenedor">
								<div class="comentario d-flex flex-wrap">
									<div class="foto">
										<a href="#">
											<img src="img/persona1.jpg" width="100" alt="">
										</a>
									</div>
									<div class="texto">
										<a href="#">Jhon Doe</a>
										<p>in <a href="#">My first visit</a></p>
										<p class="texto-comentario">
											Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis natus ex inventore provident modi id distinctio non minus, magni quia officiis, vel debitis doloremque ratione, consequuntur omnis hic voluptatem asperiores?
										</p>
									</div>
									<div class="botones d-flex justify-content-start flex-wrap w-100">
										<button class="aprobar"><i class="icono icon-ok"></i>Approve</button>
										<button class="eliminar"><i class="icono icon-cancel"></i>Remove</button>
										<button class="bloquear"><i class="icono icon-flag"></i>Block User</button>
									</div>
								</div>	

								<div class="comentario d-flex flex-wrap">
									<div class="foto">
										<a href="#">
											<img src="img/persona2.jpg" width="100" alt="">
										</a>
									</div>
									<div class="texto">
										<a href="#">Jhon Doe</a>
										<p>in <a href="#">My first visit</a></p>
										<p class="texto-comentario">
											Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis natus ex inventore provident modi id distinctio non minus, magni quia officiis, vel debitis doloremque ratione, consequuntur omnis hic voluptatem asperiores?
										</p>
									</div>
									<div class="botones d-flex justify-content-start flex-wrap w-100">
										<button class="aprobar"><i class="icono icon-ok"></i>Approve</button>
										<button class="eliminar"><i class="icono icon-cancel"></i>Remove</button>
										<button class="bloquear"><i class="icono icon-flag"></i>Block User</button>
									</div>
								</div>

								<div class="comentario d-flex flex-wrap">
									<div class="foto">
										<a href="#">
											<img src="img/persona3.jpg" width="100" alt="">
										</a>
									</div>
									<div class="texto">
										<a href="#">Jhon Doe</a>
										<p>in <a href="#">My first visit</a></p>
										<p class="texto-comentario">
											Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis natus ex inventore provident modi id distinctio non minus, magni quia officiis, vel debitis doloremque ratione, consequuntur omnis hic voluptatem asperiores?
										</p>
									</div>
									<div class="botones d-flex justify-content-start flex-wrap w-100">
										<button class="aprobar"><i class="icono icon-ok"></i>Approve</button>
										<button class="eliminar"><i class="icono icon-cancel"></i>Remove</button>
										<button class="bloquear"><i class="icono icon-flag"></i>Block user</button>
									</div>
								</div>				
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
    </div>
    <script src="js/invoices.js"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
</body>
</html>