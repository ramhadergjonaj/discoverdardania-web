// Input me Label
export const Input = ({ label, type = "text", placeholder, value, onChange }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-semibold text-gray-600">{label}</label>}
      <input 
        type={type}
        className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-500 outline-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};