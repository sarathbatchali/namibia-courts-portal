import { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, X, Home, ChevronRight, Calendar, Plus } from 'lucide-react';
import { saveJudgment, type StoredJudgment } from '../utils/judgmentStorage';
import { Breadcrumb } from './breadcrumb';

interface JudgementUpload {
  // Case Details
  caseTitle: string;
  caseNumber: string;
  citation: string;
  courtType: 'Supreme Court' | 'High Court' | '';
  courtDivision: string;
  judges: string[];

  // Classification
  documentType: 'Judgement' | 'Court Roll' | '';
  category: 'Civil' | 'Criminal' | 'Labour' | 'Tax' | '';
  caseType: string;
  tags: string[];

  // Date Information
  judgementDate: string;
  month: string;
  year: string;

  // Document Upload
  file: File | null;

  // Additional Information
  summary: string;
  outcome: 'Allowed' | 'Dismissed' | 'Partially Allowed' | '';
  legalArea: string;
}

const DIVISIONS = [
  'Main Division - Windhoek',
  'Northern Division - Oshakati',
  'Coastal Division - Swakopmund',
];

const LEGAL_AREAS = [
  'Civil',
  'Criminal',
  'Constitutional',
  'Administrative',
  'Commercial',
  'Labour',
  'Tax',
  'Family Law',
  'Property Law',
];

interface AdminUploadPageProps {
  onNavigate?: (page: any) => void;
}

export function AdminUploadPage({ onNavigate = () => {} }: AdminUploadPageProps) {
  const [formData, setFormData] = useState<JudgementUpload>({
    caseTitle: '',
    caseNumber: '',
    citation: '',
    courtType: '',
    courtDivision: '',
    judges: [],
    documentType: '',
    category: '',
    caseType: '',
    tags: [],
    judgementDate: '',
    month: '',
    year: '',
    file: null,
    summary: '',
    outcome: '',
    legalArea: '',
  });

  const [judgeInput, setJudgeInput] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error' | 'draft'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isCategoryDisabled = formData.courtType === 'Supreme Court';

  const handleInputChange = (field: keyof JudgementUpload, value: string) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };

      // Auto-clear category when Supreme Court is selected
      if (field === 'courtType' && value === 'Supreme Court') {
        updated.category = '';
      }

      // Auto-fill month and year from judgement date
      if (field === 'judgementDate' && value) {
        const date = new Date(value);
        updated.month = (date.getMonth() + 1).toString().padStart(2, '0');
        updated.year = date.getFullYear().toString();
      }

      // Auto-extract case type from case number
      if (field === 'caseNumber' && value) {
        const caseTypeMatch = value.match(/-(CIV|CRI|LAB|TAX|CON)-/i);
        if (caseTypeMatch) {
          const typeMap: Record<string, string> = {
            CIV: 'Civil',
            CRI: 'Criminal',
            LAB: 'Labour',
            TAX: 'Tax',
            CON: 'Constitutional',
          };
          updated.caseType = typeMap[caseTypeMatch[1].toUpperCase()] || '';
        }
      }

      return updated;
    });

    // Clear error for this field
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
    setUploadStatus('idle');
  };

  const addJudge = () => {
    if (judgeInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        judges: [...prev.judges, judgeInput.trim()],
      }));
      setJudgeInput('');
    }
  };

  const removeJudge = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      judges: prev.judges.filter((_, i) => i !== index),
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const removeTag = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const handleFileSelect = (file: File | null) => {
    if (file) {
      const validTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/msword',
      ];

      if (!validTypes.includes(file.type)) {
        setErrors({ file: 'Please upload a PDF, DOCX, or XLSX file' });
        return;
      }

      if (file.size > 50 * 1024 * 1024) {
        setErrors({ file: 'File size must be less than 50MB' });
        return;
      }

      setFormData((prev) => ({ ...prev, file }));
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.file;
        return newErrors;
      });
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const validateForm = (isDraft: boolean = false): boolean => {
    const newErrors: Record<string, string> = {};

    if (!isDraft) {
      if (!formData.caseTitle) newErrors.caseTitle = 'Case title is required';
      if (!formData.caseNumber) newErrors.caseNumber = 'Case number is required';
      if (!formData.citation) newErrors.citation = 'Citation is required';
      if (!formData.courtType) newErrors.courtType = 'Court type is required';
      if (!formData.courtDivision) newErrors.courtDivision = 'Court division is required';
      if (formData.judges.length === 0) newErrors.judges = 'At least one judge is required';
      if (!formData.documentType) newErrors.documentType = 'Document type is required';
      if (formData.courtType === 'High Court' && !formData.category) {
        newErrors.category = 'Category is required for High Court';
      }
      if (!formData.judgementDate) newErrors.judgementDate = 'Judgement date is required';
      if (!formData.file) newErrors.file = 'Please upload a document';
      if (!formData.outcome) newErrors.outcome = 'Outcome is required';
      if (!formData.legalArea) newErrors.legalArea = 'Legal area is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (isDraft: boolean = false) => {
    if (!validateForm(isDraft)) {
      setUploadStatus('error');
      return;
    }

    // Save to localStorage
    const judgment: StoredJudgment = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      caseTitle: formData.caseTitle,
      caseNumber: formData.caseNumber,
      citation: formData.citation,
      court: formData.courtType as 'Supreme Court' | 'High Court',
      division: formData.courtDivision,
      judges: formData.judges,
      documentType: formData.documentType as 'Judgement' | 'Court Roll',
      category: formData.category || undefined,
      caseType: formData.caseType,
      tags: formData.tags,
      date: formData.judgementDate,
      month: formData.month,
      year: formData.year,
      summary: formData.summary,
      outcome: formData.outcome as 'Allowed' | 'Dismissed' | 'Partially Allowed',
      legalArea: formData.legalArea,
      fileName: formData.file?.name,
      uploadedAt: new Date().toISOString(),
    };

    try {
      saveJudgment(judgment);
      setUploadStatus(isDraft ? 'draft' : 'success');

      setTimeout(() => {
        resetForm();
      }, 2500);
    } catch (error) {
      console.error('Failed to save judgment:', error);
      setErrors({ submit: 'Failed to save judgment. Please try again.' });
      setUploadStatus('error');
    }
  };

  const resetForm = () => {
    setFormData({
      caseTitle: '',
      caseNumber: '',
      citation: '',
      courtType: '',
      courtDivision: '',
      judges: [],
      documentType: '',
      category: '',
      caseType: '',
      tags: [],
      judgementDate: '',
      month: '',
      year: '',
      file: null,
      summary: '',
      outcome: '',
      legalArea: '',
    });
    setJudgeInput('');
    setTagInput('');
    setUploadStatus('idle');
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-[#7A1C1C] py-14 shadow-sm relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <Breadcrumb 
            onNavigate={onNavigate}
            items={[
              { label: 'Admin', page: 'home' },
              { label: 'Upload Centre', page: 'home' },
            ]}
          />
          <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-tight leading-none">Upload <span className="text-[#FFC72C]">Judgement</span></h1>
          <p className="text-white/60 font-medium italic underline decoration-[#FFC72C] decoration-2">Create and publish judgements with complete metadata</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Status Messages */}
        {uploadStatus === 'success' && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-900">Judgement Published Successfully!</h3>
              <p className="text-sm text-green-700">
                The judgement is now live and will appear on the frontend.
              </p>
            </div>
          </div>
        )}

        {uploadStatus === 'draft' && (
          <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900">Saved as Draft</h3>
              <p className="text-sm text-blue-700">You can continue editing this judgement later.</p>
            </div>
          </div>
        )}

        {uploadStatus === 'error' && Object.keys(errors).length > 0 && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900 mb-2">Please fix the following errors:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {Object.values(errors).map((error, idx) => (
                    <li key={idx} className="text-sm text-red-700">
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Form Sections */}
        <div className="space-y-6">
          {/* Section 1: Case Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-[#001489] mb-6 pb-3 border-b border-gray-200">
              Case Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Case Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.caseTitle}
                  onChange={(e) => handleInputChange('caseTitle', e.target.value)}
                  placeholder="e.g., Halutale v Katumbe"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001489] ${
                    errors.caseTitle ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Case Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.caseNumber}
                  onChange={(e) => handleInputChange('caseNumber', e.target.value)}
                  placeholder="e.g., HC-MD-CIV-MOT-GEN-2025006371"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001489] ${
                    errors.caseNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Citation <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.citation}
                  onChange={(e) => handleInputChange('citation', e.target.value)}
                  placeholder="e.g., [2026] NAHCMD 7"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001489] ${
                    errors.citation ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Court Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.courtType}
                  onChange={(e) => handleInputChange('courtType', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001489] ${
                    errors.courtType ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Court Type</option>
                  <option value="Supreme Court">Supreme Court</option>
                  <option value="High Court">High Court</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Court Division <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.courtDivision}
                  onChange={(e) => handleInputChange('courtDivision', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001489] ${
                    errors.courtDivision ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Division</option>
                  {DIVISIONS.map((division) => (
                    <option key={division} value={division}>
                      {division}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Judge(s) <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={judgeInput}
                    onChange={(e) => setJudgeInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addJudge())}
                    placeholder="Enter judge name and press Enter"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001489]"
                  />
                  <button
                    type="button"
                    onClick={addJudge}
                    className="px-4 py-3 bg-[#001489] text-white rounded-lg hover:bg-[#FFC72C] transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.judges.map((judge, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-[#001489] text-white rounded-full text-sm"
                    >
                      {judge}
                      <button type="button" onClick={() => removeJudge(index)}>
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
                {errors.judges && <p className="text-sm text-red-500 mt-1">{errors.judges}</p>}
              </div>
            </div>
          </div>

          {/* Section 2: Classification */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-[#001489] mb-6 pb-3 border-b border-gray-200">
              Classification
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Document Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.documentType}
                  onChange={(e) => handleInputChange('documentType', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001489] ${
                    errors.documentType ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Document Type</option>
                  <option value="Judgement">Judgement</option>
                  <option value="Court Roll">Court Roll</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category {formData.courtType === 'High Court' && <span className="text-red-500">*</span>}
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  disabled={isCategoryDisabled}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001489] ${
                    isCategoryDisabled ? 'bg-gray-100 cursor-not-allowed' : ''
                  } ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select Category</option>
                  <option value="Civil">Civil</option>
                  <option value="Criminal">Criminal</option>
                  <option value="Labour">Labour</option>
                  <option value="Tax">Tax</option>
                </select>
                {isCategoryDisabled && (
                  <p className="text-xs text-gray-500 mt-1">Not applicable for Supreme Court</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Case Type</label>
                <input
                  type="text"
                  value={formData.caseType}
                  onChange={(e) => handleInputChange('caseType', e.target.value)}
                  placeholder="Auto-filled from case number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001489]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Legal Area <span className="text-red-500">*</span></label>
                <select
                  value={formData.legalArea}
                  onChange={(e) => handleInputChange('legalArea', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001489] ${
                    errors.legalArea ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Legal Area</option>
                  {LEGAL_AREAS.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tags / Keywords</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    placeholder="Enter keyword and press Enter"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001489]"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-3 bg-[#FFC72C] text-white rounded-lg hover:bg-[#001489] transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFC72C]/10 text-[#FFC72C] rounded-full text-sm font-medium"
                    >
                      {tag}
                      <button type="button" onClick={() => removeTag(index)}>
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Date Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-[#001489] mb-6 pb-3 border-b border-gray-200">
              Date Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Judgement Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={formData.judgementDate}
                    onChange={(e) => handleInputChange('judgementDate', e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001489] ${
                      errors.judgementDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Month</label>
                <input
                  type="text"
                  value={formData.month}
                  readOnly
                  placeholder="Auto-populated"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Year</label>
                <input
                  type="text"
                  value={formData.year}
                  readOnly
                  placeholder="Auto-populated"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Document Upload */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-[#001489] mb-6 pb-3 border-b border-gray-200">
              Document Upload
            </h2>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? 'border-[#FFC72C] bg-[#FFC72C]/5'
                  : formData.file
                  ? 'border-[#001489] bg-[#001489]/5'
                  : errors.file
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {formData.file ? (
                <div className="flex items-center justify-center gap-4">
                  <FileText className="w-12 h-12 text-[#001489]" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 text-lg">{formData.file.name}</p>
                    <p className="text-sm text-gray-500">{(formData.file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, file: null }))}
                    className="ml-4 p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-600" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-700 font-medium mb-2 text-lg">
                    Drag and drop your file here, or click to browse
                  </p>
                  <p className="text-sm text-gray-500 mb-4">Supported formats: PDF, DOCX, XLSX (Max 50MB)</p>
                  <input
                    type="file"
                    id="file-upload"
                    accept=".pdf,.docx,.xlsx,.doc"
                    onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-block px-8 py-3 bg-[#001489] text-white rounded-lg hover:bg-[#FFC72C] transition-colors cursor-pointer font-semibold"
                  >
                    Browse Files
                  </label>
                </>
              )}
            </div>
            {errors.file && <p className="text-sm text-red-500 mt-2">{errors.file}</p>}
          </div>

          {/* Section 5: Additional Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-[#001489] mb-6 pb-3 border-b border-gray-200">
              Additional Information
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Summary / Headnote</label>
                <textarea
                  value={formData.summary}
                  onChange={(e) => handleInputChange('summary', e.target.value)}
                  placeholder="Brief summary of the judgement..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001489] resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Outcome <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.outcome}
                  onChange={(e) => handleInputChange('outcome', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001489] ${
                    errors.outcome ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Outcome</option>
                  <option value="Allowed">Allowed</option>
                  <option value="Dismissed">Dismissed</option>
                  <option value="Partially Allowed">Partially Allowed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={() => handleSubmit(false)}
              className="flex-1 px-8 py-4 bg-[#DA291C] text-white rounded-lg hover:bg-[#b00528] transition-colors font-bold text-lg flex items-center justify-center gap-3 shadow-lg"
            >
              <CheckCircle className="w-6 h-6" />
              Submit / Publish
            </button>
            <button
              type="button"
              onClick={() => handleSubmit(true)}
              className="flex-1 px-8 py-4 bg-[#001489] text-white rounded-lg hover:bg-[#FFC72C] transition-colors font-bold text-lg flex items-center justify-center gap-3 shadow-lg"
            >
              <FileText className="w-6 h-6" />
              Save as Draft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
