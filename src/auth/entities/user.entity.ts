
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
// import * as bcrypt from 'bcrypt' 
// import * as bcrypt from 'bcryptjs';

@Entity()
// @Unique(['email'])
// @Unique(['phoneNumber'])
export class User extends BaseEntity {

     

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    userName: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @Column()
    phoneNumber :string;
 
    @Column()
    userKind:string;


    // @OneToMany(type =>RealStateEntity , realstate=>realstate.admin,{eager:true})
    // realstate:RealStateEntity[];


    //  async validateLogin(password:string):Promise<boolean>{
    //     const hash=await bcrypt.hash(password,this.Salt);


    //     return hash===this.Password
        
    //         }

 

}
 