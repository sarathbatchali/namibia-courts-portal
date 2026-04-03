import { useState, useEffect } from 'react';
import { Search, Filter, Download, ChevronDown } from 'lucide-react';
import { getJudgmentsByCourtType, type StoredJudgment } from '../utils/judgmentStorage';

interface Judgment {
  id: string;
  title: string;
  citation: string;
  date: string;
  caseNumber: string;
  judges: string[];
  appellant: string;
  respondent: string;
}

const mockJudgments: Judgment[] = [
  {
    id: '1',
    title: 'Minister of Justice v Smith',
    citation: '[2026] NASC 5',
    date: '2026-02-15',
    caseNumber: 'SA 12/2025',
    judges: ['Shivute CJ', 'Mainga JA', 'Damaseb DCJ'],
    appellant: 'Minister of Justice',
    respondent: 'John Smith',
  },
  {
    id: '2',
    title: 'Coastal Mining Ltd v Environmental Commissioner',
    citation: '[2026] NASC 3',
    date: '2026-01-28',
    caseNumber: 'SA 45/2025',
    judges: ['Shivute CJ', 'Smuts JA', 'Frank AJA'],
    appellant: 'Coastal Mining Limited',
    respondent: 'Environmental Commissioner',
  },
  {
    id: '3',
    title: 'Government of Namibia v Trade Union Congress',
    citation: '[2025] NASC 89',
    date: '2025-12-20',
    caseNumber: 'SA 38/2025',
    judges: ['Shivute CJ', 'Mainga JA', 'Sibeya AJA'],
    appellant: 'Government of the Republic of Namibia',
    respondent: 'Trade Union Congress of Namibia',
  },
];

export function SupremeCourtJudgmentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');
  const [showFilters, setShowFilters] = useState(true);
  const [uploadedJudgments, setUploadedJudgments] = useState<StoredJudgment[]>([]);

  // Load judgments from localStorage
  useEffect(() => {
    const judgments = getJudgmentsByCourtType('Supreme Court');
    setUploadedJudgments(judgments);
  }, []);

  // Combine mock and uploaded judgments
  const allJudgments = [
    ...mockJudgments,
    ...uploadedJudgments.map(j => ({
      id: j.id,
      title: j.caseTitle,
      citation: j.citation,
      date: j.date,
      caseNumber: j.caseNumber,
      judges: j.judges,
      appellant: j.caseTitle.split(' v ')[0] || 'Appellant',
      respondent: j.caseTitle.split(' v ')[1] || 'Respondent',
    }))
  ];

  const filteredJudgments = allJudgments.filter((judgment) => {
    const matchesSearch =
      searchTerm === '' ||
      judgment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      judgment.citation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      judgment.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      judgment.appellant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      judgment.respondent.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesYear = selectedYear === 'all' || judgment.date.startsWith(selectedYear);

    return matchesSearch && matchesYear;
  });

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#1A2F4E] to-[#2A4F7E] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Supreme Court Judgments</h1>
          <p className="text-gray-200">
            Search and browse judgments from the Supreme Court of Namibia - the final court of appeal
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Info Banner */}
        <div className="bg-gradient-to-r from-[#D4A02B]/10 to-[#C68E17]/10 border-l-4 border-[#D4A02B] p-6 rounded-r-lg mb-8">
          <h2 className="text-xl font-bold text-[#1A2F4E] mb-2">About Supreme Court Judgments</h2>
          <p className="text-gray-700">
            The Supreme Court is the final court of appeal in Namibia. It hears appeals from the High Court
            and has jurisdiction over constitutional matters and matters of public importance.
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by case name, citation, case number, or party names..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A02B] focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-[#1A2F4E] text-white rounded-lg hover:bg-[#2A4F7E] transition-colors flex items-center gap-2 justify-center md:w-auto"
            >
              <Filter className="w-5 h-5" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A02B] focus:border-transparent"
                >
                  <option value="all">All Years</option>
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A02B] focus:border-transparent">
                  <option>Date (Newest First)</option>
                  <option>Date (Oldest First)</option>
                  <option>Relevance</option>
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
                      <span className="px-3 py-1 bg-[#1A2F4E] text-white text-xs font-medium rounded-full">
                        Supreme Court
                      </span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                        Appeal
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-[#1A2F4E] mb-3">
                      {judgment.title}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm mb-4">
                      <div>
                        <span className="font-medium text-gray-700">Citation:</span>
                        <span className="ml-2 text-gray-600">{judgment.citation}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Case Number:</span>
                        <span className="ml-2 text-gray-600">{judgment.caseNumber}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Date:</span>
                        <span className="ml-2 text-gray-600">
                          {new Date(judgment.date).toLocaleDateString('en-NA', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Judges:</span>
                        <span className="ml-2 text-gray-600">{judgment.judges.join(', ')}</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-medium text-gray-700 mb-1">Appellant:</div>
                          <div className="text-gray-600">{judgment.appellant}</div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-700 mb-1">Respondent:</div>
                          <div className="text-gray-600">{judgment.respondent}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className="flex items-center gap-2 px-6 py-3 bg-[#D4A02B] text-white rounded-lg hover:bg-[#C68E17] transition-colors font-medium whitespace-nowrap">
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
              <button className="px-4 py-2 bg-[#1A2F4E] text-white rounded-lg">1</button>
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
