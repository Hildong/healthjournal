import bcrypt from 'bcrypt'
import { User } from '../../models/user.model';

class ClientService {
    async registerUser({email, password, username} : {email: string, password: string, username: string}) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const findUser = await User.find({email: email})
        console.log(findUser)
        if(findUser.length <= 0) {
            console.log("yeah")
            const newUser = new User({email: email, password: hashedPassword, username: username})
            newUser.save()
            return newUser
        } else {
            console.log("no")
            return null
        }
    }
}

export default new ClientService