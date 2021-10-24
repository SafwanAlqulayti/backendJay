import { Repository, FindConditions, FindOneOptions } from 'typeorm';
import { AbstractEntity } from 'src/common/abstract.entity';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ObjectId } from 'aws-sdk/clients/codecommit';

/**
 * Abstract base service that other services can extend to provide base CRUD
 * functionality such as to create, find, update and delete data.
 */
@Injectable()
export abstract class AbstractService<T extends AbstractEntity> {
  private readonly modelName: string;

  /**
   * The constructor must receive the injected model from the child service in
   * order to provide all the proper base functionality.
   *
   * @param {Logger} logger - The injected logger.
   * @param {Model} model - The injected model.
   */
  constructor(
    private readonly repo: Repository<T>,
  ) {
    // Services who extend this service already contain a property called
    // 'logger' so we will assign it to a different name.

    // for (const modelName of Object.keys(model.collection.conn.models)) {
    //   if (model.collection.conn.models[modelName] === this.model) {
    //     this.modelName = modelName;
    //     break;
    //   }
    // }
  }

  /**
   * Find one entry and return the result.
   *
   * @throws InternalServerErrorException
   */
//   async findOne1(
//     criteria?: FindConditions<T> | string | number | ObjectId,
//     options?: FindOneOptions<T>,
//   ): Promise<T> {
//     try {
//       return await this.repo.findOne(
//         criteria,
//         options
//       );
//     } catch (err) {
//       Logger.error(`Could not find ${this.modelName} entry:`);
//       Logger.error(err);
//       throw new InternalServerErrorException();
//     }
//   }

  async findOne(
    criteria?: FindConditions<T> | string | number | ObjectId,
    options?: FindOneOptions<T>,
): Promise<T>;
async findOne(options?: FindOneOptions<T>): Promise<T>;
async findOne(
    criteria?: never,
    options?: FindOneOptions<T>,
): Promise<T> {
    return this.repo.findOne(criteria, options);
}
  // More methods here such as: create, update and delete.
}
