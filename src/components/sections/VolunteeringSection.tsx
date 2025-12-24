import React from 'react';
import { Volunteering } from '../../types';

interface VolunteeringSectionProps {
    volunteering: Volunteering[];
}

const VolunteeringSection: React.FC<VolunteeringSectionProps> = ({ volunteering }) => {
    if (!volunteering || volunteering.length === 0) {
        return null;
    }

    return (
        <section id="volunteering" className="section-padding bg-white">
            <div className="container mx-auto px-4">
                <h2 className="section-title text-center mb-12">Volunteering</h2>

                <div className="max-w-4xl mx-auto space-y-8">
                    {volunteering.map((item) => (
                        <div key={item.id} className="border-l-4 border-primary-500 pl-6 py-2">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{item.role}</h3>
                                    <p className="text-lg text-primary-600 font-medium">{item.organization}</p>
                                </div>
                                <div className="text-gray-500 text-sm mt-1 md:mt-0">
                                    {new Date(item.start_date).getFullYear()}
                                    {item.end_date ? ` - ${new Date(item.end_date).getFullYear()}` : ' - Present'}
                                </div>
                            </div>
                            <p className="text-gray-600">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VolunteeringSection;
