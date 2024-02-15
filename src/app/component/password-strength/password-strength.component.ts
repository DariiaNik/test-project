import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordStrengthInterface } from '../../types/password-strength.interface';
import { PasswordStrengthLevelInterface } from '../../types/password-strength-level.interface';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrl: './password-strength.component.scss',
})
export class PasswordStrengthComponent implements OnInit {
  form!: FormGroup;
  showPassword: boolean = false;

  strength: PasswordStrengthInterface = {
    default: { easy: 'gray', medium: 'gray', strong: 'gray' },
    inValid: { easy: 'red', medium: 'red', strong: 'red' },
    easy: { easy: 'red', medium: 'gray', strong: 'gray' },
    medium: { easy: 'yellow', medium: 'yellow', strong: 'gray' },
    strong: { easy: 'green', medium: 'green', strong: 'green' },
  };

  indicatorClasses: PasswordStrengthLevelInterface = this.strength.default;

  constructor(private fb: FormBuilder) {}

  public ngOnInit() {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      password: ['', Validators.minLength(8)],
    });
  }

  public checkPasswordStrength(): void {
    const password: string = this.form.get('password')!.value;

    if (password.length <= 0) {
      this.indicatorClasses = this.strength.default;
      return;
    }

    if (this.form.invalid) {
      this.indicatorClasses = this.strength.inValid;
      return;
    }

    const letterRegexp: boolean = /\p{L}/u.test(password);
    const numberRegexp: boolean = /\d/.test(password);
    const symbolRegexp: boolean = /[!@#$%^&*(),\.?":{}|<>\-]/.test(password);

    if (letterRegexp && numberRegexp && symbolRegexp) {
      this.indicatorClasses = this.strength.strong;
    } else if (
      (letterRegexp && numberRegexp) ||
      (letterRegexp && symbolRegexp) ||
      (symbolRegexp && numberRegexp)
    ) {
      this.indicatorClasses = this.strength.medium;
    } else {
      this.indicatorClasses = this.strength.easy;
    }
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
