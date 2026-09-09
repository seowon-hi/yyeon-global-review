import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, Compass, Columns, Palette, Database } from 'lucide-react';
import { Review, Language } from '../types';
import { CompareTwoProducts } from './CompareTwoProducts';
import { ColorRecommendation } from './ColorRecommendation';
import { ReviewAnalysis } from './ReviewAnalysis';
import { PERSONAS, BAG_DATA, COMPARE_TABLE_DATA } from '../data/bagComparison';
import { LABELS, PERSONA_TRANSLATIONS } from '../i18n/bagComparison';

interface BagComparisonProps {
  reviews?: Review[];
  onBagClick?: (bagName: string) => void;
  currentLang?: Language;
}

export function BagComparison({ reviews = [], onBagClick, currentLang = 'KO' }: BagComparisonProps) {
  // 4 Main categories tabs: 'lifestyle' | 'compare' | 'colors' | 'analysis'
  const [mainActiveTab, setMainActiveTab] = useState<'lifestyle' | 'compare' | 'colors' | 'analysis'>('lifestyle');
  
  // Sub Tab inside 'compare': 'table' | 'two_products'
  const [compareSubTab, setCompareSubTab] = useState<'table' | 'two_products'>('two_products');

  const [selectedPersona, setSelectedPersona] = useState<string>('출퇴근 직장인');

  const lang: Language = (currentLang === 'KO' || currentLang === 'JA' || currentLang === 'EN') ? currentLang : 'KO';

  const t = (key: string) => LABELS[key]?.[lang] || LABELS[key]?.['KO'] || '';

  // Filter bags based on selected persona for lifestyle tab
  const filteredBags = BAG_DATA.filter((bag) => bag.personas.includes(selectedPersona));

  return (
    <div className="flex flex-col bg-[#FAFAFA] min-h-full font-sans text-gray-900 leading-relaxed selection:bg-gray-100">
      {/* Tab Navigation header */}
      <div className="bg-white border-b border-gray-100 px-5 pt-7 pb-4">
        <h1 className="text-lg font-black tracking-tight mb-4 text-center text-gray-800 uppercase">
          {t('title')}
        </h1>
        
        {/* Toggle 4-button navigation */}
        <div className="grid grid-cols-4 gap-1 bg-gray-100 p-1 rounded-2xl border border-gray-200/50">
          {/* Button 1: 내 가방 찾기 */}
          <button
            onClick={() => setMainActiveTab('lifestyle')}
            className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl transition-all cursor-pointer ${
              mainActiveTab === 'lifestyle'
                ? 'bg-white text-gray-950 shadow-xs ring-1 ring-gray-905/5'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Compass size={14} className="mb-0.5" />
            <span className="text-[10px] font-black tracking-tight">{t('btn_lifestyle')}</span>
          </button>

          {/* Button 2: 제품 비교 */}
          <button
            onClick={() => setMainActiveTab('compare')}
            className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl transition-all cursor-pointer ${
              mainActiveTab === 'compare'
                ? 'bg-white text-gray-950 shadow-xs ring-1 ring-gray-905/5'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Columns size={14} className="mb-0.5" />
            <span className="text-[10px] font-black tracking-tight">{t('btn_compare')}</span>
          </button>

          {/* Button 3: 색상 추천 */}
          <button
            onClick={() => setMainActiveTab('colors')}
            className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl transition-all cursor-pointer ${
              mainActiveTab === 'colors'
                ? 'bg-white text-gray-950 shadow-xs ring-1 ring-gray-950/5'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Palette size={14} className="mb-0.5" />
            <span className="text-[10px] font-black tracking-tight">{t('btn_colors')}</span>
          </button>

          {/* Button 4: 리뷰 분석 */}
          <button
            onClick={() => setMainActiveTab('analysis')}
            className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl transition-all cursor-pointer ${
              mainActiveTab === 'analysis'
                ? 'bg-white text-gray-950 shadow-xs ring-1 ring-gray-950/5'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Database size={14} className="mb-0.5" />
            <span className="text-[10px] font-black tracking-tight">{t('btn_analysis')}</span>
          </button>
        </div>
      </div>

      {/* Main Contents Area */}
      <div className="flex-1 px-5 py-5 pb-20">
        <AnimatePresence mode="wait">
          
          {/* Module 1: 내 가방 찾기 */}
          {mainActiveTab === 'lifestyle' && (
            <motion.div
              key="lifestyle-module"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16 }}
              className="space-y-6"
            >
              {/* Persona Selector Row */}
              <div className="grid grid-cols-3 gap-2 pb-2">
                {PERSONAS.map((persona) => {
                  const isActive = selectedPersona === persona;
                  const label = PERSONA_TRANSLATIONS[persona]?.[lang] || persona;
                  return (
                    <button
                      key={persona}
                      onClick={() => setSelectedPersona(persona)}
                      className={`flex flex-col items-center justify-center text-center px-1.5 py-3 rounded-xl text-[10px] sm:text-[11px] font-black border transition-all cursor-pointer leading-tight ${
                        isActive
                          ? 'bg-black text-white border-black shadow-sm'
                          : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-sm mb-1">
                        {persona === '출퇴근 직장인' && '💼'}
                        {persona === '학생/캠퍼스' && '📚'}
                        {persona === '주말 데일리' && '🗓️'}
                        {persona === '여행/나들이' && '✈️'}
                        {persona === '미팅/비즈니스' && '👔'}
                        {persona === '엄마/육아' && '🍼'}
                      </span>
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tag header */}
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                🏷️ {PERSONA_TRANSLATIONS[selectedPersona]?.[lang] || selectedPersona} {t('recommended_title')} ({filteredBags.length}{t('items_unit')})
              </div>

              {/* Recommended Cards list */}
              <div className="grid grid-cols-1 gap-5">
                {filteredBags.map((bag) => (
                  <div
                    key={bag.name}
                    className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-xs space-y-4 hover:shadow-sm transition-all duration-300"
                  >
                    <div>
                      <span className={`inline-block text-[9px] font-black tracking-wider px-2.5 py-1 rounded-full uppercase ${bag.badge.bgColor} ${bag.badge.textColor} mb-2`}>
                        {bag.badge.text[lang] || bag.badge.text['KO']}
                      </span>
                      <h3 className="text-base font-black text-gray-900">{bag.name}</h3>
                      <p className="text-xs text-gray-400 font-medium mt-0.5">{bag.subTitle[lang] || bag.subTitle['KO']}</p>
                    </div>

                    {/* Storage item check list */}
                    <div className="bg-gray-50 rounded-xl p-3.5 space-y-2">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                        {t('checklist_title')}
                      </div>
                      <div className="space-y-2 text-xs">
                        {bag.checklist.map((c, idx) => (
                          <div key={idx} className="flex justify-between items-center py-0.5">
                            <span className="flex items-center space-x-2 text-gray-650 font-semibold">
                              <span>{c.icon}</span>
                              <span>{c.item[lang] || c.item['KO']}</span>
                            </span>
                            <span className="flex items-center space-x-1.5 text-right">
                              <span className="text-[11px] text-gray-400 font-medium">{c.detail[lang] || c.detail['KO']}</span>
                              {c.possible ? (
                                <Check size={14} className="text-emerald-500 font-bold" />
                              ) : (
                                <X size={14} className="text-gray-300" />
                              )}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => onBagClick?.(bag.id)}
                      className="w-full bg-[#0B1530] text-white py-3 rounded-xl text-xs font-bold hover:bg-[#15234A] transition-colors cursor-pointer flex justify-center items-center"
                    >
                      <span className="text-[10px] font-black uppercase tracking-wider">
                        {t('view_mall')}
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Module 2: 제품 비교 (Saves both 2-1 and 2-2 subtabs) */}
          {mainActiveTab === 'compare' && (
            <motion.div
              key="compare-module"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16 }}
              className="space-y-5"
            >
              {/* Product compare subtabs */}
              <div className="flex bg-neutral-100 p-0.5 rounded-xl border border-gray-200/40">
                <button
                  onClick={() => setCompareSubTab('two_products')}
                  className={`flex-1 py-2 text-[11px] font-extrabold rounded-lg transition-all cursor-pointer ${
                    compareSubTab === 'two_products'
                      ? 'bg-white text-gray-950 shadow-xs'
                      : 'text-gray-400 hover:text-gray-700'
                  }`}
                >
                  {t('sub_compare')}
                </button>
                <button
                  onClick={() => setCompareSubTab('table')}
                  className={`flex-1 py-2 text-[11px] font-extrabold rounded-lg transition-all cursor-pointer ${
                    compareSubTab === 'table'
                      ? 'bg-white text-gray-950 shadow-xs'
                      : 'text-gray-400 hover:text-gray-700'
                  }`}
                >
                  {t('sub_table')}
                </button>
              </div>

              {/* Sub-tab Content mapping */}
              <AnimatePresence mode="wait">
                {compareSubTab === 'two_products' ? (
                  <motion.div
                    key="two_products_sub"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.12 }}
                  >
                    <CompareTwoProducts
                      currentLang={lang}
                      onNavigateToStorageTable={() => setCompareSubTab('table')}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="table_sub"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.12 }}
                    className="space-y-4"
                  >
                    <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                      {t('table_header')}
                    </div>

                    {/* Table markup for comparison */}
                    <div className="bg-white border border-gray-200/80 rounded-2xl shadow-xs overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[500px]">
                          <thead>
                            <tr className="bg-gray-50/70 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                              <th className="py-4 px-4 font-black text-gray-500 first:pl-5">{t('col_product')}</th>
                              <th className="py-4 px-3 font-semibold text-gray-500 text-center">{t('col_laptop')}</th>
                              <th className="py-4 px-3 font-semibold text-gray-500 text-center">{t('col_ipad')}</th>
                              <th className="py-4 px-3 font-semibold text-gray-500 text-center">{t('col_tumbler')}</th>
                              <th className="py-4 px-3 font-semibold text-gray-500 text-center">{t('col_books')}</th>
                              <th className="py-4 px-3 font-semibold text-gray-500 text-center">{t('col_lipstick')}</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 text-xs text-gray-750">
                            {COMPARE_TABLE_DATA.map((row) => (
                              <tr key={row.name} className="hover:bg-gray-50/40 transition-colors">
                                <td className="py-4.5 px-4 font-black text-gray-900 pl-5">
                                  <div>{row.name}</div>
                                  <span className="text-[8px] text-gray-400 font-extrabold uppercase tracking-widest block mt-0.5">
                                    {row.name.includes('Henne') ? 'Henne bag' : row.name.toLowerCase().includes('mellow') ? 'Mellow bag' : row.name.toLowerCase().includes('aro') ? 'Aro bag' : row.name.toLowerCase().includes('aube') ? 'Aube Bag' : 'Blooming bag'}
                                  </span>
                                </td>
                                <td className="py-4.5 px-3 text-center">
                                  {row.specs.notebook ? (
                                    <span className="text-emerald-500 font-extrabold text-sm">o</span>
                                  ) : (
                                    <span className="text-gray-400 font-extrabold text-sm">x</span>
                                  )}
                                </td>
                                <td className="py-4.5 px-3 text-center">
                                  {row.specs.ipad ? (
                                    <span className="text-emerald-500 font-extrabold text-sm">o</span>
                                  ) : (
                                    <span className="text-gray-400 font-extrabold text-sm">x</span>
                                  )}
                                </td>
                                <td className="py-4.5 px-3 text-center">
                                  {row.specs.tumbler ? (
                                    <span className="text-emerald-500 font-extrabold text-sm">o</span>
                                  ) : (
                                    <span className="text-gray-400 font-extrabold text-sm">x</span>
                                  )}
                                </td>
                                <td className="py-4.5 px-3 text-center">
                                  {row.specs.books ? (
                                    <span className="text-emerald-500 font-extrabold text-sm">o</span>
                                  ) : (
                                    <span className="text-gray-400 font-extrabold text-sm">x</span>
                                  )}
                                </td>
                                <td className="py-4.5 px-3 text-center">
                                  {row.specs.lipstick ? (
                                    <span className="text-emerald-500 font-extrabold text-sm">o</span>
                                  ) : (
                                    <span className="text-gray-400 font-extrabold text-sm">x</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Table footer descriptions */}
                    <div className="bg-gray-50 border border-gray-150 p-4.5 rounded-xl text-center">
                      <span className="text-[10px] font-black text-gray-400 tracking-wider block mb-2 uppercase">
                        {t('table_footer_title')}
                      </span>
                      <p className="text-[10px] text-gray-400 font-medium leading-relaxed">
                        {t('table_footer_desc')}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Module 3: 색상 추천 */}
          {mainActiveTab === 'colors' && (
            <motion.div
              key="colors-module"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16 }}
            >
              <ColorRecommendation currentLang={lang} />
            </motion.div>
          )}

          {/* Module 4: 리뷰 분석 */}
          {mainActiveTab === 'analysis' && (
            <motion.div
              key="analysis-module"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16 }}
            >
              <ReviewAnalysis currentLang={lang} />
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
