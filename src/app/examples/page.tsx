import CustomButton from '@/components/CustomButton';
import Spinner from '@/components/Spinner';
import Card from '@/components/Card';
import BackgroundSpinner from '@/components/BackgroundSpinner';

export default function Examples() {
  return (
    <main className="mx-auto grid items-center justify-center">
      <h1>test</h1>
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
