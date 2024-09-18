// api.ts
export const fetchSummary = async () => {
   
    // const response = await fetch('https://hris.stpeter.com.ph:5102/api/Collection/fetchVwEfficiency?posCode=CHR&areaCode=NATIONAL&key=b07131600ee34def946ad3228a9a8af4');
    const response = await fetch('https://hris.stpeter.com.ph:5102/api/NewSales/fetchNsSummaryComp?posCode=CHR&areaCode=BM&key=b07131600ee34def946ad3228a9a8af4');

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };