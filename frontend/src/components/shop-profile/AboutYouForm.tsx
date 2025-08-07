"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SaveContinueButton } from '@/components/ui/SaveContinueButton';
import { aboutYouApi } from '@/lib/api/aboutyou';

interface AboutYouFormProps {
  onSave?: (formData: Record<string, any>) => void;
  showSaveButton?: boolean;
}

export default function AboutYouForm({ 
  onSave, 
  showSaveButton = true
}: AboutYouFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Record<string, any>>({
    profilePhoto: null,
    whatIDo: '',
    myExperience: '',
    certifications: '',
    yearsOfExperience: 1,
    myStyle: '',
    funFact: '',
    languages: [],
    gallery: []
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [languageSearch, setLanguageSearch] = useState('');
  const [availableLanguages] = useState([
    'English', 'Mandarin Chinese', 'Spanish', 'French', 'German', 'Japanese', 'Korean', 'Italian', 'Portuguese', 'Arabic'
  ]);

  // Load existing AboutYou data on component mount
  useEffect(() => {
    const loadAboutYouData = async () => {
      setIsLoading(true);
      try {
        const response = await aboutYouApi.getAboutYou();
        const formDataFromApi = aboutYouApi.convertApiToForm(response);
        setFormData(formDataFromApi);
      } catch (error) {
        // If no data exists (404), that's fine - user hasn't filled it out yet
        if (error instanceof Error && !error.message.includes('404')) {
          console.error('Error loading AboutYou data:', error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadAboutYouData();
  }, []);

  const handleFieldChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleLanguageToggle = (language: string) => {
    const currentLanguages = formData.languages || [];
    const isSelected = currentLanguages.includes(language);
    
    if (isSelected) {
      handleFieldChange('languages', currentLanguages.filter((lang: string) => lang !== language));
    } else {
      handleFieldChange('languages', [...currentLanguages, language]);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const apiData = aboutYouApi.convertFormToApi(formData);
      const response = await aboutYouApi.createOrUpdateAboutYou(apiData);
      
      // Call the onSave callback if provided
      if (onSave) {
        onSave(formData);
      }
      
      console.log('AboutYou data saved successfully:', response);
      
      // Redirect to my-storefront page
      router.push('/provider/my-storefront');
    } catch (error) {
      console.error('Error saving AboutYou data:', error);
      // You might want to show a toast notification here
    } finally {
      setIsSaving(false);
    }
  };

  const filteredLanguages = availableLanguages.filter((lang: string) =>
    lang.toLowerCase().includes(languageSearch.toLowerCase())
  );

  if (isLoading) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        
        <div className="flex flex-col gap-6 mb-6">
          {/* Loading skeleton for profile photo and upload button */}
          <div className="flex gap-6 items-start animate-pulse">
            <div className="w-30 h-30 rounded-xl bg-gray-200"></div>
            <div className="h-10 bg-gray-200 rounded w-32"></div>
          </div>

          {/* Loading skeleton for form fields */}
          {[...Array(8)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
              {index === 3 ? (
                // Years of Experience field (has buttons)
                <div className="flex items-center gap-4">
                  <div className="h-10 bg-gray-200 rounded w-12"></div>
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                  <div className="h-10 bg-gray-200 rounded w-12"></div>
                </div>
              ) : index === 5 ? (
                // Languages field (has search and tags)
                <div>
                  <div className="h-10 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="flex gap-2">
                    <div className="h-8 bg-gray-200 rounded w-20"></div>
                    <div className="h-8 bg-gray-200 rounded w-16"></div>
                    <div className="h-8 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
              ) : (
                // Regular text area or input
                <div className="h-20 bg-gray-200 rounded w-full"></div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      
      <div className="flex flex-col gap-6 mb-6">
        
        {/* Profile Photo Section */}
        <div className="flex gap-6 items-start">
          <div className="relative">
            <div className="w-30 h-30 rounded-xl bg-gray-200 flex items-center justify-center overflow-hidden relative">
              {formData.profilePhoto ? (
                <img src={formData.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-500 text-sm">Photo</span>
              )}
            </div>
            <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center cursor-pointer">
              ✏️
            </button>
          </div>
          
          <div className="flex-1">
            <div>
              <label className="form-label mb-1">What I Do</label>
              <p className="text-sm text-gray-500 mb-1">
                A short, clear description of your service in your own words.
              </p>
              <textarea
                value={formData.whatIDo}
                onChange={(e) => handleFieldChange('whatIDo', e.target.value)}
                placeholder="Enter what you do"
                className="w-full min-h-20 resize-y border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* My Experience */}
        <div>
          <label className="form-label">My Experience</label>
          <p className="text-sm text-gray-500 mb-1">
            Relevant work, clients, or roles you've had—can be formal or informal.
          </p>
          <textarea
            value={formData.myExperience}
            onChange={(e) => handleFieldChange('myExperience', e.target.value)}
            placeholder="Enter your experience"
            className="w-full min-h-20 resize-y border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Certifications */}
        <div>
          <label className="form-label">Certifications or Training</label>
          <p className="text-sm text-gray-500 mb-1">
            Any official qualifications, courses, or workshops completed.
          </p>
          <textarea
            value={formData.certifications}
            onChange={(e) => handleFieldChange('certifications', e.target.value)}
            placeholder="Enter your certifications"
            className="w-full min-h-20 resize-y border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Years of Experience */}
        <div>
          <label className="form-label">Years of Experience</label>
          <p className="text-sm text-gray-500 mb-1">
            Total time doing this professionally or informally
          </p>
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={() => handleFieldChange('yearsOfExperience', Math.max(0, formData.yearsOfExperience - 1))}
              className="w-8 h-8 rounded border border-gray-200 bg-white flex items-center justify-center cursor-pointer hover:bg-gray-50"
            >
              -
            </button>
            <span className="px-4 py-2 border border-gray-200 rounded bg-[#F4F2F0] min-w-[100px] text-center">
              {formData.yearsOfExperience} year{formData.yearsOfExperience !== 1 ? 's' : ''}
            </span>
            <button
              onClick={() => handleFieldChange('yearsOfExperience', formData.yearsOfExperience + 1)}
              className="w-8 h-8 rounded border border-gray-200 bg-white flex items-center justify-center cursor-pointer hover:bg-gray-50"
            >
              +
            </button>
          </div>
        </div>

        {/* My Style */}
        <div>
          <label className="form-label">My Style or Approach</label>
          <p className="text-sm text-gray-500 mb-1">
            How you work with people—your energy, attitude, or philosophy.
          </p>
          <textarea
            value={formData.myStyle}
            onChange={(e) => handleFieldChange('myStyle', e.target.value)}
            placeholder="Enter your style"
            className="w-full min-h-20 resize-y border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Fun Fact */}
        <div>
          <label className="form-label">Fun Fact</label>
          <p className="text-sm text-gray-500 mb-1">
            One line that shows personality—pets, side passions, quirks.
          </p>
          <textarea
            value={formData.funFact}
            onChange={(e) => handleFieldChange('funFact', e.target.value)}
            placeholder="Enter your fun fact"
            className="w-full min-h-20 resize-y border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Languages */}
        <div>
          <label className="form-label">Languages I Speak</label>
          <div className="relative mb-4">
            <input
              type="text"
              value={languageSearch}
              onChange={(e) => setLanguageSearch(e.target.value)}
              placeholder="Search and select languages"
              className="w-full pr-10 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              🔍
            </span>
            
            {/* Dropdown */}
            {languageSearch && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                {filteredLanguages
                  .filter(lang => !formData.languages?.includes(lang))
                  .map(language => (
                    <button
                      key={language}
                      onClick={() => {
                        handleLanguageToggle(language);
                        setLanguageSearch('');
                      }}
                      className="w-full px-3 py-2 text-left border-none bg-white cursor-pointer border-b border-gray-100 hover:bg-gray-50"
                    >
                      {language}
                    </button>
                  ))}
                {filteredLanguages.filter(lang => !formData.languages?.includes(lang)).length === 0 && (
                  <div className="px-3 py-2 text-gray-500 text-sm">
                    {formData.languages?.includes(languageSearch) ? 'Already selected' : 'No languages found'}
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Selected Languages */}
          {formData.languages && formData.languages.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-1">
                Selected languages:
              </p>
              <div className="flex flex-wrap gap-2">
                {formData.languages.map((language: string) => (
                  <div
                    key={language}
                    className="flex items-center gap-2 bg-[#F4F2F0] px-2 py-1 rounded-2xl text-sm"
                  >
                    <span>{language}</span>
                    <button
                      onClick={() => handleLanguageToggle(language)}
                      className="bg-none border-none text-gray-500 cursor-pointer p-0 text-base leading-none hover:text-gray-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Gallery */}
        <div>
          <label className="form-label">Gallery</label>
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-16 text-center bg-gray-50 cursor-pointer min-h-48 flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-4 text-2xl">
              +
            </div>
            <p className="text-gray-500 text-base">Add video or image</p>
          </div>
        </div>
      </div>

      {showSaveButton && (
        <div className="flex justify-end mt-8">
          <SaveContinueButton onClick={handleSave} loading={isSaving} disabled={isLoading} />
        </div>
      )}
    </div>
  );
} 