import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import TestRsList from "./test-rs-list";
import type { LabResult } from "@/types/LabResult.type";

const TestRsTabs = ({ labResultList }: { labResultList: LabResult[] }) => {
  const screeningResults = labResultList.filter(
    (result) => result.serviceType === "SCREENING"
  );
  const confirmatoryResults = labResultList.filter(
    (result) => result.serviceType === "CONFIRMATORY"
  );

  return (
    <Tabs defaultValue="screening">
      <TabsList>
        <TabsTrigger value="screening">Sàng lọc</TabsTrigger>
        <TabsTrigger value="confirmatory">Khẳng định</TabsTrigger>
      </TabsList>
      <TabsContent value="screening">
        <TestRsList list={screeningResults} />
      </TabsContent>
      <TabsContent value="confirmatory">
        <TestRsList list={confirmatoryResults} />
      </TabsContent>
    </Tabs>
  );
};

export default TestRsTabs;
