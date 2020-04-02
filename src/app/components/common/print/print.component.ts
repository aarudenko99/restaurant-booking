import { Component, OnInit } from "@angular/core";
import { PrintService, UsbDriver, WebPrintDriver } from "ng-thermal-print";
import { PrintDriver } from "ng-thermal-print/lib/drivers/PrintDriver";

@Component({
	selector: "mm-print",
	templateUrl: "./print.component.html",
	styleUrls: ["./print.component.scss"]
})
export class PrintComponent implements OnInit {
	status: boolean = false;
	usbPrintDriver: UsbDriver;
	webPrintDriver: WebPrintDriver;
	ip: string = "";

	constructor(private printService: PrintService) {
		this.usbPrintDriver = new UsbDriver();
		this.printService.isConnected.subscribe(result => {
			console.log("PRINT SERVICE!!!!!!!!!!!!!!!!!!!!", result);
			this.status = result;
			if (result) {
				console.log("Connected to printer!!!");
			} else {
				console.log("Not connected to printer.");
			}
		});
	}

	ngOnInit() {}

	requestUsb() {
		this.usbPrintDriver.requestUsb().subscribe(result => {
			this.printService.setDriver(this.usbPrintDriver, "ESC/POS");
		});
	}

	connectToWebPrint() {
		this.webPrintDriver = new WebPrintDriver(this.ip);
		this.printService.setDriver(this.webPrintDriver, "WebPRNT");
	}

	print(driver: PrintDriver) {
		this.printService
			.init()
			.setBold(true)
			.writeLine("Hello World!")
			.setBold(false)
			.feed(4)
			.cut("full")
			.flush();
	}
}
