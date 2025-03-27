import express from "express";
import "./db/connection.js";
import Car from "./models/car.js";
import methodOverride from "method-override";


const app = express();

const PORT = 3000;



// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(methodOverride("_method"));



app.get("/cars/new", (req, res) => {
  res.render("cars/new"); // Shows the form to add a new car
});

// Create a car
app.post("/cars", async (req, res) => {
  let { make, model, year, horsepower, color } = req.body;

  const car = await Car.create({ make, model, year, horsepower, color });

  res.redirect("/cars");
});

//edit a car

app.get("/cars/:id/edit", async (req, res) => {
  const id = req.params.id;
  const car = await Car.findById(id);
  res.render("cars/edit", { car });
});

// List all cars
app.get("/cars", async (req, res) => {
  try {
    const cars = await Car.find({});
    res.render("cars/index", { cars });
  } catch (err) {
    console.error("Error fetching cars:", err);
    res.status(500).send("Something went wrong while retrieving the cars ");
  }
});

// need app get by id
app.get("/cars/:id", async (req, res) => {
  const { id } = req.params;
  const car = await Car.findById(id);

  res.render("cars/show", { car });
});

// PUT /cars/:id
app.put("/cars/:id", async (req, res) => {
  const { id } = req.params;
  const { make, model, year, horsepower, color } = req.body;
  await Car.findByIdAndUpdate(id, { make, model, year, horsepower, color });
  res.redirect(`/cars/${id}`);
});

app.get("/test", (req, res) => {
  res.render("test");
});

// DELETE /cars/:id
app.delete("/cars/:id", async (req, res) => {
  const { id } = req.params;
  await Car.findByIdAndDelete(id);
  res.redirect("/cars");
});

app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
});
