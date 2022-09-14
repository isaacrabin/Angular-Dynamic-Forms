import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public myFormGrp!: FormGroup;
  title = 'angular-dynamic-reactive-forms-app';


  FORM_DATA = [
    {
      formGrpLabel: 'Personal Information',
      formGrpName: 'controlGroup1',
      formControls: [
        {
          label: 'First Name',
          name: 'first_name',
          value: '',
          required: true,
          type: 'text',
        },
        {
          label: 'Middle Name',
          name: 'mid_name',
          value: '',
          required: false,
          type: 'text',
        },
        {
          label: 'Last Name',
          name: 'last_name',
          value: '',
          required: true,
          type: 'text',
        },
      ],
    },
    {
      formGrpLabel: 'Company Details',
      formGrpName: 'controlGroup2',
      formControls: [
        {
          label: 'Company Name',
          name: 'comp_name',
          value: '',
          required: true,
          type: 'text',
        },
        {
          label: 'Company Address',
          name: 'comp_address',
          value: '',
          required: true,
          type: 'textarea',
        },
        {
          label: 'Accept Terms',
          name: 'accept_terms',
          value: '',
          required: true,
          type: 'checkbox',
        },
      ],
    },
  ];

  ngOnInit(): void {
    this.generateForm();
  }

  // Create reactive form
  generateForm() {
    const group: FormGroup = new FormGroup({});
    this.FORM_DATA.forEach((fg) => {
      const formGroup: FormGroup = new FormGroup({});
      fg.formControls.forEach((fc) => {
        const nCtrol = {
          name: fc.name,
          control: fc.required
            ? new FormControl(fc.value || '', Validators.required)
            : new FormControl(fc.value || ''),
        };

        formGroup.addControl(fc.name, nCtrol.control);
      });

      group.addControl(fg.formGrpName, formGroup);
    });
    this.myFormGrp = group;
  }

  // Get from data
  getValues() {
    let completeValue: { [x: string]: any } = {};

    this.FORM_DATA.forEach((fg) => {
      completeValue[fg.formGrpName] =
        this.myFormGrp.controls[fg.formGrpName].value;
    });
    console.log(completeValue);
  }

  // Action handler method
  enableDisableFormGroup(opration: string) {
    switch (opration) {
      case 'disable1':
        this.myFormGrp.get('controlGroup1')!.disable();
        break;

      case 'disable2':
        this.myFormGrp.get('controlGroup2')!.disable();
        break;

      case 'enable1':
        this.myFormGrp.get('controlGroup1')!.enable();

        break;

      case 'enable2':
        this.myFormGrp.get('controlGroup2')!.enable();
        break;

      case 'reset1':
        this.myFormGrp.get('controlGroup1')!.reset();

        break;

      case 'reset2':
        this.myFormGrp.get('controlGroup2')!.reset();

        break;

      default:
        break;
    }
  }

  // Add froms group and its control
  addControl() {
    let t = new Date().getTime();
    const formGroup: FormGroup = new FormGroup({});
    const nCtrol = {
      name: 'newControl' + t,
      control: new FormControl('', Validators.required),
    };
    formGroup.addControl('newControl' + t, nCtrol.control);
    this.myFormGrp.addControl('newFromGroup' + t, formGroup);

    this.FORM_DATA.push({
      formGrpLabel: 'New From Group' + t,
      formGrpName: 'newFromGroup' + t,
      formControls: [
        {
          label: 'New Control' + t,
          name: 'newControl' + t,
          value: '',
          required: true,
          type: 'text',
        },
        {
          label: 'New Control' + t,
          name: 'newControl' + t,
          value: '',
          required: true,
          type: 'text',
        },
        {
          label: 'New Control' + t,
          name: 'newControl' + t,
          value: '',
          required: true,
          type: 'text',
        },
      ],
    });
  }
}
