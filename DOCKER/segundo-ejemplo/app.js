//simulamos un sv de backend en Node con EXPRESS

const EXPRESS = require('express');
const app = EXPRESS();

//Creando una ruta
app.get('/',(req,res) => {
    res.send('Keonzas desde nuestro backend en Node!');
})

app.listen(3050,() => {
    console.log('El server funciona al 100 en el puerto 3050');
})