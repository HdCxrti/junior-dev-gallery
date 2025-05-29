import { CSSProperties } from "react";

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  style?: CSSProperties;
}

const LoadingSpinner = ({ size = 40, color = "#7c3aed", style }: LoadingSpinnerProps) => {
  return (
    <div className="flex justify-center py-10" style={style}>
      <div
        className="animate-spin rounded-full border-4 border-t-transparent"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderColor: color,
          borderTopColor: "transparent"
        }}
      />
    </div>
  );
};

export default LoadingSpinner;
