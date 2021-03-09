
import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import {UserRole} from '../auth/user-role.enum'
import * as bcrypt from 'bcryptjs';
import { AbstractEntity } from "src/common/abstract.entity";

@Entity()
// @Unique(['email'])
// @Unique(['phoneNumber'])
export class UserEntity extends AbstractEntity {

    @Column({nullable:true})
    email: string;

    @Column({nullable:true})
    userName: string;

    @Column({nullable:true})
    password: string;

    @Column({nullable:true})
    salt: string;

    @Column({nullable:true})
    phone_number :string;
 
    @Column({nullable:true})
    userRole:UserRole;


    // @OneToOne(type =>Restaurant,Restaurant=>Restaurant)
    // @JoinColumn()
    // Restaurant:Restaurant;
    

     async validateLogin(password:string):Promise<boolean>{
        const hash=await bcrypt.hash(password,this.salt);


        return hash===this.password
        
            }

 

}
 