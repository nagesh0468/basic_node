const express = require('express');
const app =  express();

app.get('/', (req, res) => {
  res.send("hello world...")
});

app.get('/courses', (req, res) => {
  res.send("courses 1,2,3,4,5,6")
})

app.get("/courses/:id", (req, res) => {
  res.send(`course ${req.params.id}`)
})

app.listen('3000', () => {
  console.log('server is running at port number 3000👍')
})