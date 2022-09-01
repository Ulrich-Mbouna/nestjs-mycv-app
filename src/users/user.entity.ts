import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterRemove, AfterUpdate } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

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