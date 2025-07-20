export class Environment {
    static isServerEnvironment(): boolean {
        return typeof window === 'undefined';
    }

    static isBrowserEnvironment(): boolean {
        return !Environment.isServerEnvironment();
    }

    static isDevelopmentMode(): boolean {
        // Check for Node.js environment
        if (Environment.isServerEnvironment()) {
            return process.env['NODE_ENV'] !== 'production';
        }

        // Check for browser environment
        return window.location.hostname === 'localhost' ||
            window.location.hostname === '127.0.0.1';
    }
}
