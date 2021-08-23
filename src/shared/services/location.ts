import { BadRequestException, HttpService, Injectable, Scope } from '@nestjs/common';
import { catchError } from 'rxjs/operators';

@Injectable({
})
export class GeoLocationService {
    constructor(private readonly _httpService: HttpService) { }

    // async getLocation(lat: string, long: string) {//, lang: string
    //     const url =
    //         process.env.GEOLOCATION_API_URL +
    //         lat
    //         + ',' + long
    //         + '&key=' + process.env.GEOLOCATION_API_KEY +
    //         '&language=' 
    //         //lang;
    //     const headers = {
    //         accept: 'application/json',
    //         apiKey: process.env.GEOLOCATION_API_KEY,
    //     };

    //     const res = await this._httpService
    //         .get<any>(url, {
    //             headers,
    //         })
    //         .pipe(
    //             catchError((error) => {
    //                 throw new BadRequestException(error);
    //             }),
    //         )
    //         .toPromise();

    //     const result = res.data.results[0].address_components;
    //     let region;
    //     let city ;
    //     let district;
    //     result.forEach(element => {
    //         if (element.types[0] === 'administrative_area_level_1') {
    //             region = element.long_name;
    //         }
    //         if (element.types[0] === 'administrative_area_level_2') {
    //             city = element.long_name;
    //         }
    //         if (element.types[0] === 'political') {
    //             district = element.long_name;
    //         }
    //     });
    //     if (region) {
    //         return { region , city , district } ;
    //      }

    //     {throw new BadRequestException('not found regoin'); }

    // }
    async getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
        var dLon = this.deg2rad(lon2-lon1); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return d;
      }
      
      deg2rad(deg) {
        return deg * (Math.PI/180)
        }
}
