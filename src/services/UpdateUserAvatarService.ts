import {getRepository} from 'typeorm';
import User from '../models/User';
import path from 'path';
import uploadConfig from '../config/upload';
import fs from 'fs'

interface Request{
  user_id:string,
  avatarFilename:string
}
class UpdateUserAvatarService{
  public async execute({user_id, avatarFilename}:Request):Promise<void>{
  const userRepository = getRepository(User);

  const user = await userRepository.findOne(user_id)
  if(!user){
    throw new Error('only authenticated users can change avatar');
  }

  if(user.avatar){
    //Deletar o avatar
    const usaerAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
    const userAvatarExists = await fs.promises.stat(usaerAvatarFilePath);

  }


  }
}
