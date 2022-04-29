import { Injectable } from '@angular/core';
import { UserDetails } from '@app/Model/userdetails';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const SESSION_KEY = 'auth-session';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void {
    
    window.localStorage.clear();
  }

  public saveToken(token: string): void {
    
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public saveSessionId(sessionId: string): void {
    
    window.localStorage.removeItem(SESSION_KEY);
    window.localStorage.setItem(SESSION_KEY, sessionId);
  }

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  public getSessionId(): string | null {
    return window.localStorage.getItem(SESSION_KEY);
  }

  public saveUser(user: UserDetails): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return null;
  }
}
