import { Response } from 'express';

export class EcommerceController {

    private res: Response;

    // Respuesta 200 OK
    successResponse(res: Response, message: string, body: any) {
        res.status(200).json({ status: 200, message,  body });
    }

    // Respuesta 201 Created
    createdResponse(res: Response, message: string, body: any) {
        res.status(201).json({ status: 201, message, body });
    }

    // Respuesta 400 Bad Request
    badRequestResponse(res: Response, message: string, body: JSON) {
        res.status(400).json({ status: 400, message, body });
    }

    // Respuesta 401 Unauthorized
    unauthorizedResponse(res: Response, message: string, body: any) {
        res.status(401).json({ status: 401, message, body });
    }

    // Respuesta 403 Forbidden
    forbiddenResponse(res: Response, message: string, body: any) {
        res.status(403).json({ status: 403, message, body });
    }

    // Respuesta 404 Not Found
    notFoundResponse(res: Response, message: string, body: any) {
        res.status(404).json({ status: 404, message, body });
    }

    // Respuesta 500 Internal Server Error
    internalServerErrorResponse(res: Response, message: string, body: any) {
        res.status(500).json({ status: 500, message, body });
    }
}
