const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

const databaseFile = './database.json'

app.get('/', (req, res) => {
  fs.readFile(databaseFile, 'utf-8', (err, data) => {
    if(err){
      return res.status(500).json({ status: 'error', message: 'Failed to read database' });
    }
    res.json({
      status : 'success',
      data : JSON.parse(data),
      message : 'data retrieved',
      length : JSON.parse(data).length
    })
  })
} )

app.post('/', (req, res) => {
  fs.readFile(databaseFile, 'utf-8', (err, data) => {

    if (err) {
      return res.status(500).json({ status: 'error', message: 'Failed to read database' });
    }

    const database = JSON.parse(data);
    const {name, type, distance_light_years, mass_solar, temperature_K} = req.body;
    const dataToBeAdded = {
      name, type, distance_light_years, mass_solar, temperature_K
    }
    if(typeof name !== 'string' || typeof type !== 'string' || typeof distance_light_years !== 'number' || typeof mass_solar !== 'number' || typeof temperature_K !== 'number'){
      return res.json({
        status : 'error',
        message : " invalid data "
      });
    }
    database.push(dataToBeAdded);
    fs.writeFile(databaseFile, JSON.stringify(database), (err) => {

      if (err) {
        return res.status(500).json({ status: 'error', message: 'Failed to write to database' });
      }
      
      res.json({
        status : 'success',
        data : req.body,
        message : 'data added'
      })
    } )
  })
})

app.listen('3000', () => {
  console.log('server is running on port number 3000')
})