import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthorizationService} from "./services/authorization.service";
import {tap} from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authService = inject(AuthorizationService);

  return authService.isLoggedIn$.pipe(
    tap(isLoggedIn => {
      if (!isLoggedIn) {
        router.navigate(['']);
      }
    })
  )
};
