export default function Popup() {
  return (
    <div
      id="popup-modal"
      className="fixed top-0 left-0 w-full bg-black bg-opacity-50 z-50"
    >
      <div className="bg-palePurple dark:bg-gray-600 p-4 text-center">
        <p className="text-byzantium text-center text-xl font-bold">Testing!</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
          merninisti licere mihi
        </p>
        <button
          id="close-modal"
          className="bg-byzantium text-white px-4 py-2 rounded-md mt-4 hover:bg-plum"
        >
          Close
        </button>
      </div>
    </div>
  );
}
