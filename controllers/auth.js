const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req, res = response) => {

    const { email, password } = req.body;
    try {

        let usuario = await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({
                ok: false,
                msg: 'El correo electronico ya existe'
            })
        }
        usuario = new Usuario(req.body);

        // Encriptación de la contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
    
        await usuario.save();

        // Generar JWT
        const token = await generarJWT( usuario.id, usuario.name );
    
        return res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Pongase en contacto con el Administrador'
        })
    }

}

const loginUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({email});

        if(!usuario){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con este mail'
            })
        }

        // confirmar los passwords
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña es incorrecta'
            })
        }

        // Generar nuestro JWT (Json Web Token)

        const token = await generarJWT( usuario.id, usuario.name );

        res.json({
            ok: true, 
            uid: usuario.id,
            name: usuario.name,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Pongase en contacto con el Administrador'
        })
    }

    res.json({
        ok: true,
        msg: 'login',
        email,
        password
    })
}


const revalidarToken = async (req, res = response) => {

    const uid = req.uid;
    const name = req.name;

    const token = await generarJWT( uid, name );

    res.json({
        ok: true,
        token
        
    })
}
module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}