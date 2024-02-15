import { PasswordStrengthLevelInterface } from './password-strength-level.interface';

export interface PasswordStrengthInterface {
  default: PasswordStrengthLevelInterface;
  inValid: PasswordStrengthLevelInterface;
  easy: PasswordStrengthLevelInterface;
  medium: PasswordStrengthLevelInterface;
  strong: PasswordStrengthLevelInterface;
}
