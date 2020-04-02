import { Injector } from '@angular/core';
import { AbstractController } from '../abstract/abstract.controller';


export abstract class DialogController extends AbstractController {
    service: any;

    constructor(injector: Injector) {
        super(injector);
    }

    updateItem(item: any) {
        console.log(item);
    }

    deleteItem() {

    }
}
