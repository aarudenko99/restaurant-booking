import { Injectable, EventEmitter } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
/*
  Generated class for the GlobalService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GlobalService {
    static LANGUAGE = 'language';
    private language: string;
    private locale: string;

    focusTrigger = new EventEmitter();
    accessApplication = true;
    errorMessage: string;

    onError = new EventEmitter<any>();
    onAlert = new EventEmitter<any>();
    onShowAlert = new EventEmitter<any>();
    onShowLoader = new EventEmitter<any>();
    onHideLoader = new EventEmitter<any>();
    onShowToast = new EventEmitter<any>();
    onNativeLogin = new EventEmitter<any>();
    onRevokedPermission = new EventEmitter<any>();
    onLanguageChange = new EventEmitter<any>();
    onOpenEnrollFilterMenu = new EventEmitter<any>();
    onAppStateChanged = new EventEmitter<{ type: string, message: string }>();
    onOpenFilterMenu = new EventEmitter<any>();

    state = {
        isShowingFullSideBar: false,
        network: {
            isConnected: true,
            onConnect: null,
            onDisconnect: null
        }
    };

    constructor(public translateService: TranslateService) {
    }

    isValidLanguage(lang) {
        if (!lang) { return false; }

        switch (lang.toLowerCase()) {
            case 'nl':
            case 'en':
                return true;
            default:
                return false;
        }
    }

    setLanguage(language: string): void {
        if (this.isValidLanguage(language)) {
            this.translateService.use(language);
            this.translateService.setDefaultLang(language);
            this.language = language;
            this.locale = this.makeLocaleFromLanguage(this.language);
            window.localStorage.setItem(GlobalService.LANGUAGE, language);
        }
    }

    makeLocaleFromLanguage(lang) {
        switch (lang) {
            case 'en':
                return 'en-US';
            case 'nl':
                return 'nl-NL';
        }
    }

    // getLanguage(): string {
    //     if (this.language) {
    //         return this.language.toUpperCase();
    //     }
    // }

    // isEnglish() {
    //     if (this.language) {
    //         return this.language.toUpperCase() == 'EN';
    //     }
    // }

    // getLocale(): string {
    //     return this.locale;
    // }

    translate(stringToTranslate: string, obj?: any): string {
        return this.translateService.instant(stringToTranslate, { value: obj });
    }


    noConnection(): void {
        let noConnection: string = this.translate('WARNING.NO_CONNECTION');
        noConnection = noConnection.substring(0, 1).toLowerCase() + noConnection.substring(1, noConnection.length);
        const message: string = this.translate('WARNING.SORRY') + ' ' + noConnection;
        this.onError.emit({
            message,
            enableBackdropDismiss: false
        });
    }

    hasConnection(): boolean {
        return this.state.network.isConnected;
    }
}
