import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	ChangeDetectorRef
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { User, AuthService } from "../../../core/auth";
import { BehaviorSubject } from "rxjs";
import { Alert } from "../../../common/models/alert";

@Component({
	selector: "mm-user-personal-information",
	templateUrl: "./user-personal-information.component.html",
	styleUrls: ["./user-personal-information.component.scss"]
})
export class UserPersonalInformationComponent implements OnInit {
	// Public properties
	@Input() userSubject: BehaviorSubject<User>;
	@Input() userManagement: boolean;
	@Output() formValid: EventEmitter<any> = new EventEmitter();

	// User
	user: User;
	loading: boolean;
	pictureUrl: any;
	fileData: File = null;
	alert: Alert = new Alert();
	edit: boolean;

	SelectedRestaurant: any; // TO DO Create a service for selectedRestaurant instead of calling localStorage 10000x in app.
	SelectedRestaurantId: string;
	userForm: FormGroup;
	hasFormErrors: boolean = false;

	constructor(
		private userFB: FormBuilder,
		private authService: AuthService,
		private cd: ChangeDetectorRef,
		private auth: AuthService
	) {
		this.auth.selectedRestaurant.subscribe(restaurant => {
			if (
				Object.entries(restaurant).length !== 0 &&
				!this.SelectedRestaurant
			) {
				this.SelectedRestaurant = restaurant;
				this.SelectedRestaurantId = restaurant["Restaurant"]._id;
			}
		});
	}

	ngOnInit() {
		this.alert ? (this.alert.showAlert = false) : null;

		this.userSubject.subscribe(user => {
			this.user = user;
			if (
				this.pictureUrl === user.PictureUrl ||
				this.pictureUrl === undefined
			) {
				this.pictureUrl = user.PictureUrl
					? user.PictureUrl
					: "./assets/media/users/default.jpg";
			}

			this.createForm(user);
		});
	}

	enableInputs() {
		// this.userForm.get("firstname").enable();
		// this.userForm.get("lastname").enable();
		// this.userForm.get("phone").enable();
		// console.log(this.userForm.get("email"));
		// if (this.userForm.get("email").enabled) {
		// 	this.userForm.get("email").disable();
		// } else {
		// 	this.userForm.get("email").enable();
		// }
		// console.log(this.userForm.get("email"));
		this.edit = !this.edit;
	}

	/**
	 * Create form
	 */
	createForm(user: User) {
		this.userForm = this.userFB.group({
			firstname: [user ? user.FirstName : "", Validators.required],
			lastname: [user ? user.LastName : "", Validators.required],
			password: [user ? user.Password : "", Validators.required],
			email: [user ? user.EmailAddress : "", Validators.email],
			phone: [user ? user.PhoneNumber : ""],
			pictureUrl: [user ? user.PictureUrl : ""],
			occupation: [user ? user.Occupation : ""]
		});
		// if (!this.userManagement) {
		// 	this.userForm.get("firstname").disable();
		// 	this.userForm.get("lastname").disable();
		// 	this.userForm.get("phone").disable();
		// 	this.userForm.get("email").disable();
		// }
		this.onChanges();
	}

	onChanges(): void {
		this.userForm.valueChanges.subscribe(userValue => {
			this.prepareUser(userValue);
			this.formValid.emit(this.userForm.valid);
		});
	}

	/**
	 * Returns prepared data for save
	 */
	prepareUser(user: User): void {
		const controls = this.userForm.controls;
		const _user = new User();
		_user.clear();
		_user.PictureUrl = this.user.PictureUrl;
		_user._id = this.user._id;
		_user.id = this.user.id;
		_user.PictureUrl = this.user.PictureUrl;
		_user.RestaurantId = this.SelectedRestaurantId;
		_user.RestaurantName = this.SelectedRestaurant.Restaurant.Name;
		_user.FirstName = user.FirstName
			? user.FirstName
			: controls["firstname"].value;
		_user.LastName = user.LastName
			? user.LastName
			: controls["lastname"].value;
		_user.FullName = user.FirstName
			? user.FirstName + " " + user.LastName
			: controls["firstname"].value + " " + controls["lastname"].value;
		_user.Password = user.Password
			? user.Password
			: controls["password"].value;
		_user.EmailAddress = user.EmailAddress
			? user.EmailAddress
			: controls["email"].value;
		_user.Occupation = user.Occupation
			? user.Occupation
			: controls["occupation"].value;
		_user.PhoneNumber = user.PhoneNumber
			? user.PhoneNumber
			: controls["phone"].value;
		_user.hasFormError = user.hasFormError;
		this.userSubject.next(_user);
		console.log(_user, this.userSubject.value);
	}

	onFileSelect(event) {
		const reader = new FileReader();
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			this.fileData = file;
			reader.readAsDataURL(file);
			// this.user.PictureUrl = file.
			reader.onload = () => {
				// console.log(reader.result);
				this.pictureUrl = reader.result;
				this.cd.markForCheck();
			};

			console.log(this.user, this.fileData);
		}
	}

	/**
	 * Save data
	 *
	 * @param withBack: boolean
	 */
	onSubmit(withBack: boolean = false) {
		this.hasFormErrors = false;
		this.loading = true;
		const controls = this.userForm.controls;
		/** check form */
		if (this.userForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			this.user.hasFormError = true;
			this.prepareUser(this.user);
			return;
		}

		if (this.pictureUrl) {
			this.authService
				.changeProfileImage(this.user._id, this.pictureUrl)
				.subscribe(res => {
					this.userSubject.next(res.data);
					this.cd.detectChanges();
				});
		}
		this.authService.updateUser(this.userSubject.value).subscribe(
			response => {
				this.loading = false;
				const userStorage = JSON.parse(
					localStorage.getItem("currentUser")
				);
				response.token = userStorage.token;
				this.userSubject.next(response.data);
				if (!this.userManagement) {
					localStorage.setItem(
						"currentUser",
						JSON.stringify(response)
					);
					this.alert.type = "success";
					this.alert.message = response.message;
					this.alert.showAlert = true;
				}
				this.cd.detectChanges();
			},
			error => {
				this.loading = false;
				this.alert.type = "warn";
				this.alert.message = "Oh snap! " + error;
				this.alert.showAlert = true;
				this.cd.detectChanges();
			}
		);
	}

	/**
	 * Close Alert
	 *
	 * @param $event: Event
	 */
	onAlertClose($event) {
		this.alert.showAlert = false;
		this.hasFormErrors = false;
	}
}
