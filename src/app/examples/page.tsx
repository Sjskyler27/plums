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
    { text: 'MATH FOR THE REAL WORLD', url: '#path_to_pdf' },
    { text: 'FIRST JUMP INTO CALCULUS', url: '#path_to_txt' },
    { text: 'DERIVATIVES FOR NEWBIES', url: '#path_to_video' },
    { text: 'TRIGONOMETRY EQUATIONS', url: '#path_to_page' },
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
          <TopicItem title="RELIGION" links={[]} />
        </div>
      </main>
      <Footer />
    </>
  );
}
