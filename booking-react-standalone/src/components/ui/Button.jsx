// Buton i ripërdorshëm
export const Button = ({ children, variant = "primary", onClick, className = "" }) => {
  const baseStyles = "px-4 py-2 rounded-lg font-bold transition-all duration-200";
  const variants = {
    primary: "bg-yellow-500 text-black hover:bg-yellow-400",
    outline: "border-2 border-gray-300 hover:border-yellow-500 text-gray-700",
    danger: "bg-red-500 text-white hover:bg-red-600"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};