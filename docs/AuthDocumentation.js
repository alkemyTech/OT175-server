/**
 * @swagger
 * components:
 *  schemas:
 *    Auth1:
 *      type: object
 *      properties:
 *        firstName:
 *          type: string
 *          description: the user firstName
 *        lastName:
 *          type: string
 *          description: the user lastName
 *        email:
 *          type: string
 *          description: the user email
 *        image:
 *          type: string
 *          description: the user image
 *        password:
 *           type: string
 *           description: the password for account
 *      required:
 *        - firstName
 *        - lastName
 *        - email
 *        - image
 *        - password
 *      example:
 *        firstName: Juan 
 *        lastName: Perez
 *        email: juanperez@mail.com
 *        image: https://www.imagenes.com
 *        password: 123456
 *    Auth2:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          description: the user email
 *        password:
 *           type: string
 *           description: the password for account
 *      required:      
 *        - email       
 *        - password
 *      example: 
 *        email: juanperez@mail.com
 *        password: 123456
 */


/* POST register User. */
/**
 * @swagger
 * /auth/register: 
 *  post:
 *    summary: create a new account
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Auth1'
 *    responses:
 *      200:
 *        description: account created
 *      500:
 *        description: An internal server error occurred
 */

/* POST login User. */
/**
 * @swagger
 * /auth/login: 
 *  post:
 *    summary: loggin 
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Auth2'
 *    responses:
 *      200:
 *        description: loggin 
 *      500:
 *        description: An internal server error occurred
 */
