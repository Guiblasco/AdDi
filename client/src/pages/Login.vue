<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="max-width: 400px">

    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="name"
        label="Escriu el teu usuari "
        hint=""
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'escriu algo']"
      />

      <q-input
        filled
        type="password"
        v-model="password"
        label="Contrasenya"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'introduir contrasenya'
        ]"
      />

      <div>
        <q-btn label="Entrar" class="full-width" color="primary"/>
      </div>
      <q-card-section class="text-center q-pa-none">
        <p class="text-grey-6">No estas registrat? <a href="#/Register">Registrat</a></p>
      </q-card-section>
    </q-form>

  </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex'
}
</script>
