// SERVICES
export { AuthService } from "./_services";
export { AuthNoticeService } from "./auth-notice/auth-notice.service";

// DATA SOURCERS
export { RolesDataSource } from "./_data-sources/roles.datasource";
export { UsersDataSource } from "./_data-sources/users.datasource";

// ACTIONS
export {
	Login,
	Logout,
	Register,
	UserRequested,
	UserLoaded,
	AuthActionTypes,
	AuthActions
} from "./_actions/auth.actions";
export {
	RoleOnServerCreated,
	RoleCreated,
	RoleUpdated,
	RoleDeleted,
	RolesPageRequested,
	RolesPageLoaded,
	RolesPageCancelled,
	AllRolesLoaded,
	AllRolesRequested,
	RoleActionTypes,
	RoleActions
} from "./_actions/role.actions";
export {
	UserCreated,
	UserUpdated,
	UserDeleted,
	UserOnServerCreated,
	UsersPageLoaded,
	UsersPageCancelled,
	UsersPageToggleLoading,
	UsersPageRequested,
	UsersActionToggleLoading
} from "./_actions/user.actions";

// EFFECTS
export { AuthEffects } from "./_effects/auth.effects";
export { UserEffects } from "./_effects/user.effects";
export { RoleEffects } from "./_effects/role.effect";

// REDUCERS
export { authReducer } from "./_reducers/auth.reducers";
export { rolesReducer } from "./_reducers/role.reducers";
export { usersReducer } from "./_reducers/user.reducers";

// SELECTORS
export {
	isLoggedIn,
	isLoggedOut,
	isUserLoaded,
	currentAuthToken,
	currentUser,
	currentUserRoleIds
} from "./_selectors/auth.selectors";
export {
	selectRoleById,
	selectAllRoles,
	selectAllRolesIds,
	allRolesLoaded,
	selectLastCreatedRoleId,
	selectRolesPageLoading,
	selectQueryResult,
	selectRolesActionLoading,
	selectRolesShowInitWaitingMessage
} from "./_selectors/role.selectors";
export {
	selectUserById,
	selectUsersPageLoading,
	selectLastCreatedUserId,
	selectUsersInStore,
	selectHasUsersInStore,
	selectUsersPageLastQuery,
	selectUsersActionLoading,
	selectUsersShowInitWaitingMessage
} from "./_selectors/user.selectors";

// GUARDS
export { AuthGuard } from "./_guards/auth.guard";
export { WaiterGuard } from "./_guards/waiter.guard";
export { AdminGuard } from "./_guards/admin.guard";

// MODELS
export { User } from "./_models/user.model";
export { Role } from "./_models/role.model";
export { Address } from "./_models/address.model";
export { SocialNetworks } from "./_models/social-networks.model";
export { AuthNotice } from "./auth-notice/auth-notice.interface";

export { AuthDataContext } from "./_server/auth.data-context";
