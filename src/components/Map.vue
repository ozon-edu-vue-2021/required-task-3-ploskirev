<template>
  <div class="map">
    <h3>Карта офиса</h3>
    <div v-if="!isLoading" class="map-root">
      <MapSVG ref="svg" @click.stop="mapClickHandler" />
      <Table v-show="false" ref="table" />
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import MapSVG from '@/assets/images/map.svg'
import Table from '@/assets/images/workPlace.svg'

export default {
  name: 'Map',
  components: {
    MapSVG,
    Table
  },
  props: {
    tables: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isLoading: false,
      svg: null,
      g: null,
      tableSVG: null
    }
  },
  mounted() {
    try {
      this.isLoading = true
      this.svg = d3.select(this.$refs.svg)
      this.g = this.svg.select('g')
      this.tableSVG = d3.select(this.$refs.table) // получаем шаблон стола
      if (this.g) {
        this.drawTables()
      } else {
        throw new Error('SVG is incorrect')
      }
    } catch (err) {
      console.warn(err)
    } finally {
      this.isLoading = false
    }
  },
  methods: {
    updateUserSelection(val) {
      this.$emit('tableSelected', val)
    },
    mapClickHandler($event) {
      const tableEl = $event.target.classList.contains('.employer-place')
        ? $event.target
        : $event.target.closest('.employer-place')
      if (!tableEl) {
        this.updateUserSelection(null)
      } else {
        const tableObject = this.tables.find(t => t._id === +tableEl.id) ?? null
        this.updateUserSelection(tableObject)
      }
    },
    drawTables() {
      const svgTablesGroupPlace = this.g

      this.tables.map(table => {
        svgTablesGroupPlace
          .append('g')
          .attr(
            'transform',
            `translate(${table.x}, ${table.y}) scale(0.5) rotate(${
              table.rotate || 0
            })`
          )
          .attr('fill', table.color)
          .attr('id', table._id)
          .classed('employer-place', true)
          .classed('table', true)
          .html(this.tableSVG.html())
      })
    }
  }
}
</script>

<style scoped>
.map {
  height: 100%;
  width: 100%;
  padding: 24px;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.map-root {
  height: 100%;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
}

h3 {
  margin-top: 0px;
}

::v-deep svg {
  height: 100%;
  width: 100%;
}

::v-deep .table {
  cursor: pointer;
}
</style>
