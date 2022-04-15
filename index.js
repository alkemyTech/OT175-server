const server = require("./app");
const { sequelize } = require("./models/index");
const port = process.env.PORT || 3001;
const Model = require('./models');
const {User, Role} = Model

// console.log(models.User)
async function tuVieja(){
    try {
        await User.create({
          firstName: 'juan',
          lastName: 'Itu',
          email: 'juan@itu.com',
          photo: 'hola',
          password: 'ultrasecreta',
          roleId: 1
        })
        
    } catch (error) {
        console.log(error)
    }
  }
  
  
sequelize
  .sync({ force: true })
  .then(async () => {
    console.log("DB connected!");
    server.listen(port, async () => {
      console.log(`Server listen in port ${port}`)
      await Role.create('admin')
      tuVieja()
    });
  })
  .catch((e) => console.log("connection failed", e));

