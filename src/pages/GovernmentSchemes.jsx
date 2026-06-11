import React, { useState } from 'react';
import { Landmark, Search, Filter, CheckCircle, ChevronRight, FileText, IndianRupee, ShieldCheck } from 'lucide-react';

const schemes = [
  {
    id: 1,
    title: 'PM-Kisan Samman Nidhi',
    category: 'Income Support',
    benefit: '₹6,000 / year',
    eligibility: 'All landholding farmers',
    deadline: 'Ongoing',
    status: 'Eligible',
    matchScore: 98,
    description: 'Direct income support of ₹6,000 per year in three equal installments to all landholding farmer families.'
  },
  {
    id: 2,
    title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    category: 'Crop Insurance',
    benefit: 'Full coverage',
    eligibility: 'All farmers growing notified crops',
    deadline: '31 Jul 2026',
    status: 'Action Required',
    matchScore: 95,
    description: 'Comprehensive crop insurance against non-preventable natural risks from pre-sowing to post-harvest.'
  },
  {
    id: 3,
    title: 'Kisan Credit Card (KCC)',
    category: 'Loan / Credit',
    benefit: 'Up to ₹3 Lakhs @ 4%',
    eligibility: 'Farmers, Tenant farmers, Sharecroppers',
    deadline: 'Ongoing',
    status: 'Eligible',
    matchScore: 90,
    description: 'Provides adequate and timely credit for agricultural operations with flexible repayment options.'
  },
  {
    id: 4,
    title: 'Sub-Mission on Agricultural Mechanization',
    category: 'Subsidy',
    benefit: 'Up to 50% subsidy on equipment',
    eligibility: 'Small & Marginal farmers',
    deadline: '15 Aug 2026',
    status: 'Eligible',
    matchScore: 85,
    description: 'Financial assistance for procurement of agriculture machinery and equipment to promote mechanization.'
  }
];

export default function GovernmentSchemes() {
  const [filter, setFilter] = useState('All');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
            <Landmark className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h1 className="section-title">Govt. Schemes & Loans</h1>
            <p className="text-slate-400 text-sm mt-1">AI-matched benefits based on your farmer profile</p>
          </div>
        </div>
      </div>

      {/* AI Match Banner */}
      <div className="card bg-gradient-to-r from-indigo-900/50 to-slate-800 border-indigo-500/30 flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 flex items-center justify-center flex-shrink-0 relative">
          <ShieldCheck className="w-10 h-10 text-indigo-400" />
          <div className="absolute -bottom-2 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-900">
            Profile Analyzed
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-white font-bold text-lg">You are eligible for ₹1.2 Lakhs in benefits</h3>
          <p className="text-slate-400 text-sm mt-1 max-w-xl">
            Based on your profile (12 acres, Punjab, Wheat/Cotton), our AI has found 4 highly relevant schemes. Apply now to claim your benefits before the deadlines.
          </p>
        </div>
        <button className="btn-primary bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/20 whitespace-nowrap">
          Apply for All <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex bg-slate-800/60 p-1 rounded-xl w-fit">
          {['All', 'Income Support', 'Subsidy', 'Loans', 'Insurance'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${filter === f ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search schemes..." 
            className="w-full bg-slate-800/60 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {schemes.filter(s => filter === 'All' || s.category.includes(filter) || (filter === 'Loans' && s.category === 'Loan / Credit')).map((scheme) => (
          <div key={scheme.id} className="card hover:border-indigo-500/40 transition-all flex flex-col group">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1 block">{scheme.category}</span>
                <h3 className="text-white font-bold text-lg group-hover:text-indigo-300 transition-colors">{scheme.title}</h3>
              </div>
              <div className="flex flex-col items-end">
                 <div className="flex items-center gap-1 bg-green-500/10 text-green-400 px-2 py-1 rounded-md text-xs font-bold border border-green-500/20">
                   <CheckCircle className="w-3 h-3" /> {scheme.matchScore}% Match
                 </div>
              </div>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
              {scheme.description}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6 bg-slate-900/50 rounded-xl p-3 border border-slate-800">
              <div>
                <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider block mb-1">Benefit Amount</span>
                <span className="text-white font-semibold text-sm flex items-center gap-1">
                  <IndianRupee className="w-3 h-3 text-indigo-400" /> {scheme.benefit}
                </span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider block mb-1">Deadline</span>
                <span className="text-white font-semibold text-sm flex items-center gap-1">
                  <FileText className="w-3 h-3 text-amber-400" /> {scheme.deadline}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-auto">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full
                ${scheme.status === 'Eligible' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}>
                {scheme.status}
              </span>
              <button className="text-indigo-400 text-sm font-medium hover:text-indigo-300 flex items-center gap-1">
                Check Eligibility & Apply <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
