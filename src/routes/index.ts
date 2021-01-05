import { Router } from 'express';
import AppointmentRouter from './AppointmentRouter';
import UserRouter from './UserRouter';
import sessionRouter from './SessionRouter';

const routes = Router();

routes.use('/appointments', AppointmentRouter);
routes.use('/users', UserRouter);
routes.use('/session', sessionRouter);

export default routes;
