import express from "express";
import "./db/connection.js";
import Car from "./models/car.js";
const app = express(); 

const PORT = 3000; 


// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.set("view engine", "ejs");

app.get('/cars/new', (req, res) => {
    res.render('cars/new'); // Shows the form to add a new car
  });
  
// Create a car
app.post("/cars", async (req, res) => {
    let { make,model,year,horsepower,color  } = req.body;
  
   
    const car = await Car.create({ make,model,year,horsepower,color});
  
    res.redirect("/cars");
  });



app.get("/test", (req, res) => {
    res.render("test")
  })  

  app.listen(PORT, () => {
    console.log(`App is running on port: ${PORT}`);
  });