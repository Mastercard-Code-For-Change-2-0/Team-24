import React, { useState } from 'react';
import { 
  MapPin, 
  Star, 
  TrendingUp, 
  Users, 
  Building2, 
  Award, 
  Heart,
  Quote,
  ChevronLeft,
  ChevronRight,
  Play
} from 'lucide-react';

const Impact_Stories = () => {
  const [activeLocation, setActiveLocation] = useState('wakad');
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const locationImpacts = {
    wakad: {
      name: 'Wakad, Pune',
      totalStudents: 450,
      placementRate: 96.2,
      avgSalary: 12.5,
      topCompanies: ['TCS', 'Infosys', 'Wipro', 'Tech Mahindra', 'HCL Technologies', 'HDFC Bank', 'ICICI Bank'],
      communityImpact: 'Transformed the local IT ecosystem with skilled professionals and created a thriving tech community',
      stories: [
        {
          name: 'Sneha Patil',
          age: 23,
          background: 'From a middle-class family in Wakad',
          beforeStory: 'Was working at a local shop earning ₹8,000/month',
          afterStory: 'Now a Software Engineer at TCS earning ₹9.5L annually',
          impact: 'Supporting her family and younger brother\'s education',
          quote: 'This program didn\'t just change my career, it transformed my entire family\'s future.',
          image: 'https://placehold.co/120x120/e5e7eb/4b5563?text=SP',
          video: true
        },
        {
          name: 'Rahul Sharma',
          age: 25,
          background: 'Auto-rickshaw driver\'s son from Wakad',
          beforeStory: 'Struggled to find stable employment after graduation',
          afterStory: 'Data Analyst at Infosys with ₹11L package',
          impact: 'First person in his family to work in IT sector',
          quote: 'The career analytics helped me understand which skills were in demand.',
          image: 'https://placehold.co/120x120/e5e7eb/4b5563?text=RS',
          video: false
        },
        {
          name: 'Priya Deshmukh',
          age: 24,
          background: 'Daughter of a vegetable vendor in Wakad market',
          beforeStory: 'Helping parents in their vegetable stall, earning ₹5,000/month',
          afterStory: 'UI/UX Designer at Wipro earning ₹8.5L annually',
          impact: 'First woman in her community to work in corporate sector',
          quote: 'The document management system helped me organize my portfolio perfectly.',
          image: 'https://placehold.co/120x120/e5e7eb/4b5563?text=PD',
          video: true
        },
        {
          name: 'Amit Jadhav',
          age: 26,
          background: 'Son of a security guard in Wakad IT park',
          beforeStory: 'Working as a delivery boy earning ₹12,000/month',
          afterStory: 'DevOps Engineer at Tech Mahindra earning ₹13L annually',
          impact: 'Inspiring other delivery partners to upskill themselves',
          quote: 'The placement analytics showed me the exact skills companies were looking for.',
          image: 'https://placehold.co/120x120/e5e7eb/4b5563?text=AJ',
          video: false
        },
        {
          name: 'Kavita Bhosale',
          age: 22,
          background: 'From a single-parent household in Wakad',
          beforeStory: 'Working part-time as a tutor earning ₹6,000/month',
          afterStory: 'Business Analyst at HDFC Bank earning ₹10L annually',
          impact: 'Supporting her mother and inspiring other single mothers',
          quote: 'The comprehensive training gave me confidence to compete with engineering graduates.',
          image: 'https://placehold.co/120x120/e5e7eb/4b5563?text=KB',
          video: true
        },
        {
          name: 'Sachin Kale',
          age: 27,
          background: 'Former factory worker from Wakad industrial area',
          beforeStory: 'Working in a manufacturing unit earning ₹15,000/month',
          afterStory: 'Quality Assurance Engineer at HCL Technologies earning ₹9L annually',
          impact: 'Motivating other factory workers to transition to IT',
          quote: 'The career guidance helped me transition from manufacturing to IT seamlessly.',
          image: 'https://placehold.co/120x120/e5e7eb/4b5563?text=SK',
          video: false
        },
        {
          name: 'Pooja Gaikwad',
          age: 23,
          background: 'Daughter of a domestic worker in Wakad society',
          beforeStory: 'Working as a receptionist earning ₹7,000/month',
          afterStory: 'Software Tester at ICICI Bank earning ₹8L annually',
          impact: 'Breaking the cycle of domestic work in her family',
          quote: 'The impact stories of other students motivated me to never give up on my dreams.',
          image: 'https://placehold.co/120x120/e5e7eb/4b5563?text=PG',
          video: true
        }
      ]
    }
  };

  const overallImpact = {
    totalLives: 2850,
    familiesBenefited: 8550,
    averageIncomeIncrease: 340,
    communitiesTransformed: 15
  };

  const currentLocation = locationImpacts[activeLocation];
  const currentStory = currentLocation.stories[currentStoryIndex];

  const nextStory = () => {
    setCurrentStoryIndex((prev) => 
      prev === currentLocation.stories.length - 1 ? 0 : prev + 1
    );
  };

  const prevStory = () => {
    setCurrentStoryIndex((prev) => 
      prev === 0 ? currentLocation.stories.length - 1 : prev - 1
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Impact Stories</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories of transformation from students across India who have changed their lives 
            and communities through our career development program
          </p>
        </div>

        {/* Overall Impact Stats */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-12 text-white">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Collective Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{overallImpact.totalLives.toLocaleString()}</div>
              <div className="text-blue-100">Lives Transformed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{overallImpact.familiesBenefited.toLocaleString()}</div>
              <div className="text-blue-100">Families Benefited</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{overallImpact.averageIncomeIncrease}%</div>
              <div className="text-blue-100">Avg Income Increase</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{overallImpact.communitiesTransformed}</div>
              <div className="text-blue-100">Communities Transformed</div>
            </div>
          </div>
        </div>

        {/* Location Header */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-center">
              <MapPin className="w-6 h-6 text-blue-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">{currentLocation.name}</h2>
            </div>
            <p className="text-center text-gray-600 mt-2">Our flagship training center</p>
          </div>
        </div>

        {/* Location Impact Overview */}
        <div className="bg-white rounded-xl p-8 mb-8 shadow-sm border border-gray-200">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 text-center">Community Impact Overview</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{currentLocation.totalStudents}</div>
              <div className="text-sm text-gray-600">Students Trained</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{currentLocation.placementRate}%</div>
              <div className="text-sm text-gray-600">Placement Rate</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">₹{currentLocation.avgSalary}L</div>
              <div className="text-sm text-gray-600">Average Salary</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Building2 className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{currentLocation.topCompanies.length}</div>
              <div className="text-sm text-gray-600">Top Companies</div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Community Impact:</h3>
            <p className="text-gray-700">{currentLocation.communityImpact}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Top Hiring Companies:</h3>
            <div className="flex flex-wrap gap-2">
              {currentLocation.topCompanies.map((company, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Story */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Featured Success Story</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={prevStory}
                  className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
                  disabled={currentLocation.stories.length <= 1}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm text-gray-600">
                  {currentStoryIndex + 1} of {currentLocation.stories.length}
                </span>
                <button
                  onClick={nextStory}
                  className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
                  disabled={currentLocation.stories.length <= 1}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Story Content */}
              <div className="lg:col-span-2">
                <div className="flex items-start space-x-4 mb-6">
                  <img
                    src={currentStory.image}
                    alt={currentStory.name}
                    className="w-20 h-20 rounded-full border-4 border-blue-100"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{currentStory.name}</h3>
                    <p className="text-gray-600">Age: {currentStory.age}</p>
                    <p className="text-sm text-gray-500 mt-1">{currentStory.background}</p>
                  </div>
                  {currentStory.video && (
                    <button className="ml-auto p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
                      <Play className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                    <h4 className="font-semibold text-red-800 mb-2">Before:</h4>
                    <p className="text-red-700">{currentStory.beforeStory}</p>
                  </div>

                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                    <h4 className="font-semibold text-green-800 mb-2">After:</h4>
                    <p className="text-green-700">{currentStory.afterStory}</p>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Community Impact:</h4>
                    <p className="text-blue-700">{currentStory.impact}</p>
                  </div>
                </div>
              </div>

              {/* Quote Section */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                <Quote className="w-8 h-8 text-blue-500 mb-4" />
                <blockquote className="text-lg text-gray-800 font-medium italic mb-4">
                  "{currentStory.quote}"
                </blockquote>
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">5.0 Impact Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-8 text-white text-center">
          <Heart className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Be Part of the Next Success Story</h2>
          <p className="text-xl mb-6 text-green-100">
            Join thousands of students who have transformed their lives and communities
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors">
            Start Your Journey Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default Impact_Stories;
