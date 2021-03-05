import { InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { User } from "../auth/entities/user.entity";
import { CreateAuthDto } from "./dto/create-auth.dto";
const phone = require('phone');

@EntityRepository(User)
export class UserRepository extends Repository<User>{  


    
    async signUp(createAuthDto: CreateAuthDto) {
        const { email, userName,phoneNumber, password, userKind } = createAuthDto;
              const user = new User();
              user.email = email;
              user.userName = userName;
              user.phoneNumber=phone('508907839', 'SAU')
              let z=phone('508907839', 'SAU');
              console.log(z[0])
              user.salt = 'kk'
              user.password =password;
              user.userKind= userKind; 
              try {
                  await user.save(); 
              } 
              catch (error) { 
                console.log(error)   
                throw new InternalServerErrorException(); }
            
            return true;
            }



}