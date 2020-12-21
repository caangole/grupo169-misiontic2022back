<template>
  <v-app>
  <v-data-table
    :headers="headers"
    :items="servicios"
    sort-by="id"
    class="elevation-1"
    loading
    loading-text="Cargando... Un momento por favor."
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Servicios</v-toolbar-title>
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
              Agregar Servicio
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
                      v-model="editedItem.titulo"
                      label="Título"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="editedItem.imagen"
                      label="Ruta de la imagen"
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
        <!-- <v-dialog v-model="dialogChangeState" max-width="500px">
          <v-card>
            <v-card-title class="headline">Deseas cambiar el estado de este servicio?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeChangeState">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="changeStateItemConfirm">Aceptar</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog> -->
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
      <!-- <v-icon
        medium
        @click="changeStateItem(item)"
      >
      <template v-if="item.estado">
        mdi-toggle-switch
      </template>

      <template v-else>
        mdi-toggle-switch-off-outline
      </template>
         -->
<!-- 
        
      </v-icon> -->
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
    {{$data.servicios}}
  </pre> -->
  </v-app>
</template>

<script>
import axios from 'axios';
export default {
    data: () => ({
      dialog: false,
      dialogChangeState: false,
      headers: [
        {text: 'ID', value: 'id'},
        {
          text: 'Servicios',
          align: 'start',
          sortable: true,
          value: 'titulo',
        },
        { text: 'Descripción', value: 'descripcion' },
        { text: 'Ruta de Imagen', value: 'imagen' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      servicios: [],
      editedId: -1,
      editedItem: {
        id: 0,
        titulo: '',
        descripcion: '',
        imagen: '',
      },
      defaultItem: {
        id: 0,
        titulo: '',
        descripcion: '',
        imagen: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedId === -1 ? 'Nuevo Servicio' : 'Editar Servicio'
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
        axios.get('https://grupo169-misiontic2022.herokuapp.com/api/servicio/list')
        .then(response =>{
          this.servicios = response.data;
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

      save () {
        if (this.editedId > -1) {
          //put
          axios.put('https://grupo169-misiontic2022.herokuapp.com/api/servicio/update', {
            'id': this.editedId,
            'titulo':this.editedItem.titulo,
            'descripcion': this.editedItem.descripcion,
            'imagen': this.editedItem.imagen
          })
            .then(response =>{
              this.list();
            })
            .catch(error =>{
              return error;
            })
        } else {
          //post
          axios.post('https://grupo169-misiontic2022.herokuapp.com/api/servicio/add', {
            'titulo':this.editedItem.titulo,
            'descripcion': this.editedItem.descripcion,
            'imagen': this.editedItem.imagen
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