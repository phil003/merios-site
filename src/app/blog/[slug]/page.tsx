import Link from 'next/link';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollAnimator from "@/components/ScrollAnimator";

const articles: Record<
  string,
  {
    title: string;
    category: string;
    date: string;
    readTime: string;
    author: string;
    body: string[];
  }
> = {
  'understanding-blood-test-results': {
    title: 'Understanding Your Blood Test Results: A Complete Guide',
    category: 'Biomarkers',
    date: 'March 28, 2026',
    readTime: '8 min read',
    author: 'Merios Team',
    body: [
      'Blood tests provide a window into your internal health. Yet for many, the results are confusing—filled with acronyms and ranges that seem arbitrary. Understanding your blood work is one of the most empowering things you can do for your health. This guide breaks down the most important biomarkers and explains what they actually mean for your wellbeing.',
      'When you review your lab results, you\'ll see values next to reference ranges. These ranges represent what\'s "normal" for the general population, but normal and optimal are different. Your body has its own optimal ranges based on your genetics, lifestyle, and health goals. The goal isn\'t just to fall within the reference range—it\'s to understand where you fall and what that means for your long-term health trajectory.',
      'The most commonly tested biomarkers include glucose, cholesterol, liver enzymes, kidney function markers, and blood cell counts. Each tells a different story about your metabolic health. Glucose levels reveal how well your body handles carbohydrates. Cholesterol panels show cardiovascular risk factors. Liver enzymes indicate how your body processes nutrients and toxins. Together, they paint a comprehensive picture of your internal state.',
      'Regular testing allows you to track trends over time. A single test is a snapshot; multiple tests create a timeline. This timeline is far more valuable than any single number, as it reveals whether your health markers are improving, declining, or stabilizing. When you understand your baseline and monitor your trends, you can make informed decisions about diet, exercise, stress management, and medical interventions.',
    ],
  },
  'heart-rate-variability-stress': {
    title: 'How Heart Rate Variability Reveals Your Stress Levels',
    category: 'Health',
    date: 'March 21, 2026',
    readTime: '6 min read',
    author: 'Merios Team',
    body: [
      'Your heart doesn\'t beat like a metronome. The time between each heartbeat varies, and that variation—called Heart Rate Variability (HRV)—tells you something profound about your nervous system and stress levels. High HRV suggests your autonomic nervous system is flexible and resilient. Low HRV may indicate stress, fatigue, or illness. Understanding HRV gives you a real-time window into your recovery status.',
      'When your body is under acute stress, your sympathetic nervous system (the "fight or flight" response) activates. This causes your heart to beat more regularly with less variation between beats—your HRV drops. Conversely, when you\'re relaxed and your parasympathetic nervous system (the "rest and digest" system) dominates, your heart rate becomes more variable and irregular—your HRV rises. This counterintuitive pattern is the key to understanding what HRV really means.',
      'Athletes and biohackers have long tracked HRV because it predicts performance and recovery better than resting heart rate alone. A sudden dip in HRV often precedes illness or overtraining syndrome by days. By monitoring your HRV trends, you can detect when your body needs rest before symptoms appear. This allows you to adjust your training, stress management, and sleep proactively.',
      'Modern wearables make HRV tracking accessible to everyone. Apps analyze your HRV during sleep and provide daily scores. While absolute HRV values vary between individuals, your personal trends matter most. Tracking HRV over weeks and months reveals how different lifestyle factors—sleep, exercise, caffeine, stress—affect your nervous system function. This data-driven feedback loop empowers you to optimize your daily recovery.',
    ],
  },
  'eleven-health-systems': {
    title: 'The 11 Health Systems Your Body Runs On',
    category: 'Health',
    date: 'March 14, 2026',
    readTime: '10 min read',
    author: 'Merios Team',
    body: [
      'Your body is an integrated system of systems. While modern medicine often isolates single organs—the heart, the liver, the brain—in reality, everything is connected. To truly understand your health, you need to see the forest, not just individual trees. Here are the 11 core biological systems that determine your overall wellness and longevity.',
      'The cardiovascular system pumps blood and oxygen throughout your body. The respiratory system brings in oxygen and removes carbon dioxide. The nervous system coordinates everything—your brain, spinal cord, and peripheral nerves. The endocrine system releases hormones that regulate metabolism, growth, and stress. The immune system protects you from pathogens. The digestive system breaks down food and absorbs nutrients. The musculoskeletal system provides structure and movement. The urinary system filters waste. The reproductive system enables life creation. The lymphatic system manages fluid balance and immune function. And the integumentary system—your skin—protects you from the outside world.',
      'Most people focus on one or two systems at a time. They optimize cardiovascular health through running, or digestive health through diet. But lasting wellness requires balance across all 11 systems. A stressful life (nervous system overload) impairs digestion. Poor sleep (nervous system dysfunction) weakens immunity. Lack of exercise (musculoskeletal inactivity) impacts cardiovascular and endocrine health. This is why holistic health approaches that address multiple systems simultaneously are so effective.',
      'The Merios health score measures how well all 11 systems are functioning together. Rather than tracking individual biomarkers in isolation, we assess how they interact and influence your overall resilience. When you understand your body as an interconnected whole, you can make decisions that improve multiple systems at once. That\'s when real transformation happens.',
    ],
  },
  'health-score-matters': {
    title: 'Why Your Health Score Matters More Than Individual Numbers',
    category: 'Wellness',
    date: 'March 7, 2026',
    readTime: '7 min read',
    author: 'Merios Team',
    body: [
      'You get your lab results back. Cholesterol is slightly elevated. Glucose is normal. Blood pressure is good. Inflammation markers are borderline. Now what? You have a bunch of numbers, but no clear sense of whether you\'re actually healthy. This is the problem that health scores solve. By combining multiple biomarkers into a single metric, you see the complete picture.',
      'A health score is only useful if it\'s grounded in biology. The best scores don\'t just average your numbers—they weight different biomarkers based on their predictive power for long-term health outcomes. A slightly elevated cholesterol matters less if your inflammation is low and your cardiovascular fitness is excellent. But the same cholesterol matters much more if you\'re sedentary and stressed. Context changes everything.',
      'The real power of a health score is that it gives you a clear target. Instead of feeling overwhelmed by dozens of metrics, you can focus on moving your score upward. Whether that\'s through dietary changes, exercise, stress management, or sleep optimization, you see immediate feedback. Did my score improve this week? That reinforcement drives behavioral change in a way that isolated numbers never can.',
      'Your health score is also dynamic. It\'s not a judgment of your worth—it\'s a tool for understanding your current state and tracking your progress. When you view it as a game you\'re playing to improve your own health, it becomes motivating rather than anxiety-inducing. The goal isn\'t to achieve some perfect number. The goal is to get a little bit better each week, building momentum toward lasting wellbeing.',
    ],
  },
  'sleep-quality-vs-quantity': {
    title: 'Sleep Quality vs Sleep Quantity: What Your Data Shows',
    category: 'Wellness',
    date: 'February 28, 2026',
    readTime: '6 min read',
    author: 'Merios Team',
    body: [
      'Eight hours a night. That\'s the magic number most health advice revolves around. But what if you\'re sleeping eight hours and still feeling exhausted? The problem isn\'t quantity—it\'s quality. Sleep is not monolithic. The eight hours you sleep matter far less than how well you sleep during those hours. Understanding the difference changes everything.',
      'Sleep has distinct stages: light sleep, deep sleep, and REM sleep. Each stage serves different restorative functions. Deep sleep is when your body repairs tissues and consolidates memories. REM sleep is crucial for emotional processing and brain development. Light sleep transitions between these deeper stages. Most people spend about 20% of sleep in deep sleep and 20% in REM. But this varies tremendously based on age, stress, exercise, and sleep environment.',
      'Poor sleep quality means insufficient time in deep and REM sleep. You might be "asleep" for eight hours but only spending two hours in genuinely restorative sleep. Factors that degrade sleep quality include alcohol, caffeine, artificial light before bed, irregular sleep schedules, stress, and poor sleep environment temperature or noise. Even small improvements in any of these areas can dramatically increase the proportion of your sleep that\'s actually restorative.',
      'Tracking sleep quality requires more than just total time in bed. Modern wearables measure heart rate variability, movement, and breathing patterns to estimate sleep stages. By seeing what proportion of your night you\'re spending in each sleep stage, you can optimize your bedtime routine to increase deep sleep. Consistency matters as much as duration—a consistent seven hours of quality sleep beats an inconsistent nine hours of fragmented sleep.',
    ],
  },
  'biomarkers-101': {
    title: 'Biomarkers 101: What Your Blood Really Tells You',
    category: 'Biomarkers',
    date: 'February 21, 2026',
    readTime: '9 min read',
    author: 'Merios Team',
    body: [
      'A biomarker is a measurable biological characteristic that reflects the state of a biological system. In simpler terms, it\'s a clue about what\'s happening inside your body. Your blood contains hundreds of biomarkers—proteins, cells, hormones, metabolites—each telling a different part of your health story. Learning to read these clues is the foundation of preventive health.',
      'Biomarkers fall into different categories based on what they tell you. Structural biomarkers are physical changes, like a tumor marker. Functional biomarkers measure how well a system is working, like how efficiently your kidneys filter. Molecular biomarkers are chemical compounds, like cholesterol or glucose. Together, they create a comprehensive assessment of your health state. One biomarker in isolation is rarely enough to make decisions; you need patterns across many biomarkers.',
      'The most valuable biomarkers are those that predict future disease risk before symptoms appear. Inflammatory markers like C-reactive protein might be slightly elevated years before a heart attack. Fasting glucose might be drifting upward before diabetes develops. Lipid ratios might predict cardiovascular disease better than total cholesterol. These predictive biomarkers are your early warning system—they give you time to intervene before problems become serious.',
      'Biomarker testing is becoming more accessible than ever before. Where once you needed a doctor\'s order to get bloodwork, direct-to-consumer labs now allow you to order your own tests. Home testing kits make it possible to track biomarkers over time without repeated doctor visits. The key is to test strategically, focus on the biomarkers most relevant to your health goals, and track trends rather than obsessing over single results.',
    ],
  },
};

const relatedArticles = [
  {
    slug: 'health-score-matters',
    title: 'Why Your Health Score Matters More Than Individual Numbers',
    category: 'Wellness',
  },
  {
    slug: 'eleven-health-systems',
    title: 'The 11 Health Systems Your Body Runs On',
    category: 'Health',
  },
  {
    slug: 'biomarkers-101',
    title: 'Biomarkers 101: What Your Blood Really Tells You',
    category: 'Biomarkers',
  },
];

export async function generateStaticParams() {
  return [
    { slug: 'understanding-blood-test-results' },
    { slug: 'heart-rate-variability-stress' },
    { slug: 'eleven-health-systems' },
    { slug: 'health-score-matters' },
    { slug: 'sleep-quality-vs-quantity' },
    { slug: 'biomarkers-101' },
  ];
}

export default function BlogArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = articles[params.slug];

  if (!article) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="font-serif text-4xl font-bold mb-4">
            Article not found
          </h1>
          <Link href="/blog" className="text-blue-600 hover:underline">
            Back to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <ScrollAnimator />
      <Navbar />
      <main>
        {/* Article Header */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        {/* Category & Metadata */}
        <div className="mb-8">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide text-white mb-6"
            style={{ backgroundColor: '#3A7A52' }}
          >
            {article.category}
          </span>

          <h1
            className="font-serif text-5xl sm:text-6xl font-bold mb-6 leading-tight"
            style={{ color: '#1A1A1A' }}
          >
            {article.title}
          </h1>

          <div
            className="flex flex-wrap items-center gap-4 text-sm"
            style={{ color: '#5C5650' }}
          >
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
            <span>•</span>
            <span>By {article.author}</span>
          </div>
        </div>

        {/* Article Body */}
        <div className="prose prose-lg max-w-none mb-16">
          {article.body.map((paragraph, idx) => (
            <p
              key={idx}
              className="text-lg leading-relaxed mb-6"
              style={{ color: '#1A1A1A' }}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Author Section */}
        <div
          className="py-8 border-t border-b border-gray-200"
          style={{ backgroundColor: '#FDFCF9' }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-full"
              style={{ backgroundColor: '#2D5A3D' }}
            />
            <div>
              <h3
                className="font-serif font-bold text-lg"
                style={{ color: '#1A1A1A' }}
              >
                {article.author}
              </h3>
              <p
                className="text-sm"
                style={{ color: '#5C5650' }}
              >
                Health insights and wellness research from the Merios team.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8 my-16"
        style={{ backgroundColor: '#F8F6F1' }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="font-serif text-4xl font-bold mb-4"
            style={{ color: '#1A1A1A' }}
          >
            Ready to understand your health?
          </h2>
          <p
            className="text-lg mb-8 leading-relaxed"
            style={{ color: '#5C5650' }}
          >
            Join Merios to get personalized insights into your health score and
            track your progress over time.
          </p>
          <Link
            href="/early-access"
            className="inline-block px-10 py-4 rounded-lg font-sans font-semibold text-white transition-all duration-300 hover:opacity-90"
            style={{ backgroundColor: '#2D5A3D' }}
          >
            Join the Waitlist
          </Link>
        </div>
      </section>

      {/* Related Articles */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2
          className="font-serif text-4xl font-bold mb-12 text-center"
          style={{ color: '#1A1A1A' }}
        >
          Related Articles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedArticles.map((relArticle) => (
            <Link
              key={relArticle.slug}
              href={`/blog/${relArticle.slug}`}
              className="group flex flex-col rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg"
            >
              <div className="p-8 flex flex-col h-full">
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide text-white mb-4 w-fit"
                  style={{ backgroundColor: '#3A7A52' }}
                >
                  {relArticle.category}
                </span>

                <h3
                  className="font-serif text-lg font-bold leading-snug group-hover:opacity-80 transition-opacity"
                  style={{ color: '#1A1A1A' }}
                >
                  {relArticle.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Back to Blog */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 transition-all duration-300 hover:gap-3"
          style={{ color: '#2D5A3D' }}
        >
          ← Back to blog
        </Link>
      </section>
      </main>
      <Footer />
    </>
  );
}
