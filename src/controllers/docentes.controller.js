const docentes = require('../../datos/docentes.json')

const getAllDocentes = (req, res)=>{
    res.json( docentes ).status(200)
}

const getDocenteByLegajo = (req, res) => {
    const legajo = req.params.legajo
    const resultado = docentes.find( docente => docente.legajo == legajo)
    if(resultado) {
        res.status(200).json(resultado).status(200)
    } else {
        res.status(404).json({ mensaje: `El docente con legajo ${legajo} no fue encontrado`} )
    }
}

const deleteDocenteByLegajo = (req, res) => {
    const legajo = req.params.legajo
    const indice = docentes.findIndex( docente => docente.legajo == legajo )
    if(indice==-1) {
        res.status(404).
        json(
            {
            resultado: "La operación de borrado no pudo ser realizada",
            mensaje: `El docente con legajo ${legajo} no fue encontrado`
            }
        )
    } else {
        const docente = docentes[indice];
        const resultado = docentes.splice(indice,1)
        res.status(200)
        .json(
            {resultado: "La operación de borrado pudo realizarse con exito",
                  docente: docente
            }
        )
    }
}

const createDocente = (req, res) => {
    const docentesData = req.body
    const existe = docentes.find(docente => docente.legajo == docentesData.legajo)
    if (!existe) {
        if(!docentesData.concursado)
        docentesData.concursado = false
    
        if (!docentesData.nombre) {
            res.status(400).json({mensaje: `No puedo generar el docente con legajo ${docentesData.legajo} por no tener nombre`})    
        } else if (!docentesData.carrera) {
            res.status(400).json({mensaje: `No puedo generar el docente con legajo ${docentesData.legajo} por no tener carrera`})
        } else {
            docentesData.materias = docentesData.materias || []
            docentes.push(docentesData)
            res.status(201).json({mensaje: `El docente con legajo ${docentesData.legajo} fue creado correctamente`})
        }
    } else {
        res.status(400).json({mensaje: `El docente con legajo ${docentesData.legajo} ya existe en la base de datos`})
    }
}


const updateDocente = (req, res)=>{
    const legajo = req.params.legajo  //Path Parameter
    const docentesData = req.body //Body
    const indice = docentes.findIndex(docente => docente.legajo == legajo)
    if ( indice >= 0 ) {
        docentes[indice].nombre = docentesData.nombre
        if (docentesData.concursado !== undefined) {
            docentes[indice].concursado = docentesData.concursado 
        }
        if (docentesData.carrera) {
            docentes[indice].carrera = docentesData.carrera
        }
        if (docentesData.materias) {
            // CON ESTO PUEDO VALIDAR QUE EL ARRAY DE MATERIAS TENGA LA ESTRUCTURA CORRECTA
            if (!Array.isArray(docentesData.materias)) {
                return res.status(400).json({mensaje: "El campo 'materias' debe ser un arreglo"})
            }
            for (let i = 0; i < docentesData.materias.length; i++) {
                const materia = docentesData.materias[i]
                if (!materia.código || !materia.descripción) {
                    return res.status(400).json({mensaje: "Cada objeto en el campo 'materias' debe tener los campos 'código' y 'descripción'"})
                }
            }
            // ACTUALIZA EL CAMPO MATERIAS
            docentes[indice].materias = docentesData.materias
        }
        res.status(201).json({"docente": docentes[indice]})
    }
    else {
        res.status(404).
        json(
            {
                resultado: "La operación de modificar no pudo ser realizada",
                mensaje: `El docente con legajo ${legajo} no fue encontrado`
            }
        )
    }
}


module.exports = {
    getAllDocentes, 
    getDocenteByLegajo,
    deleteDocenteByLegajo,
    createDocente,
    updateDocente
}