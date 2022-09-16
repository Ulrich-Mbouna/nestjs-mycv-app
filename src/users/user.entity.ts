import {
  Entity, Column,
  PrimaryGeneratedColumn,
  AfterInsert, AfterRemove,
  AfterUpdate,
    OneToMany
} from "typeorm";
import {Report} from "../reports/reports.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  admin: boolean;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[]

  @AfterInsert()
  logInsert() {
    console.log("Nouvel utilisateur enregistré sous l'id : " + this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log("Utilisateur retiré sous l'id: " + this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log("Utilisarteur mis à jour avec success: " + this.id);
  }

}