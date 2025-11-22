import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

type WineType = 'all' | 'red' | 'white' | 'rose' | 'sparkling';
type WineCountry = 'all' | 'france' | 'italy' | 'spain' | 'usa' | 'argentina';

interface Wine {
  id: number;
  name: string;
  type: WineType;
  grape: string;
  country: WineCountry;
  region: string;
  description: string;
  taste: string[];
  pairing: string[];
  price: string;
}

const wines: Wine[] = [
  {
    id: 1,
    name: 'Château Margaux',
    type: 'red',
    grape: 'Каберне Совиньон',
    country: 'france',
    region: 'Бордо',
    description: 'Легендарное вино с богатой историей, демонстрирующее элегантность и глубину.',
    taste: ['Черная смородина', 'Кедр', 'Фиалка'],
    pairing: ['Стейк', 'Ягненок', 'Трюфели'],
    price: '€€€€'
  },
  {
    id: 2,
    name: 'Chablis Grand Cru',
    type: 'white',
    grape: 'Шардоне',
    country: 'france',
    region: 'Бургундия',
    description: 'Минеральное белое вино с освежающей кислотностью и нотками цитрусов.',
    taste: ['Зеленое яблоко', 'Лимон', 'Минералы'],
    pairing: ['Устрицы', 'Рыба', 'Козий сыр'],
    price: '€€€'
  },
  {
    id: 3,
    name: 'Barolo Riserva',
    type: 'red',
    grape: 'Неббиоло',
    country: 'italy',
    region: 'Пьемонт',
    description: 'Король итальянских вин с мощной структурой и потенциалом выдержки.',
    taste: ['Роза', 'Вишня', 'Кожа'],
    pairing: ['Трюфели', 'Дичь', 'Выдержанные сыры'],
    price: '€€€€'
  },
  {
    id: 4,
    name: 'Albariño',
    type: 'white',
    grape: 'Альбариньо',
    country: 'spain',
    region: 'Риас Байшас',
    description: 'Свежее и ароматное белое вино с морскими нотками.',
    taste: ['Персик', 'Цитрус', 'Морская соль'],
    pairing: ['Морепродукты', 'Паэлья', 'Тапас'],
    price: '€€'
  },
  {
    id: 5,
    name: 'Provence Rosé',
    type: 'rose',
    grape: 'Гренаш, Сенсо',
    country: 'france',
    region: 'Прованс',
    description: 'Классическое розовое вино с нежным цветом и свежим вкусом.',
    taste: ['Клубника', 'Арбуз', 'Травы'],
    pairing: ['Салаты', 'Гриль', 'Средиземноморская кухня'],
    price: '€€'
  },
  {
    id: 6,
    name: 'Champagne Brut',
    type: 'sparkling',
    grape: 'Шардоне, Пино Нуар',
    country: 'france',
    region: 'Шампань',
    description: 'Элегантное игристое вино с тонкими пузырьками и сложным букетом.',
    taste: ['Зеленое яблоко', 'Бриошь', 'Миндаль'],
    pairing: ['Икра', 'Устрицы', 'Сыр'],
    price: '€€€€'
  },
  {
    id: 7,
    name: 'Malbec Reserva',
    type: 'red',
    grape: 'Мальбек',
    country: 'argentina',
    region: 'Мендоса',
    description: 'Насыщенное вино с бархатистыми танинами и фруктовым вкусом.',
    taste: ['Черная слива', 'Шоколад', 'Специи'],
    pairing: ['Мясо на гриле', 'Эмпанадас', 'Барбекю'],
    price: '€€'
  },
  {
    id: 8,
    name: 'Napa Valley Cabernet',
    type: 'red',
    grape: 'Каберне Совиньон',
    country: 'usa',
    region: 'Напа',
    description: 'Мощное калифорнийское вино с яркими фруктовыми нотами.',
    taste: ['Черная смородина', 'Ваниль', 'Кофе'],
    pairing: ['Стейк', 'Бургеры', 'Зрелые сыры'],
    price: '€€€'
  }
];

const grapeVarieties = [
  {
    name: 'Каберне Совиньон',
    description: 'Король красных сортов винограда. Дает полнотелые вина с высоким содержанием танинов.',
    characteristics: ['Полнотелое', 'Высокие танины', 'Долгая выдержка']
  },
  {
    name: 'Шардоне',
    description: 'Самый популярный белый сорт. Универсален: от легких минеральных до маслянистых вин.',
    characteristics: ['Среднетелое', 'Умеренная кислотность', 'Выдержка в дубе']
  },
  {
    name: 'Пино Нуар',
    description: 'Капризный, но благородный сорт. Дает элегантные вина с тонкими ароматами.',
    characteristics: ['Легкотелое', 'Низкие танины', 'Сложный букет']
  },
  {
    name: 'Совиньон Блан',
    description: 'Освежающий белый сорт с яркой кислотностью и травянистыми нотами.',
    characteristics: ['Легкотелое', 'Высокая кислотность', 'Цитрусовые ноты']
  }
];

const wineRegions = [
  {
    name: 'Бордо, Франция',
    description: 'Легендарный регион красных вин, известный ассамбляжами на основе Каберне Совиньона и Мерло.',
    climate: 'Морской умеренный',
    speciality: 'Красные ассамбляжи'
  },
  {
    name: 'Бургундия, Франция',
    description: 'Родина великих Пино Нуар и Шардоне. Терруар здесь играет решающую роль.',
    climate: 'Континентальный',
    speciality: 'Пино Нуар, Шардоне'
  },
  {
    name: 'Тоскана, Италия',
    description: 'Регион Кьянти и Брунелло. Санджовезе — король местных виноградников.',
    climate: 'Средиземноморский',
    speciality: 'Санджовезе'
  },
  {
    name: 'Напа Вэлли, США',
    description: 'Калифорнийская долина мирового класса, известная мощными Каберне Совиньонами.',
    climate: 'Средиземноморский',
    speciality: 'Каберне Совиньон'
  }
];

const Index = () => {
  const [selectedType, setSelectedType] = useState<WineType>('all');
  const [selectedCountry, setSelectedCountry] = useState<WineCountry>('all');
  const [selectedGrape, setSelectedGrape] = useState<string>('all');

  const wineTypes = [
    { value: 'all' as const, label: 'Все вина', icon: 'Wine' },
    { value: 'red' as const, label: 'Красное', icon: 'Wine' },
    { value: 'white' as const, label: 'Белое', icon: 'Wine' },
    { value: 'rose' as const, label: 'Розовое', icon: 'Wine' },
    { value: 'sparkling' as const, label: 'Игристое', icon: 'Sparkles' }
  ];

  const countries = [
    { value: 'all' as const, label: 'Все страны' },
    { value: 'france' as const, label: 'Франция' },
    { value: 'italy' as const, label: 'Италия' },
    { value: 'spain' as const, label: 'Испания' },
    { value: 'usa' as const, label: 'США' },
    { value: 'argentina' as const, label: 'Аргентина' }
  ];

  const grapes = ['all', ...Array.from(new Set(wines.map(w => w.grape)))];

  const filteredWines = wines.filter(wine => {
    const typeMatch = selectedType === 'all' || wine.type === selectedType;
    const countryMatch = selectedCountry === 'all' || wine.country === selectedCountry;
    const grapeMatch = selectedGrape === 'all' || wine.grape === selectedGrape;
    return typeMatch && countryMatch && grapeMatch;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Wine" size={32} className="text-primary" />
              <h1 className="font-serif text-4xl font-bold text-primary">Винный справочник</h1>
            </div>
            <p className="text-muted-foreground hidden md:block">Путеводитель в мир вина</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="catalog" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-7 gap-2 bg-card/50 p-2">
            <TabsTrigger value="catalog" className="font-serif">Каталог вин</TabsTrigger>
            <TabsTrigger value="grapes" className="font-serif">Сорта винограда</TabsTrigger>
            <TabsTrigger value="regions" className="font-serif">Винные регионы</TabsTrigger>
            <TabsTrigger value="tasting" className="font-serif">Дегустация</TabsTrigger>
            <TabsTrigger value="pairing" className="font-serif">Сочетания</TabsTrigger>
            <TabsTrigger value="dictionary" className="font-serif">Словарь</TabsTrigger>
            <TabsTrigger value="storage" className="font-serif">Хранение</TabsTrigger>
          </TabsList>

          <TabsContent value="catalog" className="space-y-8 animate-fade-in">
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
              <h2 className="font-serif text-2xl font-semibold mb-6 text-foreground flex items-center gap-2">
                <Icon name="Filter" size={24} className="text-primary" />
                Фильтры
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-3 block text-foreground">Тип вина</label>
                  <div className="flex flex-wrap gap-2">
                    {wineTypes.map(type => (
                      <Button
                        key={type.value}
                        variant={selectedType === type.value ? 'default' : 'outline'}
                        onClick={() => setSelectedType(type.value)}
                        className="transition-all duration-200 hover:scale-105"
                      >
                        <Icon name={type.icon} size={16} className="mr-2" />
                        {type.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-3 block text-foreground">Страна</label>
                  <div className="flex flex-wrap gap-2">
                    {countries.map(country => (
                      <Button
                        key={country.value}
                        variant={selectedCountry === country.value ? 'default' : 'outline'}
                        onClick={() => setSelectedCountry(country.value)}
                        className="transition-all duration-200 hover:scale-105"
                      >
                        {country.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-3 block text-foreground">Сорт винограда</label>
                  <div className="flex flex-wrap gap-2">
                    {grapes.map(grape => (
                      <Button
                        key={grape}
                        variant={selectedGrape === grape ? 'default' : 'outline'}
                        onClick={() => setSelectedGrape(grape)}
                        className="transition-all duration-200 hover:scale-105"
                      >
                        {grape === 'all' ? 'Все сорта' : grape}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 text-sm text-muted-foreground">
                Найдено вин: <span className="font-semibold text-foreground">{filteredWines.length}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWines.map((wine, index) => (
                <Card key={wine.id} className="hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in border-border" style={{ animationDelay: `${index * 50}ms` }}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="font-serif text-2xl text-foreground">{wine.name}</CardTitle>
                      <span className="text-lg font-medium text-accent">{wine.price}</span>
                    </div>
                    <CardDescription className="text-muted-foreground">
                      {wine.region}, {countries.find(c => c.value === wine.country)?.label}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {wineTypes.find(t => t.value === wine.type)?.label}
                      </Badge>
                      <Badge variant="outline" className="bg-accent/10 text-accent-foreground border-accent/20">
                        {wine.grape}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">{wine.description}</p>

                    <div>
                      <p className="text-xs font-medium mb-2 text-foreground flex items-center gap-1">
                        <Icon name="Grape" size={14} />
                        Вкусовые ноты:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {wine.taste.map(note => (
                          <Badge key={note} variant="secondary" className="text-xs">
                            {note}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-medium mb-2 text-foreground flex items-center gap-1">
                        <Icon name="UtensilsCrossed" size={14} />
                        Сочетания:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {wine.pairing.map(food => (
                          <Badge key={food} variant="secondary" className="text-xs">
                            {food}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="grapes" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {grapeVarieties.map((grape, index) => (
                <Card key={grape.name} className="hover:shadow-lg transition-all duration-300 animate-fade-in border-border" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardHeader>
                    <CardTitle className="font-serif text-2xl text-foreground flex items-center gap-2">
                      <Icon name="Grape" className="text-primary" size={24} />
                      {grape.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">{grape.description}</p>
                    <div>
                      <p className="text-sm font-medium mb-2 text-foreground">Характеристики:</p>
                      <div className="flex flex-wrap gap-2">
                        {grape.characteristics.map(char => (
                          <Badge key={char} variant="outline" className="bg-accent/10">
                            {char}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="regions" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {wineRegions.map((region, index) => (
                <Card key={region.name} className="hover:shadow-lg transition-all duration-300 animate-fade-in border-border" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardHeader>
                    <CardTitle className="font-serif text-2xl text-foreground flex items-center gap-2">
                      <Icon name="MapPin" className="text-primary" size={24} />
                      {region.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">{region.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-foreground mb-1">Климат:</p>
                        <Badge variant="outline">{region.climate}</Badge>
                      </div>
                      <div>
                        <p className="font-medium text-foreground mb-1">Специализация:</p>
                        <Badge variant="outline">{region.speciality}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tasting" className="animate-fade-in">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="font-serif text-3xl text-foreground flex items-center gap-2">
                  <Icon name="Eye" className="text-primary" size={28} />
                  Правила дегустации
                </CardTitle>
                <CardDescription>Как правильно оценивать вино</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="visual">
                    <AccordionTrigger className="font-serif text-lg text-foreground">
                      <span className="flex items-center gap-2">
                        <Icon name="Eye" size={20} />
                        Визуальная оценка
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      Держите бокал под углом 45° на белом фоне. Оцените цвет, прозрачность и вязкость вина. 
                      Интенсивность цвета может указывать на возраст и концентрацию. «Ножки» или «слезы» на стенках 
                      бокала говорят о содержании алкоголя и сахара.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="aroma">
                    <AccordionTrigger className="font-serif text-lg text-foreground">
                      <span className="flex items-center gap-2">
                        <Icon name="Flower" size={20} />
                        Оценка аромата
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      Сначала понюхайте вино в покое, затем покрутите бокал и понюхайте снова. Вращение высвобождает 
                      ароматические соединения. Ищите фруктовые, цветочные, пряные или земляные ноты. Первичные ароматы 
                      связаны с сортом, вторичные — с брожением, третичные — с выдержкой.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="taste">
                    <AccordionTrigger className="font-serif text-lg text-foreground">
                      <span className="flex items-center gap-2">
                        <Icon name="Droplet" size={20} />
                        Вкусовая оценка
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      Сделайте небольшой глоток и распределите вино по всему рту. Обратите внимание на сладость, 
                      кислотность, танины (для красных), тело и алкоголь. Оцените баланс между этими элементами. 
                      Послевкусие (финиш) — важный показатель качества вина.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="temperature">
                    <AccordionTrigger className="font-serif text-lg text-foreground">
                      <span className="flex items-center gap-2">
                        <Icon name="Thermometer" size={20} />
                        Температура подачи
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      Игристые вина: 6-8°C • Легкие белые: 8-10°C • Полнотелые белые: 10-13°C • 
                      Розовые: 10-12°C • Легкие красные: 12-14°C • Средние красные: 14-16°C • 
                      Полнотелые красные: 16-18°C
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="glasses">
                    <AccordionTrigger className="font-serif text-lg text-foreground">
                      <span className="flex items-center gap-2">
                        <Icon name="Wine" size={20} />
                        Выбор бокалов
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      Бокалы для красного вина имеют широкую чашу для аэрации. Бокалы для белого — меньше и уже, 
                      чтобы сохранить температуру. Бокалы для игристого — высокие и узкие для сохранения пузырьков. 
                      Наполняйте бокал на треть для лучшего раскрытия ароматов.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pairing" className="animate-fade-in">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="font-serif text-3xl text-foreground flex items-center gap-2">
                  <Icon name="UtensilsCrossed" className="text-primary" size={28} />
                  Сочетания вина с едой
                </CardTitle>
                <CardDescription>Классические и современные гастрономические пары</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-serif text-xl font-semibold text-foreground flex items-center gap-2">
                      <Icon name="Wine" size={20} className="text-primary" />
                      Красные вина
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="p-3 bg-card/50 rounded-lg border border-border">
                        <p className="font-medium text-foreground mb-1">Каберне Совиньон</p>
                        <p className="text-muted-foreground">Стейк, ягненок, сыры с голубой плесенью, темный шоколад</p>
                      </div>
                      <div className="p-3 bg-card/50 rounded-lg border border-border">
                        <p className="font-medium text-foreground mb-1">Пино Нуар</p>
                        <p className="text-muted-foreground">Утка, лосось, грибы, мягкие сыры</p>
                      </div>
                      <div className="p-3 bg-card/50 rounded-lg border border-border">
                        <p className="font-medium text-foreground mb-1">Мерло</p>
                        <p className="text-muted-foreground">Свинина, курица, паста с томатным соусом, средние сыры</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-serif text-xl font-semibold text-foreground flex items-center gap-2">
                      <Icon name="Wine" size={20} className="text-primary" />
                      Белые вина
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="p-3 bg-card/50 rounded-lg border border-border">
                        <p className="font-medium text-foreground mb-1">Шардоне</p>
                        <p className="text-muted-foreground">Морепродукты, курица в сливочном соусе, рыба на гриле</p>
                      </div>
                      <div className="p-3 bg-card/50 rounded-lg border border-border">
                        <p className="font-medium text-foreground mb-1">Совиньон Блан</p>
                        <p className="text-muted-foreground">Козий сыр, зеленые овощи, салаты, белая рыба</p>
                      </div>
                      <div className="p-3 bg-card/50 rounded-lg border border-border">
                        <p className="font-medium text-foreground mb-1">Рислинг</p>
                        <p className="text-muted-foreground">Азиатская кухня, острые блюда, свинина, фруктовые десерты</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-accent/10 rounded-lg border border-accent/20">
                  <h3 className="font-serif text-xl font-semibold mb-4 text-foreground">Основные принципы сочетания</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span><strong className="text-foreground">Баланс интенсивности:</strong> Легкие блюда — легкие вина, насыщенные блюда — полнотелые вина</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span><strong className="text-foreground">Контраст или комплементарность:</strong> Жирные блюда хороши с кислотными винами</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span><strong className="text-foreground">Региональное сочетание:</strong> Вина и блюда из одного региона часто идеально дополняют друг друга</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span><strong className="text-foreground">Учитывайте соусы:</strong> Часто именно соус определяет выбор вина, а не основной ингредиент</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dictionary" className="animate-fade-in">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="font-serif text-3xl text-foreground flex items-center gap-2">
                  <Icon name="BookOpen" className="text-primary" size={28} />
                  Винный словарь
                </CardTitle>
                <CardDescription>Основные термины и понятия</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="tannins">
                    <AccordionTrigger className="font-serif text-lg text-foreground">Танины</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      Природные полифенолы из кожицы, косточек винограда и дубовых бочек. Придают вину структуру, 
                      вяжущий вкус и способствуют выдержке. Танины ощущаются как «сухость» во рту.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="terroir">
                    <AccordionTrigger className="font-serif text-lg text-foreground">Терруар</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      Совокупность почвенных, климатических и географических факторов, влияющих на характер вина. 
                      Включает тип почвы, микроклимат, рельеф и традиции виноделия региона.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="body">
                    <AccordionTrigger className="font-serif text-lg text-foreground">Тело (Body)</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      Ощущение «веса» и насыщенности вина во рту. Легкотелые вина — водянистые, полнотелые — 
                      густые и маслянистые. Зависит от алкоголя, экстрактивности и глицерина.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="acidity">
                    <AccordionTrigger className="font-serif text-lg text-foreground">Кислотность</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      Придает вину свежесть, живость и способность к выдержке. Ощущается как покалывание по бокам языка. 
                      Высокая кислотность характерна для прохладных регионов и молодых вин.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="finish">
                    <AccordionTrigger className="font-serif text-lg text-foreground">Финиш (послевкусие)</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      Вкусовые ощущения, остающиеся после глотка. Долгий и сложный финиш — признак качественного вина. 
                      Может длиться от нескольких секунд до минуты и более.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="oak">
                    <AccordionTrigger className="font-serif text-lg text-foreground">Выдержка в дубе</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      Процесс выдерживания вина в дубовых бочках. Придает ванильные, пряные, тостовые ноты и помогает 
                      вину развить сложность. Новые бочки дают более интенсивный вкус, старые — более мягкий.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="aoc">
                    <AccordionTrigger className="font-serif text-lg text-foreground">AOC / DOC / DO</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      Системы контроля происхождения вина. AOC (Франция), DOC (Италия), DO (Испания) — гарантируют, 
                      что вино произведено в определенном регионе по установленным стандартам качества.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="vintage">
                    <AccordionTrigger className="font-serif text-lg text-foreground">Винтаж</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      Год урожая винограда. Важен для вин, способных к выдержке. Качество винтажа зависит от погодных 
                      условий сезона. «Великие винтажи» особенно ценятся коллекционерами.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="storage" className="animate-fade-in">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="font-serif text-3xl text-foreground flex items-center gap-2">
                  <Icon name="Archive" className="text-primary" size={28} />
                  Хранение вина
                </CardTitle>
                <CardDescription>Как правильно хранить вино дома</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-card/50 rounded-lg border border-border">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon name="Thermometer" size={24} className="text-primary" />
                        <h3 className="font-serif text-xl font-semibold text-foreground">Температура</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        Идеальная температура хранения: <strong className="text-foreground">12-14°C</strong>. Избегайте резких 
                        перепадов температуры. Слишком тепло ускоряет старение, слишком холодно — замедляет развитие вина.
                      </p>
                    </div>

                    <div className="p-4 bg-card/50 rounded-lg border border-border">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon name="Droplets" size={24} className="text-primary" />
                        <h3 className="font-serif text-xl font-semibold text-foreground">Влажность</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        Оптимальная влажность: <strong className="text-foreground">60-70%</strong>. Предотвращает высыхание 
                        пробки и проникновение воздуха. Слишком высокая влажность может повредить этикетки.
                      </p>
                    </div>

                    <div className="p-4 bg-card/50 rounded-lg border border-border">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon name="Sun" size={24} className="text-primary" />
                        <h3 className="font-serif text-xl font-semibold text-foreground">Свет</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        Храните вино в <strong className="text-foreground">темном месте</strong>. УФ-лучи разрушают органические 
                        соединения и ускоряют окисление. Темное стекло защищает, но полная темнота — лучше.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-card/50 rounded-lg border border-border">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon name="Move" size={24} className="text-primary" />
                        <h3 className="font-serif text-xl font-semibold text-foreground">Положение</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        Храните бутылки <strong className="text-foreground">горизонтально</strong>. Это сохраняет пробку 
                        влажной и герметичной. Игристые вина можно хранить вертикально благодаря давлению CO₂.
                      </p>
                    </div>

                    <div className="p-4 bg-card/50 rounded-lg border border-border">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon name="Volume2" size={24} className="text-primary" />
                        <h3 className="font-serif text-xl font-semibold text-foreground">Вибрации</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        Избегайте <strong className="text-foreground">вибраций</strong>. Они нарушают естественный процесс 
                        старения вина и могут взболтать осадок. Не храните вино рядом со стиральными машинами.
                      </p>
                    </div>

                    <div className="p-4 bg-card/50 rounded-lg border border-border">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon name="Wind" size={24} className="text-primary" />
                        <h3 className="font-serif text-xl font-semibold text-foreground">Запахи</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        Вино может <strong className="text-foreground">впитывать запахи</strong> через пробку. Избегайте 
                        хранения рядом с химикатами, чистящими средствами или сильно пахнущими продуктами.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
                  <h3 className="font-serif text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
                    <Icon name="Clock" size={20} />
                    Сроки хранения
                  </h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><strong className="text-foreground">Большинство вин (90%):</strong> пить в течение 1-3 лет после покупки</p>
                    <p><strong className="text-foreground">Качественные красные:</strong> 5-20 лет в зависимости от региона и урожая</p>
                    <p><strong className="text-foreground">Белые премиум-класса:</strong> 3-10 лет</p>
                    <p><strong className="text-foreground">Игристые (кроме винтажных):</strong> пить сразу, не хранить долго</p>
                    <p><strong className="text-foreground">Крепленые и десертные:</strong> могут храниться десятилетиями</p>
                  </div>
                </div>

                <div className="mt-6 p-6 bg-accent/10 rounded-lg border border-accent/20">
                  <h3 className="font-serif text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
                    <Icon name="Home" size={20} />
                    Домашнее хранение
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Если у вас нет винного шкафа, подойдут:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>Прохладная кладовая или подвал</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>Нижний шкаф кухни (вдали от плиты и холодильника)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>Гардеробная с постоянной температурой</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="X" size={16} className="text-destructive mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">Не храните вино на кухне, в ванной или на балконе</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-border mt-16 py-8 bg-card/30">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="font-serif text-lg mb-2">Винный справочник начинающего сомелье</p>
          <p className="text-sm">Откройте для себя удивительный мир вина</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
