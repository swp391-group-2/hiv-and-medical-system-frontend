import ticketApi from "@/apis/ticket.api";
import ErrorQuery from "@/components/common/error-query";
import Loading from "@/components/common/loading";
import TicketCard from "@/components/user/ticket/ticket-card";
import { useQuery } from "@tanstack/react-query";

function Ticket() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["tickets"],
    queryFn: async () => {
      const response = await ticketApi.getTickets();
      return response.data;
    },
  });
  if (isLoading) {
    return (
      <div className="flex justify-center mx-auto items-center min-h-screen">
        <Loading />
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center mx-auto items-center min-h-screen">
        <ErrorQuery
          onRetry={refetch}
          error={error}
          message="Có lỗi xảy ra. Vui lòng thử lại."
        />
      </div>
    );
  }
  return (
    <section className="w-full mt-7 mr-10">
      <h1 className="text-3xl text-primary font-bold text-center mb-5">
        Vé Của Tôi
      </h1>
      <div className="grid grid-cols-1 gap-y-1.5">
        {data?.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticketType={ticket.ticketType}
            image={ticket.imageUrl}
            price={ticket.price}
            serviceName={ticket.serviceName}
            count={ticket.count}
          />
        ))}
      </div>
    </section>
  );
}

export default Ticket;
