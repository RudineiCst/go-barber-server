import {getRepository} from 'typeorm';
import {compare} from 'bcrypt';
import { sign } from 'jsonwebtoken';

import Authconfig from '../config/auth';
import User from '../models/User';

interface Request{
  email: string,
  password:string
}
interface userResponse{
  id:string;
  name: string;
  email:string;
  password?:string;
  created_at: Date;
  updated_at: Date;
}

class AuthenticateUserService{
  public async execute({email, password}: Request):Promise<{user : userResponse, token: string}>{
    const userRepository = getRepository(User);

    //validando se o email existe na banco de dados
    const user = await userRepository.findOne({
      where: {email}
    })
    //caso ele não exista, ira retornar um erro
    if(!user){
      throw Error("incorrect email/password combination")
    }
    //se o email existir, a próxima a ser comparada é a senha
    const passwordMatched = await compare(password , user.password);
    //caso a senha não bata, ira retornar um erro
    if(!passwordMatched){
      throw Error("incorrect email/password combination")
    }

    const {secret, expiresIn} = Authconfig.jwt

    const token = sign({}, secret,{
      subject: user.id,
      expiresIn
    })

    return {user, token}
  }
}
export default AuthenticateUserService;
