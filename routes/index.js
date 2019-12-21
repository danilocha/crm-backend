const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");
const productosController = require("../controllers/productosController");
const pedidosController = require("../controllers/pedidosController");
const usuariosController = require("../controllers/usuariosController");

// middleware para proteger rutas
const auth = require("../middleware/auth");

module.exports = () => {
  // Agrega nuevos clientes via POST
  router.post("/clientes", auth, clienteController.nuevoCliente);

  // Obtener todos los clientes
  router.get("/clientes", auth, clienteController.mostrarClientes);

  // Muestra cliente por ID
  router.get("/clientes/:idCliente", auth, clienteController.mostrarCliente);

  // Actualizar cliente por ID
  router.put("/clientes/:idCliente", auth, clienteController.actualizarCliente);

  //Eliminar Cliente
  router.delete(
    "/clientes/:idCliente",
    auth,
    clienteController.eliminarCliente
  );

  /** PRODUCTOS */
  //nueos productos
  router.post(
    "/productos",
    auth,
    productosController.subirArchivo,
    productosController.nuevoProducto
  );

  // Mostrar todos los productos
  router.get("/productos", auth, productosController.mostrarProductos);

  // Muestra un producto en especifico por su ID
  router.get(
    "/productos/:idProducto",
    auth,
    productosController.mostrarProducto
  );

  //Actualizar Productos
  router.put(
    "/productos/:idProducto",
    auth,
    productosController.subirArchivo,
    productosController.actualizarProducto
  );

  // Eliminar productos
  router.delete(
    "/productos/:idProducto",
    auth,
    productosController.eliminarProducto
  );

  //Busqueda de productos
  router.post(
    "/productos/busqueda/:query",
    auth,
    productosController.buscarProducto
  );
  /** PEDIDOS!!! */
  // Agregar nuevos pedidos
  router.post("/pedidos/nuevo/:idUsuario", auth, pedidosController.nuevoPedido);

  // mostrar todos los pedidos
  router.get("/pedidos", auth, pedidosController.mostrarPedidos);

  //Mostrar un pedido por ID
  router.get("/pedidos/:idPedido", auth, pedidosController.mostrarPedido);

  // Actualizar Pedido
  router.put("/pedidos/:idPedido", auth, pedidosController.actualizarPedido);

  // Elimina un pedido
  router.delete("/pedidos/:idPedido", auth, pedidosController.eliminarPedido);

  /** USUARIOS!!! */

  router.post("/crear-cuenta", usuariosController.registrarUsuario);
  router.post("/iniciar-sesion", usuariosController.autenticarUsuario);
  return router;
};
