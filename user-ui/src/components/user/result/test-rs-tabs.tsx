import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { TestRsListProps } from "./test-rs-list";
import TestRsList from "./test-rs-list";

const TestRsTabs = ({
  scr,
  cfm,
}: {
  scr: TestRsListProps;
  cfm: TestRsListProps;
}) => {
  return (
    <Tabs defaultValue="screening">
      <TabsList>
        <TabsTrigger value="screening">Sàng lọc</TabsTrigger>
        <TabsTrigger value="confirmatory">Khẳng định</TabsTrigger>
      </TabsList>
      <TabsContent value="screening">
        <TestRsList list={scr.list} viral={scr.viral} cd4={scr.cd4} />
      </TabsContent>
      <TabsContent value="confirmatory">
        <TestRsList list={cfm.list} viral={cfm.viral} cd4={cfm.cd4} />
      </TabsContent>
    </Tabs>
  );
};

export default TestRsTabs;
