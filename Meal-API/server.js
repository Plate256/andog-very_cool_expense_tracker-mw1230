const express = require("express");

const app = express();
const PORT = 3000;

const foods = [
    { id: 1, name: "Garlic Fried Rice (Sinangag)", price: 60 },
    { id: 2, name: "Sunny-Side-Up Egg over Rice", price: 70 },
    { id: 3, name: "Tomato and Onion Omelette (Estradong Itlog)", price: 85 },
    { id: 4, name: "Egg Drop Soup", price: 55 },
    { id: 5, name: "Classic Egg Salad", price: 80 },
    { id: 6, name: "Garlic Butter Pasta", price: 120 },
    { id: 7, name: "Spaghetti Aglio e Olio (Garlic and Oil)", price: 130 },
    { id: 8, name: "Instant Pancit Canton with Boiled Egg", price: 110 },
    { id: 9, name: "Creamy Macaroni and Cheese", price: 125 },
    { id: 10, name: "Sesame Peanut Noodles", price: 140 },
    { id: 11, name: "Chicken Adobo", price: 160 },
    { id: 12, name: "Pork Tocino", price: 150 },
    { id: 13, name: "Pan-Seared Pork Chops", price: 170 },
    { id: 14, name: "Crispy Fried Chicken Wings", price: 180 },
    { id: 15, name: "Garlic Butter Shrimp", price: 190 },
    { id: 16, name: "Canned Sardines with Misua Noodles", price: 90 },
    { id: 17, name: "Grilled Cheese Sandwich", price: 95 },
    { id: 18, name: "Classic Tuna Mayo Sandwich", price: 100 },
    { id: 19, name: "Stir-Fried Cabbage and Carrots", price: 75 },
    { id: 20, name: "Sautéed Spinach with Garlic", price: 70 }
];

// Retrieve all foods
app.get("/api/foods", (req, res) => {
    res.json(foods);
});

// Retrieve one food by id
app.get("/api/foods/:id", (req, res) => {
    const id = Number(req.params.id);
    const food = foods.find((food) => food.id === id);

    if (!food) {
        return res.status(404).json({
            message: "Food not found"
        });
    }

    res.json(food);
});

app.use(express.static(__dirname));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

