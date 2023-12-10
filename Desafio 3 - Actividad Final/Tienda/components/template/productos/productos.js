'use strict';
// Registro del componente `productos`, junto con su controlador y plantilla asociada
angular.
  module('myApp.productos', ['core.cart']).
  component('productos', {  // Este nombre es el que AngularJS utiliza para hacer coincidir con el elemento `<productos>`.
    templateUrl: './components/template/productos/productos.html',
   
    controller: [
      'cssInjector',
      'cart',
      function ProductosController(cssInjector, cart) {
        var self = this;

        self.currentCategoria = "0";
        self.textParam = '';
        
        // Inyectamos el archivo CSS correspondiente al componente
        cssInjector.add("./components/template/productos/productos.css");

        // Cargamos los productos y categorías desde el carrito
        cart.loadProductos().then(function(){
          self.productos = cart.getProductos(self.currentCategoria, self.textParam);
          self.categorias = cart.getCategorias();
        });

        // Función para obtener los productos filtrados según la categoría y el texto de búsqueda
        self.getProductos = function(){
          return cart.getProductos(self.currentCategoria, self.textParam);
        }

        // Función para agregar un producto al carrito
        self.add = function(prod_id){
          cart.add(prod_id);
          Swal.fire('¡Producto agregado!', 'Se ha añadido el producto al carrito de comparas', 'success');
        }

        // Función para obtener el total del carrito
        self.getTotal = function(){
          console.log('get total', cart.getTotal() );
          return cart.getTotal() || 0 ;  
        }

        // Función para obtener el nombre de una categoría según su ID
        self.getCategoriaName = function(id){
          return cart.categorias.find(a=> a.cat_id == id).cat_nombre;
        }
      }]
  });
