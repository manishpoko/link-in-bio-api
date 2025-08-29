import express from "express"
import bcrypt from "bcryptjs";

import { PrismaClient } from "@prisma/client";
//import type { Request, Response } from "express";

const app = express();

app.use(express.json());
const PORT = 3000;  

const prisma = new PrismaClient()

app.post('/api/register', async (req, res) => {
    //const username = req.body.username;
    //const password = req.body.password;
    try {
        const {username, password} = req.body

        const salt = await bcrypt.genSalt(10);

        const hashedPassword= await bcrypt.hash(password, salt)
        res.status(200).json({message: `user - ${username} registered successfully `})
        
    } catch (error) {
        console.error("error registering user", error)
            return res.status(400).json({error: "error hashing password"})
    }
 
})

app.listen(PORT, () => {
    console.log(`server starting at port ${PORT}`)
})