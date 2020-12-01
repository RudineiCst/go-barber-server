import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import CreateAppointmentService from '../services/CreateAppointmentService';
import AppointmentRepository from '../repositories/AppointmentsRepository';

const appointmentRouter = Router();

appointmentRouter.get('/', (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  const appointments = appointmentRepository.find();
  return response.json(appointments);
});

appointmentRouter.post('/', async (request, response) => {
  const { provider, date } = request.body;
  console.log(request.body);
  try {
    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService();

    const appointment = await createAppointmentService.execute({
      date: parsedDate,
      provider,
    });
    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

export default appointmentRouter;
