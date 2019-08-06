const fs = require('fs')
const{ join} = require('path')

const file_path  = join(__dirname, 'users.json')
const getUsers= () =>{
    const data = fs.existsSync(file_path)
        ?   fs.readFileSync(file_path)
        : []
    try {
        return JSON.parse(data)
    } catch (error) {
        return []        
    }
}

const saveUser = (user)=>{
    fs.writeFileSync(file_path,JSON.stringify(user,null,'\t'))
}
const userRoute = (app)=>{
    app.route('/user/:id')
        .get((req,res)=>{
            const users = getUsers()
            res.send({users})
        })
}
module.exports = userRoute