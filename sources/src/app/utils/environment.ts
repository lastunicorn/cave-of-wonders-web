/**
 * Helper functions to detect environment
 */

/**
 * Determines if code is running in a server-side rendering environment
 */
export function isServerEnvironment(): boolean {
    return typeof window === 'undefined';
}

/**
 * Determines if code is running in a browser environment
 */
export function isBrowserEnvironment(): boolean {
    return !isServerEnvironment();
}

/**
 * Determines if the application is running in development mode
 */
export function isDevelopmentMode(): boolean {
    // Check for Node.js environment
    if (isServerEnvironment()) {
        return process.env['NODE_ENV'] !== 'production';
    }

    // Check for browser environment
    return window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1';
}
