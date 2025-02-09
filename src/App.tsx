import { PopulationByPrefecture } from "./features/population-by-prefecture/components/PopulationByPrefecture";

function App() {
  return (
    <>
      <div className="min-h-screen bg-indigo-50 p-4 sm:p-6 lg:p-8 text-gray-700">
        <div className="max-w-7xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold">都道府県人口比較</h1>
          <PopulationByPrefecture />
        </div>
      </div>
    </>
  );
}

export default App;
