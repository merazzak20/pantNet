import Card from "./Card";
import Container from "../Shared/Container";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpinner from "../Shared/LoadingSpinner";

const Plants = () => {
  const axiosPublic = useAxiosPublic();
  const { data: plants, isPending: isLoading } = useQuery({
    queryKey: ["plants"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/plants");
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <Container>
      {plants && plants.length > 0 ? (
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {plants.map((plant) => (
            <Card key={plant._id} plant={plant} />
          ))}
        </div>
      ) : (
        <p>There is no data Available.</p>
      )}
    </Container>
  );
};

export default Plants;
