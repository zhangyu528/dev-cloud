export function ProjectIcon({ className = "w-6 h-6" }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      viewBox="0 0 24 24"
    >
      <defs>
        <linearGradient id="projectGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          {/* 浅色模式：紫色到粉色渐变 */}
          {/* 深色模式：蓝色到青色渐变 */}
          <stop offset="0%" stopColor="#8B5CF6" className="dark:text-blue-500"/>
          <stop offset="100%" stopColor="#EC4899" className="dark:text-cyan-400"/>
        </linearGradient>
        
        {/* 光晕效果 */}
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
        </filter>
      </defs>
      
      {/* 主圆形 */}
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="url(#projectGradient)"
        className="filter drop-shadow-md"
      />
      
      {/* 高光效果 */}
      <circle
        cx="9"
        cy="9"
        r="3.5"
        fill="white"
        fillOpacity="0.2"
      />
    </svg>
  );
}
