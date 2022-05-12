/**
 * @swagger
 * components:
 *  schemas:
 *    Member:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: the member name
 *        facebookUrl:
 *          type: string
 *          description: URL from facebook
 *        instagramUrl:
 *          type: string
 *          description: URL from instagram
 *        linkedinUrl:
 *          type: string
 *          description: URL from linkedin
 *        image:
 *           type: string
 *           description: imagen for member
 *        description:
 *           type: string
 *           description: description for member
 *      required:
 *        - name
 *        - image
 *      example:
 *        name: Juan Pablo
 *        facebookUrl: facebook.com/pablo
 *        instagramUrl: instagran.com/pablo
 *        linkedinUrl: linkedin/pablo
 *        image: https://www.imagenes.com
 *        description: description test
 */

/* GET members listing. */
/**
 * @swagger
 * /members: 
 *  get:
 *    security:
 *      - jwt: []
 *    summary: return all members like admin
 *    tags: [Member]
 *    responses:
 *      200:
 *        description: All members
 *        content: 
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Member'
 *      404:
 *        description: There is no members to show
 */

/* POST members. */
/**
 * @swagger
 * /members: 
 *  post:
 *    security:
 *      - jwt: []  
 *    summary: create a new member like admin
 *    tags: [Member]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Member'
 *    responses:
 *      200:
 *        description: Member created
 *      500:
 *        description: An internal server error occurred
 */

/* GET member by ID */
/**
 * @swagger
 * /members/{id}: 
 *  get:
 *    summary: return one member
 *    tags: [Member]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: the member ID
 *    responses:
 *      200:
 *        description: All members
 *        content: 
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Member'
 *      404:
 *        description: There are no registered member
 */

/* PUT member by ID */
/**
 * @swagger
 * /members/{id}: 
 *  put:
 *    security:
 *      - jwt: []  
 *    summary: update a member like admin
 *    tags: [Member]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Member'
 *    responses:
 *      200:
 *        description: Member updated
 *      404:
 *        description: There is no registered member
 */

/* Delete member by ID */
/**
 * @swagger
 * /members/{id}: 
 *  delete:
 *    security:
 *      - jwt: []  
 *    summary: delete one member like admin
 *    tags: [Member]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: the member ID
 *    responses:
 *      200:
 *        description: Member deleted
 *      404:
 *        description: not found member
 */