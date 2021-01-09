import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

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


  // delete user.password;

  return response.status(200).json(user);
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

  response.json({ok :true});
})

export default userRouter;
