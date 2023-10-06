import CustomButton from '@/components/CustomButton';
import Spinner from '@/components/Spinner';
import Card from '@/components/Card';
import BackgroundSpinner from '@/components/BackgroundSpinner';
import Popup from '@/components/Popup';

export default function Examples() {
  return (
    <main className="mx-auto grid items-center justify-center">
      <div className="hidden">
        <Popup></Popup>
      </div>
      <CustomButton></CustomButton>
      <div className="mx-auto">
        <Spinner></Spinner>
      </div>
      <Card></Card>
      <div className="hidden">
        <BackgroundSpinner></BackgroundSpinner>
      </div>
    </main>
  );
}
