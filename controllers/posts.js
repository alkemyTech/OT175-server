const models = require('../models');
const { Post, Role, User } = models;
const jwt = require('jsonwebtoken');
const httpCodes = require('../common/httpCodes');
const handleError = require('../common/handleError');
const { token } = require('morgan');

class PostController {

    static async getPosts( req, res ) {
        const { page } = req.query;

        try{
            const posts = await Post.findAll({ 
                offset: parseInt( page ), 
                limit: 10,
                include: [
                    {
                        model: User,
                        as: 'user'
                    }
                ]
            });
            if( !posts.length ) return res.status(httpCodes.NOT_FOUND).json({ msg: 'There is no registered posts'});
            
            res.status(httpCodes.OK).json(posts);

        } catch (err) {
            console.log(err);
            return handleError.HTTP_ERROR_INTERNAL(err,res);
        }
    }

    static async getPostById( req, res) {
        const { id } = req.params;
        try{
        const post = await Post.findOne({ 
            where: { id },
            include: [
                {
                    model: User,
                    as: 'user'
                }
            ]
        });

        if( !post ) return res.status(httpCodes.NOT_FOUND).json({msg: 'post not found'});

        res.status(httpCodes.OK).json({post});
        } catch (err) {
            console.log(err);
            return handleError.HTTP_ERROR_INTERNAL(err,res);
        }
    }

    static async updatePostById( req, res ) {
        const { id } = req.params;
        const { title, body, image } = req.body;

        try {
            const token = req.headers.authorization.split(" ")[1];
            if ( !token ) return res.json({msg: 'no token in request'});
            const jwtDecoded = jwt.verify( token, process.env.JWT_SECRET );
            
            const post = await Post.findOne({ where: { id }});
            const { name } = await Role.findOne({ where: { 'id': jwtDecoded.roleId } });
            
            if( !post ) return res.status(httpCodes.NOT_FOUND).json({msg: 'post not found'});
            
            if( post.userId !== jwtDecoded.id && name !== 'Admin' ) return res.status(httpCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Acess denied' });

            post.update({
                title,
                body,
                image
            });

            res.status(httpCodes.OK).json({msg: 'Post updated'});
        } catch (err) {
            console.log(err);
            return handleError.HTTP_ERROR_INTERNAL(err,res);
        }
    }

    static async deletePostById( req, res ) {
        const { id } = req.params;

        try {
            const post = await Post.findOne({ where: { id }});

            if( !post ) return res.status(httpCodes.NOT_FOUND).json({msg: 'post not found'});
            
            post.destroy({ where: { id } });

            res.status(httpCodes.OK).json({msg: 'Post deleted'});

        } catch (err) {
            console.log(err);
            return handleError.HTTP_ERROR_INTERNAL(err,res);
        }
    }

    static async createPost( req, res ) {
        const { title, body, image } = req.body;

        try {
            const token = req.headers.authorization.split(" ")[1];

            if ( !token ) return res.json({msg: 'no token in request'});

            const { id } = jwt.verify( token, process.env.JWT_SECRET );
            await Post.create({
                title,
                body,
                image,
                'userId': id 
            });
            
            res.status(httpCodes.OK).json({msg:'Post created'});
        } catch (err) {
            console.log(err);
            return handleError.HTTP_ERROR_INTERNAL(err,res);
        }
    }

}

module.exports = PostController;