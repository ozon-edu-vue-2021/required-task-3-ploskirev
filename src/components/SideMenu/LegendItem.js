import './legendItem.css'

export default ({ props }) => {
  return (
    <div class="legend-item">
      <div class="legend-item__marker">
        <div class="marker" style={{ '--marker-color': props.color }} />
      </div>
      <div class="legend-item__label">{props.text}</div>
      <div class="legend-item__counter">{props.counter}</div>
    </div>
  )
}
