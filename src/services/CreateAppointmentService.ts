import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import Appointment from '../model/Appointment';

interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  public execute({ date, provider }: RequestDTO) {
    const appointmentRepository = getCustomRepository(AppointmentsRepository);
    const dateFomated = startOfHour(date);

    const findSameDate = appointmentRepository.findByDate(dateFomated);

    if (findSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = appointmentRepository.create();
  }
}

export default CreateAppointmentService;
