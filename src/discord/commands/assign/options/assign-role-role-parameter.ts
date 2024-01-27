// Local Imports
import { RoleParameter } from '../../generic/options/role-parameter';

class AssignRoleRoleParameter extends RoleParameter {
  /**
   * Whether this parameter is required.
   *
   * @returns {boolean} Whether this parameter is required.
   */
  isRequired(): boolean {
    return true;
  }

  /**
   * Retrieves the description of the command.
   *
   * @returns {string} Description of the command.
   */
  getDescription(): string {
    return 'Role to be assigned';
  }

  /**
   * Retrieves the Command's key.
   *
   * @returns {string} Key of the Command.
   */
  getKey(): string {
    return 'role';
  }
}

export default new AssignRoleRoleParameter();
