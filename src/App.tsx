import { PopulationByPrefecture } from "./features/population-by-prefecture/components/PopulationByPrefecture";

function App() {
  return (
    <>
      <div className="min-h-screen bg-indigo-50 p-4 sm:p-6 lg:p-8 text-gray-700">
        <main className="max-w-7xl mx-auto space-y-6">
          <h1 className="text-xl sm:text-2xl font-bold">
            都道府県別の総人口推移グラフ
          </h1>
          <PopulationByPrefecture />
        </main>
      </div>
    </>
  );
}

export default App;
