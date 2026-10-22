import React from 'react';
import { BookOpen, Sparkles, HeartHandshake, ShieldCheck, Scale, Compass, Users } from 'lucide-react';
import { Chapter } from '../data/chaptersData';

interface TeachingsSectionProps {
  onOpenChapter30: () => void;
}

export const TeachingsSection: React.FC<TeachingsSectionProps> = ({ onOpenChapter30 }) => {
  const principles = [
    {
      num: '१',
      title: 'मर्यादा और अनुशासन',
      desc: 'परिस्थितियां चाहे जैसी हों, मानवीय मूल्यों और नैतिक सीमाओं का उल्लंघन कभी न करना।',
      icon: ShieldCheck,
    },
    {
      num: '२',
      title: 'सत्य और वचन-पालन',
      desc: '"रघुकुल रीति सदा चलि आई, प्राण जाहुँ बरु बचनु न जाई" — सत्यनिष्ठा जीवन का सबसे ऊंचा संबल है।',
      icon: Scale,
    },
    {
      num: '३',
      title: 'समरसता और सामाजिक समभाव',
      desc: 'माता शबरी के जूठे बेर खाना और निषादराज गुह को गले लगाना — जाति व वर्ग से परे आत्मिक प्रेम।',
      icon: HeartHandshake,
    },
    {
      num: '४',
      title: 'शत्रु के प्रति भी सदाचार',
      desc: 'रावण के वध के बाद भी लक्ष्मण को ज्ञान अर्जन हेतु भेजना और विधिवत अंतिम संस्कार करवाना।',
      icon: Compass,
    },
    {
      num: '५',
      title: 'भ्रातृ-प्रेम और त्याग',
      desc: 'संपत्ति और राजसिंहासन के लिए नहीं, बल्कि परस्पर त्याग और समर्पण के लिए भाइयों का आदर्श।',
      icon: Users,
    },
    {
      num: '६',
      title: 'कठिनतम समय में अगाध धैर्य',
      desc: 'राज्याभिषेक से कुछ घंटे पूर्व वनवास की सूचना मिलने पर भी चित्त की प्रशांतता न खोना।',
      icon: Sparkles,
    },
  ];

  return (
    <section id="teachings-section" className="py-14 border-t border-amber-900/30 bg-[#0e0906]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-10 space-y-2">
          <div className="flex items-center gap-2 text-xs font-medium text-amber-400">
            <span>अध्याय ३० विशेष दर्शन</span>
            <span aria-hidden="true">·</span>
            <span>आधुनिक जीवन में प्रासंगिकता</span>
          </div>
          <h2 className="font-title text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-100">
            श्री राम के जीवन की शाश्वत शिक्षाएँ
          </h2>
          <p className="font-serif-in text-sm text-stone-300 leading-relaxed">
            भगवान श्री राम का जीवन केवल पूजा के लिए नहीं, बल्कि अपने दैनिक व्यवहार और आचरण में उतारने के लिए एक आदर्श जीवन-दर्शन है।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {principles.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-5 rounded-xl border border-amber-950/60 bg-[#150e0a] hover:border-amber-700/40 transition-colors space-y-2.5"
              >
                <div className="flex items-center justify-between text-xs text-amber-400">
                  <span className="font-title text-base font-bold text-amber-300">
                    सूत्र {item.num}
                  </span>
                  <Icon className="w-4 h-4 text-amber-500" />
                </div>
                <h3 className="font-title text-base font-bold text-stone-100">
                  {item.title}
                </h3>
                <p className="font-serif-in text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-5 rounded-xl border border-amber-800/40 bg-amber-950/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-title text-lg font-bold text-amber-200">
              अध्याय ३०: श्री राम के जीवन की संपूर्ण शिक्षाएँ विस्तार से पढ़ें
            </h4>
            <p className="text-xs text-stone-300 font-serif-in mt-1">
              "मंगल भवन अमंगल हारी। द्रवहु सुदसरथ अजिर बिहारी॥"
            </p>
          </div>
          <button
            onClick={onOpenChapter30}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs shadow-md transition-all cursor-pointer whitespace-nowrap"
          >
            <BookOpen className="w-4 h-4" />
            <span>अध्याय ३० पूर्ण कथा</span>
          </button>
        </div>
      </div>
    </section>
  );
};
