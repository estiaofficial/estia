"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorHandler;
// Error handler to display the error as HTML
// eslint-disable-next-line no-unused-vars, no-shadow
function errorHandler(err, 
// req: Request,
res
// next: NextFunction
) {
    res.status(err.status || 500);
    res.send(`<h1>${err.status || 500} Error</h1>` + `<pre>${err.message}</pre>`);
}
