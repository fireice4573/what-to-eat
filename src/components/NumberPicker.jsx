import './NumberPicker.css'

export default function NumberPicker({ label, value, onChange, min = 0, max = 10 }) {
  return (
    <div className="number-picker">
      <span className="number-picker__label">{label}</span>
      <div className="number-picker__controls">
        <button
          className="number-picker__btn"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label="减少"
        >−</button>
        <span className="number-picker__value">{value}</span>
        <button
          className="number-picker__btn"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label="增加"
        >+</button>
      </div>
    </div>
  )
}
