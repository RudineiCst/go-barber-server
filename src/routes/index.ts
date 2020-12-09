import { Router } from 'express';
import AppointmentRouter from './AppointmentRouter';
import UserRouter from './UserRouter';

const routes = Router();

routes.use('/appointments', AppointmentRouter);
routes.use('/users', UserRouter);

export default routes;
