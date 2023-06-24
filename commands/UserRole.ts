import { args, BaseCommand } from '@adonisjs/core/build/standalone';
import User from 'App/Models/User';

export default class UserRole extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'user:role';

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'Set user role';

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest`
     * afterwards.
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: false,
  };

  @args.string({ description: 'Username of the user' })
  public username: string;

  @args.string({ description: 'User role to set' })
  public role: string;

  public async run() {
    const user = await User.findBy('username', this.username);
    if (user) {
      user.role = this.role;
      user.save();
      this.logger.success(
        `${this.colors.yellow(this.username)}'s role was set to ${this.colors.cyan(this.role)}.`
      );
    } else {
      this.logger.error(
        `Cannot find user ${this.colors.yellow(this.username)}. Please double check.`
      );
    }
  }
}
