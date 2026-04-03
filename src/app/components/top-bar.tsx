import type { PageType } from '../App';

interface TopBarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

export function TopBar({ currentPage, onNavigate }: TopBarProps) {
  return (
    <div className="bg-[#000] text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-end h-10 space-x-8">
          <button
            onClick={() => onNavigate('home')}
            className={`text-sm font-medium hover:text-[#007A33] transition-colors ${
              currentPage === 'home' ? 'text-[#007A33]' : ''
            }`}
          >
            HOME
          </button>
          <button
            onClick={() => onNavigate('about')}
            className={`text-sm font-medium hover:text-[#007A33] transition-colors ${
              currentPage === 'about' ? 'text-[#007A33]' : ''
            }`}
          >
            ABOUT US
          </button>
          <button
            onClick={() => onNavigate('about')}
            className="text-sm font-medium hover:text-[#007A33] transition-colors"
          >
            ORGANISATIONAL STRUCTURE
          </button>
          <button
            onClick={() => onNavigate('contacts')}
            className={`text-sm font-medium hover:text-[#007A33] transition-colors ${
              currentPage === 'contacts' ? 'text-[#007A33]' : ''
            }`}
          >
            CONTACT US
          </button>
        </div>
      </div>
    </div>
  );
}
