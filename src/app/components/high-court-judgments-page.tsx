import { useState, useEffect } from 'react';
import { Search, Filter, Download, ChevronDown } from 'lucide-react';
import { getJudgmentsByCourtType, type StoredJudgment } from '../utils/judgmentStorage';

interface Judgment {
  id: string;
  title: string;
  citation: string;
  court: 'Supreme Court' | 'High Court';
  division: string;
  category: 'Civil' | 'Criminal' | 'Labour' | 'Tax';
  date: string;
  caseNumber: string;
  judges: string[];
}

const mockJudgments: Judgment[] = [
  {
    id: '1',
    title: 'Halutale v Katumbe',
    citation: '[2026] NAHCMD 7',
    court: 'High Court',
    division: 'Main Division',
    category: 'Civil',
    date: '2026-01-16',
    caseNumber: 'HC-MD-CIV-MOT-GEN-2025006371',
    judges: ['Damaseb DCJ', 'Shivute CJ'],
  },
  {
    id: '2',
    title: 'Mouoenwa v Muyakale',
    citation: '[2026] NAHCMD 6',
    court: 'High Court',
    division: 'Main Division',
    category: 'Civil',
    date: '2026-01-16',
    caseNumber: 'HC-MD-CIV-ACT-OTH-20240921',
    judges: ['Liebenberg J'],
  },
  {
    id: '3',
    title: 'The State v Kapofi',
    citation: '[2026] NAHCNLD 12',
    court: 'High Court',
    division: 'Northern Division',
    category: 'Criminal',
    date: '2026-01-20',
    caseNumber: 'HC-NLD-CRI-APP-CAL-2025/00156',
    judges: ['Angula DJP'],
  },
  {
    id: '4',
    title: 'Workers Union v Mining Corp Ltd',
    citation: '[2026] NALCMD 08',
    court: 'High Court',
    division: 'Main Division',
    category: 'Labour',
    date: '2026-01-23',
    caseNumber: 'LC-MD-LAB-ORD-2025/00089',
    judges: ['Masuku J'],
  },
];

export function HighCourtJudgmentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourt, setSelectedCourt] = useState('High Court');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [showFilters, setShowFilters] = useState(true);
  const [uploadedJudgments, setUploadedJudgments] = useState<StoredJudgment[]>([]);

  // Load judgments from localStorage
  useEffect(() => {
    const judgments = getJudgmentsByCourtType('High Court');
    setUploadedJudgments(judgments);
  }, []);

  // Combine mock and uploaded judgments
  const allJudgments = [
    ...mockJudgments,
    ...uploadedJudgments.map(j => ({
      id: j.id,
      title: j.caseTitle,
      citation: j.citation,
      court: j.court,
      division: j.division,
      category: j.category || ('Civil' as const),
      date: j.date,
      caseNumber: j.caseNumber,
      judges: j.judges,
    }))
  ];

  const filteredJudgments = allJudgments.filter((judgment) => {
    const matchesSearch =
      searchTerm === '' ||
      judgment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      judgment.citation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      judgment.caseNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCourt = selectedCourt === 'all' || judgment.court === selectedCourt;
    const matchesCategory = selectedCategory === 'all' || judgment.category === selectedCategory;
    const matchesYear = selectedYear === 'all' || judgment.date.startsWith(selectedYear);

    return matchesSearch && matchesCourt && matchesCategory && matchesYear;
  });

  const isCategoryDisabled = selectedCourt === 'Supreme Court';

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#001489] to-[#FFC72C] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">High Court Judgments</h1>
          <p className="text-gray-100">
            Search and browse High Court judgments by category: Civil, Criminal, Labour, and Tax
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by case name, citation, case number, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001489] focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-[#001489] text-white rounded-lg hover:bg-[#FFC72C] transition-colors flex items-center gap-2 justify-center md:w-auto"
            >
              <Filter className="w-5 h-5" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Court</label>
                <select
                  value={selectedCourt}
                  onChange={(e) => setSelectedCourt(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001489] focus:border-transparent"
                >
                  <option value="all">All Courts</option>
                  <option value="Supreme Court">Supreme Court</option>
                  <option value="High Court">High Court</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  disabled={isCategoryDisabled}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001489] focus:border-transparent ${
                    isCategoryDisabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''
                  }`}
                >
                  <option value="all">All Categories</option>
                  <option value="Civil">Civil</option>
                  <option value="Criminal">Criminal</option>
                  <option value="Labour">Labour</option>
                  <option value="Tax">Tax</option>
                </select>
                {isCategoryDisabled && (
                  <p className="text-xs text-gray-500 mt-1">Categories not applicable for Supreme Court</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001489] focus:border-transparent"
                >
                  <option value="all">All Years</option>
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-600">
            <span className="font-semibold">{filteredJudgments.length}</span> judgment
            {filteredJudgments.length !== 1 ? 's' : ''} found
          </p>
          <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#001489]">
            <option>Sort by Date (Newest)</option>
            <option>Sort by Date (Oldest)</option>
            <option>Sort by Relevance</option>
          </select>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {filteredJudgments.map((judgment) => (
            <div
              key={judgment.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
            >
              <div className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-3 py-1 bg-[#001489] text-white text-xs font-medium rounded-full">
                        {judgment.court}
                      </span>
                      <span className="px-3 py-1 bg-[#FFC72C]/20 text-[#FFC72C] text-xs font-medium rounded-full">
                        {judgment.category}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                        {judgment.division}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-[#001489] mb-2">
                      {judgment.title}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-600 mb-3">
                      <div>
                        <span className="font-medium">Citation:</span> {judgment.citation}
                      </div>
                      <div>
                        <span className="font-medium">Case Number:</span> {judgment.caseNumber}
                      </div>
                      <div>
                        <span className="font-medium">Date:</span>{' '}
                        {new Date(judgment.date).toLocaleDateString('en-NA', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                      <div>
                        <span className="font-medium">Judge(s):</span> {judgment.judges.join(', ')}
                      </div>
                    </div>
                  </div>

                  <button className="flex items-center gap-2 px-6 py-3 bg-[#DA291C] text-white rounded-lg hover:bg-[#b00528] transition-colors font-medium whitespace-nowrap">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredJudgments.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500 text-lg mb-2">No judgments found</p>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredJudgments.length > 0 && (
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Previous
              </button>
              <button className="px-4 py-2 bg-[#001489] text-white rounded-lg">1</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                2
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                3
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
