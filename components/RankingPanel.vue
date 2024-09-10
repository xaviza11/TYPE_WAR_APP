<template>
    <div id="ranking-container">
      <table id="ranking-table">
        <thead>
          <tr>
            <th>{{ t('rankingPanel.index') }}</th>
            <th>{{ t('rankingPanel.name') }}<button @click="sortTable('name')">{{ t('rankingPanel.sort') }}</button></th>
            <th>{{ t('rankingPanel.ppsAvg') }}<button @click="sortTable('ppsAvg')">{{ t('rankingPanel.sort') }}</button></th>
            <th>{{ t('rankingPanel.ppsAvg') }}<button @click="sortTable('errorAvg')">{{ t('rankingPanel.sort') }}</button></th>
            <th>{{ t('rankingPanel.durationAvg') }}<button @click="sortTable('durationAvg')">{{ t('rankingPanel.sort') }}</button></th>
          </tr>
        </thead>
        <tbody id="ranking-body">
          <tr 
            v-for="(item, index) in paginatedItems" 
            :key="index"
            :class="{ 'highlight': item.name === name }"
          >
            <td>{{ (currentPage - 1) * 10 + index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.ppsAvg }}</td>
            <td>{{ item.errorAvg }}</td>
            <td>{{ item.durationAvg }}</td>
          </tr>
        </tbody>
      </table>
      <div id="pagination-controls">
        <button id="prev-page" @click="prevPage" :disabled="currentPage === 1">{{ t('rankingPanel.previous') }}</button>
        <span id="page-info">{{ t('rankingPanel.page') }} {{ currentPage }} {{ t('rankingPanel.of') }} {{ totalPages }}</span>
        <button id="next-page" @click="nextPage" :disabled="currentPage === totalPages">{{ t('rankingPanel.next') }}</button>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref, computed, onMounted } from '@vue/composition-api';
  import getUsersRanking from '../handlers/completedTexts/getUsersRanking'; 
  import Cookies from 'js-cookie'
  import { useTranslate } from '../utils/useTranslate/useTranslate';
  
  export default defineComponent({
    setup() {

      const {t} = useTranslate()

      const currentPage = ref(1);
      const itemsPerPage = 10;
      const rankings = ref([]);
      const sortKey = ref(null);
      const sortOrder = ref(1); 
      const name = Cookies.get('userName'); 
  
      const totalPages = computed(() => {
        return Math.ceil(rankings.value.length / itemsPerPage);
      });
  
      const sortedRankings = computed(() => {
        if (sortKey.value) {
          return rankings.value.slice().sort((a, b) => {
            if (a[sortKey.value] < b[sortKey.value]) return -1 * sortOrder.value;
            if (a[sortKey.value] > b[sortKey.value]) return 1 * sortOrder.value;
            return 0;
          });
        }
        return rankings.value;
      });
  
      const paginatedItems = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return sortedRankings.value.slice(start, end);
      });
  
      const findUserPosition = (userName) => {
        const index = sortedRankings.value.findIndex(item => item.name === userName);
        console.log(`User position in sorted list: ${index}`);
        return index;
      };
  
      const getUserPage = (userIndex) => {
        if (userIndex === -1) return 1;
        const page = Math.floor(userIndex / itemsPerPage) + 1;
        return Math.min(page, totalPages.value);
      };
  
      const updatePageToUserPosition = () => {
        const userIndex = findUserPosition(name);
        const userPage = getUserPage(userIndex);
        currentPage.value = userPage;
      };
  
      const loadRankings = async () => {
        const result = await getUsersRanking();
        rankings.value = result.data;
        updatePageToUserPosition();
      };
  
      const prevPage = () => {
        if (currentPage.value > 1) {
          currentPage.value--;
        }
      };
  
      const nextPage = () => {
        if (currentPage.value < totalPages.value) {
          currentPage.value++;
        }
      };
  
      const sortTable = (key) => {
        if (sortKey.value === key) {
          sortOrder.value = -sortOrder.value;
        } else {
          sortKey.value = key;
          sortOrder.value = 1;
        }
        currentPage.value = 1; 

        setTimeout(() => {
          updatePageToUserPosition();
        }, 0);
      };
  
      onMounted(loadRankings);
  
      return {
        currentPage,
        paginatedItems,
        totalPages,
        prevPage,
        nextPage,
        sortTable,
        name,
        t
      };
    },
  });
  </script>
  
  <style scoped>
  .highlight {
    background-color: #d4edda; 
  }
  </style>
  