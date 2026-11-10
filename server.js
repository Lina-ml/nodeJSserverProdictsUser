
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/router.js";
import routeUser from "./routes/routeUser.js";
import fileUpload from "express-fileupload";
import { fileURLToPath } from "url";
import path from "path";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 5000;


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json()); 
app.use(fileUpload({}));
app.use("/files", express.static(path.resolve(__dirname, "files")));

app.use(router);
app.use(routeUser);


mongoose
  .connect("mongodb://localhost:27017/products")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Ошибка подключения к БД:", err);
  });

    // 1 method  2 path      3 handler  4 params
// app.get("/products", async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//     console.log(products);
//   } catch (error) {
//     console.log("Ошибка при получении продуктов: " + error);
//   }
// });

// app.post("/addproduct", async (req, res) => {
//   const { title, description, price } = req.body;
//   const newProduct = await Product.create({
//     title,
//     description,
//     price,
//   });

//   await newProduct.save();
//   res.send("Продукт успешно добавлен!");
// });

// app.patch("/product/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, description, price } = req.body;
//     const updateProduct = await Product.findByIdAndUpdate(id, {
//       title,
//       description,
//       price,
//     });

//     if(!updateProduct){
//       res.send("Такого товара не существует!")
//     }

//     res.send("Данные успешно изменены!");
//   } catch (error) {
//     console.log("Ошибка, не удалось выполнить команду: " + error);
    
//   }
// });


// app.put("/product/:id", async (req , res)=>{
//   try{
//     const {id} = req.params
//     const {title , description , price } = req.body

//     const updateProduct = await Product.findByIdAndUpdate(id , {title , description , price} )
    
//   }catch(error){
      
//   }
// })

// app.delete("/deleteproduct/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log(id);

//     const product = await Product.findByIdAndDelete(id);
//     res.send("Продукт успешно удален!");
//   } catch (error) {
//     console.log("Ошибка при удалении продукта: " + error);
//   }
// });

app.listen(PORT, () => {
  console.log("Сервер успешно запущен на порту: " + PORT);
});
