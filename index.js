const express = require("express");
const exphbs = require("express-handlebars");
const Jimp = require("jimp");
const { v4: uuidv4 } = require('uuid');
const app = express();

app.listen(3000, () =>
{
    console.log("Conectado al puerto 3000");
})

//configurar motor de vistas
app.set("view engine", "handlebars");
app.engine("handlebars", exphbs.engine());

//Importacion Bootstrap
app.use("/bootstrap", express.static(__dirname+'/node_modules/bootstrap/dist'));
app.use("/popper", express.static(__dirname+'/node_modules/@popperjs/core/dist/umd'));

//Carpeta Assets
app.use("/assets", express.static(__dirname+"/assets"));

app.get("/", (req, res) =>
{
    res.render("subirImagen");
})

app.get("/blanconegro", async(req, res) =>
{
    const {txtRutaImg} = req.query;
    if(txtRutaImg != "")
    {
        let uuidImagen = uuidv4();
        uuidImagen = uuidImagen.slice(1, 7);
        const img = await Jimp.read(txtRutaImg);
        await img
        .resize(350, Jimp.AUTO)
        .greyscale()
        .writeAsync(`./assets/img/img_${uuidImagen}.jpg`)

        let imagen = `img_${uuidImagen}.jpg`;

        res.redirect(`/blanconegro/${imagen}`);
    }
    else
    {
        res.send("<center><h1>Ingrese una url o direccion valida.</h1></center>");
    }
})

app.get("/blanconegro/:variable", (req, res) =>
{
    const imagenGris = req.params.variable;

    res.render("blanconegro",
    {
        imgGris : imagenGris
    })
})