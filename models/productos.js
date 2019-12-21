const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productosSchema = new Schema({
  nombre: {
    type: String,
    trime: true
  },
  precio: Number,
  imagen: String
});
module.exports = mongoose.model("Productos", productosSchema);
