<template>
    <div class="data-table">
      <!-- Search/Filter -->
      <UtilsInputSearch
        :search="searchQuery"
        @model="searchQuery = $event"
        @input="filterData"
        :table="table"
      />
  
      <!-- Table -->
      <table class="table">
        <thead>
          <tr>
            <th
              v-for="column in columnsToRender"
              :key="column"
              @click="sortData(column)"
            >
              <span style="text-transform: capitalize;">{{ column.replace("-", " ") }}</span>
              <span v-if="sortColumn === column">
                {{ sortDirection === 'asc' ? ' ▲' : ' ▼' }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in paginatedData" :key="item.id">
            <td v-for="column in columnsToRender" :key="column">
              <!-- Renderiza o slot personalizado, se existir -->
              <slot 
                    :name="`column-${column}`" 
                    :item="item" 
                >
                    {{ item[column] }}
                </slot>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Pagination -->
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">
          <font-awesome icon="backward-step" class="cinza" />
        </button>
        <span>Página {{ currentPage }} de {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">
          <font-awesome icon="forward-step" class="cinza" />
        </button>
      </div>
    </div>
  </template>
  
  
  <script>

export default {
  props: {
    dataTable: {
      type: Object,
      required: true,
    },
    table: {
      type: String,
      required: true,
    },
    rowsPerPage: {
      type: Number,
      default: 10,
    }
  },
  data() {
    return {
      searchQuery: "",
      filteredData: this.dataTable,
      currentPage: 1,
      sortColumn: "",
      sortDirection: "asc",
    };
  },
  computed: {
    columnsToRender() {
      if (!this.dataTable || this.dataTable.length === 0) return [];

      // Obtenha todas as colunas disponíveis nos dados
      const allColumns = Object.keys(this.dataTable[0]);

      // Obtenha as colunas com templates personalizados (slots)
      const templateColumns = Object.keys(this.$slots)
        .filter((slotName) => slotName.startsWith("column-"))
        .map((slotName) => slotName.replace("column-", ""));

      // Filtrar colunas dos dados que têm slots definidos
      const customColumns = allColumns.filter((column) =>
        this.$slots[`column-${column}`]
      );

      // Combine as colunas, respeitando a ordem dos slots
      const orderedColumns = [...templateColumns, ...customColumns.filter((col) => !templateColumns.includes(col))];

      return orderedColumns.length > 0 ? orderedColumns : allColumns;
    },
    totalPages() {
      return this.filteredData.length
        ? Math.ceil(this.filteredData.length / this.rowsPerPage)
        : 1;
    },
    paginatedData() {
      if (!this.filteredData || this.filteredData.length === 0) return [];
      const start = (this.currentPage - 1) * this.rowsPerPage;
      return this.filteredData.slice(start, start + this.rowsPerPage);
    },
  },
  methods: {
    filterData() {
      if (!this.dataTable || this.dataTable.length === 0) {
        this.filteredData = [];
        return;
      }
      this.filteredData = this.dataTable.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      );
      this.currentPage = 1;
    },
    sortData(columnKey) {
      if (!this.dataTable || this.dataTable.length === 0) return;

      this.sortDirection =
        this.sortColumn === columnKey && this.sortDirection === "asc"
          ? "desc"
          : "asc";
      this.sortColumn = columnKey;

      const modifier = this.sortDirection === "asc" ? 1 : -1;
      this.filteredData.sort((a, b) =>
        a[columnKey] > b[columnKey] ? modifier : -modifier
      );
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  },
  watch: {
    dataTable: {
      handler(newData) {
        this.filteredData = newData || [];
        this.currentPage = 1;
      },
      deep: true,
    },
  },
};
</script>
  
  <style>
  .table {
    width: 100%;
    border-collapse: collapse;
    margin: var(--space-6) 0;
    border-radius: var(--radius-lg);
    overflow: hidden;
    outline: 1px solid var(--cinza-medio);
  }

  .table th, .table td {
    padding: var(--space-3) var(--space-4);
    text-align: left;
    border-bottom: 1px solid var(--cinza-claro);
  }

  .table td p {
    line-height: 100%;
    margin: var(--space-1) 0;
    font-size: var(--fontsize-sm);
    color: var(--preto);
  }

  .table th {
    cursor: pointer;
    font-size: var(--fontsize-sm);
    color: var(--cinza);
    font-weight: 500;
    background: var(--cinza-claro);
  }

  .pagination {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;

    & button {
        padding: 0 var(--space-3);
        cursor: pointer;
    }
  }
  .search-bar {
    margin-bottom: 10px;
  }
  </style>
  