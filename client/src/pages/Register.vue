<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="max-width: 400px">
      <q-input
        filled
        v-model="nom"
        label="Escriu el teu nom "
        hint=""
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'escriu algo']"
      />
      <q-input
        filled
        v-model="cognom"
        label="Escriu el teus cognoms "
        hint=""
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'escriu algo']"
      />
    </div>
    <div class="q-pa-md" style="max-width: 400px">

      <q-input
        filled
        v-model="dni"
        label="Escriu el teu DNI "
        hint=""
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'escriu algo']"
      />
      <q-input
        filled
        v-model="username"
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
        <q-btn label="Registrar-se" class="full-width" color="primary"/>
      </div>

  </div>
  </q-page>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      nom: '',
      dni: '',
      username: '',
      cognom: '',
      password: ''

    }
  }
}
</script>
