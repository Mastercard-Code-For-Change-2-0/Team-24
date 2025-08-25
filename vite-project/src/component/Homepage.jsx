import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  Award, 
  Building2, 
  MapPin, 
  ArrowRight,
  CheckCircle,
  Star,
  Target,
  BookOpen,
  Briefcase
} from 'lucide-react';

const Homepage = () => {
  const stats = [
    { label: 'Students Placed', value: '1,789', icon: Users, color: 'text-blue-600' },
    { label: 'Placement Rate', value: '94.8%', icon: Target, color: 'text-green-600' },
    { label: 'Average Salary', value: '₹11L', icon: TrendingUp, color: 'text-purple-600' },
    { label: 'Partner Companies', value: '150+', icon: Building2, color: 'text-orange-600' }
  ];

  const features = [
    {
      title: 'Career Analytics',
      description: 'Track placement statistics, salary trends, and industry insights with comprehensive analytics dashboard.',
      icon: BarChart3,
      color: 'bg-blue-50 text-blue-600',
      link: '/student/analytics'
    },
    {
      title: 'Document Management',
      description: 'Upload, organize, and manage your academic documents, certificates, and resumes securely.',
      icon: BookOpen,
      color: 'bg-green-50 text-green-600',
      link: '/student/documents'
    },
    {
      title: 'Profile Management',
      description: 'Maintain your professional profile with skills, experience, and career preferences.',
      icon: Users,
      color: 'bg-purple-50 text-purple-600',
      link: '/student/profile'
    },
    {
      title: 'Job Placement',
      description: 'Access job opportunities from top companies and track your application progress.',
      icon: Briefcase,
      color: 'bg-orange-50 text-orange-600',
      link: '/student'
    }
  ];

  const companies = [
    'Tata Consultancy Services', 'Infosys', 'Wipro', 'HCL Technologies', 
    'Tech Mahindra', 'HDFC Bank', 'ICICI Bank', 'Bajaj Finance'
  ];

  const successStories = [
    {
      name: 'Priya Sharma',
      role: 'Software Engineer at TCS',
      salary: '₹8.5L',
      image: 'https://placehold.co/80x80/e5e7eb/4b5563?text=PS',
      quote: 'The career analytics helped me understand industry trends and prepare better for interviews.'
    },
    {
      name: 'Rahul Kumar',
      role: 'Data Scientist at Infosys',
      salary: '₹12L',
      image: 'https://placehold.co/80x80/e5e7eb/4b5563?text=RK',
      quote: 'Document management made it easy to organize all my certificates and track applications.'
    },
    {
      name: 'Anita Patel',
      role: 'Product Manager at HDFC Bank',
      salary: '₹15L',
      image: 'https://placehold.co/80x80/e5e7eb/4b5563?text=AP',
      quote: 'The comprehensive training and placement support helped me land my dream job.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Career Success
              <span className="block text-blue-200">Starts Here</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Comprehensive student portal with career analytics, placement tracking, 
              and professional development tools to accelerate your career journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/student" 
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors inline-flex items-center justify-center"
              >
                Access Dashboard
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                to="/login/student" 
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
              >
                Student Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Proven Track Record
            </h2>
            <p className="text-xl text-gray-600">
              Our students achieve exceptional career outcomes
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Career Tools
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to track and accelerate your career progress
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Link 
                key={index}
                to={feature.link}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
              >
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="flex items-center text-blue-600 font-medium">
                  Learn more
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Companies Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Top Partner Companies
            </h2>
            <p className="text-xl text-gray-600">
              Our students work at leading organizations across industries
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {companies.map((company, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 text-center hover:bg-gray-100 transition-colors">
                <div className="text-lg font-semibold text-gray-800">{company}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Hear from our successful alumni
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center mb-4">
                  <img 
                    src={story.image} 
                    alt={story.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{story.name}</div>
                    <div className="text-sm text-gray-600">{story.role}</div>
                    <div className="text-sm font-medium text-green-600">{story.salary}</div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{story.quote}"</p>
                <div className="flex items-center mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Career Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of successful students who have transformed their careers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/" 
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors inline-flex items-center justify-center"
            >
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link 
              to="/student/analytics" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
            >
              View Analytics Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
