import React, { useState } from "react";

interface SkillBarProps {
  skill: string;
  percentage: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ skill, percentage }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Define proficiency level based on percentage
  let proficiencyLevel = "Beginner";
  if (percentage >= 90) {
    proficiencyLevel = "Expert";
  } else if (percentage >= 80) {
    proficiencyLevel = "Advanced";
  } else if (percentage >= 70) {
    proficiencyLevel = "Intermediate";
  }
  
  return (
    <div 
      className="mb-4 group relative" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-portfolio-blue dark:group-hover:text-portfolio-blue transition-colors duration-300">{skill}</span>
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-portfolio-blue dark:group-hover:text-portfolio-blue transition-colors duration-300">{percentage}%</span>
          <span className="text-xs text-gray-400 dark:text-gray-500">({proficiencyLevel})</span>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 relative overflow-hidden">
        <div
          className="bg-gradient-to-r from-portfolio-blue to-portfolio-indigo h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ 
            width: `${percentage}%`,
            boxShadow: isHovered ? '0 0 12px rgba(45, 93, 161, 0.7)' : 'none',
            transform: isHovered ? 'scaleY(1.2)' : 'scaleY(1)'
          }}
        ></div>
      </div>
    </div>
  );
};

export default SkillBar;
