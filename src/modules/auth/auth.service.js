import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../../config/prisma.js';
import { env } from '../../config/env.js';
import { AppError } from '../../utils/AppError.js';

const generateToken = (userId) => {
    return jwt.sign({ userId }, env.jwtSecret, { expiresIn: '7d' });
};

const registerUser = async (payload) => {
    const { fullName, email, password } = payload;

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        throw new AppError('User already exists.', 409, 'CONFLICT');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            fullName,
            email,
            password: hashedPassword,
        },
        select: {
            id: true,
            fullName: true,
            email: true,
            createdAt: true,
        },
    });

    const token = generateToken(user.id);

    return { user, token };
};

const loginUser = async (payload) => {
    const { email, password } = payload;

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new AppError('Invalid email or password.', 401, 'UNAUTHORIZED');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new AppError('Invalid email or password.', 401, 'UNAUTHORIZED');
    }

    const token = generateToken(user.id);

    return {
        user: {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            createdAt: user.createdAt,
        },
        token,
    };
};

export const authService = {
    registerUser,
    loginUser,
};
