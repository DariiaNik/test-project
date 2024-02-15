import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordStrengthComponent } from './password-strength.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('PasswordStrengthComponent', () => {
  let component: PasswordStrengthComponent;
  let fixture: ComponentFixture<PasswordStrengthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [PasswordStrengthComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordStrengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with password control', () => {
    expect(component.form).toBeDefined();

    expect(component.form.get('password')).toBeDefined();
  });

  it('should toggle password visibility', () => {
    component.showPassword = false;

    component.togglePasswordVisibility();
    expect(component.showPassword).toBe(true);

    component.togglePasswordVisibility();
    expect(component.showPassword).toBe(false);
  });

  describe('checkPasswordStrength', () => {
    it('should update indicator classes for empty password', () => {
      component.form.get('password')?.setValue('');

      component.checkPasswordStrength();

      expect(component.indicatorClasses).toEqual(component.strength.default);
    });

    it('should update indicator classes for invalid password', () => {
      component.form.get('password')?.setValue('short');

      component.checkPasswordStrength();

      expect(component.indicatorClasses).toEqual(component.strength.inValid);
    });

    it('should update indicator classes for medium easy password', () => {
      component.form.get('password')?.setValue('12345678');

      component.checkPasswordStrength();

      expect(component.indicatorClasses).toEqual(component.strength.easy);
    });

    it('should update indicator classes for medium strength password', () => {
      component.form.get('password')?.setValue('Medium123');

      component.checkPasswordStrength();

      expect(component.indicatorClasses).toEqual(component.strength.medium);
    });

    it('should update indicator classes for strong password', () => {
      component.form.get('password')?.setValue('Strong@Password123');

      component.checkPasswordStrength();

      expect(component.indicatorClasses).toEqual(component.strength.strong);
    });
  });
});
