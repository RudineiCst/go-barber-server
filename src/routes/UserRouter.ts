import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';


const userRouter = Router();

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

export default userRouter;
