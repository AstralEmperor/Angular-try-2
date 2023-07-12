import { CanActivateFn, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

export const authGuard: CanActivateFn = (route, state) => {

  return true;
};
// tutorial is from 27.6.2022 and was built differently ( with constructor and observable), so i cannot implement it at this time