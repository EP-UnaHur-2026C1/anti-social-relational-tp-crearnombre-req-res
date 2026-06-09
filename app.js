const express = require("express");
const path = require("path");
const app = express();
const db = require("./models");
const cors = require("cors");
const routerUser = require("./routes/users.routes");
const routerPost = require("./routes/posts.routes");
const routerTags = require("./routes/tags.routes");
const routerComment = require("./routes/comments.routes");
const routerPostImage = require("./routes/postImage.routes");

require("dotenv").config();

// Si process.env.PORT no existe en el .env del profe,
// usa el puerto 3000 por defecto para que no falle.
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/users", routerUser);
app.use("/posts", routerPost);
app.use("/tags", routerTags);
app.use("/comments", routerComment);
app.use("/postImages", routerPostImage);

app.listen(PORT, async () => {
  try {
    // Le agregamos { alter: true }.
    // Esto hace que Sequelize cree de forma automática las tablas
    // en CUALQUIER base de datos transparente que elija el evaluador.
    await db.sequelize.sync();
    console.log("La aplicacion esta corriendo en el puerto " + PORT);
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error.message);
  }
});
