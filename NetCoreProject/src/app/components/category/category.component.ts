import { Component } from '@angular/core';
import { Category } from '../../models/category';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  categories: Category[] = [];
  currentCategory: Category;
  emptyCategory: Category;
  dataLoaded: boolean = false;
  constructor(private categoryService: CategoryService) {}
  ngOnInit(): void {
    this.getCategories();
  }
  getCategories(){
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response.data;
      this.dataLoaded = true;
    });
  }
  setCurrentCategory(category: Category){
    this.currentCategory = category;
  }
  removeCurrentCategory(){
    this.currentCategory = this.emptyCategory;
    console.log(this.currentCategory);
  }
  getCurrentCategoryClass(category: Category){
    if  (category == this.currentCategory) {
      return "list-group-item list-group-item-action active";
    }
    else {
      return "list-group-item list-group-item-action";
    }
  }
  getCurrentCategoryAll(){
    if  (!this.currentCategory || this.currentCategory.categoryId == 0) {
      return "list-group-item list-group-item-action active";
    }
    else {
      return "list-group-item list-group-item-action";
    }
  }
}