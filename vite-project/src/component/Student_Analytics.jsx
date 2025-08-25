import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Building2,
  DollarSign,
  Target,
  Briefcase,
  Award,
  MapPin,
  Star,
  Filter,
  Download,
  Calendar,
  GraduationCap,
  UserCheck,
  UserX
} from 'lucide-react';

const Student_Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('year');
  const [filters, setFilters] = useState({
    batch: 'all',
    location: 'all',
    trainingPartner: 'all',
    jobRole: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  // Placement Statistics Data
  const placementTrendData = [
    { year: '2020', placed: 245, total: 300, percentage: 81.7, avgSalary: 650000 },
    { year: '2021', placed: 278, total: 320, percentage: 86.9, avgSalary: 750000 },
    { year: '2022', placed: 312, total: 350, percentage: 89.1, avgSalary: 850000 },
    { year: '2023', placed: 356, total: 380, percentage: 93.7, avgSalary: 950000 },
    { year: '2024', placed: 398, total: 420, percentage: 94.8, avgSalary: 1100000 }
  ];

  const industryData = [
    { name: 'Technology', value: 45, color: '#8884d8', count: 179 },
    { name: 'Finance', value: 22, color: '#82ca9d', count: 88 },
    { name: 'Healthcare', value: 15, color: '#ffc658', count: 60 },
    { name: 'Consulting', value: 10, color: '#ff7300', count: 40 },
    { name: 'Manufacturing', value: 5, color: '#00ff88', count: 20 },
    { name: 'Others', value: 3, color: '#ff6b6b', count: 11 }
  ];

  const topCompaniesData = [
    { company: 'Tata Consultancy Services', employees: 45, avgSalary: 850000, roles: ['Software Engineer', 'System Analyst', 'Consultant'] },
    { company: 'Infosys', employees: 38, avgSalary: 920000, roles: ['Developer', 'Technical Lead', 'Business Analyst'] },
    { company: 'Wipro', employees: 32, avgSalary: 780000, roles: ['Software Developer', 'Project Manager', 'QA Engineer'] },
    { company: 'HCL Technologies', employees: 29, avgSalary: 810000, roles: ['Full Stack Dev', 'DevOps Engineer', 'Data Analyst'] },
    { company: 'Tech Mahindra', employees: 26, avgSalary: 750000, roles: ['Software Engineer', 'Network Engineer', 'Support Engineer'] },
    { company: 'HDFC Bank', employees: 22, avgSalary: 1200000, roles: ['IT Analyst', 'Risk Analyst', 'Product Manager'] },
    { company: 'ICICI Bank', employees: 18, avgSalary: 1150000, roles: ['Technology Analyst', 'Data Scientist', 'Digital Banking'] },
    { company: 'Bajaj Finance', employees: 15, avgSalary: 1300000, roles: ['Software Developer', 'Business Analyst', 'Risk Manager'] },
    { company: 'Asian Paints', employees: 12, avgSalary: 950000, roles: ['IT Developer', 'ERP Consultant', 'Digital Marketing'] },
    { company: 'Mahindra & Mahindra', employees: 14, avgSalary: 890000, roles: ['Software Engineer', 'Automotive Tech', 'IoT Developer'] }
  ];

  const salaryGrowthData = [
    { experience: '0-1 years', salary: 650000, growth: 0 },
    { experience: '1-2 years', salary: 850000, growth: 23.5 },
    { experience: '2-3 years', salary: 1100000, growth: 19.0 },
    { experience: '3-5 years', salary: 1400000, growth: 24.0 },
    { experience: '5+ years', salary: 1800000, growth: 25.8 }
  ];

  // Filter options data
  const filterOptions = {
    batch: ['all', '2020', '2021', '2022', '2023', '2024'],
    location: ['all', 'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata'],
    trainingPartner: ['all', 'TechMahindra', 'Infosys', 'Wipro', 'Accenture', 'IBM', 'Cognizant', 'HCL'],
    jobRole: ['all', 'Software Engineer', 'Data Scientist', 'Product Manager', 'DevOps Engineer', 'UI/UX Designer', 'Business Analyst']
  };

  // Dropout and career progress data
  const dropoutData = [
    { batch: '2020', enrolled: 300, completed: 285, dropped: 15, dropoutRate: 5.0 },
    { batch: '2021', enrolled: 320, completed: 308, dropped: 12, dropoutRate: 3.8 },
    { batch: '2022', enrolled: 350, completed: 342, dropped: 8, dropoutRate: 2.3 },
    { batch: '2023', enrolled: 380, completed: 375, dropped: 5, dropoutRate: 1.3 },
    { batch: '2024', enrolled: 420, completed: 418, dropped: 2, dropoutRate: 0.5 }
  ];

  // Enhanced Career Progress Data
  const careerProgressData = [
    {
      role: 'Software Engineer',
      junior: 145, mid: 89, senior: 34, lead: 12,
      avgPromotionTime: 18, // months to next level
      salaryGrowth: 45, // % growth from junior to senior
      retentionRate: 87 // % still in same company after 3 years
    },
    {
      role: 'Data Scientist',
      junior: 67, mid: 43, senior: 18, lead: 8,
      avgPromotionTime: 24,
      salaryGrowth: 65,
      retentionRate: 82
    },
    {
      role: 'Product Manager',
      junior: 23, mid: 31, senior: 15, lead: 6,
      avgPromotionTime: 20,
      salaryGrowth: 55,
      retentionRate: 79
    },
    {
      role: 'DevOps Engineer',
      junior: 34, mid: 28, senior: 12, lead: 4,
      avgPromotionTime: 16,
      salaryGrowth: 50,
      retentionRate: 85
    },
    {
      role: 'UI/UX Designer',
      junior: 28, mid: 19, senior: 8, lead: 3,
      avgPromotionTime: 22,
      salaryGrowth: 40,
      retentionRate: 75
    }
  ];

  // Career Timeline Data
  const careerTimelineData = [
    { months: 0, junior: 100, mid: 0, senior: 0, lead: 0 },
    { months: 12, junior: 85, mid: 15, senior: 0, lead: 0 },
    { months: 24, junior: 65, mid: 30, senior: 5, lead: 0 },
    { months: 36, junior: 45, mid: 40, senior: 14, lead: 1 },
    { months: 48, junior: 30, mid: 35, senior: 28, lead: 7 },
    { months: 60, junior: 20, mid: 25, senior: 35, lead: 20 }
  ];

  // Salary Progression Data by Role
  const salaryProgressionData = [
    { role: 'Software Engineer', year1: 650000, year2: 850000, year3: 1200000, year5: 1800000 },
    { role: 'Data Scientist', year1: 800000, year2: 1100000, year3: 1500000, year5: 2200000 },
    { role: 'Product Manager', year1: 900000, year2: 1250000, year3: 1700000, year5: 2500000 },
    { role: 'DevOps Engineer', year1: 700000, year2: 950000, year3: 1350000, year5: 1900000 },
    { role: 'UI/UX Designer', year1: 550000, year2: 750000, year3: 1050000, year5: 1500000 }
  ];

  // Filter handling functions
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      batch: 'all',
      location: 'all',
      trainingPartner: 'all',
      jobRole: 'all'
    });
  };

  // Report download functions
  const downloadCareerProgressReport = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + "Role,Junior,Mid-Level,Senior,Lead,Avg Promotion Time (months),Salary Growth (%),Retention Rate (%)\n"
      + careerProgressData.map(row => `${row.role},${row.junior},${row.mid},${row.senior},${row.lead},${row.avgPromotionTime},${row.salaryGrowth},${row.retentionRate}`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "career_progress_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadDropoutReport = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + "Batch,Enrolled,Completed,Dropped,Dropout Rate (%)\n"
      + dropoutData.map(row => `${row.batch},${row.enrolled},${row.completed},${row.dropped},${row.dropoutRate}`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "dropout_analysis_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadPlacementReport = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + "Year,Students Placed,Total Students,Placement Rate (%),Average Salary (INR)\n"
      + placementTrendData.map(row => `${row.year},${row.placed},${row.total},${row.percentage},${row.avgSalary}`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "placement_statistics_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const StatCard = ({ title, value, change, icon: Icon, trend, subtitle }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
          <div className="flex items-center mt-2">
            {trend === 'up' ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
            <span className={`text-sm ml-1 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {change}
            </span>
          </div>
        </div>
        <div className="p-3 bg-blue-50 rounded-full">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Career Analytics</h1>
          <p className="text-gray-600">Track student placement outcomes, industry trends, and career impact</p>
        </div>

        {/* Controls Section */}
        <div className="mb-6 space-y-4">
          {/* Period Selector and Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex space-x-2">
              {['quarter', 'year', 'all-time'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`pwx-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedPeriod === period
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1).replace('-', ' ')}
                </button>
              ))}
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </button>

              <div className="relative">
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors group">
                  <Download className="h-4 w-4" />
                  <span>Download Reports</span>
                </button>
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <div className="p-2">
                    <button
                      onClick={downloadPlacementReport}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      Placement Statistics Report
                    </button>
                    <button
                      onClick={downloadCareerProgressReport}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      Career Progress Report
                    </button>
                    <button
                      onClick={downloadDropoutReport}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      Dropout Analysis Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Filter Data</h3>
                <button
                  onClick={resetFilters}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Reset All
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(filterOptions).map(([filterType, options]) => (
                  <div key={filterType}>
                    <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                      {filterType === 'trainingPartner' ? 'Training Partner' : filterType === 'jobRole' ? 'Job Role' : filterType}
                    </label>
                    <select
                      value={filters[filterType]}
                      onChange={(e) => handleFilterChange(filterType, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {options.map((option) => (
                        <option key={option} value={option}>
                          {option === 'all' ? 'All' : option}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Active Filters:</strong> {' '}
                  {Object.entries(filters)
                    .filter(([_, value]) => value !== 'all')
                    .map(([key, value]) => `${key}: ${value}`)
                    .join(', ') || 'None'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Placement Rate"
            value="94.8%"
            subtitle="398 out of 420 students"
            change="+1.1%"
            icon={Target}
            trend="up"
          />
          <StatCard
            title="Average Salary"
            value="₹11L"
            subtitle="Starting package"
            change="+15.8%"
            icon={DollarSign}
            trend="up"
          />
          <StatCard
            title="Top Companies"
            value="261"
            subtitle="In SENSEX & major firms"
            change="+18"
            icon={Building2}
            trend="up"
          />
          <StatCard
            title="Total Placed"
            value="1,789"
            subtitle="Last 5 years"
            change="+398"
            icon={Users}
            trend="up"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Placement Trend */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Placement Trend & Salary Growth</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={placementTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip formatter={(value, name) => [
                  name === 'percentage' ? `${value}%` :
                  name === 'avgSalary' ? `₹${(value/100000).toFixed(1)}L` : value,
                  name === 'percentage' ? 'Placement Rate' :
                  name === 'avgSalary' ? 'Avg Salary' : name
                ]} />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="percentage" stroke="#8884d8" strokeWidth={3} name="Placement Rate (%)" />
                <Line yAxisId="right" type="monotone" dataKey="avgSalary" stroke="#82ca9d" strokeWidth={3} name="Average Salary (₹)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Industry Distribution */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Industry Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={industryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value, count }) => `${name}: ${value}% (${count})`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {industryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name, props) => [`${value}% (${props.payload.count} students)`, 'Percentage']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Salary Growth and Top Companies */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Salary Growth by Experience */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Salary Growth by Experience</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salaryGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="experience" />
                <YAxis tickFormatter={(value) => `$${value/1000}K`} />
                <Tooltip formatter={(value, name) => [
                  name === 'salary' ? `₹${(value/100000).toFixed(1)}L` : `${value}%`,
                  name === 'salary' ? 'Average Salary' : 'Growth Rate'
                ]} />
                <Area type="monotone" dataKey="salary" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Top SENSEX Companies */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top SENSEX & Major Companies</h3>
            <div className="space-y-4 max-h-72 overflow-y-auto">
              {topCompaniesData.map((company, index) => (
                <div key={company.company} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                      <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{company.company}</p>
                      <p className="text-xs text-gray-500">{company.employees} employees • ₹{company.avgSalary.toLocaleString()} avg</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {company.roles.slice(0, 2).map((role, idx) => (
                          <span key={idx} className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                            {role}
                          </span>
                        ))}
                        {company.roles.length > 2 && (
                          <span className="px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded">
                            +{company.roles.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{company.employees}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Career Analytics Section */}
        <div className="space-y-8 mb-8">
          {/* Career Progress Timeline */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Career Progression Timeline</h3>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span className="text-sm text-gray-600">5-Year Career Journey</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={careerTimelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="months" tickFormatter={(value) => `${value/12}Y`} />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value, name) => [`${value}%`,
                  name === 'junior' ? 'Junior Level' :
                  name === 'mid' ? 'Mid Level' :
                  name === 'senior' ? 'Senior Level' : 'Lead Level'
                ]} />
                <Legend />
                <Area type="monotone" dataKey="junior" stackId="1" stroke="#fbbf24" fill="#fbbf24" fillOpacity={0.8} name="Junior" />
                <Area type="monotone" dataKey="mid" stackId="1" stroke="#60a5fa" fill="#60a5fa" fillOpacity={0.8} name="Mid-Level" />
                <Area type="monotone" dataKey="senior" stackId="1" stroke="#34d399" fill="#34d399" fillOpacity={0.8} name="Senior" />
                <Area type="monotone" dataKey="lead" stackId="1" stroke="#a78bfa" fill="#a78bfa" fillOpacity={0.8} name="Lead" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Career Metrics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Role-wise Career Insights */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Career Growth Insights by Role</h3>
              <div className="space-y-4">
                {careerProgressData.map((role, index) => {
                  const total = role.junior + role.mid + role.senior + role.lead;
                  const seniorityRate = ((role.senior + role.lead) / total * 100).toFixed(1);
                  return (
                    <div key={role.role} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{role.role}</h4>
                        <span className="text-sm text-gray-500">{total} alumni</span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                        <div className="flex h-2 rounded-full overflow-hidden">
                          <div className="bg-yellow-400" style={{width: `${(role.junior/total)*100}%`}}></div>
                          <div className="bg-blue-400" style={{width: `${(role.mid/total)*100}%`}}></div>
                          <div className="bg-green-400" style={{width: `${(role.senior/total)*100}%`}}></div>
                          <div className="bg-purple-400" style={{width: `${(role.lead/total)*100}%`}}></div>
                        </div>
                      </div>

                      {/* Key Metrics */}
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center">
                          <p className="font-semibold text-green-600">{seniorityRate}%</p>
                          <p className="text-gray-500">Senior+</p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-blue-600">{role.avgPromotionTime}mo</p>
                          <p className="text-gray-500">Avg Promotion</p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-purple-600">{role.salaryGrowth}%</p>
                          <p className="text-gray-500">Salary Growth</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Salary Progression Chart */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Salary Progression by Role</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={salaryProgressionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="role" angle={-45} textAnchor="end" height={80} />
                  <YAxis tickFormatter={(value) => `₹${value/100000}L`} />
                  <Tooltip formatter={(value, name) => [
                    `₹${(value/100000).toFixed(1)}L`,
                    name === 'year1' ? 'Year 1' :
                    name === 'year2' ? 'Year 2' :
                    name === 'year3' ? 'Year 3' : 'Year 5'
                  ]} />
                  <Legend />
                  <Line type="monotone" dataKey="year1" stroke="#fbbf24" strokeWidth={2} name="Year 1" />
                  <Line type="monotone" dataKey="year2" stroke="#60a5fa" strokeWidth={2} name="Year 2" />
                  <Line type="monotone" dataKey="year3" stroke="#34d399" strokeWidth={2} name="Year 3" />
                  <Line type="monotone" dataKey="year5" stroke="#a78bfa" strokeWidth={2} name="Year 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Dropout Analysis */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Program Completion & Dropout Analysis</h3>
              <div className="flex items-center space-x-2">
                <UserX className="h-5 w-5 text-red-500" />
                <span className="text-sm text-gray-600">Retention Rate: 98.7%</span>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dropoutData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="batch" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [
                    value,
                    name === 'enrolled' ? 'Enrolled' :
                    name === 'completed' ? 'Completed' :
                    name === 'dropped' ? 'Dropped Out' : name
                  ]} />
                  <Legend />
                  <Bar dataKey="enrolled" fill="#e5e7eb" name="Enrolled" />
                  <Bar dataKey="completed" fill="#10b981" name="Completed" />
                  <Bar dataKey="dropped" fill="#ef4444" name="Dropped Out" />
                </BarChart>
              </ResponsiveContainer>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-3xl font-bold text-green-600">1,728</p>
                    <p className="text-sm text-gray-600">Total Completed</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <p className="text-3xl font-bold text-red-600">42</p>
                    <p className="text-sm text-gray-600">Total Dropouts</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Dropout Trend Analysis</h4>
                  {dropoutData.map((batch) => (
                    <div key={batch.batch} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Batch {batch.batch}</span>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">{batch.dropoutRate}% dropout</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-red-500 h-2 rounded-full"
                            style={{width: `${batch.dropoutRate * 10}%`}}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Career Impact Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="p-4 bg-green-50 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900">32%</h4>
              <p className="text-sm text-gray-600">Average salary increase after 2 years</p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-blue-50 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900">78%</h4>
              <p className="text-sm text-gray-600">Promoted within first 18 months</p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-purple-50 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900">15</h4>
              <p className="text-sm text-gray-600">Countries where alumni work</p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-orange-50 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <UserCheck className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900">98.7%</h4>
              <p className="text-sm text-gray-600">Program completion rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student_Analytics;
