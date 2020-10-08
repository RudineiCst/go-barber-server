import { Router } from 'express';
import { parseISO } from 'date-fns';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentRouter = Router();

appointmentRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;
    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService();

    const appointment = createAppointmentService.execute({
      date: parsedDate,
      provider,
    });
    return response.json(appointment);
  } catch (err) {
    return response.json({ message: err.message });
  }
});

export default appointmentRouter;
