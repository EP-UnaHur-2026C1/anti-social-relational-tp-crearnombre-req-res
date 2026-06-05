const express = require('express') 
const app = express() 
const db = require('./models') 
const routerUser = require('./routes/users.routes')
const routerPost = require('./routes/posts.routes')
const routerTags = require('./routes/tags.routes')
const routerComment = require('./routes/comments.routes')
const routerPostImage = require('./routes/postImage.routes')

require("dotenv").config(); 

const PORT = process.env.PORT; 

app.use(express.json())

app.use('/users', routerUser)
app.use('/posts', routerPost)
app.use('/tags', routerTags)
app.use('/comments', routerComment)
app.use('/postImages', routerPostImage)

app.listen(PORT, async()=>{
    try {
        await db.sequelize.sync()
        console.log("La aplicacion esta corriendo en el puerto " + PORT)
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error.message)
    }
}) 






