

import jwt from 'jsonwebtoken';
import { env }  from '../config/env.js';
import { ApiError } from '../errors/ApiError.js';

export interface JwtPayload {
  userId?: string;      // For hosts
  guestId?: string;     // For guests
  email?: string;       // For hosts
  name: string;
  role: 'host' | 'guest';
  roomId?: string;      // For guests (which room they're in)
}

export interface DecodedToken extends JwtPayload {
  iat: number;
  exp: number;
}

/**
 * Generate JWT token for host
 */
export const generateHostToken = (payload: {
  userId: string;
  email: string;
  name: string;
}): string => {
  const tokenPayload: JwtPayload = {
    userId: payload.userId,
    email: payload.email,
    name: payload.name,
    role: 'host',
  };

  return jwt.sign(tokenPayload, env.JWT_SECRET, {
    expiresIn: env.JWT_HOST_EXPIRY,
  });
};

/**
 * Generate JWT token for guest
 */
export const generateGuestToken = (payload: {
  guestId: string;
  name: string;
  roomId: string;
}): string => {
  const tokenPayload: JwtPayload = {
    guestId: payload.guestId,
    name: payload.name,
    role: 'guest',
    roomId: payload.roomId,
  };

  return jwt.sign(tokenPayload, env.JWT_SECRET, {
    expiresIn: env.JWT_GUEST_EXPIRY,
  });
};

/**
 * Verify and decode JWT token
 */
export const verifyToken = (token: string): DecodedToken => {
  try {
    return jwt.verify(token, env.JWT_SECRET) as DecodedToken;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new ApiError(401, 'Token expired. Please login again.');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new ApiError(401, 'Invalid token. Please login again.');
    }
    throw new ApiError(401, 'Authentication failed.');
  }
};

/**
 * Extract token from cookie or Authorization header
 */
export const extractToken = (req: any): string | null => {
  // Check cookie first (preferred method)
  if (req.cookies?.auth_token) {
    return req.cookies.auth_token;
  }

  // Fallback to Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  return null;
};