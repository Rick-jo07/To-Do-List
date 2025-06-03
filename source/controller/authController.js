import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';


const prisma = new PrismaClient();


// Register 

export const Register = async (req,res) => {
    const {email, password, name} = req.body;
    try {
        const existingUser = await prisma.user.findUnique({
            where : {email}}
        );

        if (existingUser) return res.status(400).json({message : 'User Already exist'})
        
        const HashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.User.create(
            {data : { email, name , password : HashedPassword }
        });
        req.session.user = {
            id : user.userid,
            email : user.email,
            name : user.name
    } 

       

        res.status(200).json({message : 'User Created', user :{ id:user.id, email: user.email}});
    } catch (err) {
        res.status(500).json({message : 'Server Error'})
    }
}

// Login 

export const login = async (req,res) => {
    const {email, password} = req.body;
    try {
        const user = await prisma.User.findUnique({
            where : {email}}
        );
        
        if(!user) return  res.status(400).json({message: 'Invalid Credentials'});
        const valid = await bcrypt.compare(password, user.password)
        if(!valid) return res.status(400).json({message : 'Invalid Credentials'})
        req.session.user = {
                id : user.userid,
                email : user.email,
                name : user.name
        } 
        res.status(200).json({message: 'Logged In'})
    } catch (err) {
        res.status(500).json({message : 'Server Error'})
    }
}

// logout
export const logout = async (req,res) => {
    req.session.destroy((err) => {
        if(err) return res.status(500).json({ message : 'Logout Failed'});
        res.clearCookie('connect.sid');
        res.status(200).json({ message : 'Logout Success' })
    })
}