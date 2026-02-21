import ColdStorageHeader from "@/components/ColdStorageHeader";
import ColdStorageSections from "@/components/ColdStorageSections";

const ColdStorage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-background flex flex-col floral-watermark">
      <ColdStorageHeader />
      <main className="flex-1 min-h-0 p-3 relative z-10">
        <ColdStorageSections />
      </main>
    </div>
  );
};

export default ColdStorage;
