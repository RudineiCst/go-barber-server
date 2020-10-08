import { Router } from 'express';
import AppointmentRouter from './AppointmentRouter';

const routes = Router();

routes.use('/appointment', AppointmentRouter);

export default routes;
