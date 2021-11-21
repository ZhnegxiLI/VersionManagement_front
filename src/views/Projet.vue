<template>
  <router-link to="/EditProjet">CreateProjet</router-link>
  <ul>
    <li v-for="projet in projetList" :key="projet.Id">
      <router-link
        :to="{
          name: 'EditProjet',
          query: {
            Id: projet.Id,
          },
        }"
      >{{ projet.Name }}</router-link>
    </li>
  </ul>
</template>

<script>
import VersionService from "../Services/VersionService.js";
export default {
  name: "Projet",
  data() {
    return {
      projetList: [],
    };
  },
  methods: {
    async GetProjetList() {
      this.projetList = await VersionService.GetProjetList(null);
    },
  },
  mounted() {
    this.GetProjetList();
  },

};
</script>

