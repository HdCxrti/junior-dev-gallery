import React, { useState } from "react";

interface SkillBarProps {
  skill: string;
  percentage: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ skill, percentage }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="mb-4 group" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-portfolio-purple dark:group-hover:text-portfolio-purple transition-colors duration-300">{skill}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-portfolio-purple dark:group-hover:text-portfolio-purple transition-colors duration-300">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 relative overflow-hidden">
        <div
          className="bg-gradient-to-r from-portfolio-purple to-portfolio-indigo h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ 
            width: `${percentage}%`,
            boxShadow: isHovered ? '0 0 12px rgba(155, 135, 245, 0.7)' : 'none',
            transform: isHovered ? 'scaleY(1.2)' : 'scaleY(1)'
          }}
        ></div>
      </div>
    </div>
  );
};

export default SkillBar;
