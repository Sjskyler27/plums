'use client';
import CustomButton from '@/components/UI/CustomButton';
import Spinner from '@/components/SmallSpinner';
import Card from '@/components/UI/BaseCard';
import BackgroundSpinner from '@/components/BackgroundSpinner';
import Popup from '@/components/UI/CustomPopup';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import TopicItem from '@/components/TopicItem';

export default function Examples() {
  const mathLinks = [
    {
      text: 'MATH FOR THE REAL WORLD',
      type: 'link', // Use a colon (:) for assignment, not an equal sign (=)
      url: 'https://content.byui.edu/file/fb4c2d20-04c3-463d-93f6-725064a8b15d/18/fdmat108syllabus.html',
    },
    {
      text: 'FIRST JUMP INTO CALCULUS',
      type: 'youtube', // Use a colon (:) for assignment, not an equal sign (=)
      url: 'https://www.youtube.com/watch?v=5yfh5cf4-0w',
    },
    {
      text: 'DERIVATIVES FOR NEWBIES',
      type: 'pdf', // Use a colon (:) for assignment, not an equal sign (=)
      url: '#path_to_video',
    },
    {
      text: 'TRIGONOMETRY EQUATIONS',
      type: 'txt', // Use a colon (:) for assignment, not an equal sign (=)
      url: '#path_to_page',
    },
  ];
  const religionLinks = [
    {
      text: 'The Book of Mormon',
      type: 'link',
      url: 'https://www.lds.org/scriptures/bofm?lang=eng',
    },
    {
      text: 'Understanding the Bible',
      type: 'link',
      url: 'https://www.bible.com/',
    },
    {
      text: 'World Religions Overview',
      type: 'link',
      url: 'https://www.worldreligions.psu.edu/',
    },
    {
      text: 'Religion and Philosophy Courses',
      type: 'link',
      url: 'https://www.coursera.org/specializations/religion-philosophy',
    },
    {
      text: 'The Bhagavad Gita',
      type: 'link',
      url: 'https://www.bhagavad-gita.org/',
    },
    {
      text: 'Introduction to Buddhism',
      type: 'link',
      url: 'https://www.learnreligions.com/an-introduction-to-buddhism-449635',
    },
    {
      text: 'Islam: A Brief Introduction',
      type: 'link',
      url: 'https://www.islamreligion.com/',
    },
    {
      text: 'Judaism 101',
      type: 'link',
      url: 'https://www.jewfaq.org/',
    },
    {
      text: 'Hinduism Basics',
      type: 'link',
      url: 'https://www.hinduwebsite.com/',
    },
    {
      text: 'Comparative Religion Studies',
      type: 'link',
      url: 'https://www.harvard.edu/academics/graduate-degrees/hds/comparative-religion',
    },
    {
      text: 'The Vatican Official Website',
      type: 'link',
      url: 'https://www.vatican.va/content/vatican/en.html',
    },
    {
      text: 'Religion News Service',
      type: 'link',
      url: 'https://religionnews.com/',
    },
    {
      text: 'Religion and Ethics Newsweekly',
      type: 'link',
      url: 'https://www.pbs.org/wnet/religionandethics/',
    },
    {
      text: 'Religious Studies Journals',
      type: 'link',
      url: 'https://www.jstor.org/journal/jrelstud',
    },
    {
      text: 'Sacred Texts Archive',
      type: 'link',
      url: 'http://www.sacred-texts.com/',
    },
  ];

  return (
    <>
      <Header />
      <main className="mx-auto grid items-center justify-center">
        <div className="hidden">
          <Popup></Popup>
        </div>
        <CustomButton>Click me</CustomButton>
        <CustomButton altColor="true">Alt Color</CustomButton>
        <div className="mx-auto">
          <Spinner></Spinner>
        </div>
        <Card header="Note Card">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
          risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec,
          ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula
          massa, varius a, semper congue, euismod non, mi.
        </Card>
        <div className="hidden">
          <BackgroundSpinner></BackgroundSpinner>
        </div>
        <div className="p-10">
          <TopicItem title="MATHEMATICS" links={mathLinks} />
          <TopicItem title="RELIGION" links={religionLinks} />
        </div>
      </main>
      <Footer />
    </>
  );
}
