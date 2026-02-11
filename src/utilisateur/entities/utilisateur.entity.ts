import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity , PrimaryGeneratedColumn, TableInheritance } from "typeorm";
import* as argon2 from 'argon2';
@Entity("utilisateur")
@TableInheritance({column:{type:"varchar",name:"role"}})
export class Utilisateur extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    nom:string
    @Column()
    prenom:string
    @Column()
    email:string
    @Column()
    password:string
    @Column()
    dateInscription:Date
    @Column()
    telephone:string
    @Column()
    role:string

    @BeforeInsert()
    @BeforeUpdate()
    async hashPssword(){
        if(this.password&& !this.password.startsWith("$argon2")){
            this.password=await argon2.hash(this.password);
        }
    }
}
