"use client";
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { SaveContinueButton } from '@/components/ui/SaveContinueButton';
import {
  TitleComponent,
  DescriptionComponent,
  MediaComponent,
  WhatsIncludedComponent,
  PricingDescriptionComponent,
  DurationComponent,
  LocationComponent,
  PackageFlexibilityComponent,
  LessonCountComponent,
  StudentCountComponent,
  PersonnelComponent,
  AddOnsComponent,
  AddComponentButton
} from '@/components/listing';

// Component types for different sections
export interface ComponentData {
  id: string;
  type: string;
  data: any;
  mandatory?: boolean;
}

// Available component types for Listing Details
const LISTING_DETAIL_COMPONENTS = [
  { type: 'title', label: 'Title', mandatory: true },
  { type: 'description', label: 'Description', mandatory: true },
  { type: 'media', label: 'Add Video or Image', mandatory: true },
  { type: 'whats-included', label: "What's Included", mandatory: true },
  { type: 'duration', label: 'Duration' },
  { type: 'category', label: 'Category' },
  { type: 'tags', label: 'Tags' },
];

// Available component types for Pricing
const PRICING_COMPONENTS = [
  { type: 'duration', label: 'Duration' },
  { type: 'location', label: 'Location' },
  { type: 'package-flexibility', label: 'Package Flexibility' },
  { type: 'lesson-count', label: 'Number of Lessons' },
  { type: 'student-count', label: 'Number of Students' },
  { type: 'personnel', label: 'Personnel' },
  { type: 'add-ons', label: 'Add-ons' },
];

function CreateListingContent() {
  const [listingComponents, setListingComponents] = useState<ComponentData[]>([
    { id: '1', type: 'title', data: { value: '' }, mandatory: true },
    { id: '2', type: 'media', data: {}, mandatory: true },
    { id: '3', type: 'description', data: { value: '', noDescription: false }, mandatory: true },
    { id: '4', type: 'whats-included', data: { items: [''] }, mandatory: true },
  ]);

  const [pricingDescription, setPricingDescription] = useState<ComponentData>({
    id: 'pricing-desc',
    type: 'pricing-description',
    data: { value: '' }
  });

  const [pricingComponents, setPricingComponents] = useState<ComponentData[]>([
    { id: 'p2', type: 'duration', data: { value: ''} },
    { id: 'p3', type: 'location', data: { locations: [''] } },
    { id: 'p4', type: 'package-flexibility', data: { type: '' } },
    { id: 'p5', type: 'lesson-count', data: { values: [] } },
    { id: 'p6', type: 'student-count', data: { min: 1, max: 5 } },
    { id: 'p7', type: 'personnel', data: { staff: [''] } },
    { id: 'p8', type: 'add-ons', data: { items: [{ name: '', price: '' }] } },
  ]);

  const addListingComponent = (componentType: string) => {
    const newComponent: ComponentData = {
      id: Date.now().toString(),
      type: componentType,
      data: {},
    };
    setListingComponents([...listingComponents, newComponent]);
  };

  const addPricingComponent = (componentType: string) => {
    const newComponent: ComponentData = {
      id: Date.now().toString(),
      type: componentType,
      data: {},
    };
    setPricingComponents([...pricingComponents, newComponent]);
  };

  const removeComponent = (id: string, section: 'listing' | 'pricing') => {
    if (section === 'listing') {
      const component = listingComponents.find(c => c.id === id);
      if (!component?.mandatory) {
        setListingComponents(listingComponents.filter(c => c.id !== id));
      }
    } else {
      setPricingComponents(pricingComponents.filter(c => c.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 min-w-0 p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">List your services</h1>
            <p className="text-gray-600">Help your customers understand what you are offering.</p>
          </div>

          {/* Listing Details Section - Full Width at Top */}
          <h2 className="font-bold text-base mb-2">Listing Details</h2>
          <div className="bg-[#F4F2F0] rounded-md p-4 mb-4">
            
            {/* Title Component - Full Width */}
            <div className="mb-2">
              {listingComponents
                .filter(component => component.type === 'title')
                .map((component) => (
                  <ComponentRenderer
                    key={component.id}
                    component={component}
                    onUpdate={(data) => {
                      setListingComponents(components =>
                        components.map(c => c.id === component.id ? { ...c, data } : c)
                      );
                    }}
                    onRemove={() => removeComponent(component.id, 'listing')}
                  />
                ))}
            </div>

            {/* Media + Description/What's Included Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-2">
              {/* Left Column - Media */}
              <div>
                {listingComponents
                  .filter(component => component.type === 'media')
                  .map((component) => (
                    <ComponentRenderer
                      key={component.id}
                      component={component}
                      onUpdate={(data) => {
                        setListingComponents(components =>
                          components.map(c => c.id === component.id ? { ...c, data } : c)
                        );
                      }}
                      onRemove={() => removeComponent(component.id, 'listing')}
                    />
                  ))}
              </div>

              {/* Right Column - Description and What's Included */}
              <div className="space-y-0.5">
                {listingComponents
                  .filter(component => component.type === 'description')
                  .map((component) => (
                    <ComponentRenderer
                      key={component.id}
                      component={component}
                      onUpdate={(data) => {
                        setListingComponents(components =>
                          components.map(c => c.id === component.id ? { ...c, data } : c)
                        );
                      }}
                      onRemove={() => removeComponent(component.id, 'listing')}
                    />
                  ))}
                
                {listingComponents
                  .filter(component => component.type === 'whats-included')
                  .map((component) => (
                    <ComponentRenderer
                      key={component.id}
                      component={component}
                      onUpdate={(data) => {
                        setListingComponents(components =>
                          components.map(c => c.id === component.id ? { ...c, data } : c)
                        );
                      }}
                      onRemove={() => removeComponent(component.id, 'listing')}
                    />
                  ))}
              </div>
            </div>

            {/* Other Components */}
            <div className="space-y-2">
              {listingComponents
                .filter(component => !['title', 'media', 'description', 'whats-included'].includes(component.type))
                .map((component) => (
                  <ComponentRenderer
                    key={component.id}
                    component={component}
                    onUpdate={(data) => {
                      setListingComponents(components =>
                        components.map(c => c.id === component.id ? { ...c, data } : c)
                      );
                    }}
                    onRemove={() => removeComponent(component.id, 'listing')}
                  />
                ))}
              
              {/* Add Component Button */}
              <AddComponentButton
                availableComponents={LISTING_DETAIL_COMPONENTS}
                existingComponents={listingComponents}
                onAddComponent={addListingComponent}
              />
            </div>
          </div>

          {/* Pricing Section - Full Width */}
          <h2 className="font-bold text-base mb-2 mt-10">Tell us how your pricing works</h2>
                      {/* Pricing Description - Full Width Row */}
            <div className="mb-6 bg-[#F4F2F0] rounded-md p-2">
              <ComponentRenderer
                component={pricingDescription}
                onUpdate={(data) => {
                  setPricingDescription(prev => ({ ...prev, data }));
                }}
                onRemove={() => {}}
              />
            </div>
            <div className="bg-[#F4F2F0] rounded-md p-6 mb-8">

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {/* Left Grid - Other Pricing Components (3 columns) */}
                <div className="lg:col-span-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pricingComponents.map((component) => (
                        <ComponentRenderer
                          key={component.id}
                          component={component}
                          onUpdate={(data) => {
                            setPricingComponents(components =>
                              components.map(c => c.id === component.id ? { ...c, data } : c)
                            );
                          }}
                          onRemove={() => removeComponent(component.id, 'pricing')}
                        />
                      ))}
                  </div>
                
                {/* Add Component Button for Pricing */}
                <div className="mt-4">
                  <AddComponentButton
                    availableComponents={PRICING_COMPONENTS}
                    existingComponents={pricingComponents}
                    onAddComponent={addPricingComponent}
                  />
                </div>
              </div>

              {/* Right Column - Pricing Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-md p-4">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Your price</p>
                      <p className="text-2xl font-bold">$2450</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600">What customers pay</p>
                      <p className="text-2xl font-bold">$2695</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600">What you earn</p>
                      <p className="text-2xl font-bold">$2205</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Sections */}
          <div className="space-y-4 mb-8">
            <h2 className="font-bold text-base">Customise availability for this service</h2>
            <h2 className="font-bold text-base">Customise policies and rules for this service</h2>
          </div>

          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <SaveContinueButton onClick={() => console.log('Save listing')} />
          </div>
        </div>
      </main>
    </div>
  );
}

// Component Renderer - renders different component types
function ComponentRenderer({ 
  component, 
  onUpdate, 
  onRemove 
}: { 
  component: ComponentData; 
  onUpdate: (data: any) => void; 
  onRemove: () => void; 
}) {
  switch (component.type) {
    case 'title':
      return <TitleComponent component={component} onUpdate={onUpdate} onRemove={onRemove} />;
    case 'description':
      return <DescriptionComponent component={component} onUpdate={onUpdate} onRemove={onRemove} />;
    case 'media':
      return <MediaComponent component={component} onUpdate={onUpdate} onRemove={onRemove} />;
    case 'whats-included':
      return <WhatsIncludedComponent component={component} onUpdate={onUpdate} onRemove={onRemove} />;
    case 'pricing-description':
      return <PricingDescriptionComponent component={component} onUpdate={onUpdate} onRemove={onRemove} />;
    case 'duration':
      return <DurationComponent component={component} onUpdate={onUpdate} onRemove={onRemove} />;
    case 'location':
      return <LocationComponent component={component} onUpdate={onUpdate} onRemove={onRemove} />;
    case 'package-flexibility':
      return <PackageFlexibilityComponent component={component} onUpdate={onUpdate} onRemove={onRemove} />;
    case 'lesson-count':
      return <LessonCountComponent component={component} onUpdate={onUpdate} onRemove={onRemove} />;
    case 'student-count':
      return <StudentCountComponent component={component} onUpdate={onUpdate} onRemove={onRemove} />;
    case 'personnel':
      return <PersonnelComponent component={component} onUpdate={onUpdate} onRemove={onRemove} />;
    case 'add-ons':
      return <AddOnsComponent component={component} onUpdate={onUpdate} onRemove={onRemove} />;
    default:
      return <div>Unknown component type: {component.type}</div>;
  }
}

export default function CreateListingPage() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <CreateListingContent />
    </React.Suspense>
  );
} 