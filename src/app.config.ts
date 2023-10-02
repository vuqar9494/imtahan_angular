import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAppConfig } from './app/Models/app-config.model';
import { lastValueFrom } from 'rxjs';




@Injectable()
export class AppConfig {
    static settings: IAppConfig;
    constructor(private http: HttpClient,
    ) { }
    load() {
        //const jsonFile = `assets/config/config.${environment.name}.json`;
        const jsonFile = `assets/config/config.json`;
        console.log(jsonFile);
        
        return new Promise<IAppConfig>((resolve, reject) => {
            this.http.get(jsonFile).toPromise().then((response: IAppConfig) => {
                AppConfig.settings = <IAppConfig>response;
                resolve(<IAppConfig>response);
            }).catch((response: any) => {
                reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
            });
        });
        
        // return new Promise<IAppConfig>((resolve, reject) => {
        //     const configSetting = this.http.get(jsonFile);
        //     lastValueFrom(configSetting).then((response: IAppConfig) => {
        //         AppConfig.settings = <IAppConfig>response;
        //         resolve(<IAppConfig>response);
        //              }).catch((response: any) => {
        //                  reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
        //             });
        //          });
    }
}
