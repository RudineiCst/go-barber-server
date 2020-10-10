import { Router } from 'express';
import AppointmentRouter from './AppointmentRouter';

const routes = Router();

routes.use('/appointments', AppointmentRouter);

export default routes;
