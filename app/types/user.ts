import type { Auth } from "./auth";

export interface User {
	id: number;
	name: string;
}

export interface UserLogin {
	name: string;
	name_full: string;
	role_id: string;
	created_at: Date;
	pub_key: string;
}

export interface UserLoginEmail {
	email: string;
	pwd: string;
}

export interface UserLoginTel {
	tel: string;
	code: string;
}

export interface UserLoginPassword {
	name: string;
	pwd: string;
}

export interface UserSendTelCode {
	tel: string;
}

export interface UserSendEmailVerif {
	email: string;
}

export interface UserCheckCred {
	login: string;
}

export interface UserRegister {
	name: string;
	email: string;
	tel: string;
	pwd: string;
	is_enterprise: boolean;
	send_action_inf: boolean;
}

export interface UserLoginResult {
	user: UserLogin;
	auth: Auth;
}

export interface UserLoginNotification {
	sms: boolean;
	//tm: boolean;
}

export interface UserSendTelCodeResult {
	notified: boolean;
	login_notification: UserLoginNotification;
	sec_left: number;
}
export interface UserCheckCredResult extends UserSendTelCodeResult {
	exists: boolean;
	is_enterprise: boolean;
}

export interface UserProfile {
	id: number;
	name: string;
	email?: string;
	tel?: string;
	tel_confirmed: boolean;
	email_confirmed: boolean;
	is_enterprise: boolean;
	send_action_inf: boolean;
	//client?: ClientDetail;
}
