import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../context/authentification";

function Request() {
  const { user } = useAuthContext();
  const { data, isLoading, error } = useQuery({
    queryKey: ["request"],
    queryFn: async () => {
      const response = await fetch(
        "https://adamafaye1945.pythonanywhere.com/retrieveRequest",
        {
          headers: { Authorization: `Bearer ${user.details.access_token} ` },
        }
      );
      if (!response) {
        console.log("error");
      }
      return response.json();
    },
    staleTime: 1000 * 60* 5
  });
  console.log(data);
  return <div></div>;
}

export default Request;
