import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middleware/ensureAuthenticated';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import multer from 'multer';
import uploadConfig from '../config/upload';

const userRouter = Router();

const upload = multer(uploadConfig);

userRouter.get('/', async (request, response) => {
  return response.send('');
});

userRouter.post('/', async (request, response) => {
  try{
  const { name, email, password } = request.body;

  const createUserService = new CreateUserService();

  const user = await createUserService.execute({ name, email, password });


  const userWithoutPassword = {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };

  return response.status(200).json(userWithoutPassword);
  }
  catch(err){
    return response.status(400).json(err.message);
  }

});

userRouter.patch('/avatar',
ensureAuthenticated,
upload.single('avatar'),
async (request, response)=>{
  console.log(request.file);
  try{
    const updateUserAvatar = new UpdateUserAvatarService();
    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename
    })

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    response.json(userWithoutPassword);

  }catch(err){
    response.status(400).json({error: err.message})
  }


})

export default userRouter;
