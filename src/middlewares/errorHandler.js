import { AppError } from '../utils/AppError.js';

export const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Something went wrong';
    let code = err.code || 'INTERNAL_SERVER_ERROR';

    // If it's not our custom error, wrap it
    if (!(err instanceof AppError)) {
        statusCode = 500;
        message = 'Internal Server Error';
        code = 'INTERNAL_SERVER_ERROR';
    }

    res.status(statusCode).json({
        success: false,
        message,
        code,
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
    });
};
