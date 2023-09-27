document.addEventListener("DOMContentLoaded", function () {
  // Tu código JavaScript aquí
  
  
 class Robot {
   constructor(id, name, precio, img) {
     this.id = id;
     this.name = name;
     this.precio = Math.round(precio);
     this.img = img;
     this.cantidad = 1;
   }
 }
 const nagatomi = new Robot(1, `Nagatomi`, 10000, `img/nagatomi.jpg`);
 const nozomi = new Robot(2, `Nozomi`, 9000, `img/nozomi.jpg`);
 const electronic = new Robot(3, `Electronic`, 8000, `img/electronic.jpg`);
 const tesla = new Robot(4, `Tesla`, 7000, `img/teslaCar.jpg`);
 const productos = [nagatomi, nozomi, electronic, tesla];

 let carrito = []; 
 if(localStorage.getItem('carrito')){
       carrito = JSON.parse (localStorage.getItem('carrito'));
 }

 const contenedorProductos = document.getElementById(`contenedorProductos`);
 


 const mostrarProductos = () =>{
   productos.forEach( producto => {
     const card = document.createElement('div');
     card.classList.add('card');
             card.innerHTML = ` 

                           <p class= "description" >Name: ${producto.name}</p>
                           <img class= "images" src = " ${producto.img} ">
                          <p class= "description" >Price: $${producto.precio}</p>
                          <button class= "btnAdd" id="boton${producto.id}">add to cart</button>
                               `
                           contenedorProductos.appendChild(card)
                            const boton = document.getElementById(`boton${producto.id}`);
                            boton.addEventListener("click", () => {
                                agregarAlCarrito(producto.id);
                                  Toastify({
                                    text: "Added to cart",
                                    duration: 1000,
                                    gravity: "top",
                                    style:{
                                      background: "linear-gradient(to right, green, grey)",
                                    }
                                  }).showToast();
                                })
                                
                                                     
                           
                                 } 
)};
     mostrarProductos();



  const agregarAlCarrito = (id) => {
    const productoEnCarrito = carrito.find(producto => producto.id === id);
    if (productoEnCarrito) {
      productoEnCarrito.cantidad++;
    } else {
      const producto = productos.find(producto => producto.id === id)
      carrito.push(producto);
     }
     calcularTotal();

     localStorage.setItem('carrito', JSON.stringify(carrito));
  };


  const contenedorCarrito = document.getElementById("contenedorCarrito");
  const verCarrito = document.getElementById("verCarrito");
  verCarrito.addEventListener("click", () => {
    mostrarCarrito();
  });


  const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = ""; // no-repeat!
    carrito.forEach(producto => {
    
      const card = document.createElement("div");
      card.innerHTML = ` 
                   
                       <div class= 'card'>
                       <p class= "description" >Name: ${producto.name}</p>
                       <img class= "images" src = " ${producto.img} ">
                       <p class= "description" >Price: $${producto.precio}</p>
                       <p class= "description" >Total quantity:${producto.cantidad}</p>
                       <button class= "btn btnEliminate" id="eliminar${producto.id}">eliminate</button>
                       </div>
                         `
                         contenedorCarrito.appendChild(card);
               const boton = document.getElementById(`eliminar${producto.id}`);
               boton.addEventListener("click", ()=>{
                 eliminarDelCarrito(producto.id);
                 Toastify({
                  text: "Remove from cart",
                  duration: 1000,
                  gravity: "top",
                  style:{
                    background: "linear-gradient(to right, red, grey)",
                  }
                }).showToast();
               })  
               
             Toastify({
                text: "See cart",
                duration: 1000,
                gravity: "bottom",
                position: "right",
               
             }).showToast();
               
                       })
                       calcularTotal();
           }
           



  const eliminarDelCarrito = (id) => {
    const producto = carrito.find(producto => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice,1);
    mostrarCarrito();

   localStorage.setItem('carrito', JSON.stringify(carrito));
  };
  



 const total = document.getElementById('total');
 const calcularTotal = () =>{
   let totalCompra = 0;
   carrito.forEach( producto =>{
     totalCompra += producto.precio * producto.cantidad;
   })
   total.innerHTML = `$ ${totalCompra}`
 };


 const vaciarCarrito = document.getElementById('vaciarCarrito');
 vaciarCarrito.addEventListener('click', () =>{
   eliminarTodoElCarrito();
 });
 vaciarCarrito.addEventListener("click", () =>{
  Swal.fire({
    title: `removed cart`,
    icon: "warning",
    backdrop: "red",
  })

 })


 const eliminarTodoElCarrito = () =>{
    carrito = [];
    mostrarCarrito();
   //  localStorage:
   localStorage.clear();
 }


const finish = document.getElementById("finish");
finish.addEventListener("click", () =>{
  Swal.fire({
    title: "completed successfully!",
    icon: "success",
    text: "view shopping cart",
    backdrop: "lightblue",
    imageUrl: "./img/iconsShopping.png"

  })
})


 /////////////////////
 
  class Cliente {
    constructor(name, surname) {
      this.name = name;
      this.surname = surname;

    }
  }
  const aClientes = [];

  const formulario = document.getElementById("formulario");
  formulario.addEventListener("submit", (e) =>{
    e.preventDefault();
    const name = document.getElementById("name");
    const surname = document.getElementById("surname");
    const cliente = new Cliente (name.value, surname.value);

    aClientes.push(cliente);
    console.log(aClientes);
    
    
    formulario.reset();
  } )

  const sendForm = document.getElementById("sendForm");
  sendForm.addEventListener("click", () =>{
    Swal.fire({
      title: "Welcome to Robot Shop",
      icon: "success",
      text: "You are registered!",
      imageUrl: "./img/client.png",
      backdrop: "green"
   } );
  })




});