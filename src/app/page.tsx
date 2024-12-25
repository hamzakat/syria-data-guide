'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import sources from '@/data/sources.yaml';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Image from 'next/image';

interface Format {
  id: string;
  en: string;
  ar: string;
}

interface Topic {
  id: string;
  en: string;
  ar: string;
}

interface Source {
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  url: string;
  logo?: string;
  formats?: Format[];
  topics?: Topic[];
}

export default function Home() {
  const { language, setLanguage, dir } = useLanguage();
  const [formatFilters, setFormatFilters] = useState<string[]>([]);
  const [topicFilters, setTopicFilters] = useState<string[]>([]);

  // Updated: Get unique formats and topics using object keys to ensure uniqueness
  const uniqueFormats: Format[] = Array.from(
    new Set(sources.flatMap((source: Source) => source.formats?.map(format => format.id) || []))
  ).map((formatId: unknown) => {
    const format = sources.flatMap((s: Source) => s.formats || []).find((f: Format) => f.id === formatId as string);
    return format!;
  });

  const uniqueTopics: Topic[] = Array.from(
    new Set(sources.flatMap((source: Source) => source.topics?.map(topic => topic.id) || []))
  ).map((topicId: unknown) => {
    const topic = sources.flatMap((s: Source) => s.topics || []).find((t: Topic) => t.id === topicId as string);
    return topic!;
  });

  const filteredSources = sources.filter((source: { formats?: Format[]; topics?: Topic[] }) => {
    const formatMatch = formatFilters.length === 0 || 
      source.formats?.some((format: Format) => formatFilters.includes(format.id)) || false;
    const topicMatch = topicFilters.length === 0 || 
      source.topics?.some((topic: Topic) => topicFilters.includes(topic.id)) || false;
    return formatMatch && topicMatch;
  });

  return (
    <div dir={dir} className="container mx-auto p-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <div className="flex items-center gap-2 mb-4 sm:mb-0 justify-center sm:justify-start">
          <Image 
            src="/flag.svg" 
            alt="Syrian Flag" 
            width={32} 
            height={24} 
            className="inline-block"
          />
          <h1 className="text-3xl font-bold">
            {language === 'en' ? 'Syria Data Guide' : 'دليل البيانات السورية'}
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                {language === 'en' ? 'About' : 'حول'}
              </Button>
            </DialogTrigger>
            <DialogContent dir={language === 'ar' ? 'rtl' : 'ltr'}>
              <DialogHeader>
                <DialogTitle className={`font-ibm-plex-sans-arabic ${language === 'ar' ? 'text-right' : ''}`}>
                  {language === 'en' ? 'About' : 'حول'}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-2">
                {language === 'en' 
                  ? <>
                      <DialogDescription>
                      A comprehensive guide providing data sources, statistics, and research reports on various topics related to Syrian affairs to assist decision-makers and researchers.
                      </DialogDescription>
                      <DialogDescription>
                        This is an open source project. You can view the source code and contribute on <a href="https://github.com/hamzakat/syria-data-guide" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">GitHub</a>.
                      </DialogDescription>
                    </>
                  : <>
                      <DialogDescription className="font-ibm-plex-sans-arabic">
                        دليل شامل يوفر مصادر بيانات وإحصائيات وتقارير البحثية حول مواضيع المتنوعة متعلقة بالشأن السوري لمساعدة صناع القرار والباحثين.
                      </DialogDescription>
                      <DialogDescription className="font-ibm-plex-sans-arabic">
                        هذا مشروع مفتوح المصدر. يمكنك عرض الكود المصدري والمساهمة على <a href="https://github.com/hamzakat/syria-data-guide" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">GitHub</a>.
                      </DialogDescription>
                    </>
                }
              </div>
            </DialogContent>
          </Dialog>
          <Button 
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="w-full sm:w-auto"
          >
            {language === 'en' ? 'العربية' : 'English'}
          </Button>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <h2 className="text-sm font-medium mb-2">
            {language === 'en' ? 'Format' : 'الصيغة'}
          </h2>
          <ToggleGroup
            type="multiple"
            value={formatFilters}
            onValueChange={setFormatFilters}
            className={`flex flex-wrap gap-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}
          >
            {uniqueFormats.map((format: Format) => (
              <ToggleGroupItem
                key={format.id}
                value={format.id}
                className="rounded-full"
                aria-label={format[language]}
              >
                {format[language]}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div>
          <h2 className="text-sm font-medium mb-2">
            {language === 'en' ? 'Topic' : 'الموضوع'}
          </h2>
          <ToggleGroup
            type="multiple"
            value={topicFilters}
            onValueChange={setTopicFilters}
            className={`flex flex-wrap gap-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}
          >
            {uniqueTopics.map((topic: Topic) => (
              <ToggleGroupItem
                key={topic.id}
                value={topic.id}
                className="rounded-full"
                aria-label={topic[language]}
              >
                {topic[language]}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSources.map((source: Source, index: number) => (
          <a href={source.url} target="_blank" rel="noopener noreferrer" key={index} className="h-full">
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardHeader className="h-full flex flex-col">
                <div className="flex items-center gap-2">
                  {source.logo && (
                    <Image 
                      src={source.logo} 
                      alt={`${source.title[language]} logo`} 
                      width={80} 
                      height={80} 
                      className="rounded"
                    />
                  )}
                  <CardTitle>{source.title[language]}</CardTitle>
                </div>
                <CardDescription className="flex-grow">
                  {source.description[language]}
                </CardDescription>
                <div className="mt-2 flex flex-wrap gap-1">
                  {source.formats?.map((format: Format) => (
                    <span key={format.id} className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs">
                      {format[language]}
                    </span>
                  ))}
                  {source.topics?.map((topic: Topic) => (
                    <span key={topic.id} className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs">
                      {topic[language]}
                    </span>
                  ))}
                </div>
              </CardHeader>
            </Card>
          </a>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <a href="https://github.com/hamzakat/syria-data-guide" target="_blank" rel="noopener noreferrer" className="flex items-center">
          <Image 
            src="/github.svg"
            alt="GitHub Repository" 
            width={30} 
            height={30} 
            className="inline-block"
          />
        </a>
      </div>
    </div>
  );
}