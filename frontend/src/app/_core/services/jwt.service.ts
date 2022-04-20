import { Injectable } from '@angular/core';
const TOKEN_KEY = 'not_token';


@Injectable()
export class JwtService {
    getToken(): String {
        return window.localStorage[TOKEN_KEY];
    }

    saveToken(token: String) {
        window.localStorage[TOKEN_KEY] = token;
    }

    destroyToken() {
        window.localStorage.removeItem(TOKEN_KEY);
    }
}
