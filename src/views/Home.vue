<template>
  <div class="home container" style="width: 500px">
    <FormValidation></FormValidation>
  </div>
</template>

<script>
  // @ is an alias to /src
  import FormValidation from '@/components/VehicleAddForm.vue'

  export default {
    name: 'Forma',
    components: {
      FormValidation
    }
  }
</script>
