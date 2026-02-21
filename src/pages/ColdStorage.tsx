import ColdStorageHeader from "@/components/ColdStorageHeader";
import ColdStorageSections from "@/components/ColdStorageSections";
import ColdStorageHBMaster from "@/components/ColdStorageHBMaster";

const ColdStorage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-background flex flex-col floral-watermark">
      <ColdStorageHeader />
      <main className="flex-1 min-h-0 p-3 flex flex-col gap-3 relative z-10">
        <div className="flex-1 min-h-0">
          <ColdStorageSections />
        </div>
        <div className="shrink-0">
          <ColdStorageHBMaster />
        </div>
      </main>
    </div>
  );
};

export default ColdStorage;
