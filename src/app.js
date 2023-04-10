const express = require('express');
const app = express()
const PORT = process.env.PORT || 3000;
const alumnosRouter = require('./routes/alumnos.route')
const aularRouter = require('./routes/aulas.routes')
const docentesRouter = require('./routes/docentes.route')

app.use(express.json())
app.use('/alumnos', alumnosRouter.router)
app.use('/aulas', aularRouter.router )
app.use('/docentes', docentesRouter.router)

app.listen(PORT, ()=>{console.log(`App lista escuhando en el puerto ${PORT}`)} )