import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators  } from '@angular/forms';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { ResponseModel } from '../../models/responseModel';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [
    FormsModule, 
    ReactiveFormsModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent {
  productAddForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private productService: ProductService, private toastrService: ToastrService) {}

  ngOnInit(): void {
    this.createProductAddForm();
  }

  createProductAddForm(){
    this.productAddForm = this.formBuilder.group({
      productName: ["", Validators.required],
      unitPrice: ["", Validators.required],
      unitsInStock: ["", Validators.required],
      categoryId: ["", Validators.required]
    });
  }

  add(){
    if(this.productAddForm.valid){
      let productModel: Product = Object.assign({}, this.productAddForm.value);
      this.productService.add(productModel).subscribe(data => {
        this.toastrService.success("Product added.", "Success");
      }, responseError => {
        console.log(responseError);
        if(responseError.error.Errors.length > 0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Error");
          }
        }
      });
    }
    else {
      this.toastrService.error("Please control form inputs and try again.", "Error");
    }
  }
}
