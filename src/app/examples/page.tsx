import CustomButton from '@/components/UI/CustomButton';
import CustomButton2 from '@/components/UI/CustomButton2';
import Spinner from '@/components/SmallSpinner';
import Card from '@/components/UI/BaseCard';
import BackgroundSpinner from '@/components/BackgroundSpinner';
import Popup from '@/components/UI/CustomPopup';

export default function Examples() {
  return (
    <main className="mx-auto grid items-center justify-center">
      <div className="hidden">
        <Popup></Popup>
      </div>
      <CustomButton></CustomButton>
      <CustomButton2></CustomButton2>
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
