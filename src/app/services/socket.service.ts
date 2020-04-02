import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../common/models/message';
import { Event } from '../common/models/event';

import * as socketIo from 'socket.io-client';

//const SERVER_URL = 'ws://localhost:3000';
const SERVER_URL = 'ws://134.209.87.18';

@Injectable({
    providedIn: 'root'
})
export class SocketService {
    private socket;

    public initSocket(): void {
        console.log('initSocket');
        this.socket = socketIo(SERVER_URL);
    }

    public send(message: Message): void {
        console.log('send');
        this.socket.emit('message', message);
    }

    public updateOrder(reservedTable: any) {
        console.log('updateOrder');
        this.socket.emit('reservedTable', reservedTable);
        //return this.http.put(this.apiURL + '/api/order/updateitemstatus', reservedTable, this.jwt()).map((response: Response) => response.json());
    }

    public onOrder(restaurantId: any): Observable<any> {
        console.log('restaurantId');
        console.log(restaurantId);
        return new Observable<any>(observer => {
            console.log('help');
            this.socket.on('send', (data: any) => observer.next(data));
        });
    }

    public onEvent(event: Event): Observable<any> {
        console.log('fine');
        this.socket.emit('message');
        return new Observable<Event>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }
}
