import { useNuxtApp } from "nuxt/app";
import type { $Fetch } from "ofetch";
import { userEndpoints } from '@/api/endpoints/user';
import { type ProductCard } from "@/types/product";
import type { UserCheckCred, UserCheckCredResult, 
	UserLoginEmail, UserLoginPassword, UserLoginResult, UserLoginTel, 
	UserProfile, UserRegister, UserSendEmailVerif, UserSendTelCode, 
} from "~/types/user";

export function useUserApi() {
	const api = useNuxtApp().$backendAPI as $Fetch;

	return {
		lastViewedProducts(): Promise<ProductCard[]>{
			return api<ProductCard[]>(userEndpoints.lastViewedProducts());
		},
		loginEmail(login: UserLoginEmail): Promise<UserLoginResult>{
			return api<UserLoginResult>(
				userEndpoints.loginEmail(),
				{ method: 'POST', body: login },
			);
		},
		loginTel(login: UserLoginTel): Promise<UserLoginResult>{
			return api<UserLoginResult>(
				userEndpoints.loginEmail(),
				{ method: 'POST', body: login },
			);
		},
		login(login: UserLoginPassword): Promise<UserLoginResult>{
			return api<UserLoginResult>(
				userEndpoints.loginEmail(),
				{ method: 'POST', body: login },
			);
		},
		verifyTel(login: UserLoginTel): Promise<UserLoginResult>{
			return api<UserLoginResult>(
				userEndpoints.verifyTel(),
				{ method: 'POST', body: login },
			);
		},
		logout(): Promise<void>{
			return api<void>(
				userEndpoints.logout(),
				{ method: 'POST' },
			);
		},
		checkCred(login: UserCheckCred): Promise<UserCheckCredResult>{
			return api<UserCheckCredResult>(
				userEndpoints.checkCred(),
				{ method: 'POST', body: login },
			);
		},
		sendTelCode(login: UserSendTelCode): Promise<UserCheckCredResult>{
			return api<UserCheckCredResult>(
				userEndpoints.checkCred(),
				{ method: 'POST', body: login },
			);
		},
		sendEamilVerif(email: string): Promise<void>{
			return api<void>(
				userEndpoints.checkCred(),
				{ method: 'POST', body: <UserSendEmailVerif>{email} },
			);
		},
		register(login: UserRegister): Promise<UserLoginResult>{
			return api<UserLoginResult>(
				userEndpoints.checkCred(),
				{ method: 'POST', body: login },
			);
		},
		updateProfile(profile: UserProfile): Promise<void>{
			return api<void>(
				userEndpoints.checkCred(),
				{ method: 'POST', body: profile },
			);
		},
	}
}



