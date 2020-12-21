<template>
  <v-app>
  <v-data-table
    :headers="headers"
    :items="categorias"
    sort-by="id"
    class="elevation-1"
    :loading="carga"
    loading-text="Cargando... Un momento por favor."
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Categorías</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Agregar Categoría
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="editedItem.nombre"
                      label="Nombre"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <v-textarea
                      v-model="editedItem.descripcion"
                      label="Descripción"
                      auto-grow
                      counter="250"
                      no-resize
                    ></v-textarea>
                  </v-col>

                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogChangeState" max-width="500px">
          <v-card>
            <v-card-title class="headline">Deseas cambiar el estado de esta categoría?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeChangeState">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="changeStateItemConfirm">Aceptar</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        medium
        @click="changeStateItem(item)"
      >
      <template v-if="item.estado">
        mdi-toggle-switch
      </template>

      <template v-else>
        mdi-toggle-switch-off-outline
      </template>
        

        
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
  <!-- <pre>
    {{$data.categorias}}
  </pre> -->
  </v-app>
</template>

<script>
import axios from 'axios';
export default {
    data: () => ({
      dialog: false,
      dialogChangeState: false,
      carga: true,
      headers: [
        {text: 'ID', value: 'id'},
        {
          text: 'Categorías',
          align: 'start',
          sortable: true,
          value: 'nombre',
        },
        { text: 'Descripción', value: 'descripcion' },
        { text: 'Estado', value: 'estado' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      categorias: [],
      editedId: -1,
      editedItem: {
        id: 0,
        nombre: '',
        descripcion: '',
        estado: 0,
      },
      defaultItem: {
        id: 0,
        nombre: '',
        descripcion: '',
        estado: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedId === -1 ? 'Nueva Categoría' : 'Editar Categoría'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogChangeState (val) {
        val || this.closeChangeState()
      },
    },

    created () {
      this.list()
    },  

    methods: {

      list(){
        axios.get('https://grupo169-misiontic2022.herokuapp.com/api/categoria/list')
        .then(response =>{
          this.categorias = response.data;
          this.carga = false;
        })
        .catch(error=>{
          console.log(error);
        })
      },

      editItem (item) {
        this.editedId = item.id
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      changeStateItem (item) {
        this.editedId = item.id
        this.editedItem = Object.assign({}, item)
        this.dialogChangeState = true
      },

      changeStateItemConfirm () {

        if (this.editedItem.estado === 1) {
          //put
          axios.put('https://grupo169-misiontic2022.herokuapp.com/api/categoria/deactivate', {
            'id': this.editedId,
          })
            .then(response =>{
              this.list();
            })
            .catch(error =>{
              return error;
            })
        } else {
          //post
          axios.put('https://grupo169-misiontic2022.herokuapp.com/api/categoria/activate', {
            'id': this.editedId,
          })
            .then(response =>{  
              this.list();
            })
            .catch(error =>{
              return error;
            })
        }

        this.closeChangeState()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedId = -1
        })
      },

      closeChangeState () {
        this.dialogChangeState = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedId = -1
        })
      },

      save () {
        if (this.editedId > -1) {
          //put
          axios.put('https://grupo169-misiontic2022.herokuapp.com/api/categoria/update', {
            'id': this.editedId,
            'nombre':this.editedItem.nombre,
            'descripcion': this.editedItem.descripcion
          })
            .then(response =>{
              this.list();
            })
            .catch(error =>{
              return error;
            })
        } else {
          //post
          axios.post('https://grupo169-misiontic2022.herokuapp.com/api/categoria/add', {
            'estado': 1,
            'nombre':this.editedItem.nombre,
            'descripcion': this.editedItem.descripcion
          })
            .then(response =>{
              this.list();
            })
            .catch(error =>{
              return error;
            })
        }
        this.close()
      },
    },
}
</script>