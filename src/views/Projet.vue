<template>
  <router-link to="/EditProjet">CreateProjet</router-link>
  <ul>
    <li v-for="projet in formatedProjetList" :key="projet.Id">
      <router-link
        :to="{
          name: 'EditProjet',
          query: {
            Id: projet.Id,
          },
        }"
        >{{ projet.Name }}</router-link
      >
      <template v-if="projet.ChildrenList.length > 0">
        <ul>
          <li v-for="subProjet in projet.ChildrenList" :key="subProjet.Id">
            <router-link
              :to="{
                name: 'EditProjet',
                query: {
                  Id: subProjet.Id,
                },
              }"
              >{{ subProjet.Name }}</router-link
            >
          </li>
        </ul>
      </template>
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
  computed: {
    formatedProjetList() {
      let formatedList = [];
      if (this.projetList != null && this.projetList.length > 0) {
        this.projetList.map((x) => {
          x.ChildrenList = [];
          if (x != null && x.ParentId == null) {
            x.ChildrenList = this.projetList.filter((p) => p.ParentId == x.Id);

            formatedList.push(x);
          }
        });
      }

      return formatedList;
    },
  },
};
</script>

