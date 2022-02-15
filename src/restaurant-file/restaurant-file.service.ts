import { Repository } from 'typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { S3 } from 'aws-sdk';
import { InjectS3 } from 'nestjs-s3';
import { AuthService } from 'src/auth/auth.service';
import { BranchService } from 'src/branch/branch.service';
import { RestaurantEntity } from 'src/entities/restaurant.entity';
import { RestaurantFileEntity } from 'src/entities/restaurantFile.entity';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { In } from 'typeorm';
import { BucketDto } from './dto/bucketDto';
import { CreateRestaurantFileDto } from './dto/createRestaurantFileDto';
import { RestauranFileRepository } from './restauranFileRepository';
// const bufferImage = require("buffer-image");

@Injectable()
export class RestaurantFileService {
  @InjectRepository(RestaurantFileEntity)
  private readonly _restauranFileRepository: Repository<RestaurantFileEntity>;
  constructor(
    @InjectS3() private readonly s3: S3,
    private _restaurantService: RestaurantService,
  ) {}
  //   async upload(file){
  //       let test = new RestaurantFileEntity
  //       test.id = '1'
  //       test.photos = await file//npm install buffer-image
  //      return this._restauranFileRepository.save(test)

  //   }

  public bucket = process.env.MINIO_BUCKET;

  async putOpject(file, createRestaurantFileDto: CreateRestaurantFileDto) {
    const resturant = await this._restaurantService.findOne({
      id: createRestaurantFileDto.restaurantId,
    });
    const key = await new Date().getTime().toString();
    const params = {
      Bucket: createRestaurantFileDto.bucket,
      Key: key,
      Body: file.buffer,
    };

    const restaurantFile = new RestaurantFileEntity();
    // restaurantFile.restaurantBranches.push(resturant);
    restaurantFile.bucket = createRestaurantFileDto.bucket;
    restaurantFile.mainCourse = createRestaurantFileDto.mainCourse
      ? true
      : false;

    await this._restauranFileRepository.save(restaurantFile);
    return await this.uploud(params);
  }

  uploud(params) {
    const fileUrl = `localhost:3000/minio-client/download/${params.Bucket}/${params.Key}`;
    return new Promise((resolve, reject) => {
      return this.s3.putObject(params, (err, eTag) => {
        if (err) {
          return reject(err);
        }
        return resolve({
          message: 'opject has been uploaded',
          fileUrl: fileUrl,
          success: true,
        });
      });
    });
  }

  downloadFile(bucket, id) {
    const params = { Bucket: bucket, Key: id };
    return new Promise((resolve, reject) => {
      this.s3.getObject(params, function (err, dataStream) {
        if (err) {
          return reject(err);
        }
        return resolve(dataStream.Body);
      });
    });
  }

  async makeBucket(data: BucketDto) {
    //userI
    // let user = await this._authService.findOne({ id: userI.id });
    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    return new Promise((resolve, reject) => {
      return this.s3.createBucket(data, (err) => {
        if (err) {
          if ((err as any).code === 'BucketAlreadyOwnedByYou') {
            return resolve({
              message: 'Bucket ' + data.Bucket + ' already exists ',
              success: false,
            });
          } else {
            return reject(err);
          }
        }
        return resolve({
          message: 'Bucket ' + data.Bucket + ' created successfully in ',
          success: true,
        });
      });
    });
  }
}

// removeOpject(data) {
//     return new Promise((resolve, reject) => {
//       this.s3.deleteObject(data, function (err) {
//         if (err) {
//           ('Unable to remove object', err)
//           return reject(err)
//         }
//         return resolve({
//           message:
//             "Bucket " +
//             data.Bucket +
//             " removed successfully ", success: true
//         });
//       })
//     })
//   }

//   async removeBucket(data) {
//     return new Promise((resolve, reject) => {
//       this.s3.deleteBucket(data, function (err) {
//         if (err) {
//           return reject(err)
//         }
//       })
//       return resolve({
//         message: `Bucket ${data.Bucket} removed successfully.`,
//         success: true
//       })
//     })
//   }

//   bucketExists(bucketName) {
//     return new Promise((resolve, reject) => {
//       this.s3.getBucketLocation(bucketName, function (err, exists) {
//         if (err) {
//           return reject(err)
//         }
//       })
//       return resolve({//return even if bucket is not exists
//         message: `Bucket  ${bucketName} is exists.`
//       })
//     })
//   }

//   listOpjects(Bucket){
//     return new Promise((resolve,reject)=>{
//       this.s3.listObjects(Bucket ,(err,data)=>{
//         if(err){
//           return resolve({
//             message:'The specified bucket does not exist kindly enter a valid name',
//           })
//         }
//         return resolve(data)
//       })
//     })
//   }
