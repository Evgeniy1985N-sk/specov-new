import { defineStore } from "pinia";
import { computed, ref, reactive } from "vue";

import type { Auth } from "@/types/auth";
import type {
	UserLoginTel,
	UserLoginEmail,
	UserRegister,
	UserLogin,
	UserLoginNotification,
	UserLoginResult,
	UserLoginPassword,
} from "@/types/user";

import { useUserApi } from "@/composables/api/useUserApi";

const SEND_LOGIN_CODE_THROTLE_SEC = 120;

export interface AuthProcess {
	login?: string;
	isTel?: boolean;
	checked?: boolean;
	codeType?: UserLoginNotification;
	verifTimer?: ReturnType<typeof setInterval> | null;
	countdown?: number;
}

export const useAuthStore = defineStore("auth", () => {
	const auth = ref<Auth | null>(null);
	const user = ref<UserLogin | null>(null);

	const authProcess = reactive<AuthProcess>({
		countdown: 0,
		verifTimer: null,
	});

	const isAuthenticated = computed<boolean>(() => {
		return !!auth.value?.token;
	});

	const loadFromStorage = (): void => {
		if (!import.meta.client) {
			return;
		}

		try {
			const authStored = localStorage.getItem("auth");
			const userStored = localStorage.getItem("user");

			auth.value = authStored ? (JSON.parse(authStored) as Auth) : null;
			user.value = userStored ? (JSON.parse(userStored) as UserLogin) : null;
		} catch {
			// corrupted storage: reset
			auth.value = null;
			user.value = null;
			localStorage.removeItem("auth");
			localStorage.removeItem("user");
		}
	};

	const persistToStorage = (): void => {
		if (!import.meta.client) {
			return;
		}
		if (auth.value) {
			localStorage.setItem("auth", JSON.stringify(auth.value));
		} else {
			localStorage.removeItem("auth");
		}
		if (user.value) {
			localStorage.setItem("user", JSON.stringify(user.value));
		} else {
			localStorage.removeItem("user");
		}
	};

	const setUserLogged = (srvResp: UserLoginResult): void => {
		auth.value = srvResp.auth;
		user.value = srvResp.user;
		persistToStorage();
		resetProcess();
	};

	// call on 401
	const setUserUnlogged = (): void => {
		auth.value = null;
		user.value = null;
		persistToStorage();
		resetProcess();
	};

	const loginTel = async (credentials: UserLoginTel): Promise<void> => {
		const api = useUserApi();
		const response = await api.loginTel(credentials);
		setUserLogged(response);
	};

	const loginEmail = async (credentials: UserLoginEmail): Promise<void> => {
		const api = useUserApi();
		const response = await api.loginEmail(credentials);
		setUserLogged(response);
	};

	const login = async (credentials: UserLoginPassword): Promise<void> => {
		const api = useUserApi();
		const response = await api.login(credentials);
		setUserLogged(response as unknown as UserLoginResult);
	};

	const register = async (userInfo: UserRegister): Promise<void> => {
		const api = useUserApi();
		const response = await api.register(userInfo);
		setUserLogged(response);
	};

	const logout = async (): Promise<void> => {
		const api = useUserApi();
		try {
			await api.logout();
		} finally {
			setUserUnlogged();
		}
	};

	const resetProcess = (): void => {
		authProcess.checked = undefined;
		resetVerifTimer();
	};

	const startVerifTimer = (seconds?: number): void => {
		stopVerifTimer();
		authProcess.countdown = seconds ?? SEND_LOGIN_CODE_THROTLE_SEC;
		authProcess.verifTimer = setInterval(() => {
			if ((authProcess.countdown ?? 0) > 0) {
				authProcess.countdown = (authProcess.countdown ?? 0) - 1;
				return;
			}
			stopVerifTimer();
		}, 1000);
	};

	const stopVerifTimer = (): void => {
		if (authProcess.verifTimer) {
			clearInterval(authProcess.verifTimer);
			authProcess.verifTimer = null;
		}
	};

	const resetVerifTimer = (): void => {
		stopVerifTimer();
		authProcess.countdown = undefined;
	};

	return {
		auth,
		user,
		authProcess,

		isAuthenticated,

		loadFromStorage,

		loginEmail,
		login,
		loginTel,
		logout,
		register,

		setUserUnlogged,

		startVerifTimer,
		stopVerifTimer,
		resetVerifTimer,
		resetProcess,
	};
});
