export class Table {
	_id: string;
	index: number;
	emptyFloorPlan: boolean;
	TableNr: number;
	Position: { x: number; y: number };
	Size: { width: number; height: number };
	Name: string;
	Status: string;
	TableStatus: string;
	Seats: number;
	SeatsOccupied: number;
	Shape: string;
	Owner: string;
	CheckInDateTime: Date;
	InstantPayment: boolean;
	DisabledReservation: boolean;
	ReservationCode: string;
	CheckInReservationCode: string;
	QrCodeUrl: string;
}

// MODEL FOR TABLE, WITH MODEL LIKE THIS YOU CAN MAP RESPONSE IN IT
/*
constructor(
		public Position: {},
		public _id: string,
		public Name: string,
		public Status: string,
		public TableStatus: string,
		public Seats: number,
		public SeatsOccupied: number,
		public Shape: string,
		public Owner: string
	) {
	}

	static fromObject(data: any): Table {
		return new Table(
			data.Position,
			data._id,
			data.Name,
			data.Status,
			data.TableStatus,
			data.Seats,
			data.SeatsOccupied,
			data.Shape,
			data.Owner
		);
	}
 */
