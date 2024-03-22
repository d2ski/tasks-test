import { Injectable, Signal, signal } from '@angular/core';
import { User } from '../../../shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersFacade {
  users: Signal<User[]> = signal([
    { id: 'john@test.test', name: 'John Doe' },
    { id: 'ivan@test.test', name: 'Ivan Go' },
  ]);
}
