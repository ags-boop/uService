export class UserExistException extends Error {
    constructor(message: string) {
        super(message);

        // Ajusta el nombre de la clase a tu error personalizado
        this.name = 'UserExistException';

        // Asegura que el stack trace esté correctamente formateado
        // if (Error.captureStackTrace) {
        //     Error.captureStackTrace(this, UserExistException);
        // }
    }
}