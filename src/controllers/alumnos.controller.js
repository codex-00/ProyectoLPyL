const alumnos = require('../../datos/alumnos.json')

const getAllAlumnos = (req, res)=>{
    res.json( alumnos ).status(200)
}

const getAlumnoByDni = (req, res) => {
    const dni = req.params.dni
    const resultado = alumnos.find( alumno => alumno.dni == dni)
    if(resultado) {
        res.status(200).json(resultado).status(200)
    } else {
        res.status(404).json({ mensaje: `El alumno con dni ${dni} no fue encontrado`} )
    }
}

const deleteAlumnoByDni = (req, res) => {
    const dni = req.params.dni
    const indice = alumnos.findIndex( alumno => alumno.dni == dni )
    if(indice==-1) {
        res.status(404).
        json(
            {
            resultado: "La operación de borrado no pudo ser realizada",
            mensaje: `El alumno con dni ${dni} no fue encontrado`
            }
        )
    } else {
        const alumno = alumnos[indice];
        const resultado = alumnos.splice(indice,1)
        res.status(200)
        .json(
            {resultado: "La operación de borrado pudo realizarse con exito",
                  alumno: alumno
            }
        )
    }
}

const crateAlumno = (req, res) => {
    const alumnosData = req.body
    const existe = alumnos.find(alumno => alumno.dni == alumnosData.dni)
    if (!existe) {
        if( ! alumnosData.tieneCurso)
            alumnosData.tieneCurso = false
    
        if (!alumnosData.nombre) {
            res.status(400).json({mensaje: `No puedo generar el alumno con dni ${alumnosData.dni} por no tener nombre`})    
        } else  {
            alumnos.push(alumnosData)
            res.status(201).json({mensaje: `El alumno con dni ${alumnosData.dni} fue creado correctamente`})
        }
    } else {
        res.status(400).json({mensaje: `El alumno con dni ${alumnosData.dni} ya existe en la base de datos`})
    }
}

const updateAlumno = (req, res)=>{
    const dni = req.params.dni  //Path Parameter
    const alumnosData = req.body //Body
    const indice = alumnos.findIndex(alumno => alumno.dni == dni)
    if ( indice >= 0 ) {
        alumnos[indice].nombre = alumnosData.nombre
        if (alumnosData.tieneCurso!==undefined) {
            alumnos[indice].tieneCurso = alumnosData.tieneCurso 
        }
        res.status(201).json({"alumno": alumnos[indice]})
    }
    else {
        res.status(404).
        json(
            {
                resultado: "La operación de modicar no pudo ser realizada",
                mensaje: `El alumno con dni ${dni} no fue encontrado`
            }
        )
    }
}

module.exports = { 
    getAllAlumnos, 
    getAlumnoByDni,
    deleteAlumnoByDni,
    crateAlumno,
    updateAlumno
}