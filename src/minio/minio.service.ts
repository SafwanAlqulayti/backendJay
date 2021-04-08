import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { GetObjectOutput, ListBucketsOutput } from 'aws-sdk/clients/s3';
import { InjectS3 } from 'nestjs-s3';
// import { InjectS3 } from 'nestjs-s3';
// import { BucketDto } from './dto/bucketDto';
// import { PromiseResponse } from './dto/responses';
 
@Injectable()
export class MinioClientService {
 constructor(
 @InjectS3() private readonly s3: S3,
 ) { }
 public bucket = process.env.MINIO_BUCKET
 
 async getAllBuckets(): Promise<ListBucketsOutput> {
 return await new Promise((resolve, reject) => {
 this.s3.listBuckets( (err, buckets) => {
 if (err) {
 return reject(err)
 }
 return resolve(buckets)
 })
 })
 }
 
 async putOpject(opject, data): Promise<any> {
 let key = await new Date().getTime().toString();
 let params = { Bucket: data.Bucket, Key: key, Body: opject.buffer };
 return await this.uploud(params)
 }
 
 uploud(params): Promise<any> {
 let fileUrl = `localhost:3000/minio-client/download/${params.Bucket}/${params.Key}`
 return new Promise((resolve, reject) => {
 return this.s3.putObject(params, async (err, eTag) => {
 if (err) {
 let errorCheck = await this.errorsCheck(err)
 if (errorCheck) {
 resolve(errorCheck)
 } else {
 return reject(err);
 }
 }
 return resolve({
 message: `opject has been uploaded file link ${fileUrl}`,
 success: true
 });
 }
 );
 });
 }
 
 async downloadFile(bucket, id):Promise<any> {//GetObjectOutput
 let params = { Bucket: bucket, Key: id };
 return new Promise((resolve, reject) => {
 this.s3.getObject(params, async (err, dataStream) => {
 if (err) {
 let errorCheck = await this.errorsCheck(err)
 if (errorCheck) {
 resolve(errorCheck)
 } else {
 return reject(err)
 }
 }
 return resolve(dataStream.Body)
 })
 })
 }
 
 removeOpject(data): Promise<any> {
 return new Promise((resolve, reject) => {
 this.s3.deleteObject(data, async (err) => {
 if (err) {
 let errorCheck = await this.errorsCheck(err)
 if (errorCheck) {
 resolve(errorCheck)
 } else if (err === null) {
 return resolve({//return even if the key does not exist
 message: 'The specified key does not exist.',
 success: false
 })
 } else {
 return reject(err)
 }
 }
 return resolve({
 message: 'The opject removed successfully',
 success: true
 });
 })
 })
 }
 
 async removeBucket(data): Promise<any> {
 return new Promise((resolve, reject) => {
 this.s3.deleteBucket(data, async (err) => {
 if (err) {
 let errorCheck = await this.errorsCheck(err)
 if (errorCheck) {
 resolve(errorCheck)
 } else {
 return reject(err)
 }
 }
 return resolve({
 message: 'Bucket removed successfully.',
 success: true
 })
 })
 })
 }
 
 makeBucket(data): Promise<any> {
 return new Promise((resolve, reject) => {
 return this.s3.createBucket(data, async (err) => {
 if (err) {
 let errorCheck = await this.errorsCheck(err)
 if (errorCheck) {
 resolve(errorCheck)
 } else {
 return reject(err);
 }
 }
 return resolve({
 message:
 'Bucket created successfully in ',
 success: true
 });
 });
 });
 }
 
 bucketExists(data): Promise<any> {
 return new Promise((resolve, reject) => {
 this.s3.getBucketLocation(data, async (err, exists) => {
 if (err) {
 let errorCheck = await this.errorsCheck(err)
 if (errorCheck) {
 resolve(errorCheck)
 } else {
 return reject(err)
 }
 } if (exists) {
 return resolve({
 message: 'Bucket is already exists.',
 success: true
 })
 }
 })
 })
 }
 
 listOpjects(Bucket) {
 return new Promise((resolve, reject) => {
 this.s3.listObjects(Bucket, async (err, data) => {
 if (err) {
 let errorCheck = await this.errorsCheck(err)
 if (errorCheck) {
 resolve(errorCheck)
 } else {
 return reject(err)
 }
 }
 return resolve(data)
 })
 })
 }
 
 errorsCheck(err) {
 if (err.code === 'NoSuchBucket') {
 return {
 message: 'Bucket does not exists .',
 success: false
 }
 } else if (err.code === 'NoSuchKey') {
 return {
 message: 'The specified key does not exist.',
 success: false
 }
 } else if (err.code === 'BucketAlreadyOwnedByYou') {
 return {
 message: 'Bucket already exists ',
 success: false
 }
 } else if (err.code === 'BucketNotEmpty') {
 return {
 message: 'The bucket you tried to delete is not empty',
 success: false
 }
 } else if (err.code === 'NoSuchKey') {
 return {
 message: 'The specified key does not exist.',
 success: false
 }
 }
 return false
 }
}