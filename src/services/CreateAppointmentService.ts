import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import Appointment from '../models/Appointment';

interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ date, provider }: RequestDTO): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentsRepository);
    const dateFormated = startOfHour(date);

    const findAppointment = await appointmentRepository.findByDate(
      dateFormated,
    );

    if (findAppointment) {
      throw Error('This appointment is already booked');
    }
    // cria um objeto da entidade do banco de dados (uma instancia)
    const appointment = appointmentRepository.create({
      provider,
      date: dateFormated,
    });
    // salva o appointment o registro banco de dados
    await appointmentRepository.save(appointment);
    return appointment;
  }
}

export default CreateAppointmentService;
