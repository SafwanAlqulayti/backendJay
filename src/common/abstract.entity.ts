import { uuid } from "aws-sdk/clients/customerprofiles";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class AbstractEntity {
    @PrimaryGeneratedColumn()
    id:uuid;

    @CreateDateColumn({nullable:true})
    created: Date ;

    @UpdateDateColumn({nullable:true})
    updatedAt:Date;

}