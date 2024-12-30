export interface TUser {
  name: string; //– The full name of the user.
  email: string; //– The email address of the user, used for authentication and communication.
  password: string; //– The password for the user, securely stored.
  role: 'admin' | 'user'; //– The role of the user, determining their access level. Default is "user".
  isBlocked: boolean; //– A flag indicating whether the user is blocked or not. Default is false.
}