const PORT = process.env.PORT || 5000
const express = require('express')
const Joi = require('joi')
const app = express()

app.use(express.json())

const books = [
    { id: 1, title: "Shaytanat", author: "Tohir Malik"},
    { id: 2, title: "Payg'ambarlar tarixi", author: "Muhammad Sayyid Tantoviy"},
    { id: 3, title: "Diqqat chalg'ituvchi dunyoda muvaffaqiyat sirlari", author: "Cal Newport"}
]

//Request and Response for Home page
app.get('/', (req, res) => {
    res.send("<h1>Hi this is book store</h1>")
})

app.get('/api/books', (req, res) => {
    res.send(books)
})

app.get('/api/books/:id', (req, res) => {
    const book = books.find(book => book.id === parseInt(req.params.id))

    if(!book) res.status(400).send("Wrong request")
    res.send(book)
})

app.put('/api/books/:id', (req, res) => {
    const book = books.find(book => book.id === parseInt(req.params.id))
    book.title = req.body.title
    
    for(let id of books) {
        if(id['id'] == parseInt(req.params.id)) {
            const index = books.indexOf(book) 
            books.splice(index, 1)
            const bookUpdate = {
                id: id['id'],
                title: req.body.title,
                author: id['author']
            }


            books.push(bookUpdate)
            break
        }
    }

    if(!book) res.status(400).send("Wrong request")
    else {
        res.send(books)
    }

})

app.delete('/api/books/:id', (req, res) => {
    const book = book.find(book => book.id == parseInt(req.params.id))

    const index = books.indexOf(book) 
    books.splice(index, 1)
})

app.post('/api/books', (req, res) => {
    const newBook = {
        id: books ? books.at(-1).id + 1: 1,
        title: req.body.title,
        author: req.body.author
    }

    books.push(newBook)

    if(!newBook) {
        res.status(400).json({
            status: 400,
            message: "New Book is not defined"
        })
    }
    res.status(200).json({
        status: 200,
        message: newBook
    })
})


app.listen(PORT, () => console.log("server is running on http://localhost:" + PORT))