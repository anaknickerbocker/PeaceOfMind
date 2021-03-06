import DataService from './DataService';

export default class UsersService {
  private static dataService = DataService.getInstance();

  static createUser(name: string, sms: string, voice: string, email: string) {
    return this.dataService.createUser(name, sms, voice, email);
  }

  static getAllUsers() {
    return this.dataService.getAllUsers();
  }

  static getUser(userId: number) {
    return this.dataService.getUser(userId);
  }

  static updateUser(
    userId: number,
    changes: {
      name: string;
      sms: string;
      voice: string;
      email: string;
    }
  ) {
    return this.dataService.updateUser(userId, changes);
  }

  static deleteUser(userId: number) {
    return this.dataService.deleteUser(userId);
  }
}
