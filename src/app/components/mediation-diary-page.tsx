import { useState } from 'react';
import { Download, Search, FileText } from 'lucide-react';

interface MediationDiary {
  id: string;
  year: number;
  division: string;
  divisionCode: string;
  date: string;
}

const mockDiaries: MediationDiary[] = [
  {
    id: '1',
    year: 2026,
    division: 'Main Division',
    divisionCode: 'NAHCMD',
    date: '2026-01-15',
  },
  {
    id: '2',
    year: 2026,
    division: 'Coastal Division',
    divisionCode: 'NAHCCD',
    date: '2026-01-15',
  },
  {
    id: '3',
    year: 2026,
    division: 'Northern Division',
    divisionCode: 'NAHCNLD',
    date: '2026-01-15',
  },
  {
    id: '4',
    year: 2025,
    division: 'Main Division',
    divisionCode: 'NAHCMD',
    date: '2025-12-20',
  },
  {
    id: '5',
    year: 2025,
    division: 'Coastal Division',
    divisionCode: 'NAHCCD',
    date: '2025-12-20',
  },
  {
    id: '6',
    year: 2025,
    division: 'Northern Division',
    divisionCode: 'NAHCNLD',
    date: '2025-12-20',
  },
];

export function MediationDiaryPage() {
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedDivision, setSelectedDivision] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDiaries = mockDiaries.filter((diary) => {
    const matchesYear = selectedYear === 'all' || diary.year.toString() === selectedYear;
    const matchesDivision =
      selectedDivision === 'all' || diary.division === selectedDivision;
    const matchesSearch =
      searchTerm === '' ||
      diary.division.toLowerCase().includes(searchTerm.toLowerCase()) ||
      diary.divisionCode.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesYear && matchesDivision && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#1A2F4E] mb-2">
            Mediation Diary
          </h1>
          <p className="text-gray-600">
            View and download mediation diaries by year and court division
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <FileText className="h-5 w-5 text-blue-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                Mediation diaries contain scheduled mediation sessions for each court division.
                Select a year and division to view the relevant diary.
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by division..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4A02B] focus:border-transparent"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4A02B] focus:border-transparent"
              >
                <option value="all">All Years</option>
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Court Division
              </label>
              <select
                value={selectedDivision}
                onChange={(e) => setSelectedDivision(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4A02B] focus:border-transparent"
              >
                <option value="all">All Divisions</option>
                <option value="Main Division">Main Division</option>
                <option value="Coastal Division">Coastal Division</option>
                <option value="Northern Division">Northern Division</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Found <span className="font-semibold">{filteredDiaries.length}</span> diary entries
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#1A2F4E] text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Year
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Division
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Division Code
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Updated
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredDiaries.map((diary, index) => (
                  <tr
                    key={diary.id}
                    className={`hover:bg-gray-50 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                    }`}
                  >
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {diary.year}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {diary.division}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {diary.divisionCode}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(diary.date).toLocaleDateString('en-NA', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4A02B] text-white rounded-md hover:bg-[#C68E17] transition-colors text-sm font-medium">
                        <Download className="w-4 h-4" />
                        Download PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredDiaries.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-gray-500 text-lg">
                No mediation diaries found matching your criteria.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Try adjusting your filters or search terms.
              </p>
            </div>
          )}
        </div>

        {/* Mobile Cards (hidden on desktop) */}
        <div className="lg:hidden space-y-4 mt-6">
          {filteredDiaries.map((diary) => (
            <div
              key={diary.id}
              className="bg-white rounded-lg shadow-md p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-lg font-bold text-[#1A2F4E] mb-1">
                    {diary.year}
                  </div>
                  <div className="text-sm text-gray-600">
                    {diary.division}
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {diary.divisionCode}
                </span>
              </div>

              <div className="text-sm text-gray-500 mb-3">
                Updated: {new Date(diary.date).toLocaleDateString('en-NA', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </div>

              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#D4A02B] text-white rounded-md hover:bg-[#C68E17] transition-colors text-sm font-medium">
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
