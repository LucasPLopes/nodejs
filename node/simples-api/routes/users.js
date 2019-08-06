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
    app.route('/user/:id?')
        .get((req,res)=>{
            const users = getUsers()
            res.send({users})

        })
        .post((req,res)=>{
            const users = getUsers()
            // const {email, telefone} = req.body

            users.push(req.body)
            saveUser(users)
            res.status(201).send("POST OK")

        })
        .put((req,res)=>{
            const users = getUsers()
            saveUser(users.map(user =>{
                if( user.id === req.params.id){
                    return{
                        ...user,
                        ...req.body
                    }
                }

                return user
            }))
            res.status(200).send("PUT OK")
        })
        .delete((req,res)=>{
            const users = getUsers()
            saveUser(users.filter(u => u.id !== req.params.id))

            res.status(200).send("DELETE OK")
        })
}
module.exports = userRoute
