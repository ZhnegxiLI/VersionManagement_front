<template>
  <ContentHeader>Projet</ContentHeader>

  <section class="content">
     <template v-for="projet in ProjetVersionList" :key="projet.Id">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Projects</h3>

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
       
          <h3 class="mainProjetTitle">
            <router-link
              :to="{
                name: 'EditProjet',
                query: {
                  Id: projet.Id,
                },
              }"
              >{{ projet.Name }}</router-link
            >
          </h3>
          <table class="table table-striped projects">
            <tbody>
              <tr>
                <td></td>
                <td v-for="subProjet in projet.SubProjet" :key="subProjet.Id">
                  <router-link
                    :to="{
                      name: 'EditProjet',
                      query: {
                        Id: subProjet.Id,
                      },
                    }"
                    >{{ subProjet.Name }}</router-link
                  >
                </td>
              </tr>
              <tr v-for="env in getProjetEnv(projet.Id)" :key="env.Id">
                <td>{{ env.Name }}</td>
                <td v-for="subProjet in projet.SubProjet" :key="subProjet.Id">
                  <a>
                    {{
                      getTargetVersionByProjetIdAndEnv(
                        projet.Id,
                        subProjet.Id,
                        env.Id
                      ).VersionNumber ?? "--"
                    }}
                  </a>
                  <br />
                  <small>
                    {{
                      $filters.DateFormat(
                        getTargetVersionByProjetIdAndEnv(
                          projet.Id,
                          subProjet.Id,
                          env.Id
                        ).CreatedOn
                      ) ?? "--"
                    }}
                  </small>
                </td>
              </tr>
            </tbody>
          </table>
      </div>
    </div>
         </template>
  </section>
</template>
<script>
import VersionServices from "../Services/VersionService.js";
//import Modal from "../components/Modal.vue";
export default {
  data: function () {
    return {
      ProjetVersionList: [],
      showModal: false,
    };
  },
  methods: {
    async GetVersionList() {
      this.ProjetVersionList = await VersionServices.GetVersionList(null);
    },
    getProjetEnv(projetId) {
      let envList = [];
      let targetProjet = this.ProjetVersionList.find((x) => x.Id == projetId);
      if (targetProjet != null && targetProjet.SubProjet.length > 0) {
        targetProjet.SubProjet.map((x) => {
          if (x.ProjetEnvironment != null && x.ProjetEnvironment.length > 0) {
            x.ProjetEnvironment.map((y) => {
              if (envList.findIndex((e) => e.Id == y.EnvironmentId) == -1) {
                envList.push({
                  Id: y.EnvironmentId,
                  Name: y.EnvironmentName,
                });
              }
            });
          }
        });
      }

      return envList;
    },
    getTargetVersionByProjetIdAndEnv(projetId, subProjetId, envId) {
      var result = {};
      let targetProjet = this.ProjetVersionList.find((x) => x.Id == projetId);
      if (targetProjet != null && targetProjet.SubProjet.length > 0) {
        let targetSubProjet = targetProjet.SubProjet.find(
          (x) => x.Id == subProjetId
        );
        if (
          targetSubProjet != null &&
          targetSubProjet.ProjetEnvironment != null &&
          targetSubProjet.ProjetEnvironment.length > 0
        ) {
          let targetProjetEnv = targetSubProjet.ProjetEnvironment.find(
            (x) => x.EnvironmentId == envId
          );
          if (
            targetProjetEnv != null &&
            targetProjetEnv.DeploimentHistory != null &&
            targetProjetEnv.DeploimentHistory.length > 0
          ) {
            result = {
              VersionId: targetProjetEnv.DeploimentHistory[0].VersionId,
              VersionNumber: targetProjetEnv.DeploimentHistory[0].VersionNumber,
              CreatedOn: targetProjetEnv.DeploimentHistory[0].CreatedOn,
            };
          }
        }
      }
      return result;
    },
  },
  mounted() {
    this.GetVersionList();
  },
};
</script>
<style>
  .mainProjetTitle{
    text-align: center;
  }
</style>