<template>
  <ContentHeader>Edit projet</ContentHeader>
  <section class="content">
    <div class="row">
      <div class="col-6">
        <div class="card card-primary">
          <div class="card-header">
            <h3 class="card-title">General</h3>

            <div class="card-tools">
              <button
                type="button"
                class="btn btn-tool"
                data-card-widget="collapse"
                title="Collapse"
              >
                <i class="fas fa-minus"></i>
              </button>
            </div>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label>Name</label>
              <input
                type="text"
                class="form-control"
                v-model="targetProjet.Name"
              />
            </div>

            <div class="form-group">
              <label>MainProjet</label>
              <select
                class="form-control select2"
                v-model="targetProjet.ParnetId"
              >
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
              <textarea
                v-model="targetProjet.Description"
                class="form-control"
              ></textarea>
            </div>

            <div class="form-group">
              <label>Environment</label>
              <select class="form-control select2" multiple v-model="envIds">
                <option v-for="env in envList" :key="env.Id" :value="env.Id">
                  {{ env.Name }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="col-sm-6">
        <div class="card card-info">
          <div class="card-header">
            <h3 class="card-title">Version</h3>

            <div class="card-tools">
              <button
                type="button"
                class="btn btn-tool"
                data-card-widget="collapse"
                title="Collapse"
              >
                <i class="fas fa-minus"></i>
              </button>
            </div>
          </div>
          <div class="card-body p-0">
            <div class="m-4">
              <div class="form-group">
                <label>VersionNumber</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="VersionNumber"
                />
              </div>
              <button
                class="btn btn-primary"
                @click="AddVersion()"
                v-if="!IsNewProjet && IsParentProjet"
              >
                Add version
              </button>
            </div>

            <table class="table">
              <thead>
                <tr>
                  <th>Version</th>
                  <th>CreatedOn</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="targetProjet.Versions.length == 0">
                  <tr>
                    <td colspan="2" style="text-align: center">NoData</td>
                  </tr>
                </template>
                <template v-else>
                  <tr
                    v-for="version in targetProjet.Versions"
                    :key="version.Id"
                  >
                    <td>{{ version.VersionNumber }}</td>
                    <td>{{ $filters.DateFormat(version.CreatedOn) }}</td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>

        <div class="card card-secondary" v-if="IsParentProjet">
          <div class="card-header">
            <h3 class="card-title">Sub-projet</h3>

            <div class="card-tools">
              <button
                type="button"
                class="btn btn-tool"
                data-card-widget="collapse"
                title="Collapse"
              >
                <i class="fas fa-minus"></i>
              </button>
            </div>
          </div>
          <div class="card-body p-0">
            <table class="table">
              <thead>
                <tr>
                  <th>SubProjetName</th>
                  <th>CreatedOn</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="SubProjetList.length == 0">
                  <tr>
                    <td colspan="2">NoData</td>
                  </tr>
                </template>
                <template v-else>
                  <tr v-for="subProjet in SubProjetList" :key="subProjet.Id">
                    <td>{{ subProjet.Name }}</td>
                    <td>{{ $filters.DateFormat(subProjet.CreatedOn) }}</td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>

        <div class="card card-success" v-if="!IsNewProjet">
          <div class="card-header">
            <h3 class="card-title">Deploiment history</h3>
            <div class="card-tools">
              <button
                type="button"
                class="btn btn-tool"
                data-card-widget="collapse"
                title="Collapse"
              >
                <i class="fas fa-minus"></i>
              </button>
            </div>
          </div>
          <div class="card-body p-0">
            <table class="table">
              <thead>
                <tr>
                  <td>ProjetName</td>
                  <td>EnvironmentName</td>
                  <td>DeploimentVersion</td>
                  <td>CreatedOn</td>
                </tr>
              </thead>
              <tbody>
                <template v-if="deploimentList.length == 0">
                  <tr>
                    <td colspan="4">NoData</td>
                  </tr>
                </template>
                <template v-else>
                  <tr v-for="deploiment in deploimentList" :key="deploiment.Id">
                    <td>{{ deploiment.ProjetName }}</td>
                    <td>{{ deploiment.EnvironmentName }}</td>
                    <td>{{ deploiment.VersionNumber }}</td>
                    <td>{{ $filters.DateFormat(deploiment.CreatedOn) }}</td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="col-12">
        <button class="btn btn-primary" @click="saveProjet()">Save</button>
      </div>
    </div>
  </section>
</template>

<script>
import VersionService from "../Services/VersionService.js";
import { useRoute } from "vue-router";

export default {
  name: "Projet",

  data() {
    return {
      projetList: [],
      deploimentList: [],
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

      if (this.targetProjet.Id != null && this.targetProjet.Id > 0) {
        this.targetProjet = this.projetList.find(
          (p) => p.Id == this.targetProjet.Id
        );
      }
    },
    async GetDeploimentHistory() {
      if (!this.IsNewProjet) {
        this.deploimentList = await VersionService.GetDeploimentHistory({
          ParentId: this.IsParentProjet ? this.targetProjet.Id : null,
          ProjetId: !this.IsParentProjet ? this.targetProjet.Id : null,
        });
      }
    },
    async GetEnvironment() {
      this.envList = await VersionService.GetEnvironmentList();
    },
    async AddVersion() {
      if (this.VersionNumber != null && !this.IsNewProjet) {
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
      let ProjetEnvironments = [];
      for (let envId of this.envIds) {
        ProjetEnvironments.push(envId);
      }

      if (this.targetProjet.Name != null && this.targetProjet.Name != "") {
        let result = await VersionService.CreateProjet({
          Id: this.targetProjet.Id,

          Name: this.targetProjet.Name,
          ParentId: this.targetProjet.ParentId,
          Description: this.targetProjet.Description,
          EnvIds: ProjetEnvironments,
        });
        if (result > 0) alert("Saved successfully");
      } else {
        // TODO add error message
      }
    },
  },
  mounted() {
    this.$sharedControl.initializeSelect2();
    const route = useRoute();
    if (route.query != null && route.query.Id != null && route.query.Id > 0) {
      this.targetProjet.Id = parseInt(route.query.Id);
    }

    this.GetDeploimentHistory();
    this.GetProjetList();
    this.GetEnvironment();
  },
  computed: {
    MainProjetList: function () {
      return this.projetList.filter(
        (p) => p.ParentId == null && p.Id != this.targetProjet.Id
      );
    },
    IsNewProjet() {
      return !(this.targetProjet.Id != null && this.targetProjet.Id > 0);
    },
    IsParentProjet() {
      return !(
        this.targetProjet.ParentId != null && this.targetProjet.ParentId > 0
      );
    },
    SubProjetList() {
      return this.projetList.filter((p) => p.ParentId == this.targetProjet.Id);
    },
  },
};
</script>
<style>
.form-group {
  text-align: initial;
}
</style>
