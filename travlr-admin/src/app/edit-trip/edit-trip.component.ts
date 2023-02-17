import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {
  router: any;
  editForm: any;
  formBuilder: any;
  tripService: any;
  submitted: boolean;

  

  ngOnInit() {
    // retrieve stashed tripId
    let tripCode = localStorage.getItem("tripCode");
    if (!tripCode) {
      alert("Something wrong, couldn't find where I stashed tripCode!");
      this.router.navigate(['']);
    return; }
    console.log('EditTripComponent#onInit found tripCode ' + tripCode);
    // initialize form
    this.editForm = this.formBuilder.group({
    _id: [],
    code: [tripCode, Validators.required], name: ['', Validators.required], length: ['', Validators.required],
    start: ['', Validators.required], resort: ['', Validators.required], perPerson: ['', Validators.required], image: ['', Validators.required], description: ['', Validators.required],
    })
    console.log('EditTripComponent#onInit calling TripDataService#getTrip(\'' + tripCode + '\')');
    this.tripService.getTrip(tripCode)
    .then(data => {
    console.log(data);
    // Don't use editForm.setValue() as it will throw console error 
    this.editForm.patchValue(data[0]);
    })
    }
    onSubmit() {
    this.submitted = true;
    if (this.editForm.valid) { this.tripService.updateTrip(this.editForm.value)
    .then(data => { console.log(data); this.router.navigate(['']);
    }); }
    }
  }
