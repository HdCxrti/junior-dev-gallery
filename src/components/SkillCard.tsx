import React, { useState } from "react";
import { Star, StarHalf } from "lucide-react";

export type ProficiencyLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

interface SkillCardProps {
  skill: string;
  level: ProficiencyLevel;
  icon?: string; // Path to skill icon (optional)
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, level, icon }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Map proficiency level to number of stars
  const getStars = () => {
    switch (level) {
      case "Expert":
        return 5;
      case "Advanced":
        return 4;
      case "Intermediate":
        return 3;
      case "Beginner":
      default:
        return 2;
    }
  };

  const stars = getStars();

  // Define color based on proficiency level
  const getLevelColor = () => {
    switch (level) {
      case "Expert":
        return "text-indigo-600 dark:text-indigo-400";
      case "Advanced":
        return "text-blue-600 dark:text-blue-400";
      case "Intermediate":
        return "text-sky-600 dark:text-sky-400";
      case "Beginner":
      default:
        return "text-cyan-600 dark:text-cyan-400";
    }
  };

  const levelColor = getLevelColor();
  return (
    <div
      className={`rounded-lg border border-gray-200 dark:border-gray-700 p-4 transition-all duration-300 ${
        isHovered 
          ? "shadow-md bg-gray-50 dark:bg-gray-800/50 transform -translate-y-1 border-portfolio-blue/40 dark:border-portfolio-blue/40" 
          : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    ><div className="flex items-center mb-2">
        {icon ? (
          <img 
            src={icon} 
            alt={`${skill} icon`} 
            className="w-6 h-6 mr-2" 
            loading="lazy"
            onError={(e) => {
              // If icon fails to load, hide the image element
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <div className="w-6 h-6 mr-2 rounded-full bg-gradient-to-br from-portfolio-blue to-portfolio-indigo flex items-center justify-center">
            <span className="text-white text-xs font-bold">{skill.charAt(0)}</span>
          </div>
        )}
        <h4 className="font-medium text-gray-800 dark:text-gray-200">{skill}</h4>
      </div>
        <div className="flex items-center justify-between">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className={`transition-transform duration-300 ${
                isHovered && i < stars ? 'scale-110' : ''
              }`}
              style={{ 
                transform: isHovered && i < stars ? `translateY(${-(i % 2) * 2}px)` : 'none',
                transitionDelay: `${i * 50}ms`
              }}
            >
              {i < stars ? (
                <Star className={`w-4 h-4 fill-current ${levelColor}`} />
              ) : (
                <Star className="w-4 h-4 text-gray-300 dark:text-gray-600" />
              )}
            </div>
          ))}
        </div>
        <span className={`text-xs font-medium ${levelColor} bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full`}>
          {level}
        </span>
      </div>
    </div>
  );
};

export default SkillCard;
