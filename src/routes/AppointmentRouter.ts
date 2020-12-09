import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import CreateAppointmentService from '../services/CreateAppointmentService';
import AppointmentRepository from '../repositories/AppointmentsRepository';

const appointmentRouter = Router();

appointmentRouter.get('/', async (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentRepository.find();
  return response.json(appointments);
});

appointmentRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;
  try {
    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService();

    const appointment = await createAppointmentService.execute({
      date: parsedDate,
      provider_id,
    });
    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

export default appointmentRouter;
