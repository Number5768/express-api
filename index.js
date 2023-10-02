const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const PORT = 4000
const fs = require('fs')
const db = require('./db.json')

app.use(morgan('dev'))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

const _path = 'book'
app.get(`/${_path}`, (req, res) => {

    const { search } = req.query

    const _res = search && search !== '' && search !== null ? db.filter((x) => x.category.toLowerCase().includes(search.toLowerCase() || x.book_name.toLowerCase().includes(search.toLowerCase()) || x.description.toLowerCase().includes(search.toLowerCase()) || x.detail.toLowerCase().includes(search.toLowerCase()))) : db

    res.status(200).json({ status: true, code: 200, data: _res })
})

app.get(`/${_path}/:id`, (req, res) => {

    const { id } = req.params

    if (id === undefined || id === null || id === 0) return res.status(400).json({ status: false, code: 400, message: 'id is required' })

    const _res = db.find((x) => x.book_id === Number(id))

    if (!_res) return res.status(404).json({ status: false, code: 404, message: 'not found' })

    res.status(200).json({ status: true, code: 200, data: _res })
})

app.post(`/${_path}/save`, (req, res) => {

    const { book_name, category, description, detail } = req.body

    if (book_name === undefined || book_name === null || book_name === '') return res.status(400).json({ status: false, code: 400, message: 'book_name is required' })
    if (category === undefined || category === null || category === '') return res.status(400).json({ status: false, code: 400, message: 'category is required' })
    if (description === undefined || description === null || description === '') return res.status(400).json({ status: false, code: 400, message: 'description is required' })
    if (detail === undefined || detail === null || detail === '') return res.status(400).json({ status: false, code: 400, message: 'detail is required' })

    const _dataNew = { book_id: db.length + 1, book_name, category, description, detail }
    db.push(_dataNew)
    fs.writeFileSync('./db.json', JSON.stringify(db), 'utf8')
    res.status(200).json({ status: true, code: 200, message: 'save success', data: _dataNew })
})

app.post(`/${_path}/update/:id`, (req, res) => {

    const { id } = req.params
    const { book_name, category, description, detail } = req.body

    if (id === undefined || id === null || id === 0) return res.status(400).json({ status: false, code: 400, message: 'id is required' })
    if (book_name === undefined || book_name === null || book_name === '') return res.status(400).json({ status: false, code: 400, message: 'book_name is required' })
    if (category === undefined || category === null || category === '') return res.status(400).json({ status: false, code: 400, message: 'category is required' })
    if (description === undefined || description === null || description === '') return res.status(400).json({ status: false, code: 400, message: 'description is required' })
    if (detail === undefined || detail === null || detail === '') return res.status(400).json({ status: false, code: 400, message: 'detail is required' })

    const _res = db.find((x) => x.book_id === Number(id))

    if (!_res) return res.status(404).json({ status: false, code: 404, message: 'not found' })

    db.splice(db.findIndex((x) => x.book_id === Number(id)), 1, { book_id: Number(id), book_name, category, description, detail })

    fs.writeFileSync('./db.json', JSON.stringify(db), 'utf8')

    res.status(200).json({ status: true, code: 200, message: 'update success' })
})

app.post(`/${_path}/delete/:id`, (req, res) => {

    const { id } = req.params

    if (id === undefined || id === null || id === 0) return res.status(400).json({ status: false, code: 400, message: 'id is required' })

    const _res = db.find((x) => x.book_id === Number(id))

    if (!_res) return res.status(404).json({ status: false, code: 404, message: 'not found' })

    db.splice(db.findIndex((x) => x.book_id === Number(id)), 1)
    fs.writeFileSync('./db.json', JSON.stringify(db), 'utf8')
    res.status(200).json({ status: true, code: 200, message: 'delete success' })
})

app.get(`/${_path}/count`, (req, res) => {
    res.status(200).json({ status: true, code: 200, data: db.length })
})

app.get('/data', async (req, res) => {
    const data = await fetch('https://jsonplaceholder.typicode.com/todos')
    const dataJson = await data.json()
    res.status(200).json(dataJson)
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})

module.exports = app