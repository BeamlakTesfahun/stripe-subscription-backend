import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { prisma } from '../config/prisma.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from './asyncHandler.js';

export const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer ')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        throw new AppError('Unauthorized access.', 401, 'UNAUTHORIZED');
    }

    let decoded;

    try {
        decoded = jwt.verify(token, env.jwtSecret);
    } catch {
        throw new AppError('Invalid or expired token.', 401, 'UNAUTHORIZED');
    }

    const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
            id: true,
            fullName: true,
            email: true,
            createdAt: true,
        },
    });

    if (!user) {
        throw new AppError('User not found.', 404, 'NOT_FOUND');
    }

    req.user = user;
    next();
});
