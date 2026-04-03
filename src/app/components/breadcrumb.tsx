import { ChevronRight, Home } from 'lucide-react';
import type { PageType } from '../App';

interface BreadcrumbProps {
  items: {
    label: string;
    page: PageType;
    filter?: any;
  }[];
  onNavigate: (page: PageType, filter?: any) => void;
}

export function Breadcrumb({ items, onNavigate }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-white/70 mb-4">
      <button 
        onClick={() => onNavigate('home')}
        className="flex items-center gap-1 hover:text-[#FFC72C] transition-colors"
      >
        <Home className="w-3 h-3" />
        HOME
      </button>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="w-3 h-3 text-white/30" />
          <button 
            onClick={() => onNavigate(item.page, item.filter)}
            className={`hover:text-[#FFC72C] transition-colors ${index === items.length - 1 ? 'text-[#FFC72C]' : ''}`}
          >
            {item.label}
          </button>
        </div>
      ))}
    </nav>
  );
}
