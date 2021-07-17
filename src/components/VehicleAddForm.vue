<template>
    <div class="card">
        <h3 class="card-header text-center">Vehicle Entry</h3>
        <div class="card-body">
            <form >
                <div class="form-group">
                    <label class="form-label mt-1" for="vehicle-name">Vehicle name</label>
                    <input id="vehicle-name" type="text" class="form-control" v-model="$v.name.$model" :class="{'is-invalid' :$v.name.$error, 'is-valid' : !$v.name.$invalid  }">
                    <div class="invalid-feedback">
                        <span v-if="!$v.name.required">Vehicle name is required</span>
                        <span v-if="!$v.name.maxLength">Vehicle name must be shorter than {{$v.name.$params.maxLength.max}} characters</span>
                    </div>
                </div>

                <div class="form-group">
                    <label class="form-label mt-1" for="vehicle-type" >Vehicle type</label>
                    <select id="vehicle-type" class="form-control" v-model="$v.vehicleType.$model" :class="{'is-invalid' :$v.vehicleType.$error, 'is-valid' : !$v.vehicleType.$invalid  }">
                        <option>Car</option>
                        <option>Van</option>
                        <option>Truck</option>
                        <option>Container</option>
                        <option>Trailer</option>
                        <option>Dupmer</option>
                    </select>
                    <div class="invalid-feedback">
                        <span v-if="!$v.vehicleType.required">Vehicle name is required</span>
                    </div>
                </div>

                <div class="form-group ">
                    <label for="vehicle-model" class="form-label mt-1">Vehicle Model</label>
                    <input id="vehicle-model" list="vehicle-models" placeholder="Start typing..." class="form-control" v-model="$v.vehicleModel.$model" :class="{'is-invalid' :$v.vehicleModel.$error, 'is-valid' : !$v.vehicleModel.$invalid  }">
                    <datalist id="vehicle-models">
                        <option>Audi</option>
                        <option>BMW</option>
                        <option>Citroen</option>
                        <option>Honda</option>
                        <option>Hyundai</option>
                        <option>Mercedes</option>
                        <option>Nissan</option>
                        <option>Opel</option>
                        <option>Suzuki</option>
                        <option>Toyota</option>
                        <option>Volkswagen</option>
                    </datalist>
                </div>

                <div class="form-group">
                    <label for="license-plate" class="form-label mt-1">License plate number <br>(EG: AB-1212-BB)</label>
                    <input id="license-plate" type="text" class="form-control" v-model="$v.licensePlate.$model" :class="{'is-invalid' :$v.licensePlate.$error, 'is-valid' : !$v.licensePlate.$invalid  }">
                    <div class="invalid-feedback">
                        <span v-if="!$v.licensePlate.required">License plate number is required</span>
                        <span v-else-if="!$v.licensePlate.isValidRegistration">Please enter the correct format <br> (XX-NNNN-XX, where 'X' is a letter and 'N' is a number)</span>
                    </div>
                </div>

                <div class="form-group ">
                    <label class="form-label mt-1">Last registration date</label>
                    <b-form-datepicker id="datepicker1" class="form-control" v-model="$v.lastRegistration.$model" :class="{'is-invalid' :$v.lastRegistration.$error, 'is-valid' : !$v.lastRegistration.$invalid  }"></b-form-datepicker>
                    <div class="invalid-feedback">
                        <span v-if="!$v.lastRegistration.required">Last registration date is required</span>
                        <span v-if="!$v.lastRegistration.afterToday">Last registration date can't be in the future</span>
                    </div>
                </div>

                <div class="form-group ">
                    <label class="form-label mt-1">Date of registration submission</label>
                    <b-form-datepicker id="datepicker2" class="form-control" v-model="$v.registrationSubmission.$model" :class="{'is-invalid' :$v.registrationSubmission.$error, 'is-valid' : !$v.registrationSubmission.$invalid  }"></b-form-datepicker>
                    <div class="invalid-feedback">
                        <span v-if="!$v.registrationSubmission.required">Date of registration submission is required</span>
                        <span v-if="!$v.registrationSubmission.isAfterLastRegistration">Date of registration submission should be after the last registration date</span>
                    </div>
                </div>

                <br>

                <button class="btn btn-primary" @click="alertMsg" :disabled="$v.$invalid" >submit</button>
            </form>



        </div>
    </div>
</template>

<script>
    import { required, maxLength } from 'vuelidate/lib/validators'
    export default {
        name: "FormValidation",
        data (){
            return {
                name: '',
                vehicleType: null,
                licensePlate: '',
                vehicleModel: null,
                lastRegistration: null,
                registrationSubmission: new Date().toISOString(),

            }
        },
        validations: {
            name: {
                required,
                maxLength: maxLength(50),

            },
            vehicleType:{
                required
            },
            licensePlate:{
                isValidRegistration(){
                    const regex = /\b[A-Za-z][A-Za-z]-[0-9][0-9][0-9][0-9]-[A-Za-z][A-Za-z]\b/;
                    return (regex.test(this.licensePlate)?1:0)
                },
                required
            },
            vehicleModel:{

            },
            lastRegistration:{
                required,
                afterToday() {
                    return (this.lastRegistration<=new Date().toISOString()? 1 : 0);
                }
            },
            registrationSubmission: {
                required,
                isAfterLastRegistration() {
                    return (this.lastRegistration<=this.registrationSubmission? 1 : 0);
                }
            }
        },
        methods: {
            alertMsg: function() {
                var msg = 'Vehicle name: ' + this.name + '\n Vehicle type: ' + this.vehicleType + '\n Vehicle model: ' + (this.vehicleModel!=null?this.vehicleModel:'unknown')
                    + '\n License Plate: ' + this.licensePlate + '\n Last Registration: ' + this.lastRegistration + '\n Registration submission: ' + this.registrationSubmission.split('T')[0];
                alert(msg)
            }
        }
    }
</script>
