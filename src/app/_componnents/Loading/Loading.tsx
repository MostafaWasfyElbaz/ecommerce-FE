import { PulseLoader } from "react-spinners";

function Loading() {
  return (
    <div className="flex justify-center items-center h-96 bg-white">
      <PulseLoader color="#00a651" size={20} loading={true} />
    </div>
  );
}

export default Loading;
