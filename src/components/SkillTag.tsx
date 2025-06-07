import React from "react";

interface SkillTagProps {
  skill: string;
  icon?: string; // Path to skill icon (optional)
}

const SkillTag: React.FC<SkillTagProps> = ({ skill, icon }) => {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
      {icon && (
        <img 
          src={icon} 
          alt={`${skill} icon`} 
          className="w-5 h-5" 
          loading="lazy"
        />
      )}
      <span className="text-gray-800 dark:text-gray-200">{skill}</span>
    </div>
  );
};

export default SkillTag;