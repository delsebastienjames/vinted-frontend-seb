const Input = ({ title, placeholder, type, value, setValue }) => {
  return (
    <div>
      <h4 className="center">{title}</h4>
      <input
        className="center-input"
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </div>
  );
};

export default Input;
