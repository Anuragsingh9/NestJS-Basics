import * as bcrypt from 'bcrypt';

/**
 * Send HTTP response
 * @param status 
 * @param message 
 * @param data 
 * @returns 
 */
export function sendHttpResponse(status: number = 200, message: string = 'ok', data: any = []) {
    return { status: status, message: message, data: data };
}

/**
 * Hash password
 * @param password 
 * @returns 
 */
export async function hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

/**
 * Compare password
 * @param plainPassword 
 * @param hashedPassword 
 * @returns 
 */
export async function comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
}