<template>
    <div class="container">
        <div>
            <label class="form-label">Sort by</label>
            <select class="form-control mb-2" v-model="column">
                <option :value="null">No Column Filter</option>
                <option v-for="col in cols" :key="col">{{ col }}</option>
            </select>
            <label class="form-label">Search</label>
            <input class="input-group mb-2" type="text" v-model="search" placeholder="Search">
        </div>
        <table class="table">
            <thead class="table-dark">
            <tr>
                <th v-for="col in cols" :key="col">{{ col }}</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(row, index) in rows" :key="row.plateNumber">
                <td v-for="col in cols" :key="col">{{ row[col] }}</td>
                <td>  <b-button v-b-modal="'my-modal' " class="m-1" @click="editVehicle(index)"><b-icon icon="pencil-square"></b-icon></b-button>
                    <button @click="deleteVehicle(index)"> <b-icon class="btn-danger" icon="file-x-fill"></b-icon></button></td>
            </tr>
            </tbody>
        </table>
        <b-modal id="my-modal">
            <form @submit.prevent="edited">
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
                <input type="number" hidden >
                <br>

                <button class="btn btn-primary" @click="edited"  :disabled="$v.$invalid" >submit</button>
            </form>

        </b-modal>

    </div>



</template>

<script>
    import {maxLength, required} from "vuelidate/lib/validators";

    export default {
        name: "Tabela",
        data() {
            return{
                search: null,
                column: null,
                name: '',
                vehicleType: null,
                licensePlate: '',
                vehicleModel: null,
                theindex: null,
                vehicles: [
                    {
                        "vehicleName":"vehicle",
                        "vehicleType":"Car",
                        "plateNumber":"SK-1234-AB",
                        "model":"Audi"
                    },
                    {
                        "vehicleName":"vehicle-2",
                        "vehicleType":"Van",
                        "plateNumber":"SK-5555-AB",
                        "model":"Mercedes"
                    },
                    {
                        "vehicleName":"vehicle-3",
                        "vehicleType":"Truck",
                        "plateNumber":"ST-9852-AB",
                        "model":"BMW"
                    },
                    {
                        "vehicleName":"vehicle-4",
                        "vehicleType":"Trailer",
                        "plateNumber":"PP-7412-AB",
                        "model":"Citroen"
                    },
                    {
                        "vehicleName":"vehicle-5",
                        "vehicleType":"Container",
                        "plateNumber":"SK-3654-AB",
                        "model":"Opel"
                    }
                ]
            }},
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
        },

        methods: {
            deleteVehicle: function(index) {
                this.vehicles.splice(index, 1);
            },
            editVehicle: function (index) {
                this.name = this.vehicles[index].vehicleName;
                this.vehicleType = this.vehicles[index].vehicleType;
                this.licensePlate = this.vehicles[index].plateNumber;
                this.vehicleModel = this.vehicles[index].model;
                this.theindex = index;
            },
            edited: function () {
                console.log(this.theindex);
                this.vehicles[this.theindex].vehicleName = this.name;
                this.vehicles[this.theindex].vehicleType = this.vehicleType;
                this.vehicles[this.theindex].plateNumber = this.licensePlate;
                this.vehicles[this.theindex].model = this.vehicleModel;
                this.$bvModal.hide('my-modal')
            }
        },
        computed: {
            cols () {
                return this.vehicles.length >= 1 ? Object.keys(this.vehicles[0]) : []
            },
            rows () {
                if (!this.vehicles.length) {
                    return []
                }

                return this.vehicles.filter(vehicle => {
                    let props = (this.search && this.column) ? [vehicle[this.column]] : Object.values(vehicle)


                    return props.some(prop => !this.search || ((typeof prop === 'string') ? prop.includes(this.search) : prop.toString(10).includes(this.search)))
                })
            }
        }
    }

</script>

