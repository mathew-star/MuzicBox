export class ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T | undefined;

  constructor(success: boolean, message: string, data?: T) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}
