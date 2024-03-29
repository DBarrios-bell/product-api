import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";

export const verifyToken = async (req, res, next) => {
    try {

        const token = req.headers["x-access-token"];

        console.log(token);
        if (!token) return res.status(403).json({ message: "No token Provided" })

        const decoded = jwt.verify(token, config.SECRET)
        req.userId = decoded.id;

        const user = await User.findById(req.userId, { password: 0 })
        if (!user) return res.status(404).json({ message: "no user found" })
        
        next()
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' })
    }
}