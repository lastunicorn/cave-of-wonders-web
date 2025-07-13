import { HttpContext, HttpHeaders, HttpRequest } from '@angular/common/http';
import { SSL_VERIFY } from './self-signed-certificate.interceptor';
import type { Agent } from 'https';

/**
 * Extended RequestInit interface that includes Node.js specific properties
 */
interface NodeRequestInit extends RequestInit {
    agent?: Agent;
}

/**
 * Custom fetch options factory that disables SSL verification when needed
 */
export function createFetchOptions(
    req: HttpRequest<unknown>,
    context: HttpContext
): NodeRequestInit {
    // Default options for fetch
    const options: NodeRequestInit = {
        method: req.method,
        headers: createHeaders(req.headers),
        body: req.serializeBody(),
        mode: 'cors',
        credentials: 'same-origin',
        redirect: 'follow',
    };

    // Disable SSL verification if requested
    if (context.get(SSL_VERIFY) === false) {
        console.log('Disabling SSL verification for request:', req.url);
        // Setting agent for Node.js environment (SSR)
        if (typeof process !== 'undefined' && process.versions?.node) {
            // Using dynamic import to avoid TypeScript errors
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const https = require('https');
            options.agent = new https.Agent({
                rejectUnauthorized: false
            });
        }

        // For browser environment, handled via HttpClient configuration
    }

    return options;
}

/**
 * Create fetch headers from Angular HttpHeaders
 */
function createHeaders(headers: HttpHeaders): HeadersInit {
    const headersInit: HeadersInit = {};
    headers.keys().forEach(key => {
        const values = headers.getAll(key);
        if (values !== null) {
            headersInit[key] = values.join(',');
        }
    });
    return headersInit;
}
