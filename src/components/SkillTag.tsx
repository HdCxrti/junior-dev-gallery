import React from "react";

interface SkillTagProps {
  skill: string;
  icon?: string; // Path to skill icon (optional)
}

const SkillTag: React.FC<SkillTagProps> = ({ skill, icon }) => {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
      {icon && (
        <img 
          src={icon} 
          alt={`${skill} icon`} 
          className="w-5 h-5" 
          loading="lazy"
        />
      )}
      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
        {skill}
      </span>
    </div>
  );
};

export default SkillTag;
