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
  public async execute({user_id, avatarFilename}:Request):Promise<User>{
  const userRepository = getRepository(User);

  const user = await userRepository.findOne(user_id)
  if(!user){
    throw new Error('only authenticated users can change avatar');
  }

  if(user.avatar){
    //Deletar o avatar
    const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
    // 1° parametro é o caminho do novo arquivo que ira subistituir o caminho do 2°parametro
    // que já estava armazenado
    const userAvatarExists = await fs.promises.stat(userAvatarFilePath);
    //👆faz uma verificação de status, para saber se existe arquivo

    if(!userAvatarExists){
      await fs.promises.unlink(userAvatarFilePath)
    }
  }

  user.avatar = avatarFilename;

  await userRepository.save(user);

  return user
  }
}
export default UpdateUserAvatarService;
