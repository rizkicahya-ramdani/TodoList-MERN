import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/userModel';

interface DecodedToken {
    id: string;
}

interface AuthenticatedRequest extends Request {
    user?: IUser;
}

export const protect = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const secret = process.env.JWT_SECRET;
            if (!secret) {
                throw new Error('JWT_SECRET is not defined');
            }

            const decoded = jwt.verify(token, secret) as DecodedToken;

            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            next();
        } catch (error) {
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};