<template>
  <div class="row">
    <div class="col-6">
      <div>
        <div class="form-group">
          <label>Name</label>
          <input type="text" class="form-control" v-model="targetProjet.Name" />
        </div>

        <div class="form-group">
          <label>MainProjet</label>
          <select class="form-control" v-model="targetProjet.ParnetId">
            <option value="-1"></option>
            <option
              v-for="mainProjet in MainProjetList"
              :key="mainProjet.Id"
              :value="mainProjet.Id"
            >
              {{ mainProjet.Name }}
            </option>
          </select>
        </div>

             <div class="form-group">
          <label>Deccription</label>
          <textarea v-model="targetProjet.Description"></textarea>
        </div>

        <div class="form-group">
          <label>Environment</label>
          <select class="form-control" multiple v-model="envIds">
            <option v-for="env in envList" :key="env.Id" :value="env.Id">
              {{ env.Name }}
            </option>
          </select>
        </div>

        <div>
          <div class="form-group">
            <label>VersionNumber</label>
            <input
              type="text"
              class="form-control"
              v-model="targetProjet.VersionNumber"
            />
          </div>
          <button
            class="btn btn-primary"
            @click="AddVersion"
            v-if="!IsNewProjet && IsParentProjet"
          >
            Add version
          </button>
          <table>
            <thead>
              <tr>
                <th>Version</th>
                <th>CreatedOn</th>
              </tr>
            </thead>
            <template v-if="targetProjet.Versions.length == 0">
              <tr>
                <td>NoData</td>
              </tr>
            </template>
            <template v-else>
              <tr v-for="version in targetProjet.Versions" :key="version.Id">
                <td>{{ version.VersionNumber }}}</td>
                <td>{{ version.CreatedOn }}}</td>
              </tr>
            </template>
            <tbody>
              <tr></tr>
            </tbody>
          </table>
        </div>

        <button class="btn btn-primary" @click="saveProjet()">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import VersionService from "../Services/VersionService.js";
import { useRoute } from "vue-router";

export default {
  name: "Projet",
  data() {
    return {
      VersionNumber: null,
      envList: [],
      envIds: [],
      targetProjet: {
        Id: null,
        Name: null,
        ParentId: null,
        Description: null,
        Versions: [],
      },
    };
  },
  methods: {
    async GetProjetList() {
      this.projetList = await VersionService.GetProjetList(null);

      if (this.Id != null && this.Id > 0) {
        this.targetProjet = this.projetList.find((p) => p.Id == this.Id);
      }
    },

    async GetEnvironment() {
      this.envList = await VersionService.GetEnvironmentList();
    },
    async AddVersion() {
      if (
        this.VersionNumber != null && !IsNewProjet
      ) {
        let result = await VersionService.CreateVersion({
          VersionNumber: this.VersionNumber,
          ProjetId: this.targetProjet.Id,
        });

        if (result > 0) {
          alert("create version successfully");
        }
      }
    },
    async saveProjet() {
      console.log(this.targetProjet);
      let ProjetEnvironments = [];
      for (let envId of this.envIds) {
        ProjetEnvironments.push(envId);
      }

      if (this.targetProjet.Name != null && this.targetProjet.Name != "") {
        let result = await VersionService.CreateProjet({
          Id: this.targetProjet.Id,

          Name: this.targetProjet.Name,
          ParentId: this.targetProjet.ParentId,
          Description :  this.targetProjet.Description,
          EnvIds: ProjetEnvironments
        });
        if (result > 0) alert("Saved successfully");
      } else {
        // TODO add error message
      }
    },
  },
  mounted() {
    this.GetProjetList();
    this.GetEnvironment();
    const route = useRoute();
    if (route.query != null && route.query.Id != null && route.query.Id > 0) {
      this.Id = parseInt(route.query.Id);
    }
  },
  computed: {
    MainProjetList: function () {
      return this.projetList.filter(
        (p) => p.ParentId == null && p.Id != this.Id
      );
    },
    IsNewProjet() {
      return !(this.targetProjet.Id != null && this.targetProjet.Id > 0);
    },
    IsParentProjet(){
      return !(this.targetProjet.ParentId!=null &&  this.targetProjet.ParentId >0);
    }
  },
};
</script>
<style>
.form-group {
  text-align: initial;
}
</style>
