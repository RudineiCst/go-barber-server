import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import User from './User';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column() 
  provider_id: string;

  @ManyToOne(()=> User) // função que retorne qual model vai ser usado
  @JoinColumn({ name:'provider_id' })// coluna que representa arelação
  provider: User;



  @Column('time with time zone')
  date: Date;

  @CreateDateColumn()
    created_at: Date;

  @UpdateDateColumn()
    updated_at: Date;

}

export default Appointment;
