<template>
  <div class="ranking-container">
    <h2>{{ t('rankingPanel.usersRanking') }}</h2>
    <table class="ranking-table">
      <thead>
        <tr>
          <th>{{ t('rankingPanel.index') }}</th>
          <th>
            {{ t('rankingPanel.name') }}
            <button @click="sortTable('name')">
              {{ t('rankingPanel.sort') }}
              <span v-if="sortKey === 'name'">
                <span v-if="sortOrder === 1">▲</span>
                <span v-else>▼</span>
              </span>
            </button>
          </th>
          <th>
            {{ t('rankingPanel.ppsAvg') }}
            <button @click="sortTable('ppsAvg')">
              {{ t('rankingPanel.sort') }}
              <span v-if="sortKey === 'ppsAvg'">
                <span v-if="sortOrder === 1">▲</span>
                <span v-else>▼</span>
              </span>
            </button>
          </th>
          <th>
            {{ t('rankingPanel.errorAvg') }}
            <button @click="sortTable('errorAvg')">
              {{ t('rankingPanel.sort') }}
              <span v-if="sortKey === 'errorAvg'">
                <span v-if="sortOrder === 1">▲</span>
                <span v-else>▼</span>
              </span>
            </button>
          </th>
          <th>
            {{ t('rankingPanel.durationAvg') }}
            <button @click="sortTable('durationAvg')">
              {{ t('rankingPanel.sort') }}
              <span v-if="sortKey === 'durationAvg'">
                <span v-if="sortOrder === 1">▲</span>
                <span v-else>▼</span>
              </span>
            </button>
          </th>
        </tr>
      </thead>
      <tbody class="ranking-body">
        <tr v-for="(item, index) in paginatedItems" :key="index" :class="{ 'highlight': item.name === name }">
          <td>{{ (currentPage - 1) * 10 + index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.ppsAvg }}</td>
          <td>{{ item.errorAvg }}</td>
          <td>{{ item.durationAvg }}</td>
        </tr>
      </tbody>
    </table>
    <div class="pagination-controls">
      <button class="prev-page" @click="prevPage" :disabled="currentPage === 1">{{ t('rankingPanel.previous') }}</button>
      <span class="page-info">{{ t('rankingPanel.page') }} {{ currentPage }} {{ t('rankingPanel.of') }} {{ totalPages }}</span>
      <button class="next-page" @click="nextPage" :disabled="currentPage === totalPages">{{ t('rankingPanel.next') }}</button>
    </div>
  </div>
</template>

<style scoped>

.ranking-container {
  width: 78vw;
  max-height: 40vh; 
  overflow: auto;
  padding: 10px;
}

.ranking-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px; 
  display: block;
}

.ranking-table thead,
.ranking-table tbody {
  display: table;
  width: 100%; 
  table-layout: fixed;
}

.ranking-table thead {
  width: calc(100% - 1px); 
}

.ranking-table tbody {
  height: 50vh;
  overflow-y: auto;
}

.ranking-table th,
.ranking-table td {
  padding: 6px 8px;
  border: 1px solid #ddd;
  text-align: left;
}

.ranking-table th {
  font-size: 10px; 
}

.ranking-table th button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
}

.ranking-table th button:hover {
  text-decoration: underline;
}

.ranking-body td {
  width: 20%; 
}

.highlight {
  background-color: transparent;
}

.pagination-controls {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.pagination-controls button {
  padding: 6px 12px; 
  font-size: 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pagination-controls button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination-controls button:not(:disabled):hover {
  background-color: #45a049;
}

.page-info {
  font-size: 12px;
  padding: 8px;
}
</style>

<script>
import { defineComponent, ref, computed } from '@vue/composition-api';
import Cookies from 'js-cookie';
import { useTranslate } from '../utils/useTranslate/useTranslate';

export default defineComponent({
  props: {
    rankings: {
      type: Array,
      required: true 
    }
  },
  setup(props) {
    const { t } = useTranslate();
    const currentPage = ref(1);
    const itemsPerPage = 10;
    const sortKey = ref(null);
    const sortOrder = ref(1);
    const name = Cookies.get('userName');

    const totalPages = computed(() => {
      return Math.ceil(props.rankings.length / itemsPerPage);
    });

    const sortedRankings = computed(() => {
      if (sortKey.value) {
        return props.rankings.slice().sort((a, b) => {
          if (a[sortKey.value] < b[sortKey.value]) return -1 * sortOrder.value;
          if (a[sortKey.value] > b[sortKey.value]) return 1 * sortOrder.value;
          return 0;
        });
      }
      return props.rankings;
    });

    const paginatedItems = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return sortedRankings.value.slice(start, end);
    });

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
    };

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
  }
});
</script>
