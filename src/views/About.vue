<template>
  <button @click="createVersion()" class="btn btn-primary">Open modal</button>

  <modal :showModal="showModal" @close="showModal = false" @confirm=" showModal = false">
    <div>test123456</div>
  </modal>
  <table class="table table-striped">
    <tbody>
      <template v-for="projet in ProjetVersionList" :key="projet.Id">
        <tr>
          <td :colspan="projet.SubProjet.length + 1">{{ projet.Name }}</td>
        </tr>
        <tr>
          <td></td>
          <td v-for="subProjet in projet.SubProjet" :key="subProjet.Id">
            {{ subProjet.Name }}
          </td>
        </tr>
        <tr v-for="env in getProjetEnv(projet.Id)" :key="env.Id">
          <td>{{ env.Name }}</td>
          <td v-for="subProjet in projet.SubProjet" :key="subProjet.Id">
            {{
              getTargetVersionByProjetIdAndEnv(projet.Id, subProjet.Id, env.Id).VersionNumber
            }} - {{getTargetVersionByProjetIdAndEnv(projet.Id, subProjet.Id, env.Id).CreatedOn}}
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>
<script>
import VersionServices from "../Services/VersionService.js";
import Modal from "../components/Modal.vue";
export default {
  data: function () {
    return {
      ProjetVersionList: [],
      showModal: false,
    };
  },
  components:{
      Modal
  },
  methods: {
    async GetVersionList() {
      this.ProjetVersionList = await VersionServices.GetVersionList(null);
    },
    createVersion(){
      this.showModal = true;

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