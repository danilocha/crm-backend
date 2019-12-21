const Usuarios = require("../models/Usuarios");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.registrarUsuario = async (req, res) => {
  // leer los datos del usuario y colocarlos en usuarios
  const usuario = new Usuarios(req.body);

  usuario.password = await bcrypt.hash(req.body.password, 12);
  try {
    await usuario.save();
    res.json({ mensaje: "usuario creado correctamente" });
  } catch (error) {
    console.log(error);
    res.json({ mensaje: "hubo un error" });
  }
};
exports.autenticarUsuario = async (req, res, next) => {
  // buscar el usuario
  const usuario = await Usuarios.findOne({ email: req.body.email });

  if (!usuario) {
    //el usuario no existe
    await res.status(401).json({ mensaje: "ese usuario no existe" });
    next();
  } else {
    //el usuario existe, verificar password
    if (!bcrypt.compareSync(req.body.password, usuario.password)) {
      // si el password es incorrecto
      await res.status(401).json({ mensaje: "password incorrecto" });
      next();
    } else {
      // password correcto, firmar el token
      const token = jwt.sign(
        {
          email: usuario.email,
          nombre: usuario.nombre,
          _id: usuario._id
        },
        "LLAVESECRETA",
        {
          expiresIn: "5h"
        }
      );
      // retornar el Token
      res.json({ token });
    }
  }
};
