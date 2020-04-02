export function rectangleChairsFunction(
	index,
	seats,
	floorSize,
	rectangleIndex,
	width,
	height,
	table
) {
	var rBottomSeat = ((seats - 2) / 2) + 1;

	if (table.Shape == 'round' && table.Seats == 3) {
		switch (index) {
			case 0 : return "rotate(-85deg) translateX(" + height / 2 + "px)"; break;
			case 1 : return "rotate(30deg) translateX(" + height / 2 + "px) translateY( 5px )"; break;
			case 2 : return "rotate(-200deg) translateX(" + height / 2 + "px) translateY(0px)"; break;
		}

	} else {
		var oneSideChairCount = (seats-2)/2;

		if (index === 0) {
			return 'rotate(-90deg) translateX('+ height / 2 +'px)'
		} else if (index === rBottomSeat) {
			return 'rotate(90deg) translateX('+ height / 2 +'px)'
		} else if (index <= oneSideChairCount) {
			// for right side
			var startPositionR = -(height/2);
			var seatPositionR = startPositionR + ((index -1) * (height/oneSideChairCount)) + ((height/oneSideChairCount)/2);
			return 'rotate(0deg) translateX('+ width / 2 +'px) translateY('+ seatPositionR +'px)'

		} else if (index > (oneSideChairCount + 1) )  {
			// for left side
			var startPositionL = (height/2);
			var seatPositionL = startPositionL - ((index - oneSideChairCount -1) * (height/oneSideChairCount)) + ((height/oneSideChairCount)/2);
			return 'rotate(180deg) translateX('+ width / 2 +'px) translateY('+ seatPositionL +'px)'
		}
	}
}
