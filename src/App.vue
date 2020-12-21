<template>
<v-app id="inspire">
    <v-system-bar app>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Proyecto Final Ciclo 3</v-toolbar-title>
    </v-app-bar>

      <v-navigation-drawer
          permanent
          expand-on-hover
          app
        >
    <v-card
      class="mx-auto"
      width="300"
    >
      <v-list>
        <v-list-item
        :to= "{name:'Home'}">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
  
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
  
        <v-list-group
          prepend-icon="work"
        >
  
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Admin</v-list-item-title>
              </v-list-item-content>
            </template>
  
            <v-list-item
              v-for="([title, icon, ruta], i) in admins"
              :key="i"
              :to= "{name: ruta}"
            >
              <v-list-item-title v-text="title"></v-list-item-title>
  
              <v-list-item-icon>
                <v-icon v-text="icon"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
  
          <v-list-group
          prepend-icon="mdi-key-chain"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Permisos</v-list-item-title>
              </v-list-item-content>
            </template>
  
            <v-list-item
              v-for="([title, icon, ruta], i) in cruds"
              :key="i"
              link
              :to="{name: ruta}"
            >
              <v-list-item-title v-text="title"></v-list-item-title>
  
              <v-list-item-icon>
                <v-icon v-text="icon"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
      </v-list>
    </v-card>
      </v-navigation-drawer>

    <v-main class="grey lighten-2">
      <v-container>
        <router-view/>       
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    admins: [
        ['Categoría', 'category', 'Categoria'],
        ['Artículo', 'mdi-dots-grid', 'Articulo'],
        ['Servicio', 'mdi-face-agent', 'Servicio'],
      ],
      cruds: [
        ['Usuarios', 'mdi-account-group', 'Usuario'],
      ],  
  }),
};
</script>
