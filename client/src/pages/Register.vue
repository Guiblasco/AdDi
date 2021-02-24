<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="max-width: 500px">
      <q-input
        filled
        v-model="full_name"
        label="Nom complet "
        hint="Escriu el teu nom complet"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'No pot estar buit']"
      />
      <q-input
        filled
        v-model="username"
        label="Nom usuari"
        hint="Escriu el teu nom d'usuari"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'No pot estar buit']"
      />
      <q-input
        filled
        v-model="dni"
        label="DNI"
        hint="Escriu el teu DNI"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'No pot estar buit']"
      />
      <q-input
        filled
        type="password"
        v-model="password"
        label="Contrasenya"
        hint="Escriu la contrasenya"
        lazy-rules
        :rules="[ val => val == password2 ]"
      />
      <q-input
        filled
        type="password"
        v-model="password2"
        label="Contrasenya"
        hint="Torna escriure la contrasenya"
        lazy-rules
        :rules="[
         val => val && val.length > 0 || 'Introduir contrasenya',
         val => val != password || 'han de coincidir les contrasenyes'
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
      full_name: '',
      dni: '',
      username: '',
      password: '',
      password2: ''

    }
  }
}
</script>
