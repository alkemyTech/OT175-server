const models = require('./../models');
const { News }  = models;

const NewsCtrl = {};

NewsCtrl.create = async(req, res) => { //agregar middleware de validacion de datos
    try{
        const data = req.body;
        
        const article = await News.create(data);
        return res.status(200).json(article)

    }catch(err){
        console.error(err);
        return res.status(500).send('internal server error. could not create');
    };
}
NewsCtrl.getAll = async(req, res) => {
    try{
        const articles = await News.findAll({
            where: {deletedAt: 0},
            include: 'category'
        });
        if(articles.length===0){
            return res.status(404).send('News is empty')
        };
        return res.status(200).json(articles)

    }catch(err){
        console.error(err)
        return res.status(500).send('internal server error. could not get News');
    };

};
NewsCtrl.getOne = async(req, res) => {
    try{    
        const { id } = req.params;

        const article = await News.findByPk(
            id, 
            {include: 'category'}
        );

        if(!article){
            return res.status(404).send('article not found');
        }else{
            return res.json(article) 
        };

    }catch(err){
        console.error(err)
        return res.status(500).send('internal server error. could not get News');
    };   
};
NewsCtrl.getByCategory = async(req, res) => {
    try{    
        const { id } = req.params;

        const articles = await News.findAll({
            where: {categoryId: id}
        });

        if(!articles){
            return res.status(404).send('No articles found')
        }else{
            return res.json(articles)
        };

    }catch(err){
        console.error(err)
        return res.status(500).send('internal server error. could not get News');
    }   
};
NewsCtrl.update = async(req, res) => {
    try{    
        const { id } = req.params;
        const data = req.body;

        const article = News.update(data, {
            where:{id: id}
        });

        if(!article){
            return res.status(404).send('article not found')
        }else{
            return res.json(article)
        };

    }catch(err){
        console.error(err)
        return res.status(500).send('internal server error. could not get News');
    }
};
NewsCtrl.deleteOne = async(req, res) => {
    try{    
        const { id } = req.params;

        News.delete({
            where:{id: id}
        }).then(()=>{
            return res.status(200).send('article successfully deleted')
        }).catch((err)=>{
            console.error(err)
            return res.status(404).send('article not found')
        });
        
    }catch(err){
        console.error(err)
        return res.status(500).send('internal server error. could not get News');
    }
};

module.exports = NewsCtrl
