export class MenuConfig {
	public defaults: any = {
		header: {
			self: {},
			items: []
		},
		aside: {
			self: {},
			items: [
				{
					section: "Admin",
					role: "admin&manager",
					showAll: true,
					showWaiter: false
				},
				{
					title: "Dashboard",
					root: true,
					url: "/assets/media/icons/svg/Home/Home.svg",
					page: "home",
					role: "admin&manager",
					showAll: true,
					showWaiter: false
				},
				{
					title: "User Management",
					root: true,
					bullet: "dot",
					url: "/assets/media/icons/svg/General/User.svg",
					role: "admin&manager",
					translate: "MENU.USER_MANAGEMENT",
					showAll: true,
					showWaiter: false,
					mijnMenuPlus: true,
					page: "user-management/"
				},
				{
					section: "Menu",
					role: "admin&manager",
					showAll: true,
					showWaiter: false
				},
				{
					title: "Menu",
					root: true,
					url: "/assets/media/icons/svg/Home/Book-open.svg",
					page: "menu",
					role: "admin&manager",
					translate: "MENU.CREATE_MENU",
					showAll: true,
					showWaiter: false
				},
				// TO DO Create button in quick action dashboard & menu pages
				// { section: 'Discounts',
				//     role : 'admin&manager',
				//     showAll : true,
				//     showWaiter : false,
				// },
				// {
				//     title: 'Discount offers',
				//     root: true,
				//     icon: 'flaticon-price-tag',
				//     page: 'offers',
				//     role : 'admin&manager',
				//     translate: 'MENU.DISCOUNT',
				//     showAll : true,
				//     showWaiter : false,
				// },
				{
					section: "Table Management",
					role: "admin&manager&waiter",
					translate: "MENU.TABLE_MANAGEMENT",
					showAll: true,
					showWaiter: false
				},
				{
					title: "Manage floor plan",
					root: true,
					url: "/assets/media/icons/svg/Layout/Layout-arrange.svg",
					page: "tablemanagement",
					role: "admin&manager&waiter",
					translate: "MENU.TABLE_MANAGEMENT",
					showAll: true,
					showWaiter: false,
					mijnMenuPlus: true
				},
				{
					title: "Active Bills",
					root: true,
					url:
						"/assets/media/icons/svg/Communication/Clipboard-list.svg",
					page: "activebills",
					role: "admin&manager&waiter",
					translate: "MENU.ACTIVE_BILLS",
					showAll: true,
					showWaiter: false,
					mijnMenuPlus: true
				},
				{
					section: "Reservations",
					role: "admin&manager",
					translate: "MENU.RESERVATIONS",
					showAll: true,
					showWaiter: false
				},
				{
					title: "Reservations",
					root: true,
					url:
						"/assets/media/icons/svg/Communication/Adress-book2.svg",
					page: "reservations",
					role: "admin&manager",
					translate: "MENU.RESERVATIONS",
					showAll: true,
					showWaiter: false,
					mijnMenuPlus: true
				},
				{
					section: "Kitchen orders",
					role: "admin&manager&waiter&kitchen",
					translate: "MENU.ACTIVE_ORDERS_TITLE",
					showAll: true,
					showWaiter: true
				},
				{
					title: "Live Orders",
					root: true,
					// icon: "flaticon2-bell-2",
					url: "/assets/media/icons/svg/Cooking/Knife&fork2.svg",
					translate: "MENU.ACTIVE_ORDERS",
					page: "liveorders",
					showWaiter: true,
					showAll: true,
					role: "admin&manager&waiter&kitchen",
					mijnMenuPlus: true
				}
			]
		}
	};

	public get configs(): any {
		return this.defaults;
	}
}
