import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../context/authentification";
import AppButton from "./AppButton";
import styles from "./Friend.module.css";
function RequestCard({ name }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.photo}>
          <img
            src="../d.webp"
            alt="Photo"
            style={{
              width: "80%",
              height: "80%",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.name}>{name}</div>
          <div className={styles.buttons}>
            <AppButton type="details" action="">
              Accept
            </AppButton>
            <AppButton type="stop">Deny</AppButton>
          </div>
        </div>
      </div>
    </div>
  );
}
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
        throw new Error("error fetching request");
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 5,
  });
  console.log(data);
  return (
    <div className={styles.friendlist}>
      {data?.map((request) => (
        <RequestCard name={request.name} />
      ))}
      <RequestCard name={"john"} />
      <RequestCard name={"deevin"} />
    </div>
  );
}

export default Request;
