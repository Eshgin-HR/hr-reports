<template>
  <div class="px-3 md:px-12 text-left">
    <div class="flex flex-col gap-8">
      <div class="flex flex-col gap-2">
        <div class="text-2xl font-bold">Group HR Analytics</div>
        <div class="text-sm font-medium text-subTitle">
          To explore different categories you can find them using the menu at the top of
          your screen.
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <card v-for="(val, index) in allReportsFunc" :key="index" :companies="val" />
      </div>
      <div v-if="allReportsFunc.length <= 0" class="font-bold text-subTitle">
        No result...
      </div>
    </div>
  </div>
</template>

<script>
import {
  db,
} from "@/common/helpers/reports";
import { TrToEn } from "@/common/helpers/user";
import card from "@/common/components/boxes/card.vue";
import { getRole } from "@/services/tokenService/TokenService";

// Remove unused imports

export default {
  data() {
    return {
      allReports: [],
      TrToEn,
    };
  },
  components: {
    card,
  },
  mounted() {
    this.allReports = db[getRole()];
  },
  computed: {
    allReportsFunc() {
      return this.allReports.filter((a) =>
        this.TrToEn(a.companyName)
          .toLowerCase()
          .includes(this.$store.state.user.searchVal.toLowerCase())
      );
    },
  },
};
</script>

<style></style>
