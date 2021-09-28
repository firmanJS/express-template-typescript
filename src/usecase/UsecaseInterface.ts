import { Response } from 'express';

interface IController {
    index(): Response | Promise<Response>;
    create(): Response | Promise<Response>;
    show(): Response | Promise<Response>;
    update(): Response | Promise<Response>;
    delete(): Response | Promise<Response>;
}

export default IController;
