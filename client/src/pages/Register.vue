
<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="max-width: 500px">
      <q-form
      @reset="onReset"
      class="q-gutter-md"
      autofocus>
      <q-input
        filled
        v-model="full_name"
        label="Nom complet "
        hint="Escriu el teu nom complet"
        lazy-rules
        :rules="[ val => val && val.length > 0 && full_nameWords || 'No pot estar buit']"
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
        :rules="[ val => isValidDNI || 'No pot estar buit']"
      />
      <q-input
        filled
        type="password"
        v-model="password"
        label="Contrasenya"
        hint="Escriu la contrasenya"
        lazy-rules
        :rules="[ val => val == password2 ]"
        clearable
      />
      <q-input
        filled
        type="password"
        v-model="password2"
        label="Contrasenya"
        hint="Torna escriure la contrasenya"
        lazy-rules
        :rules="[
         val => this.password2.length > 0 || 'Introduir contrasenya',
         val => val == this.password || 'han de coincidir les contrasenyes'
         ]"
         clearable
      />

      <div>
        <q-btn label="Registrar-se" class="full-width" color="primary"/>
      </div>
      </q-form>
  </div>
  </q-page>
</template>

<script>
import { api } from '../boot/axios'
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
  },
  computed: {
    full_nameWords () {
      function checksize (size) {
        return size.length > 1
      }
      var names = this.full_name.split(' ')
      return names.length >= 3 & names.filter(checksize).length === names.length
    },
    isValidDNI () {
      const expresio = new RegExp('[0-9]{8}[A-Z]')
      return expresio.test(this.dni)
    }
  },
  methods: {
    onReset () {
      this.full_name = null
      this.dni = null
      this.username = null
      this.password = null
      this.password2 = null
    },
    loadData () {
      api.get('/api/backend')
        .then((reponse) => {
          this.data = reponse.data
        })
        .catch(() => {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: 'Loading failed',
            icon: 'report_problem'
          })
        })
    }
  }
}

</script>
