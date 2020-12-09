import { Router} from 'express';
import CreateUserService from '../services/CreateUserService';

const userRouter = Router();

userRouter.get('/', async(request, response)=> {
    return response.send('');

})

userRouter.post('/', async(request, response)=>{
    const {name, email, password }= request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({name,email,password});

    return response.status(200).json(user);
})

export default userRouter;