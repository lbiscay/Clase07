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

const productos = [
    {
     "title": "Taza",
     "price": 150,
     "thumbnail": "https://www.dalevida.net/1993-large_default/taza-magica.jpg",
     "id": 1
    },
    {
     "title": "Vaso",
     "price": 100,
     "thumbnail": "https://www.eneyememayorista.com.ar/6926-large_default/vaso-facetado-trago-bajo-blanco-330cc-art-tva-047.jpg",
     "id": 2
    },
    {
     "title": "Plato",
     "price": 200,
     "thumbnail": "https://www.ikea.com/mx/es/images/elementos/oftast-plato-blanco__0713530_pe729595_s5.jpg?f=s",
     "id": 3
    },
    {
     "title": "Cuchillo",
     "price": 175,
     "thumbnail": "https://www.trentogourmet.com.ar/wp-content/uploads/trento-cuchillo-gourmet-19-6-cm-131453-01.jpg",
     "id": 4
    },
    {
     "title": "Tenedor",
     "price": 125,
     "thumbnail": "https://hendel-r7d8odghj1.stackpathdns.com/media/catalog/product/cache/0c3e9ac8430b5a3e77d1544ae1698a10/3/2/32290.jpg",
     "id": 5
    }
   ]

let productosDesdeTXT = JSON.parse(fs.readFileSync('./productos.txt', 'utf-8'));
let visitasItemRandom = 0;
let visitasItems = 0;


app.get('/items', (request, response) => {
    visitasItems ++;
    const getItems = {
        items: [],
        cantidad : productos.length,
    }
    for (let producto in productos){
        getItems.items.push(productos[producto].title);
        productos.length
    }
    console.log(request.query);  

        response.json(
            getItems
            
        );        
    });

app.get('/item-random', (request, response) => {

    const numeroRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
    let item = productosDesdeTXT[(numeroRandom(0,productosDesdeTXT.length-1))]
    visitasItemRandom ++;
    console.log(request.query);

    response.json({
        item
    });
  });


app.get('/visitas', (request, response) => {
    let visitas = {
        "items": visitasItems,
        "item": visitasItemRandom
    }
    console.log(request.query);  
        response.json({
           visitas
        });        
    });

