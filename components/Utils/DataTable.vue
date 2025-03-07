<template>
  <div class="datatable" :style="dataTable.length == 0 && loaded ? 'border: 1px solid var(--cinza-claro); margin-top: var(--space-3);' : ''">
    <div class="datatable-content">
      <!-- Search/Filter -->
      <div class="datatable-header flex items-center justify-between" v-if="loaded">
        <UtilsInputSearch
          :search="searchQuery"
          @model="searchQuery = $event"
          @input="filterData"
          :table="table"
           v-if="dataTable.length > 0"
        />
        <button v-if="newButton" type="button" v-on:click="$emit('handleNew')" class="btn btn-primary" :class="loaded && dataTable.length > 0 ? '' : 'mt-4 mx-auto'">
            <font-awesome icon="plus" />
            Cadastrar {{ table }}
        </button>
      </div>

      <div class="empty-datatable text-center" v-if="dataTable.length == 0 && loaded">
        <h2>Não existem informações para exibir</h2>
      </div>
      <div class="datatable-loading">
        <UtilsLoading :loading="!loaded" />
      </div>
  
      <!-- Table -->
      <table class="table" v-if="loaded && dataTable.length > 0">
        <thead>
          <tr>
            <th
              v-for="(column, index) in columnsToRender"
              :key="index"
              @click="sortData(column)"
              :class="column"
            >
              <span style="text-transform: capitalize;">{{ column.replace(/-/g, " ") }}</span>
              <span v-if="sortColumn === column">
                {{ sortDirection === 'asc' ? ' ▲' : ' ▼' }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in paginatedData" :key="item.id">
            <td v-for="(column, colIndex) in columnsToRender" :key="colIndex" :data-th="returnFormatedDataTh(column)" :class="column">
              <template v-if="$slots[`column-${column}`]">
                <slot :name="`column-${column}`" :item="item"></slot>
              </template>
              <template v-else>
                {{ item[column] }}
              </template>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Pagination -->
      <div class="pagination" v-if="loaded && dataTable.length > 0">
        <button @click="prevPage" class="btn rounded-btn small" :disabled="currentPage === 1">
          <font-awesome icon="backward-step" class="cinza" />
        </button>
        <span>Página <strong>{{ currentPage }}</strong> de {{ totalPages }}</span>
        <button @click="nextPage" class="btn rounded-btn small" :disabled="currentPage === totalPages">
          <font-awesome icon="forward-step" class="cinza" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    dataTable: {
      type: Array,
      required: true
    },
    table: {
      type: String,
      required: true
    },
    rowsPerPage: {
      type: Number,
      default: 10
    },
    loaded: {
      type: Boolean,
      required: true
    },
    newButton: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      searchQuery: "",
      filteredData: this.dataTable,
      currentPage: 1,
      sortColumn: "",
      sortDirection: "asc"
    };
  },
  computed: {
    columnsToRender() {
      if (!this.dataTable || this.dataTable.length === 0) return [];

      const allColumns = Object.keys(this.dataTable[0]);

      const templateColumns = Object.keys(this.$slots)
        .filter(slotName => slotName.startsWith("column-"))
        .map(slotName => slotName.replace("column-", ""));

      const customColumns = allColumns.filter(column => this.$slots[`column-${column}`]);

      const orderedColumns = [...templateColumns, ...customColumns.filter(col => !templateColumns.includes(col))];

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
    }
  },
  methods: {
    returnFormatedDataTh(string) {
      string = string.replace(/-/g, " ");
      string = this.$myFunctions.capitalize(string);
      return string;
    },
    filterData() {
      if (!this.dataTable || this.dataTable.length === 0) {
        this.filteredData = [];
        return;
      }
      this.filteredData = this.dataTable.filter(item =>
        Object.values(item).some(val =>
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
    },
    applyAlignmentClasses() {
      this.columnsToRender.forEach((column) => {
        const thElement = this.$el.querySelector(`th.${column}`);
        const tdElements = this.$el.querySelectorAll(`td.${column}`);

        tdElements.forEach((td) => {
            const firstChild = td.firstElementChild;

            if (firstChild && firstChild.classList.contains('text-center')) {
              thElement.classList.add('text-center');
              td.classList.add('text-center');
            } else if (firstChild && firstChild.classList.contains('text-left')) {
              thElement.classList.add('text-left');
              td.classList.add('text-left');
            } else if (firstChild && firstChild.classList.contains('text-right')) {
              thElement.classList.add('text-right');
              td.classList.add('text-right');
            }
        });
      });
    }
  },
  watch: {
    dataTable: {
      handler(newData) {
        this.filteredData = newData || [];
        this.currentPage = 1;
      },
      deep: true
    }
  },
  mounted() {
    this.applyAlignmentClasses();
  },
  updated() {
    this.applyAlignmentClasses();
  }
};
</script>
<style scoped>
  .datatable {
    border-radius: var(--radius-md);
    width: 100%;
  }

  .datatable-loading {
    width: 100%;
    display: grid;
    place-items: center;

    & lottie-player {
      width: 150px;
    }
  }

  .empty-datatable {
    padding: var(--space-4);
  }

.table {
  width: 100%;
  border-collapse: collapse;
  margin: var(--space-6) 0 var(--space-4) 0;
  border-radius: var(--radius-sm);
  overflow: hidden;
  outline: 1px solid var(--cinza-medio);
}

.table th, .table td {
  padding: var(--space-4);
  text-align: left;
  border-bottom: 1px solid var(--cinza-claro);
}

.table tr:hover {
  background: var(--verde-claro);
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
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pagination button {
  padding: 0 var(--space-3);
  cursor: pointer;
}

.search-bar {
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  thead {
    display: none;
  }

  tr {
    display: block;
    border: 2.5px solid var(--cinza-claro);
    padding: 10px;

    & td:last-child {
      border-bottom: none;
    }
  }

  td {
    display: grid;
    grid-template-columns: 1.5fr 2fr;
    gap: 0.5rem;
    padding: 0.5rem;
    place-items: center;
    text-align: center;
  }

  td::before {
    content: attr(data-th) ": ";
    font-weight: bold;
    color: var(--preto);
    text-align: center;
  }
}
</style>
