<template>
  <div @click="closePersonCard" id="app">
    <div class="office">
      <Map
        :tables="tablesWithColorAndDepartment"
        @tableSelected="setSelectedTable"
      />
      <SideMenu
        @click.native.stop
        @updateLegendSorting="updateLegendSorting"
        @closePersonCard="closePersonCard"
        :person="personWithDepartment"
        :legend="legendWithLinkedCounter"
      />
    </div>
  </div>
</template>

<script>
import people from '@/assets/data/people.json'
import tables from '@/assets/data/tables.json'
import legend from '@/assets/data/legend.json'
import Map from './components/Map.vue'
import SideMenu from './components/SideMenu.vue'

export default {
  name: 'App',
  components: {
    Map,
    SideMenu
  },
  data() {
    return {
      selectedTable: null,
      people: [],
      tables: [],
      legend: []
    }
  },
  created() {
    this.loadLegend()
    this.loadTables()
    this.loadPeople()
  },
  computed: {
    personWithDepartment() {
      if (this.selectedTable === null) return null
      const person =
        this.people.find(person => person.tableId === this.selectedTable._id) ??
        {}
      return {
        ...person,
        department: this.selectedTable.departmentName
      }
    },
    tablesWithColorAndDepartment() {
      return this.tables.map(table => {
        const department = this.legend.find(
          el => el.group_id === table.group_id
        )
        const departmentName = department?.text ?? 'no name department'
        const color = department?.color ?? 'transparent'
        return { ...table, color, departmentName }
      })
    },
    legendWithLinkedCounter() {
      return this.legend.map(el => ({
        ...el,
        counter: this.tables.reduce(
          (acc, cur) => (cur.group_id === el.group_id ? ++acc : acc),
          0
        )
      }))
    }
  },
  methods: {
    loadPeople() {
      this.people = people
    },
    loadTables() {
      this.tables = tables
    },
    loadLegend() {
      this.legend = legend
    },
    closePersonCard() {
      if (this.selectedTable) {
        this.setSelectedTable(null)
      }
    },
    setSelectedTable(val) {
      this.selectedTable = val
    },
    updateLegendSorting(val) {
      this.legend = val
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  background-color: #fafafa;
  padding: 24px;
  box-sizing: border-box;
}

html,
body,
#app {
  height: 100%;
}

* {
  box-sizing: border-box;
}

h3 {
  margin-top: 0px;
}

.office {
  display: grid;
  grid-template-columns: 1fr 320px;
  border-radius: 6px;
  border: 1px solid #ccd8e4;
  height: 100%;
  background: white;
  max-width: 1500px;
  margin: 0 auto;
}
</style>
