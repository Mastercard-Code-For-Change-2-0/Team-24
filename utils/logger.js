const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m"
};

const getTimestamp = () => {
    return new Date().toLocaleTimeString();
};

export const logAction = (action, data = {}) => {
    const timestamp = getTimestamp();
    console.log(
        `${colors.dim}[${timestamp}]${colors.reset} ${colors.bright}${colors.green}✓${colors.reset} ${colors.cyan}${action}${colors.reset}`,
        data ? `\n${colors.dim}${JSON.stringify(data, null, 2)}${colors.reset}` : ''
    );
};

export const logError = (error, context = {}) => {
    const timestamp = getTimestamp();
    console.error(
        `${colors.dim}[${timestamp}]${colors.reset} ${colors.bright}${colors.red}✗${colors.reset} ${colors.red}ERROR:${colors.reset} ${error.message}`,
        context ? `\n${colors.dim}Context: ${JSON.stringify(context, null, 2)}${colors.reset}` : '',
        error.stack ? `\n${colors.dim}Stack: ${error.stack}${colors.reset}` : ''
    );
};

export const logRequest = (req) => {
    const timestamp = getTimestamp();
    console.log(
        `${colors.dim}[${timestamp}]${colors.reset} ${colors.bright}${colors.blue}→${colors.reset} ${colors.magenta}${req.method}${colors.reset} ${req.url}`,
        req.body ? `\n${colors.dim}Body: ${JSON.stringify(req.body, null, 2)}${colors.reset}` : ''
    );
};

export const logResponse = (statusCode, data) => {
    const timestamp = getTimestamp();
    const isSuccess = statusCode >= 200 && statusCode < 400;
    console.log(
        `${colors.dim}[${timestamp}]${colors.reset} ${colors.bright}${isSuccess ? colors.green : colors.red}←${colors.reset} ${colors.cyan}Status: ${statusCode}${colors.reset}`,
        data ? `\n${colors.dim}Response: ${JSON.stringify(data, null, 2)}${colors.reset}` : ''
    );
};
