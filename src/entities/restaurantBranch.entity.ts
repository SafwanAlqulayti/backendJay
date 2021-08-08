import { AbstractEntity } from "src/common/abstract.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { RestaurantFileEntity } from "./restaurantFile.entity";

@Entity('restaurant-branch')

export class RestaurantBranchEntity extends AbstractEntity{

    @Column()
    branchName:string;

  @Column({nullable:false})
  kind: string;

  @Column({nullable:true})
  rate: string;

  @Column({nullable:true})
  latitude: string;

  @Column({nullable:true})
  longitude: string;

  @Column({nullable:true})
  image: string;

  @ManyToOne(()=>RestaurantFileEntity ,(restaurantFile:RestaurantFileEntity)=> restaurantFile.id)
  restaurantFile:RestaurantFileEntity;

}