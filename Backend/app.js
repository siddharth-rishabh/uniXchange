import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
const app = express();
import productRoutes from './routers/productRoutes.js';
import userRoutes from './routers/userRoutes.js';


app.use(cors());
app.use(express.json());

// Serve static files from the React app build directory
app.use(express.static(path.join(process.cwd(), 'Frontend', 'dist')));

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(()=> {console.log("MongoDB is connected")})
.catch((err)=> {console.log("MongoDB error:", err)});

app.get("/",(req,res)=>{
    res.send("Server is running");
});

// Catch-all handler: send back index.html for any request that doesn't match an API route
app.use((req, res) => {
  res.sendFile(path.join(process.cwd(), 'Frontend', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{console.log(`server is running at http://localhost:${PORT}`)});