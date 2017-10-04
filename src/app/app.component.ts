import { Component } from '@angular/core';
import { FormGroup, FormControl,  Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css','./customStyleSheet.css']
})
export class AppComponent {

	userForm = new FormGroup({
		name: new FormControl('',[Validators.required, Validators.minLength(3)]),
		email: new FormControl('',[Validators.required, Validators.minLength(13)]),
		phone: new FormControl('',[Validators.required, Validators.minLength(11)])
	});

	MethodSwaping="Submit";// swaping update and submit method for single button

	contactList=[]; // use to store contacts in array

	selectedIndex:number = 0;
	//check use as a flag to check old record
	check:number= (JSON.parse(localStorage.getItem("checkerValue")) != null) ? 1 : 0;
	
	public LoadData()
	{
		this.contactList = JSON.parse(localStorage.getItem("Contacts"));
	}
	public Submit()
	{
		this.contactList.push(this.userForm.value);

		this.userForm.reset();
		
		//store array values in local storage
		localStorage.setItem('Contacts', JSON.stringify(this.contactList));

		this.check = 1;

		localStorage.setItem('checkerValue', JSON.stringify(this.check));
	}
	public Edit(i)
	{
		this.selectedIndex=i;

		//set values from selected index values to form
		this.userForm.setValue({
			name: this.contactList[i].name,
			email: this.contactList[i].email,
			phone: this.contactList[i].phone});

		this.MethodSwaping="Update";
	}
	public Update()
	{
		this.contactList[this.selectedIndex].name=this.userForm.value.name;
		this.contactList[this.selectedIndex].email=this.userForm.value.email;
		this.contactList[this.selectedIndex].phone=this.userForm.value.phone;

		localStorage.setItem('Contacts', JSON.stringify(this.contactList));

		this.MethodSwaping="Submit";
		
		this.userForm.reset();
	}
}
