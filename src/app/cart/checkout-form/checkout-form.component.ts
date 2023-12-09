import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']
})
export class CheckoutFormComponent implements OnInit {
  checkoutForm!: FormGroup;
  submitted = false;
  @Output() userInfo = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(4)]],
      address: ['', [Validators.required]],
      creditCard: ['', [Validators.required]]
    })
  }

  onSubmit() {
    this.userInfo.emit(this.checkoutForm.value)
  }

  get firstName(){
    return this.checkoutForm.get('firstName');
  }

  get address(){
    return this.checkoutForm.get('address');
  }

  get creditCard(){
    return this.checkoutForm.get('creditCard');
  }

}
