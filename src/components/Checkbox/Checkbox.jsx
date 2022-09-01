import './Checkbox.css';

export default function Checkbox({ value, onChange }) {
  return (
    <label className="filter">
      <input
        className="filter__checkbox"
        type="checkbox"
        checked={value}
        onChange={onChange}
      />
      <span className="filter__tumbler"></span>
      <span className="filter__text">Короткометражки</span>
    </label>
  );
}
