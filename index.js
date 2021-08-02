import express from 'express';
import fs from 'fs';

const puerto = 8080;

const app = express();

const server = app.listen(puerto,()=>
    console.log(`Server funcionando en puerto ${puerto}`)
);

server.on('error',(err)=>{
    console.log(`Error => ${err}`)
}
);

let productosDesdeTXT = JSON.parse(fs.readFileSync('./productos.txt', 'utf-8'));
let visitasItemRandom = 0;
let visitasItems = 0;

app.get('/', (req, res) => {

    console.log(req.query);  
        res.json(
           'Visitar ruta /items para obtener todos los productos y su cantidad total, /item-random para obtener un producto elegido al azar y /visitas para saber cuantas veces se visitaron las rutas anteriores.'
        );        
    });

app.get('/items', (req, res) => {
    visitasItems ++;

    console.log(req.query);  

        res.json({
            items: productosDesdeTXT,
            cantidad: productosDesdeTXT.length,
        });        
    });

app.get('/item-random', (req, res) => {

    const numeroRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
    let item = productosDesdeTXT[(numeroRandom(0,productosDesdeTXT.length-1))]
    visitasItemRandom ++;
    console.log(req.query);

    res.json({
        item
    });
  });


app.get('/visitas', (req, res) => {
    let visitas = {
        "items": visitasItems,
        "item": visitasItemRandom
    }
    console.log(req.query);  
        res.json({
           visitas
        });        
    });

